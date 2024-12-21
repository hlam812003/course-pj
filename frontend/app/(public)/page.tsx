import { Button, Card, CardBody, CardFooter, CardHeader, Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React and Node.js with practical projects",
    price: 99,
    category: "Programming",
    image: "/course-1.jpg",
    rating: 4.9,
    students: 15000,
    icon: "logos:react"
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description: "Learn Python, Data Analysis, Machine Learning and AI fundamentals",
    price: 129,
    category: "Data Science",
    image: "/course-2.jpg",
    rating: 4.8,
    students: 12000,
    icon: "logos:python"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Create beautiful user interfaces and enhance user experience",
    price: 89,
    category: "Design",
    image: "/course-3.jpg",
    rating: 4.7,
    students: 8000,
    icon: "solar:figma-linear"
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile apps for iOS and Android",
    price: 109,
    category: "Mobile Dev",
    image: "/course-4.jpg",
    rating: 4.9,
    students: 10000,
    icon: "logos:flutter"
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    description: "Master cloud services and become an AWS certified developer",
    price: 149,
    category: "Cloud",
    image: "/course-5.jpg",
    rating: 4.8,
    students: 7000,
    icon: "logos:aws"
  },
  {
    id: 6,
    title: "Digital Marketing Mastery",
    description: "Learn SEO, Social Media Marketing, and Growth Strategies",
    price: 79,
    category: "Marketing",
    image: "/course-6.jpg",
    rating: 4.7,
    students: 9000,
    icon: "ph:trend-up-bold"
  }
];

const stats = [
  { icon: "ph:graduation-cap", value: "50K+", label: "Students" },
  { icon: "ph:users", value: "300+", label: "Expert Instructors" },
  { icon: "ph:book", value: "1000+", label: "Courses" },
  { icon: "ph:certificate", value: "99%", label: "Success Rate" }
];

const features = [
  {
    icon: "ph:graduation-cap",
    title: "Expert Instructors",
    description: "Learn from industry experts who have hands-on experience in their respective fields"
  },
  {
    icon: "ph:book",
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to all course materials and resources"
  },
  {
    icon: "ph:certificate",
    title: "Certificates",
    description: "Earn industry-recognized certificates upon successful completion of courses"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="px-36 py-28 flex items-center justify-between bg-gradient-to-br from-[#47474710] to-[#47474717]">
        <div className="max-w-2xl animate-fade-in">
          <Chip 
            variant="flat"
            startContent={<Icon icon="ph:star" className="mr-2 text-lg" />}
            radius="sm" 
            className="mb-8 px-6 bg-white/80 backdrop-blur-sm h-12 text-[1.2rem] shadow-sm"
          >
            Trusted by 50,000+ students worldwide
          </Chip>
          <h1 className="text-[4rem] font-bold mb-8 text-black leading-[1.2] animate-slide-up">
            Unlock Your Potential with Online Learning
          </h1>
          <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
            Discover thousands of courses from top instructors around the world. 
            Learn at your own pace and achieve your goals.
          </p>
          <div className="flex gap-6">
            <Button 
              size="lg" 
              className="bg-black text-white font-semibold text-lg h-14 px-10 hover:scale-105 transition-transform"
            >
              Get Started
              <Icon icon="ph:arrow-right" className="ml-2 text-xl" />
            </Button>
            <Link href="/courses">
              <Button 
                size="lg" 
                variant="bordered" 
                className="border-2 border-black text-black font-semibold text-lg h-14 px-10 hover:bg-black hover:text-white transition-colors"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative w-[60rem] h-[40rem] animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-lg"></div>
          <Image
            src="https://th.bing.com/th/id/OIP.6L8B8BQJmsDFeUINc0TOJQHaE8?rs=1&pid=ImgDetMain"
            alt="Students learning online"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg shadow-2xl"
          />
        </div>
      </section>

      <section className="px-36 py-24 bg-white">
        <div className="grid grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-10 rounded-2xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-gray-50 p-6 rounded-2xl group-hover:bg-white transition-colors mb-8">
                <Icon icon={stat.icon} className="text-6xl text-black group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-4xl font-bold mb-4 text-black group-hover:scale-105 transition-transform">
                {stat.value}
              </h3>
              <p className="text-xl text-gray-600 group-hover:text-black transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-36 py-28 bg-gray-50">
        <div className="text-center mb-20">
          <Chip 
            variant="flat" 
            className="mb-6 bg-white h-12 px-6 text-[1.2rem] shadow-sm"
          >
            Featured Courses
          </Chip>
          <h2 className="text-5xl font-bold mb-8 text-black">Popular Courses</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Explore our most in-demand courses designed to help you achieve your goals
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {featuredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="p-6 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-72">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Chip
                      variant="flat"
                      startContent={<Icon icon={course.icon} className="mr-2 text-lg" />}
                      className="bg-black/80 backdrop-blur-sm text-white h-12 px-6 text-[1.2rem]"
                    >
                      {course.category}
                    </Chip>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-2 py-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon icon="ph:star-fill" className="text-yellow-400 text-2xl" />
                    <span className="font-semibold text-xl">{course.rating}</span>
                  </div>
                  <span className="text-gray-500 text-lg">
                    ({course.students.toLocaleString()} students)
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black hover:text-gray-700 transition-colors">
                  {course.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </CardBody>
              <CardFooter className="px-2 pt-4 border-t flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-black">${course.price}</p>
                  <p className="text-base text-gray-500">One-time payment</p>
                </div>
                <Button 
                  className="bg-black text-white font-semibold text-lg h-12 px-8 hover:scale-105 transition-transform"
                >
                  Enroll Now
                  <Icon icon="ph:arrow-right" className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link href="/courses">
            <Button 
              size="lg" 
              variant="bordered" 
              className="border-2 border-black text-black font-semibold text-lg h-14 px-10 hover:bg-black hover:text-white transition-colors"
            >
              View All Courses
              <Icon icon="ph:arrow-right" className="ml-2 text-xl" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="px-36 py-28 bg-white">
        <div className="text-center mb-20">
          <Chip 
            variant="flat" 
            className="mb-6 bg-gray-50 h-12 px-6 text-[1.2rem] shadow-sm"
          >
            Why Choose Us
          </Chip>
          <h2 className="text-5xl font-bold mb-8 text-black">Benefits of T-Education</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Experience the best online learning platform designed for your success
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <CardBody>
                <div className="bg-gray-50 w-24 h-24 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black transition-colors">
                  <Icon 
                    icon={feature.icon} 
                    className="text-6xl text-black group-hover:text-white transition-colors" 
                  />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-black">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {feature.description}
                </p>
                <Button 
                  variant="light" 
                  className="text-black text-lg p-0 hover:translate-x-2 transition-transform"
                >
                  Learn More
                  <Icon icon="ph:arrow-right" className="ml-2 text-xl" />
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-36 py-28 bg-gradient-to-br from-black to-gray-900 text-white text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <Chip 
            variant="flat" 
            className="mb-8 bg-white/10 backdrop-blur-sm text-white h-12 px-6 text-[1.2rem]"
          >
            Start Learning Today
          </Chip>
          <h2 className="text-6xl font-bold mb-8 leading-tight">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-2xl mb-12 text-gray-300 leading-relaxed">
            Join thousands of students who are already learning and growing with our platform. 
            Start your journey today and transform your future.
          </p>
          <div className="flex gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black font-semibold text-lg h-14 px-10 hover:scale-105 transition-transform"
            >
              Get Started Now
              <Icon icon="ph:arrow-right" className="ml-2 text-xl" />
            </Button>
            <Button 
              size="lg" 
              variant="bordered" 
              className="border-2 border-white text-white font-semibold text-lg h-14 px-10 hover:bg-white hover:text-black transition-colors"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}