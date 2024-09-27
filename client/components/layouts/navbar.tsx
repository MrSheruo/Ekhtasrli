import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { ProfileDropDown } from "./profileDropDown";
import MobileNav from "../ui/mobile-nav";
export default function navbar() {
  return (
    <header className="fixed top-0 left-4 right-4 max-w-7xl mx-auto my-4 flex justify-between items-center ">
      <h2 className="font-bold text-3xl">إختصرلي</h2>
      <nav className="md:flex hidden gap-8">
        <Link
          className="hover:underline underline-offset-8 hover:text-gray-500"
          href="/"
        >
          الصفحه الرئيسية
        </Link>
        <Link
          className="hover:underline underline-offset-8 hover:text-gray-500"
          href="/about"
        >
          من نحن
        </Link>
        {/* create profile icon if user is logged in */}
      </nav>
      <div className="flex items-center gap-2">
        {cookies().get("l-t-k") ? (
          <ProfileDropDown />
        ) : (
          <Link
            href="/auth"
            className="hover:underline underline-offset-8 hover:text-gray-500"
          >
            تسجيل الدخول
          </Link>
        )}
        <nav className="md:hidden flex items-center gap-2">
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}
