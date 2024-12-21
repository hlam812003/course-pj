"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative text-center px-4">
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-black/5">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black">Page Not Found</h2>
          </div>
        </div>

        <p className="text-xl text-gray-600 mt-8 mb-12 max-w-lg mx-auto">
          Oops! The page you're looking for seems to have taken a different path. 
          Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            as={Link}
            href="/"
            className="bg-black text-white font-semibold text-lg h-14 px-8 hover:scale-105 transition-transform"
            radius="full"
            startContent={<Icon icon="ph:house" className="text-xl" />}
          >
            Back to Home
          </Button>
          <Button
            as={Link}
            href="/courses"
            variant="bordered"
            className="font-semibold text-lg h-14 px-8 border-2 border-black hover:bg-gray-50 transition-colors"
            radius="full"
            startContent={<Icon icon="ph:books" className="text-xl" />}
          >
            Browse Courses
          </Button>
        </div>

        {/* Additional Links */}
        <div className="mt-16 flex flex-wrap gap-6 justify-center text-gray-600">
          <Link 
            href="/contact" 
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icon icon="ph:envelope" className="text-xl" />
            <span>Contact Support</span>
          </Link>
          <Link 
            href="/about" 
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icon icon="ph:info" className="text-xl" />
            <span>About Us</span>
          </Link>
          <Link 
            href="/faq" 
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <Icon icon="ph:question" className="text-xl" />
            <span>FAQ</span>
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-b from-gray-100 to-transparent rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-gray-100 to-transparent rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-gray-100 to-transparent rounded-full filter blur-3xl opacity-30" />
    </main>
  );
} 