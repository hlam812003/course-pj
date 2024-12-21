"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const contactMethods = [
  {
    icon: "ph:envelope-simple",
    name: "Email",
    description: "Our friendly team is here to help.",
    contact: "support@t-education.com",
    href: "mailto:support@t-education.com"
  },
  {
    icon: "ph:phone",
    name: "Phone",
    description: "Mon-Fri from 8am to 5pm.",
    contact: "(+84) 123-456-789",
    href: "tel:+84123456789"
  },
  {
    icon: "ph:map-pin",
    name: "Office",
    description: "Come say hello at our office.",
    contact: "123 Nguyen Van Linh, District 7, Ho Chi Minh City",
    href: "https://maps.google.com"
  }
];

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing Question" },
  { value: "enterprise", label: "Enterprise Sales" },
  { value: "partnership", label: "Partnership Opportunity" }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f12e_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f12e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-b from-gray-100 to-transparent rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-gray-100 to-transparent rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-[1000px] mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-2xl text-gray-600 mb-12">
              We'd love to hear from you. Our friendly team is always here to chat and help you succeed in your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <Link
                key={method.name}
                href={method.href}
                className="group p-8 bg-white rounded-3xl border border-gray-200 transition-all hover:border-black"
              >
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6">
                  <Icon icon={method.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-lg font-medium group-hover:text-black transition-colors">
                  {method.contact}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Let's discuss your learning needs
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-[4.5rem]">
                  <Input
                    type="text"
                    label="First Name"
                    labelPlacement="outside"
                    placeholder="Enter your first name"
                    radius="lg"
                    classNames={{
                      label: "text-base font-medium",
                      input: "text-base"
                    }}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    labelPlacement="outside"
                    placeholder="Enter your last name"
                    radius="lg"
                    classNames={{
                      label: "text-base font-medium",
                      input: "text-base"
                    }}
                  />
                </div>

                <Input
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  radius="lg"
                  classNames={{
                    label: "text-base font-medium",
                    input: "text-base",
                    inputWrapper: "mb-6"
                  }}
                />

                <Select
                  label="Subject"
                  labelPlacement="outside"
                  placeholder="Select a subject"
                  radius="lg"
                  classNames={{
                    label: "text-base font-medium",
                    value: "text-base",
                    trigger: "h-14"
                  }}
                >
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </Select>

                <Textarea
                  label="Message"
                  labelPlacement="outside"
                  placeholder="Write your message here..."
                  radius="lg"
                  minRows={6}
                  classNames={{
                    label: "text-base font-medium",
                    input: "text-base"
                  }}
                />

                <Button
                  className="w-full h-14 bg-black text-white text-lg font-medium hover:opacity-90 transition-opacity"
                  radius="lg"
                >
                  Send Message
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-10">
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0343842308913!2d106.69758797480561!3d10.732668089415992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8878f88e5d%3A0x2b5cc820e0a47c62!2sNguyen%20Van%20Linh%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1709174844316!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Working Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">Monday - Friday</span>
                      <span className="text-lg font-medium">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">Saturday</span>
                      <span className="text-lg font-medium">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">Sunday</span>
                      <span className="text-lg font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-8">Ready to Start Learning?</h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Join our community of learners and start your educational journey today.
            We're here to support you every step of the way.
          </p>
          <Button
            className="h-14 px-12 bg-white text-black text-lg font-medium hover:opacity-90 transition-opacity"
            radius="full"
          >
            Browse Courses
          </Button>
        </div>
      </section>
    </main>
  );
}