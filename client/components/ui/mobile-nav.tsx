"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function mobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-expanded={isOpen}
        >
          <span className="sr-only">افتح القائمة الرئيسية</span>
          {isOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden ${
            
          isOpen ? "block" : "hidden"
        } absolute top-[115%] left-0 right-0 w-full bg-gray-100 backdrop-blur-sm  border-b border-l border-r border-gray-500 `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-2xl  font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            الرئيسية
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-2xl  font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            من نحن
          </Link>
        </div>
      </div>
    </div>
  );
}
