"use client";

import { useMemo, useState, useEffect } from "react";

function generateStars(count: number, maxSize: number, color: string, maxOpacity: number): string {
    const shadows: string[] = [];
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 4000);
        const y = Math.floor(Math.random() * 4000);
        const opacity = (Math.random() * maxOpacity * 0.6 + maxOpacity * 0.4).toFixed(2);
        const spread = maxSize > 1 ? `${(Math.random() * 0.5).toFixed(1)}px` : "0px";
        shadows.push(`${x}px ${y}px ${spread} rgba(${color}, ${opacity})`);
    }
    return shadows.join(", ");
}

export function StarfieldBackground() {
    const smallStars = useMemo(() => generateStars(1500, 1, "224, 226, 219", 0.8), []);
    const mediumStars = useMemo(() => generateStars(600, 1.5, "224, 226, 219", 0.9), []);
    const largeStars = useMemo(() => generateStars(200, 2, "224, 226, 219", 1), []);
    const greenStars = useMemo(() => generateStars(60, 2, "149, 230, 0", 0.35), []);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="starfield-container" aria-hidden="true" />;

    return (
        <div className="starfield-container" aria-hidden="true">
            <div className="starfield-layer starfield-slow" style={{ boxShadow: smallStars }} />
            <div className="starfield-layer starfield-medium" style={{ boxShadow: mediumStars }} />
            <div className="starfield-layer starfield-fast" style={{ boxShadow: largeStars }} />
            <div className="starfield-layer starfield-glow" style={{ boxShadow: greenStars }} />
        </div>
    );
}