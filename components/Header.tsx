'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-8 pb-4">
      {/* Logo */}
      <div className="mb-6">
        <Link href="/" className="inline-block">
          <div className="text-white text-2xl font-bold tracking-wider uppercase">
            OZWVLD
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-center gap-6">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-wider text-accent hover:text-hover transition-colors"
        >
          Shop
        </Link>
        <Link
          href="/#contact"
          className="text-[10px] uppercase tracking-wider text-accent hover:text-hover transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

