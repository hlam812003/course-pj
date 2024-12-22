"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button, Chip, Divider } from "@nextui-org/react";
import { coursesService, type Course, type Review } from "@/services/courses.service";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { cartService } from "@/services/cart.service";
import { lessonsService, type LessonsResponse } from "@/services/lessons.service";
import { getThumbnailUrl } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

type Rating = 1 | 2 | 3 | 4 | 5;
type RatingDistribution = Record<Rating, number>;

function calculateAverageRating(reviews: Review[]): string {
  if (!reviews || reviews.length === 0) return "0.0";
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

function getRatingDistribution(reviews: Review[]): RatingDistribution {
  const distribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!reviews || reviews.length === 0) return distribution;
  
  reviews.forEach(review => {
    distribution[review.rating]++;
  });
  
  return distribution;
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [lessons, setLessons] = useState<LessonsResponse | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [courseData, reviewsData, lessonsData] = await Promise.all([
          coursesService.getCourseById(params.id),
          coursesService.getCourseReviews(params.id),
          lessonsService.getLessonsByCourseId(params.id)
        ]);
        setCourse(courseData);
        setReviews(reviewsData);
        setLessons(lessonsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch course');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add courses to cart');
      router.push('/login');
      return;
    }

    try {
      setIsAddingToCart(true);
      await cartService.addToCart(course?._id || '');
      window.dispatchEvent(new Event('cart-updated'));
      toast.success('Course added to cart successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add course to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const calculateTotalDuration = (lessons: LessonsResponse) => {
    let totalMinutes = 0;
    lessons.lessons.forEach(lesson => {
      const [minutes, seconds] = lesson.length.split(':').map(Number);
      totalMinutes += minutes + (seconds / 60);
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  const handleEnrollAndCheckout = async () => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      router.push('/login');
      return;
    }

    try {
      setIsEnrolling(true);
      await cartService.addToCart(course?._id || '');
      router.push('/checkout');
      toast.success('Course added to cart. Proceeding to checkout...');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to proceed to checkout');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-32">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 pt-32">
        <Icon icon="ph:warning" className="text-6xl text-red-500" />
        <h1 className="text-2xl font-semibold text-gray-800">Failed to load course</h1>
        <p className="text-gray-600">{error}</p>
        <Link href="/courses">
          <Button className="bg-black text-white font-semibold">
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const averageRating = calculateAverageRating(reviews);
  const ratingDistribution = getRatingDistribution(reviews);

  return (
    <main className="min-h-screen w-full pt-44 pb-16">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={getThumbnailUrl(course.thumbnail)}
                alt={course.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-6">{course.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-xl text-gray-600">
                  <div className="flex items-center gap-2">
                    <Icon icon="ph:book-open" className="text-2xl" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <Chip variant="flat" className="bg-gray-100 text-lg">
                    {course.level}
                  </Chip>
                  <div className="flex items-center gap-2">
                    <Icon icon="ph:clock" className="text-2xl" />
                    <span>Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Divider />

              <div>
                <h2 className="text-3xl font-semibold mb-6">Course Description</h2>
                <div className="prose prose-xl max-w-none">
                  {course.description.split('\n').map((paragraph, index) => (
                    paragraph && (
                      <p key={index} className="text-gray-600 text-xl leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>

              <Divider />

              <div>
                <h2 className="text-3xl font-semibold mb-6">Course Content</h2>
                <Card className="bg-gray-50/50">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Icon icon="ph:book-open" className="text-3xl text-gray-600" />
                        <span className="text-2xl font-medium">{course.lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon icon="ph:clock" className="text-2xl" />
                        <span className="text-xl">{lessons ? calculateTotalDuration(lessons) : '0h 0m'} total length</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {course.lessons.map((lesson, index) => (
                        <div 
                          key={lesson} 
                          className="group relative bg-white rounded-lg p-5 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-200"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-semibold text-xl">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-medium">Lesson {index + 1}</span>
                                <Icon 
                                  icon="ph:lock-simple" 
                                  className="text-2xl text-gray-400"
                                />
                              </div>
                              <p className="text-base text-gray-500 mt-1">
                                Unlock this lesson by enrolling
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg text-gray-500">{lessons?.lessons[index].length}</span>
                            <Button
                              isIconOnly
                              radius="full"
                              variant="light"
                              className="text-gray-400 group-hover:bg-gray-100 w-12 h-12"
                              isDisabled
                            >
                              <Icon icon="ph:lock-simple" className="text-2xl" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>

              <Divider className="my-12" />

              <div>
                <h2 className="text-3xl font-semibold mb-8">Student Reviews</h2>
                
                <div className="bg-gray-50/50 rounded-2xl p-8 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-6xl font-bold mb-2">{averageRating}</div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon 
                            key={star}
                            icon={star <= Number(averageRating) ? "ph:star-fill" : "ph:star"}
                            className="text-2xl text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-gray-600">Course Rating</div>
                    </div>

                    <div className="space-y-2">
                      {([5, 4, 3, 2, 1] as Rating[]).map((rating) => (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-1 w-20">
                            <span>{rating}</span>
                            <Icon icon="ph:star-fill" className="text-yellow-400" />
                          </div>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ 
                                width: `${reviews.length ? (ratingDistribution[rating] / reviews.length * 100) : 0}%` 
                              }}
                            />
                          </div>
                          <div className="w-16 text-right text-gray-600">
                            {ratingDistribution[rating]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review._id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <Icon icon="ph:user" className="text-2xl text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{review.user.username}</h4>
                              <span className="text-gray-500 text-sm">
                                {formatDate(review.createdAt)}
                              </span>
                              <Chip 
                                size="sm" 
                                variant="flat" 
                                className={review.user.role === 'instructor' ? 'bg-blue-100' : 'bg-gray-100'}
                              >
                                {review.user.role}
                              </Chip>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Icon 
                                  key={star}
                                  icon={star <= review.rating ? "ph:star-fill" : "ph:star"}
                                  className="text-yellow-400"
                                />
                              ))}
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No reviews yet. Be the first to review this course!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader className="flex flex-col gap-3 py-6 px-6 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-gray-600">Course Fee</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">$40</span>
                    <Chip color="danger" variant="flat" size="sm">50% OFF</Chip>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${course.price}</span>
                  <span className="text-gray-500">/course</span>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6 py-6 px-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon icon="ph:book-open" className="text-2xl text-gray-600" />
                    <span className="text-lg">{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="ph:certificate" className="text-2xl text-gray-600" />
                    <span className="text-lg">Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="ph:infinity" className="text-2xl text-gray-600" />
                    <span className="text-lg">Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="ph:device-mobile" className="text-2xl text-gray-600" />
                    <span className="text-lg">Access on mobile and desktop</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-white text-black font-semibold h-14 text-xl border-2 border-black hover:bg-gray-100"
                    onPress={handleAddToCart}
                    isLoading={isAddingToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    className="w-full h-16 bg-black text-white font-semibold text-xl hover:opacity-90 transition-opacity"
                    isLoading={isEnrolling}
                    onPress={handleEnrollAndCheckout}
                  >
                    {isEnrolling ? 'Processing...' : 'Enroll Now'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 