"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./PageTransition.module.css";

type TransitionAction = () => void;
type TransitionPhase = "idle" | "closing" | "covered" | "opening";
type TransitionContextValue = (action: TransitionAction) => void;

const TransitionContext = createContext<TransitionContextValue>((action) => action());
const PANEL_COUNT = 8;
const ROUTE_WATCHDOG_MS = 10_000;

export function usePageTransition() {
  return useContext(TransitionContext);
}

function RouteObserver({ onRouteChange }: { onRouteChange: (key: string) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const previousRoute = useRef<string | null>(null);

  useEffect(() => {
    if (previousRoute.current === null) {
      previousRoute.current = routeKey;
      return;
    }
    if (previousRoute.current === routeKey) return;
    previousRoute.current = routeKey;
    onRouteChange(routeKey);
  }, [onRouteChange, routeKey]);

  return null;
}

function TransitionController({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const phaseRef = useRef<TransitionPhase>("idle");
  const actionRef = useRef<TransitionAction | null>(null);
  const routeReadyRef = useRef(false);
  const routeWatchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseWatchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changePhase = useCallback((next: TransitionPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const clearTimers = useCallback(() => {
    if (routeWatchdogRef.current) clearTimeout(routeWatchdogRef.current);
    if (phaseWatchdogRef.current) clearTimeout(phaseWatchdogRef.current);
    routeWatchdogRef.current = null;
    phaseWatchdogRef.current = null;
  }, []);

  const beginOpening = useCallback(() => {
    clearTimers();
    actionRef.current = null;
    routeReadyRef.current = false;
    changePhase("opening");
  }, [changePhase, clearTimers]);

  const onRouteChange = useCallback((_routeKey: string) => {
    routeReadyRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      changePhase("idle");
      return;
    }
    const currentPhase = phaseRef.current;
    if (currentPhase === "covered") {
      beginOpening();
    } else if (currentPhase === "idle") {
      // Covers unwrapped programmatic navigations and browser history changes.
      changePhase("closing");
    }
    // During closing, wait for the complete curtain before revealing the route.
  }, [beginOpening, changePhase]);

  const navigate = useCallback((action: TransitionAction) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      action();
      return;
    }
    if (phaseRef.current !== "idle") return;

    clearTimers();
    actionRef.current = action;
    routeReadyRef.current = false;
    changePhase("closing");

    // Safety net for a missing CSS animation event. It never navigates early.
    phaseWatchdogRef.current = setTimeout(() => {
      if (phaseRef.current === "closing") {
        actionRef.current = null;
        routeReadyRef.current = false;
        changePhase("idle");
      }
    }, 1_500);
  }, [changePhase, clearTimers]);

  const onAnimationEnd = useCallback((event: AnimationEvent<HTMLSpanElement>) => {
    const panelIndex = Number(event.currentTarget.dataset.panel);
    if (phaseRef.current === "closing" && panelIndex === PANEL_COUNT - 1) {
      if (phaseWatchdogRef.current) clearTimeout(phaseWatchdogRef.current);
      phaseWatchdogRef.current = null;
      changePhase("covered");

      const action = actionRef.current;
      if (action) {
        actionRef.current = null;
        action();
        routeWatchdogRef.current = setTimeout(() => {
          if (phaseRef.current === "covered") beginOpening();
        }, ROUTE_WATCHDOG_MS);
      } else if (routeReadyRef.current) {
        beginOpening();
      } else {
        routeWatchdogRef.current = setTimeout(beginOpening, ROUTE_WATCHDOG_MS);
      }
    }

    if (phaseRef.current === "opening" && panelIndex === PANEL_COUNT - 1) {
      clearTimers();
      actionRef.current = null;
      routeReadyRef.current = false;
      changePhase("idle");
    }
  }, [beginOpening, changePhase, clearTimers]);

  useEffect(() => {
    const onPopState = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (phaseRef.current === "idle") {
        clearTimers();
        actionRef.current = null;
        routeReadyRef.current = false;
        changePhase("closing");
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [changePhase, clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target && anchor.target !== "_self" || anchor.hasAttribute("download") || anchor.relList.contains("external") || anchor.hasAttribute("data-no-page-transition")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      if (destination.pathname === current.pathname && destination.search === current.search) return;

      event.preventDefault();
      navigate(() => router.push(`${destination.pathname}${destination.search}${destination.hash}`));
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [navigate, router]);

  // Keep the native Link handler from navigating while a curtain is already active.
  const onReactClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (phaseRef.current === "idle") return;
    const target = event.target;
    if (target instanceof Element && target.closest("a[href]")) event.preventDefault();
  };

  return (
    <TransitionContext.Provider value={navigate}>
      <div onClickCapture={onReactClickCapture}>
        {children}
      </div>
      <Suspense fallback={null}>
        <RouteObserver onRouteChange={onRouteChange} />
      </Suspense>
      <div className={styles.curtain} data-phase={phase} aria-hidden="true">
        {Array.from({ length: PANEL_COUNT }, (_, index) => (
          <span
            className={styles.panel}
            data-panel={index}
            key={index}
            onAnimationEnd={onAnimationEnd}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  return <TransitionController>{children}</TransitionController>;
}
