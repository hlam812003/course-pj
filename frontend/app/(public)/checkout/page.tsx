"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, Input, Divider } from "@nextui-org/react";
import { cartService, type Cart } from "@/services/cart.service";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { getThumbnailUrl } from "@/lib/utils";
import { enrollmentService } from "@/services/enrollment.service";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access checkout');
      router.push('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const cartData = await cartService.getCart();
        setCart(cartData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch cart');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [user, router]);

  const handleEnrollCourses = async () => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      router.push('/login');
      return;
    }

    try {
      setIsEnrolling(true);
      await Promise.all(
        cart?.courses.map(item => 
          enrollmentService.enrollCourse(item.course._id)
        ) || []
      );
      
      await cartService.clearCart();
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
      
      toast.success('Successfully enrolled in all courses');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to enroll in courses');
    } finally {
      setIsEnrolling(false);
    }
  };

  const getCategoryDisplay = (category: string | { name: string }) => {
    if (typeof category === 'string') return category;
    return category?.name || 'Uncategorized';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-32">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 pt-32">
        <Icon icon="ph:warning" className="text-6xl text-red-500" />
        <h1 className="text-2xl font-semibold text-gray-800">Failed to load cart</h1>
        <p className="text-gray-600">{error}</p>
        <Link href="/courses">
          <Button className="bg-black text-white font-semibold">
            Browse Courses
          </Button>
        </Link>
      </div>
    );
  }

  if (!cart || cart.courses.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 pt-32">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon icon="ph:shopping-cart" className="text-5xl text-gray-400" />
        </div>
        <h1 className="text-4xl font-semibold text-gray-800">Your cart is empty</h1>
        <p className="text-2xl text-gray-600 max-w-md text-center">
          Looks like you haven&apos;t added any courses yet. Browse our courses and start learning today!
        </p>
        <Button 
          as={Link}
          href="/courses"
          className="bg-black text-white font-semibold text-xl h-16 px-12"
        >
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full pt-44 pb-16">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <h1 className="text-5xl font-bold">Checkout</h1>
                <p className="text-2xl text-gray-600">
                  {cart.courses.length} {cart.courses.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <Button
                variant="light"
                className="text-danger h-12 px-6 hover:bg-danger/10"
                startContent={<Icon icon="ph:trash" className="text-2xl" />}
                onPress={async () => {
                  try {
                    await cartService.clearCart();
                    const updatedCart = await cartService.getCart();
                    setCart(updatedCart);
                    toast.success('Cart cleared successfully');
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Failed to clear cart');
                  }
                }}
              >
                Clear Cart
              </Button>
            </div>

            <div className="space-y-8">
              {cart.courses.map((item) => (
                <Card key={item._id} className="bg-gray-50/50 hover:bg-white transition-colors">
                  <CardBody className="p-8">
                    <div className="flex gap-8">
                      <div className="relative aspect-video w-[240px] rounded-xl overflow-hidden">
                        <Image
                          src={getThumbnailUrl(item.course.thumbnail)}
                          alt={item.course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div>
                          <h3 className="text-2xl font-semibold mb-3">{item.course.title}</h3>
                          <p className="text-xl text-gray-600">
                            {getCategoryDisplay(item.course.category)} • {item.course.level || 'All Levels'}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-6">
                          <span className="text-3xl font-bold">${item.course.price}</span>
                          <Button
                            variant="light"
                            className="text-danger h-12 px-6 hover:bg-danger/10"
                            startContent={<Icon icon="ph:trash" className="text-2xl" />}
                            onPress={async () => {
                              try {
                                await cartService.removeFromCart(item.course._id);
                                const updatedCart = await cartService.getCart();
                                setCart(updatedCart);
                              } catch (error) {
                                console.error('Failed to remove item:', error);
                              }
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[450px]">
            <Card className="sticky top-32">
              <CardBody className="p-8">
                <h2 className="text-3xl font-bold mb-8">Order Summary</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-gray-600">Subtotal</span>
                    <span className="text-xl font-medium">${cart.totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-gray-600">Discount</span>
                    <span className="text-xl font-medium">-$0.00</span>
                  </div>
                </div>

                <Divider className="my-8" />

                <div className="flex justify-between items-center mb-10">
                  <span className="text-2xl font-semibold">Total</span>
                  <span className="text-3xl font-bold">${cart.totalAmount}</span>
                </div>

                <div className="space-y-6">
                  <Input
                    placeholder="Enter coupon code"
                    classNames={{
                      input: "text-lg",
                      inputWrapper: "h-14"
                    }}
                    endContent={
                      <Button 
                        className="bg-black text-white font-medium text-lg h-10 px-6"
                        radius="full"
                      >
                        Apply
                      </Button>
                    }
                  />

                  <Button 
                    className="w-full h-16 bg-black text-white font-semibold text-xl hover:opacity-90 transition-opacity"
                    isLoading={isEnrolling}
                    onPress={handleEnrollCourses}
                  >
                    {isEnrolling ? 'Processing...' : 'Proceed to Payment'}
                  </Button>

                  <p className="text-center text-base text-gray-500">
                    By proceeding, you agree to our{" "}
                    <Link href="/terms" className="text-black hover:underline">
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-black hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 