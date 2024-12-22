"use client";

import { useEffect, useState } from "react";
import { Button, Card, Progress } from "@nextui-org/react";
import { lessonsService, type Lesson } from "@/services/lessons.service";
import { enrollmentService } from "@/services/enrollment.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import Link from "next/link";
import LessonNavbar from "@/components/lesson-navbar";

export default function LessonPage({ 
  params 
}: { 
  params: { courseId: string; lessonId: string } 
}) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        toast.error('Please login to access this lesson');
        router.push('/login');
        return;
      }

      try {
        const isEnrolled = await enrollmentService.checkEnrollmentStatus(params.courseId);
        if (!isEnrolled) {
          toast.error('Please enroll in this course to access the lessons');
          router.push(`/courses/${params.courseId}`);
          return;
        }

        const lessonsData = await lessonsService.getLessonsByCourseId(params.courseId);
        setAllLessons(lessonsData.lessons);
        
        const currentLesson = lessonsData.lessons.find(l => l._id === params.lessonId);
        if (!currentLesson) {
          toast.error('Lesson not found');
          router.push(`/courses/${params.courseId}`);
          return;
        }

        setLesson(currentLesson);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load lesson');
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [params.courseId, params.lessonId, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-black border-r-black border-gray-200 rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading lesson...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon icon="ph:warning-circle" className="text-6xl text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Lesson</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex(l => l._id === params.lessonId);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const videoId = lesson.content.split('v=')[1];
  const progress = ((currentIndex + 1) / allLessons.length) * 100;

  return (
    <>
      <LessonNavbar 
        courseTitle={lesson.course.title}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <main className="min-h-screen flex pt-14 bg-gray-50">
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-[400px]' : ''}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6">
              <Card className="mb-8">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon icon="ph:play-circle" className="text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{lesson.title}</h2>
                        <p className="text-gray-500 mt-1">{lesson.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {previousLesson && (
                        <Button
                          as={Link}
                          href={`/courses/${params.courseId}/lessons/${previousLesson._id}`}
                          variant="bordered"
                          className="font-medium"
                          startContent={<Icon icon="ph:caret-left" className="text-xl" />}
                        >
                          Previous
                        </Button>
                      )}
                      {nextLesson && (
                        <Button
                          as={Link}
                          href={`/courses/${params.courseId}/lessons/${nextLesson._id}`}
                          className="bg-black text-white font-medium"
                          endContent={<Icon icon="ph:caret-right" className="text-xl" />}
                        >
                          Next Lesson
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">About this lesson</h3>
                    <div className="text-gray-600 whitespace-pre-line">
                      {lesson.course.description}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-[400px] bg-white border-l transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold mb-2">Course Content</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icon icon="ph:book-open" className="text-lg" />
                  <span>{allLessons.length} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="ph:clock" className="text-lg" />
                  <span>
                    {allLessons.reduce((total, lesson) => {
                      const [minutes] = lesson.length.split(':');
                      return total + parseInt(minutes);
                    }, 0)} min
                  </span>
                </div>
              </div>
              <Progress 
                value={progress} 
                className="mt-4"
                classNames={{
                  indicator: "bg-black"
                }}
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {allLessons.map((l, index) => (
                <Link 
                  key={l._id}
                  href={`/courses/${params.courseId}/lessons/${l._id}`}
                >
                  <div className={`group p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors ${l._id === lesson._id ? 'bg-gray-50' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${l._id === lesson._id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium mb-1 truncate ${l._id === lesson._id ? 'text-black' : 'text-gray-700'}`}>
                          {l.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Icon icon="ph:play-circle" className="text-lg" />
                            <span>{l.length}</span>
                          </div>
                          {l._id === lesson._id && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <Icon icon="ph:play" className="text-lg" />
                              <span>Currently watching</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}