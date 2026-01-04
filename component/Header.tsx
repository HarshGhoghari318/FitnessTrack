"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LucideDumbbell, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href;
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/guide", label: "Guide" },
    { href: "/nutritions", label: "Nutrition" },
    { href: "/workouts", label: "Workouts" },
    
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-950/80 border-b border-purple-900 shadow-lg px-4 sm:px-6 py-3 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-purple-400 hover:text-purple-300 transition">
        <LucideDumbbell size={24} className="sm:w-7 sm:h-7 text-purple-500 drop-shadow" />
        <span className="hidden sm:inline">FitnessFREAK</span>
        <span className="sm:hidden">FF</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-2 bg-gray-900/80 rounded-full px-4 py-2 shadow border border-purple-700">
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-purple-400 hover:text-purple-300 transition rounded-lg hover:bg-gray-800"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 right-0 md:hidden bg-gray-950/95 backdrop-blur-md border-b border-purple-900 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  `relative px-4 py-3 text-lg font-semibold transition-colors duration-200 rounded-lg text-center ` +
                  (isActive(link.href)
                    ? "text-purple-400 bg-purple-900/30"
                    : "text-gray-300 hover:text-purple-300 hover:bg-gray-800/50")
                }
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute left-1/2 bottom-0 w-2/3 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full -translate-x-1/2" />
                )}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}