'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[30vh] w-full">
        <Image
          src="/about/privacy-hero.jpg"
          alt="Illuminati Energy Privacy Policy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy <span className="text-emerald-500">Policy</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              We are committed to protecting your privacy and personal data.
            </p>
          </div>
        </div>
      </section>
      
      {/* Privacy Content */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-black p-8 rounded-lg text-gray-300 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="mb-3">
                This Privacy Policy explains how Illuminati Energy ("we", "us", or "our") collects, uses, shares, and protects personal information obtained from users of our website, illuminatienergy.com, and related services.
              </p>
              <p>
                We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we handle your personal data when you visit our website and tell you about your privacy rights.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="mb-3">We may collect several types of information from and about users of our website, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information such as name, email address, postal address, phone number, and other identifiers when voluntarily provided to us.</li>
                <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
                <li>Information collected through cookies, web beacons, and other tracking technologies.</li>
                <li>Age verification information to ensure you are of legal age to consume our products.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect about you or that you provide to us for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To present our website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights.</li>
                <li>To notify you about changes to our website or any products or services we offer.</li>
                <li>To improve our website and customer service.</li>
                <li>To send periodic emails including newsletters, company updates, related product information, etc.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Disclosure of Your Information</h2>
              <p className="mb-3">We may disclose personal information that we collect or you provide as described in this Privacy Policy:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To our subsidiaries and affiliates.</li>
                <li>To contractors, service providers, and other third parties we use to support our business.</li>
                <li>To fulfill the purpose for which you provide it.</li>
                <li>For any other purpose disclosed by us when you provide the information.</li>
                <li>With your consent.</li>
                <li>To comply with any court order, law, or legal process.</li>
                <li>To enforce or apply our terms of use and other agreements.</li>
                <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of our company, our customers, or others.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p>
                We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p>
                Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this website. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Our Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on our website home page. The date the Privacy Policy was last revised is identified at the bottom of the page. You are responsible for periodically visiting our website and this Privacy Policy to check for any changes.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p>
                If you have any questions or comments about this Privacy Policy and our privacy practices, please contact us at:
              </p>
              <address className="mt-3 not-italic">
                Illuminati Energy<br />
                100 Illuminati Way<br />
                Los Angeles, CA 90210<br />
                Email: privacy@illuminatienergy.com<br />
                Phone: (800) 555-ENERGY
              </address>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">
                Last updated: March 24, 2023
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back Button */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
            <Link href="/" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 