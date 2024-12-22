"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Button, Chip, Pagination, Select, SelectItem } from "@nextui-org/react";
import { coursesService, type Course, type User, type Category } from "@/services/courses.service";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { getThumbnailUrl } from "@/lib/utils";

function isUser(instructor: string | User): instructor is User {
  return typeof instructor === 'object' && 'username' in instructor;
}

function isCategory(category: string | Category): category is Category {
  return typeof category === 'object' && 'name' in category;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const categoriesMap = new Map(
    courses.map(course => {
      if (isCategory(course.category)) {
        return [course.category._id, course.category];
      }
      return [course.category, { _id: course.category, name: 'Unknown' }];
    })
  );

  const categories = Array.from(categoriesMap.values());

  const levels = Array.from(new Set(courses.map(course => course.level)));

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await coursesService.getAllCourses({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          category: selectedCategory || undefined,
          level: selectedLevel || undefined
        });
        setCourses(data.courses);
        setTotalPages(data.totalPages);
        setTotalCourses(data.totalCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage, selectedCategory, selectedLevel]);

  const handleSelectionChange = (key: React.Key, type: 'category' | 'level') => {
    if (type === 'category') {
      setSelectedCategory(key === 'all' ? '' : key.toString());
    } else {
      setSelectedLevel(key === 'all' ? '' : key.toString());
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCategories = () => {
    return [
      <SelectItem key="all" textValue="All Categories" className="text-lg">
        All Categories
      </SelectItem>,
      ...categories.map((category) => (
        <SelectItem key={category._id} textValue={category.name} className="text-lg">
          {category.name}
        </SelectItem>
      ))
    ];
  };

  const renderLevels = () => {
    return [
      <SelectItem key="all" textValue="All Levels" className="text-lg">
        All Levels
      </SelectItem>,
      ...levels.map((level) => (
        <SelectItem key={level} textValue={level} className="text-lg">
          {level}
        </SelectItem>
      ))
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
        <Icon icon="ph:warning" className="text-6xl text-red-500" />
        <h1 className="text-2xl font-semibold text-gray-800">Failed to load courses</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full pt-44 pb-16 px-4 md:px-24 lg:px-36">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-bold">All Courses</h1>
              <p className="text-xl text-gray-600 mt-4">
                Showing {courses.length} of {totalCourses} courses
                {(selectedCategory || selectedLevel) && (
                  <span className="ml-2 text-gray-500">
                    (Filtered by: {[
                      selectedCategory && `Category: ${selectedCategory}`,
                      selectedLevel && `Level: ${selectedLevel}`
                    ].filter(Boolean).join(", ")})
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select
                label="Category"
                placeholder="Select category"
                selectedKeys={selectedCategory ? [selectedCategory] : ['all']}
                className="min-w-[200px]"
                onSelectionChange={(keys) => handleSelectionChange(Array.from(keys)[0], 'category')}
                classNames={{
                  trigger: "h-12 text-lg",
                  value: "text-lg",
                  label: "text-lg",
                  listbox: "text-lg",
                }}
                size="lg"
              >
                {renderCategories()}
              </Select>
              <Select
                label="Level"
                placeholder="Select level"
                selectedKeys={selectedLevel ? [selectedLevel] : ['all']}
                className="min-w-[200px]"
                onSelectionChange={(keys) => handleSelectionChange(Array.from(keys)[0], 'level')}
                classNames={{
                  trigger: "h-12 text-lg",
                  value: "text-lg",
                  label: "text-lg",
                  listbox: "text-lg",
                }}
                size="lg"
              >
                {renderLevels()}
              </Select>
            </div>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <Icon icon="ph:magnifying-glass" className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No courses found</h2>
            <p className="text-gray-600">
              Try adjusting your filters or search for something else
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link 
                key={course._id}
                href={`/courses/${course._id}`}
                className="block"
              >
                <Card 
                  className="p-4 hover:scale-[1.02] transition-transform"
                >
                  <CardBody className="p-0">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <Image
                        src={getThumbnailUrl(course.thumbnail)}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xl font-semibold line-clamp-2">{course.title}</h3>
                          <p className="text-gray-600">
                            {isUser(course.instructor) ? course.instructor.username : 'Instructor'}
                          </p>
                        </div>
                        <Chip 
                          variant="flat" 
                          className="bg-gray-100"
                        >
                          {course.level}
                        </Chip>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{course.description}</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          <Icon icon="ph:book-open" className="text-xl text-gray-600" />
                          <span className="text-gray-600">{course.lessons.length} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon icon="ph:tag" className="text-xl text-gray-600" />
                          <span className="text-gray-600">
                            {isCategory(course.category) ? course.category.name : 'Category'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-between items-center pt-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="ph:star-fill" className="text-yellow-400 text-xl" />
                      <span className="font-semibold">{course.reviews.length} reviews</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">${course.price}</span>
                      <Button 
                        className="bg-black text-white font-semibold px-6"
                        radius="sm"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              showControls
              classNames={{
                wrapper: "gap-2",
                item: "w-10 h-10 text-lg",
                cursor: "bg-black text-white font-semibold",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}