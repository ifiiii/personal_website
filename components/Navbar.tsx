"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/ramen", label: "Ramen Rankings" },
  { href: "/japan", label: "Japan Guide" },
  { href: "/about", label: "About iFi" },
];

export default function Navbar({ siteTitle }: { siteTitle: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-full bg-beni font-display text-lg text-white">
            麺
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">{siteTitle}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href) ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full hover:bg-paper-deep md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="border-b border-line bg-paper px-4 pb-4 shadow-sm md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-3 font-medium ${
                  isActive(link.href) ? "bg-paper-deep text-ink" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
