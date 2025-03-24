'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[30vh] w-full">
        <Image
          src="/about/accessibility-hero.jpg"
          alt="Illuminati Energy Accessibility"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500">Accessibility</span> Statement
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Our commitment to making our website accessible to everyone.
            </p>
          </div>
        </div>
      </section>
      
      {/* Accessibility Content */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-black p-8 rounded-lg text-gray-300 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
              <p>
                Illuminati Energy is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards to ensure we provide equal access to all users.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Illuminati Energy's website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Accessibility Features</h2>
              <p className="mb-3">Our website includes the following accessibility features:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Semantic HTML structure for better screen reader compatibility</li>
                <li>Keyboard navigation for all interactive elements</li>
                <li>Visible focus states for keyboard users</li>
                <li>Alternative text for informative images</li>
                <li>Color contrast that meets WCAG 2.1 AA standards</li>
                <li>Resizable text without loss of functionality</li>
                <li>No content that flashes more than three times per second</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Limitations and Alternatives</h2>
              <p>
                Despite our best efforts to ensure the accessibility of our website, there may be some limitations. Below is a description of known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Videos:</strong> Some older video content may not have captions or audio descriptions. We are working to update these videos, but in the meantime, transcripts are available upon request.
                </li>
                <li>
                  <strong>Interactive Elements:</strong> Some interactive elements like the store locator map may be challenging to use with keyboard-only navigation. We provide alternative methods to find store locations through our searchable text database.
                </li>
                <li>
                  <strong>User-Generated Content:</strong> User-generated content in our community areas may not always meet accessibility standards. We moderate content as much as possible and are working on additional guidance for users submitting content.
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Feedback and Contact Information</h2>
              <p className="mb-3">
                We welcome your feedback on the accessibility of the Illuminati Energy website. Please let us know if you encounter any accessibility barriers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email:</strong> accessibility@illuminatienergy.com</li>
                <li><strong>Phone:</strong> (800) 555-ENERGY</li>
                <li><strong>Postal Address:</strong> 100 Illuminati Way, Los Angeles, CA 90210</li>
              </ul>
              <p className="mt-3">
                We try to respond to feedback within 2 business days.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Compatibility with Browsers and Assistive Technology</h2>
              <p className="mb-3">
                The Illuminati Energy website is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>JAWS and NVDA screen readers</li>
                <li>Basic browser screen readers (e.g. VoiceOver, Narrator)</li>
                <li>Zoom and magnification tools</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>
              <p className="mt-3">
                The website is compatible with recent versions of major browsers including Chrome, Firefox, Safari, and Edge.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Technical Specifications</h2>
              <p>
                Accessibility of the Illuminati Energy website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>WAI-ARIA</li>
              </ul>
              <p className="mt-3">
                These technologies are relied upon for conformance with the accessibility standards used.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Assessment Approach</h2>
              <p>
                Illuminati Energy assessed the accessibility of this website by the following approaches:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Self-evaluation</li>
                <li>External evaluation by accessibility consultants</li>
                <li>User testing with assistive technologies</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">
                This statement was created on March 24, 2023 and was last updated on March 24, 2023.
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