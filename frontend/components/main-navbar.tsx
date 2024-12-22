"use client";

import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
  Card,
  CardBody
} from "@nextui-org/react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth.context";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { cartService, type Cart } from "@/services/cart.service";
import Image from "next/image";
import { toast } from "sonner";
import { getThumbnailUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { enrollmentService, type EnrolledCourse } from "@/services/enrollment.service";

export default function MainNavbar() {
  const { user, logout, isLoading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [isEnrollmentsLoading, setIsEnrollmentsLoading] = useState(false);
  const [isEnrollmentsOpen, setIsEnrollmentsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (isDropdownOpen) {
          setIsVisible(true);
          return;
        }

        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY, isDropdownOpen]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    if (isCartOpen && user) {
      fetchCart();
    }
  }, [isCartOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (isEnrollmentsOpen && user) {
      fetchEnrollments();
    }
  }, [isEnrollmentsOpen, user]);

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    try {
      setIsLoadingCart(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoadingCart(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      setIsEnrollmentsLoading(true);
      const data = await enrollmentService.getUserEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setIsEnrollmentsLoading(false);
    }
  };

  const handleRemoveFromCart = async (courseId: string) => {
    if (!user) {
      toast.error('Please login to manage cart');
      router.push('/login');
      return;
    }

    try {
      await cartService.removeFromCart(courseId);
      await fetchCart();
      toast.success('Course removed from cart');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove course from cart');
    }
  };

  const handleClearCart = async () => {
    if (!user) {
      toast.error('Please login to manage cart');
      router.push('/login');
      return;
    }

    try {
      await cartService.clearCart();
      await fetchCart();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to clear cart');
    }
  };

  const getCategoryDisplay = (category: string | { name: string }) => {
    if (typeof category === 'string') return category;
    return category?.name || 'Uncategorized';
  };

  return (
    <Navbar 
      className={`w-full py-8 px-4 md:px-24 lg:px-36 flex items-center justify-between bg-white/80 backdrop-blur-md fixed transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      maxWidth="full"
      isBordered
      isBlurred
    >
      <div className="flex items-center gap-[8rem]">
        <NavbarBrand>
          <Link href="/" className="text-[2.25rem] font-bold">T-Education.</Link>
        </NavbarBrand>
        <NavbarContent className="flex items-center gap-14" justify="center">
          <NavbarItem>
            <Link 
              href="/"
              className="text-[1.25rem] font-medium text-gray-600 hover:text-black transition-colors" 
              aria-current="page"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/about"
              className="text-[1.25rem] font-medium text-gray-600 hover:text-black transition-colors" 
            >
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/prices"
              className="text-[1.25rem] font-medium text-gray-600 hover:text-black transition-colors" 
            >
              Prices
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/contact"
              className="text-[1.25rem] font-medium text-gray-600 hover:text-black transition-colors" 
            >
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
      <NavbarContent className="flex gap-8" justify="end">
        {isLoading ? (
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
        ) : user ? (
          <>
            <div className="flex items-center">
              <Dropdown 
                placement="bottom-end" 
                isOpen={isCartOpen}
                onOpenChange={(open) => setIsCartOpen(open)}
              >
                <DropdownTrigger>
                  <Button 
                    isIconOnly
                    variant="light"
                  >
                    <Icon icon="ph:shopping-cart-simple-bold" className="text-2xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Shopping Cart"
                  className="w-[350px]"
                  disabledKeys={["total"]}
                  itemClasses={{
                    base: [
                      "rounded-none",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-default-100",
                      "dark:data-[hover=true]:bg-default-50",
                      "data-[selectable=true]:focus:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  }}
                >
                  <DropdownSection>
                    <DropdownItem
                      key="header" 
                      className="p-4 hover:bg-transparent cursor-default border-b border-divider" 
                      isReadOnly 
                      textValue="Shopping Cart"
                    >
                      <span className="text-2xl font-semibold">Shopping Cart</span>
                      {cart && cart.courses.length > 0 && (
                        <span className="text-sm text-gray-500 ml-2">
                          {cart.courses.length} {cart.courses.length === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </DropdownItem>
                    {isLoadingCart ? (
                      <DropdownItem key="loading" className="h-[200px] flex items-center justify-center" isReadOnly>
                        <div className="flex items-center justify-center w-full">
                          <span className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                      </DropdownItem>
                    ) : cart && cart.courses.length > 0 ? (
                      <>
                        {cart.courses.map((item) => (
                          <DropdownItem
                            key={item._id}
                            className="py-4 px-4"
                            textValue={item.course.title}
                          >
                            <Card className="shadow-none bg-transparent">
                              <CardBody className="p-0">
                                <div className="flex gap-4">
                                  <div className="relative aspect-video w-[120px] rounded-lg overflow-hidden">
                                    <Image
                                      src={getThumbnailUrl(item.course.thumbnail)}
                                      alt={item.course.title}
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-base line-clamp-2">
                                      {item.course.title}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {getCategoryDisplay(item.course.category)} • {item.course.level || 'All Levels'}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="font-semibold text-base">${item.course.price}</span>
                                      <Button
                                        variant="light"
                                        className="text-danger"
                                        onPress={() => handleRemoveFromCart(item.course._id)}
                                      >
                                        <Icon icon="ph:trash" className="text-xl" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </DropdownItem>
                        ))}
                        <DropdownItem 
                          key="total" 
                          className="py-6 px-4 bg-gray-50" 
                          isReadOnly
                        >
                          <Card className="shadow-none bg-transparent rounded-none">
                            <CardBody className="p-0 space-y-3">
                              <div className="flex items-center justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>${cart.totalAmount}</span>
                              </div>
                              <div className="flex items-center justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${cart.totalAmount}</span>
                              </div>
                            </CardBody>
                          </Card>
                        </DropdownItem>
                        <DropdownItem 
                          key="clear" 
                          className="p-4 border-t border-divider" 
                          isReadOnly
                        >
                          <Button 
                            className="w-full bg-white text-black font-semibold text-lg h-12 border-2 border-black hover:bg-gray-100 transition-colors -mb-4"
                            onPress={handleClearCart}
                          >
                            Clear Cart
                          </Button>
                        </DropdownItem>
                        <DropdownItem 
                          key="checkout" 
                          className="p-4" 
                          isReadOnly
                        >
                          <Button 
                            className="w-full bg-black text-white font-semibold text-lg h-12 hover:opacity-90 transition-opacity"
                            size="lg"
                            as={Link}
                            href="/checkout"
                          >
                            Proceed to Checkout
                          </Button>
                        </DropdownItem>
                      </>
                    ) : (
                      <DropdownItem 
                        key="empty"
                        className="py-12"
                        isReadOnly
                      >
                        <Card className="shadow-none bg-transparent">
                          <CardBody className="flex flex-col items-center justify-center gap-4">
                            <span className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                              <Icon icon="ph:shopping-cart" className="text-4xl text-gray-400" />
                            </span>
                            <div className="text-center">
                              <p className="text-xl font-medium text-gray-900">Your cart is empty</p>
                              <p className="text-sm text-gray-500 mt-1">Start adding courses to your cart</p>
                            </div>
                            <Button
                              as={Link}
                              href="/courses"
                              variant="light"
                              className="text-base font-medium text-black hover:bg-gray-100 transition-colors"
                              onPress={() => setIsCartOpen(false)}
                            >
                              Browse Courses
                            </Button>
                          </CardBody>
                        </Card>
                      </DropdownItem>
                    )}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
              {cart && cart.courses.length > 0 && (
                <div className="-ml-[2.8rem] mt-[1.8rem] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                  {cart.courses.length}
                </div>
              )}
            </div>

            <Dropdown 
              placement="bottom-end" 
              isOpen={isEnrollmentsOpen}
              onOpenChange={(open) => setIsEnrollmentsOpen(open)}
            >
              <DropdownTrigger>
                <Button 
                  isIconOnly
                  variant="light"
                  className="mr-2"
                >
                  <Icon icon="ph:book-open" className="text-2xl" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="My Learning"
                className="w-[400px]"
                itemClasses={{
                  base: [
                    "rounded-none",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection>
                  <DropdownItem
                    key="header" 
                    className="p-4 hover:bg-transparent cursor-default border-b border-divider" 
                    isReadOnly 
                  >
                    <span className="text-2xl font-semibold">My Learning</span>
                  </DropdownItem>
                  
                  {isEnrollmentsLoading ? (
                    <DropdownItem key="loading" className="h-[200px] flex items-center justify-center" isReadOnly>
                      <div className="flex items-center justify-center w-full">
                        <span className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      </div>
                    </DropdownItem>
                  ) : enrollments.length > 0 ? (
                    <>
                      {enrollments.map((enrollment) => (
                        <DropdownItem
                          key={enrollment._id}
                          className="py-4 px-4"
                          as={Link}
                          href={`/courses/${enrollment.course._id}`}
                        >
                          <Card className="shadow-none bg-transparent">
                            <CardBody className="p-0">
                              <div className="flex gap-4">
                                <div className="relative aspect-video w-[120px] rounded-lg overflow-hidden">
                                  <Image
                                    src={getThumbnailUrl(enrollment.course.thumbnail)}
                                    alt={enrollment.course.title}
                                    fill
                                    sizes="120px"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-base line-clamp-2">
                                    {enrollment.course.title}
                                  </p>
                                  <div className="mt-2">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-black rounded-full"
                                        style={{ width: `${Math.random() * 100}%` }}
                                      />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {Math.floor(Math.random() * 100)}% complete
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </DropdownItem>
                      ))}
                      <DropdownItem
                        key="all-courses"
                        className="p-4 border-t border-divider"
                        as={Link}
                        href="/dashboard/courses"
                      >
                        <Button 
                          className="w-full bg-black text-white font-semibold"
                          size="lg"
                        >
                          Go to My Learning
                        </Button>
                      </DropdownItem>
                    </>
                  ) : (
                    <DropdownItem key="empty" className="py-12" isReadOnly>
                      <div className="text-center">
                        <Icon icon="ph:book-open" className="text-4xl text-gray-400 mb-4" />
                        <p className="text-xl font-medium text-gray-900">No courses yet</p>
                        <p className="text-sm text-gray-500 mt-1">Start learning today!</p>
                        <Button
                          as={Link}
                          href="/courses"
                          variant="light"
                          className="mt-4 text-base font-medium"
                          onPress={() => setIsEnrollmentsOpen(false)}
                        >
                          Browse Courses
                        </Button>
                      </div>
                    </DropdownItem>
                  )}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <Dropdown 
              placement="bottom-end"
              classNames={{
                base: "min-w-[220px] p-0",
                content: "p-0 border-small bg-background",
              }}
              onOpenChange={(open) => {
                setIsDropdownOpen(open);
                if (open) setIsVisible(true);
              }}
            >
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform w-12 h-12 text-large"
                  size="lg"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                  isBordered
                  showFallback
                  name={user.username.charAt(0).toUpperCase()}
                />
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Profile Actions" 
                variant="flat"
                className="p-3"
              >
                <DropdownItem 
                  key="profile" 
                  className="h-20 gap-2"
                  textValue="profile"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-gray-600">Signed in as</p>
                    <p className="text-base font-semibold text-black">{user.email}</p>
                  </div>
                </DropdownItem>
                <DropdownItem 
                  key="settings" 
                  className="py-4"
                  startContent={<Icon icon="ph:user" className="text-xl" />}
                  textValue="my profile"
                >
                  <Link href="/profile" className="text-base font-medium">
                    My Profile
                  </Link>
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger"
                  onPress={logout}
                  className="py-4 text-danger"
                  startContent={<Icon icon="ph:sign-out" className="text-xl" />}
                  textValue="logout"
                >
                  <span className="text-base font-medium">Log Out</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">
                <Button 
                  variant="light"
                  className="font-semibold text-lg h-14 px-8 hover:bg-gray-100 transition-colors"
                >
                  Login
                </Button>
              </Link>
        </NavbarItem>
        <NavbarItem>
              <Link href="/signup">
                <Button 
                  className="bg-black text-white font-semibold text-lg h-14 px-8 hover:scale-105 transition-transform"
                >
            Sign Up
          </Button>
              </Link>
        </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}