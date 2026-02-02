import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use',
  description: 'ECS Systems Terms of Use. Please read these terms carefully before using our website or services.',
};

export default function TermsPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold">Terms of Use</h1>
          <p className="text-white/80 mt-4">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-foreground-muted">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by these 
                  Terms of Use and our Privacy Policy. If you do not agree to these terms, please 
                  do not use our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">2. Use of Website</h2>
                <p className="mb-4">You agree to use this website only for lawful purposes. You must not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the website in any way that breaches applicable laws or regulations</li>
                  <li>Use the website to transmit harmful, offensive, or unlawful content</li>
                  <li>Attempt to gain unauthorised access to any part of the website</li>
                  <li>Interfere with or disrupt the website&apos;s operation</li>
                  <li>Use automated systems to extract data from the website</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">3. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of ECS Systems Limited or its licensors and is protected by 
                  copyright and other intellectual property laws. You may not reproduce, distribute, 
                  or create derivative works without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">4. Product Information</h2>
                <p>
                  We make every effort to ensure product descriptions, specifications, and prices 
                  are accurate. However, we do not warrant that product information is complete, 
                  reliable, or error-free. We reserve the right to correct any errors and update 
                  information at any time without prior notice.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">5. Orders and Pricing</h2>
                <p className="mb-4">
                  All orders are subject to acceptance and availability. We reserve the right to 
                  refuse any order. Prices are subject to change without notice. If we discover 
                  a pricing error, we will contact you before processing your order.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">6. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, ECS Systems Limited shall not be liable 
                  for any indirect, incidental, special, consequential, or punitive damages arising 
                  from your use of the website or services. Our total liability shall not exceed 
                  the amount you paid for the relevant product or service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">7. Links to Third Parties</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible 
                  for the content, accuracy, or practices of these websites. Inclusion of any 
                  link does not imply endorsement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">8. Governing Law</h2>
                <p>
                  These Terms of Use shall be governed by and construed in accordance with the 
                  laws of England and Wales. Any disputes shall be subject to the exclusive 
                  jurisdiction of the English courts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">9. Changes to Terms</h2>
                <p>
                  We may update these Terms of Use from time to time. Any changes will be posted 
                  on this page with an updated revision date. Continued use of the website after 
                  changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">10. Contact</h2>
                <p>
                  For questions about these Terms of Use, please contact us:
                </p>
                <div className="mt-4 bg-background-secondary rounded-lg p-4">
                  <p><strong>ECS Systems Limited</strong></p>
                  <p>75 Station Road, Sidcup, DA15 7DN</p>
                  <p>Email: <a href="mailto:legal@ecssystems.co.uk" className="text-accent hover:underline">legal@ecssystems.co.uk</a></p>
                  <p>Phone: 0208 300 9996</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
