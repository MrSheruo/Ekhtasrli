import type { Metadata } from "next";
import { Harmattan } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
const harmattan = Harmattan({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "إختصرلي | روابطك كلها في مكان واحد",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${harmattan.className} antialiased bg-gray-100 px-4`}>
        <Navbar />
        <main className="flex flex-col gap-32 my-32">{children}</main>
      </body>
    </html>
  );
}
