"use client";

import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full blur-3xl opacity-50" />
        
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-2">
              <span className="text-2xl font-bold text-white">T</span>
            </div>
            
            <Spinner 
              size="lg"
              classNames={{
                circle1: "border-b-black",
                circle2: "border-b-black",
              }}
            />
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Loading Content
              </h3>
              <p className="text-sm text-gray-500">
                Please wait a moment...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 