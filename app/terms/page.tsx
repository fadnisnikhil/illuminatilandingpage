'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[30vh] w-full">
        <Image
          src="/about/terms-hero.jpg"
          alt="Illuminati Energy Terms of Service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of <span className="text-emerald-500">Service</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Please read these terms carefully before using our website and services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Terms Content */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-black p-8 rounded-lg text-gray-300 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p>
                By accessing or using the Illuminati Energy website at illuminatienergy.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
              <p className="mb-3">
                Permission is granted to temporarily download one copy of the materials on Illuminati Energy's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials;</li>
                <li>Use the materials for any commercial purpose, or for any public display;</li>
                <li>Attempt to decompile or reverse engineer any software contained on Illuminati Energy's website;</li>
                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
              <p className="mt-3">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by Illuminati Energy at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Age Restrictions</h2>
              <p>
                Illuminati Energy products are intended for consumption by adults who are of legal age to consume energy drinks in their respective jurisdictions. By using this website, you confirm that you are of legal age to consume energy drinks in your jurisdiction. We reserve the right to implement age verification measures at any time.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <p className="mb-3">
                The materials on Illuminati Energy's website are provided on an 'as is' basis. Illuminati Energy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                Further, Illuminati Energy does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
              <p>
                In no event shall Illuminati Energy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Illuminati Energy's website, even if Illuminati Energy or a authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Accuracy of Materials</h2>
              <p>
                The materials appearing on Illuminati Energy's website could include technical, typographical, or photographic errors. Illuminati Energy does not warrant that any of the materials on its website are accurate, complete or current. Illuminati Energy may make changes to the materials contained on its website at any time without notice. However, Illuminati Energy does not make any commitment to update the materials.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Links</h2>
              <p>
                Illuminati Energy has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Illuminati Energy of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Modifications</h2>
              <p>
                Illuminati Energy may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the State of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
              <p>
                You agree to indemnify, defend and hold harmless Illuminati Energy, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the site or services, any user content posted by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <address className="mt-3 not-italic">
                Illuminati Energy<br />
                100 Illuminati Way<br />
                Los Angeles, CA 90210<br />
                Email: legal@illuminatienergy.com<br />
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