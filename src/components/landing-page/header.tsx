"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full py-4 fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <div />
          <div className="flex justify-center">
            <Link href="/" aria-label="Go to home" className="inline-flex items-center">
              <Image
                src="/aura-white.png"
                alt="Auto Aura"
                width={240}
                height={60}
                priority
                className="h-16 w-auto md:h-20"
              />
            </Link>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
