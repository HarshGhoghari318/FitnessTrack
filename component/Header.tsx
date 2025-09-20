"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"


import { LucideDumbbell } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/guide", label: "Guide" },
    { href: "/nutritions", label: "Nutrition" },
    { href: "/workouts", label: "Workouts" },
    
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-950/80 border-b border-purple-900 shadow-lg px-6 py-3 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-purple-400 hover:text-purple-300 transition">
        <LucideDumbbell size={28} className="text-purple-500 drop-shadow" />
        FitnessFREAK
      </Link>
      <nav className="flex gap-2 bg-gray-900/80 rounded-full px-4 py-2 shadow border border-purple-700">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              `relative px-4 py-1 text-lg font-semibold transition-colors duration-200 rounded-full ` +
              (isActive(link.href)
                ? "text-purple-400"
                : "text-gray-300 hover:text-purple-300")
            }
          >
            {link.label}
            {isActive(link.href) && (
              <span className="absolute left-1/2 -bottom-1 w-2/3 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full -translate-x-1/2 animate-pulse" />
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}