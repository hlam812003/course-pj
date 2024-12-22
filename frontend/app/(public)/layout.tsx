"use client";

import MainNavbar from "@/components/main-navbar";
import MainFooter from "@/components/main-footer";
import { usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isLessonPage = pathname?.includes('/lessons/');

  return (
    <div className="min-h-screen flex flex-col">
      {!isLessonPage && <MainNavbar />}
      
      <main className="flex-1">
        {children}
      </main>

      {!isLessonPage && <MainFooter />}
    </div>
  );
}
