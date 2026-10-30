"use client";

import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const socials = [
  {
    href: "https://www.instagram.com/vannetti.dev/",
    label: "Instagram",
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    href: "https://github.com/AndreaV89",
    label: "GitHub",
    icon: FaGithub,
    color: "#ffffff",
  },
  {
    href: "https://www.linkedin.com/in/andrea-vannetti",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
];

interface SocialIconsProps {
  size?: number;
  className?: string;
}

export function SocialIcons({ size = 20, className = "" }: SocialIconsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-typography-muted transition-all duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = social.color;
            e.currentTarget.style.borderColor = social.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "";
            e.currentTarget.style.borderColor = "";
          }}
          aria-label={social.label}
        >
          <social.icon size={size} />
        </a>
      ))}
    </div>
  );
}
