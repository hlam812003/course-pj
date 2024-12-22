"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10" />
        <Image
          src="/images/about-hero.jpg"
          alt="About Us Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-7xl font-bold mb-8 leading-tight animate-fade-in">
            Transforming Lives Through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">
              Tech Education
            </span>
          </h1>
          <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to democratize technology education and empower the next generation of innovators.
          </p>
          <Button 
            as={Link}
            href="/courses"
            className="bg-white text-black font-semibold text-xl h-16 px-12 hover:scale-105 transition-transform shadow-xl"
            radius="full"
          >
            Start Learning Today
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border-r border-gray-200">
              <h3 className="text-5xl font-bold mb-4 bg-gradient-to-b from-black to-gray-800 text-transparent bg-clip-text">50K+</h3>
              <p className="text-xl text-gray-600">Active Students</p>
            </div>
            <div className="text-center p-8 border-r border-gray-200">
              <h3 className="text-5xl font-bold mb-4 bg-gradient-to-b from-black to-gray-800 text-transparent bg-clip-text">100+</h3>
              <p className="text-xl text-gray-600">Expert Instructors</p>
            </div>
            <div className="text-center p-8">
              <h3 className="text-5xl font-bold mb-4 bg-gradient-to-b from-black to-gray-800 text-transparent bg-clip-text">95%</h3>
              <p className="text-xl text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full filter blur-3xl opacity-50" />
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-story.jpg"
                  alt="Our Story"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full filter blur-3xl opacity-50" />
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gray-100 rounded-full filter blur-xl opacity-60" />
              <h2 className="text-5xl font-bold mb-8 leading-tight">Our Journey to <br/>Transform Education</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2023, T-Education was born from a vision to revolutionize tech education. 
                  We believe that quality education should be accessible to everyone, regardless of their 
                  background or location.
                </p>
                <p>
                  What began as a passion project has evolved into a global learning platform, 
                  connecting ambitious learners with industry experts. Our comprehensive curriculum 
                  covers everything from foundational programming to cutting-edge technologies.
                </p>
                <p>
                  Today, we&apos;re proud to have helped thousands of students launch successful careers 
                  in tech. But this is just the beginning of our journey to democratize education 
                  and empower the next generation of tech leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-50 rounded-full filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full filter blur-3xl opacity-60 translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Why Choose T-Education?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with expert instruction to deliver 
              an unmatched learning experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 transform -rotate-6">
                <Icon icon="ph:user-circle" className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn directly from industry veterans with years of real-world experience. 
                Our instructors are passionate about sharing their knowledge and helping 
                you succeed.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 transform rotate-6">
                <Icon icon="ph:code" className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Practical Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Theory meets practice with our hands-on approach. Work on real projects, 
                build your portfolio, and gain the skills employers are looking for.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-8 transform -rotate-6">
                <Icon icon="ph:clock" className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn at your own pace with lifetime access to all course materials. 
                Our platform adapts to your schedule, making learning convenient and 
                accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do and shape the experience we provide to our students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="group">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <Icon icon="ph:star" className="text-5xl text-black" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Excellence</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                We pursue excellence in every aspect of our platform, from course 
                content to student support and learning outcomes.
              </p>
            </div>

            <div className="group">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <Icon icon="ph:lightbulb" className="text-5xl text-black" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Innovation</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                We constantly innovate our teaching methods and embrace new technologies 
                to provide cutting-edge education.
              </p>
            </div>

            <div className="group">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <Icon icon="ph:users-three" className="text-5xl text-black" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Community</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                We build and nurture a supportive community where students can learn, 
                collaborate, and grow together.
              </p>
            </div>

            <div className="group">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                  <Icon icon="ph:hand-heart" className="text-5xl text-black" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Accessibility</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                We make quality education accessible to everyone, breaking down barriers 
                to learning and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gray-50 rounded-full filter blur-3xl opacity-70 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-gray-50 rounded-full filter blur-3xl opacity-70 transform translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-5xl mx-auto text-center px-4 relative">
          <h2 className="text-5xl font-bold mb-8">Ready to Transform Your Future?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of students who are already learning, growing, and building 
            their dream careers with T-Education.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button 
              as={Link}
              href="/courses"
              className="bg-black text-white font-semibold text-xl h-16 px-12 hover:scale-105 transition-transform shadow-xl"
              radius="full"
            >
              Explore Courses
            </Button>
            <Button 
              as={Link}
              href="/contact"
              variant="bordered"
              className="font-semibold text-xl h-16 px-12 border-2 border-black hover:bg-gray-50 transition-colors"
              radius="full"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 