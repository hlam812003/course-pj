import Link from "next/link";
import { Icon } from "@iconify/react";

const footerLinks = {
  "About": [
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
    { name: "Features", href: "/features" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" }
  ],
  "Discovery T-Education": [
    { name: "Pricing", href: "/pricing" },
    { name: "T-Education Business", href: "/business" },
    { name: "Get the app", href: "/mobile" },
    { name: "Professional Certificates", href: "/certificates" },
    { name: "Help and Support", href: "/support" }
  ],
  "Legal & Accessibility": [
    { name: "Terms", href: "/terms" },
    { name: "Privacy policy", href: "/privacy" },
    { name: "Cookie settings", href: "/cookies" },
    { name: "Accessibility statement", href: "/accessibility" },
    { name: "Sitemap", href: "/sitemap" }
  ],
  "Business Analytics & Intelligence": [
    { name: "Microsoft Excel", href: "/topic/excel" },
    { name: "SQL", href: "/topic/sql" },
    { name: "Microsoft Power BI", href: "/topic/power-bi" },
    { name: "Data Analysis", href: "/topic/data-analysis" },
    { name: "Business Analysis", href: "/topic/business-analysis" }
  ]
};

const certifications = [
  { name: "AWS Certified Cloud Practitioner", href: "/cert/aws-cloud-practitioner" },
  { name: "AZ-900: Microsoft Azure Fundamentals", href: "/cert/az-900" },
  { name: "AWS Certified Solutions Architect", href: "/cert/aws-solutions-architect" },
  { name: "Kubernetes", href: "/cert/kubernetes" }
];

export default function MainFooter() {
  return (
    <footer className="w-full bg-gray-900 text-white pt-10 pb-8">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 py-12">
          <h2 className="text-2xl font-bold mb-6">Explore top skills and certifications</h2>
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert) => (
              <Link
                key={cert.name}
                href={cert.href}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-full transition-colors"
              >
                {cert.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold">T-Education</Link>
            <span className="text-gray-400">© 2024 T-Education, Inc.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-300 hover:text-white">
              <Icon icon="ph:globe" className="text-2xl" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              <Icon icon="ph:facebook-logo" className="text-2xl" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              <Icon icon="ph:twitter-logo" className="text-2xl" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              <Icon icon="ph:youtube-logo" className="text-2xl" />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              <Icon icon="ph:linkedin-logo" className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 