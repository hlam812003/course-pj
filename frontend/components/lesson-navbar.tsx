"use client";

import Link from "next/link";
import { Button, Progress } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function LessonNavbar({ 
  courseTitle,
  onToggleSidebar,
  isSidebarOpen,
  progress = 0,
  currentLesson = 1,
  totalLessons = 0,
  lessonLength = "0:00"
}: { 
  courseTitle: string;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  progress?: number;
  currentLesson?: number;
  totalLessons?: number;
  lessonLength?: string;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-8 flex-1 min-w-0">
          <Link href="/" className="text-xl font-bold flex-shrink-0">
            T-Education.
          </Link>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium truncate">
              {courseTitle}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Lesson {currentLesson} of {totalLessons}</span>
              <span>•</span>
              <span>{lessonLength}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onPress={onToggleSidebar}
            className="flex-shrink-0"
            aria-label="Toggle course content"
          >
            <Icon 
              icon={isSidebarOpen ? "ph:sidebar" : "ph:sidebar-simple"} 
              className="text-2xl" 
            />
          </Button>
        </div>
      </div>

      <Progress 
        value={progress}
        size="sm"
        radius="none"
        classNames={{
          indicator: "bg-black",
          track: "bg-gray-100"
        }}
      />
    </div>
  );
}
