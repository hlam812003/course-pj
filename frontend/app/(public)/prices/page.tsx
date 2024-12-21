"use client";

import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    annualPrice: "Free",
    description: "Perfect for getting started and exploring our platform",
    features: [
      "Access to free courses",
      "Basic community support",
      "Course discussions",
      "Course completion certificates",
      "24/7 Email support"
    ],
    icon: "ph:student",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    annualPrice: "$279",
    period: "per month",
    annualPeriod: "per year",
    description: "Ideal for learners who want to take their skills to the next level",
    features: [
      "All Basic features",
      "Unlimited access to Pro courses",
      "Priority support",
      "Downloadable resources",
      "Group mentoring sessions",
      "Course projects review",
      "LinkedIn certification"
    ],
    icon: "ph:rocket",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    annualPrice: "Custom",
    description: "For organizations looking to train their teams",
    features: [
      "All Pro features",
      "Custom learning paths",
      "Dedicated success manager",
      "Team analytics & reporting",
      "API access",
      "SSO integration",
      "Custom branding",
      "Onboarding training"
    ],
    icon: "ph:buildings",
    popular: false
  }
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, you'll receive a prorated credit towards your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also accept bank transfers."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, you can request a full refund within the first 30 days of your subscription."
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <main className="min-h-screen">
      <section className="relative pt-44 mb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f12e_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f12e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-b from-gray-100 to-transparent rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-gray-100 to-transparent rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold mb-8">Simple, Transparent Pricing</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose the perfect plan for your learning journey. Upgrade or downgrade at any time.
          </p>
          <div className="inline-flex items-center gap-3 bg-gray-100 p-2 rounded-full">
            <Button
              className={`font-medium text-base px-6 py-2 rounded-full transition-colors ${
                !isAnnual ? 'bg-black text-white' : 'bg-transparent text-gray-600'
              }`}
              onPress={() => setIsAnnual(false)}
            >
              Monthly
            </Button>
            <Button
              className={`font-medium text-base px-6 py-2 rounded-full transition-colors ${
                isAnnual ? 'bg-black text-white' : 'bg-transparent text-gray-600'
              }`}
              onPress={() => setIsAnnual(true)}
            >
              Save 20% with Annual
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-3xl p-8 min-w-[350px] ${
                  plan.popular ? 'ring-2 ring-black' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-black text-white text-sm font-medium px-5 py-1.5 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {isAnnual ? plan.annualPrice : plan.price}
                      </span>
                      {(plan.period || plan.annualPeriod) && (
                        <span className="text-lg text-gray-600">
                          {isAnnual ? plan.annualPeriod : plan.period}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Icon icon={plan.icon} className="text-2xl" />
                  </div>
                </div>

                <p className="text-base text-gray-600 mb-8">
                  {plan.description}
                </p>

                <Button
                  as={Link}
                  href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                  className={`w-full h-12 mb-8 text-base font-medium ${
                    plan.popular
                      ? 'bg-black text-white hover:opacity-90'
                      : 'bg-white text-black border-2 border-black hover:bg-gray-50'
                  } transition-colors`}
                  radius="full"
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>

                <div className="space-y-4">
                  <p className="text-base font-medium">What's included:</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Icon icon="ph:check-circle" className="text-xl text-gray-400" />
                      <span className="text-base text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-2xl text-gray-600">
              Have questions? We're here to help.
            </p>
          </div>

          <Accordion 
            className="max-w-5xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={<span className="text-2xl font-semibold">{faq.question}</span>}
                className="mb-4"
              >
                <p className="text-xl text-gray-600 pb-4 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-2xl text-gray-600 mb-6">
              Still have questions? We're happy to help!
            </p>
            <Button
              as={Link}
              href="/contact"
              className="font-medium h-14 px-10 text-xl bg-black text-white hover:opacity-90 transition-opacity"
              radius="full"
              startContent={<Icon icon="ph:envelope" className="text-2xl" />}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-8">Start Your Learning Journey Today</h2>
          <p className="text-2xl text-gray-300 mb-14 max-w-4xl mx-auto">
            Join thousands of students who are already learning and growing with T-Education. 
            Choose your plan and start learning today.
          </p>
          <div className="flex flex-wrap gap-8 justify-center">
            <Button
              as={Link}
              href="/signup"
              className="bg-white text-black font-semibold text-xl h-16 px-12 hover:scale-105 transition-transform"
              radius="full"
            >
              Get Started
            </Button>
            <Button
              as={Link}
              href="/courses"
              variant="bordered"
              className="font-semibold text-xl h-16 px-12 border-2 border-white text-white hover:bg-white/10 transition-colors"
              radius="full"
            >
              View Courses
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 