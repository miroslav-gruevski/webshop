import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'ECS Systems Privacy Policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl lg:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-white/80 mt-4">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-foreground-muted">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">1. Introduction</h2>
                <p>
                  ECS Systems Limited (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting 
                  your privacy. This Privacy Policy explains how we collect, use, disclose, and 
                  safeguard your information when you visit our website or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">2. Information We Collect</h2>
                <p className="mb-4">We may collect information about you in a variety of ways:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, company name, and postal address when you contact us or create an account.</li>
                  <li><strong>Payment Information:</strong> Payment card details and billing information when you make a purchase.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfil your orders</li>
                  <li>Provide customer support and respond to enquiries</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and maintain security</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">4. Information Sharing</h2>
                <p>
                  We do not sell your personal information. We may share your information with 
                  trusted third parties who assist us in operating our website, conducting our 
                  business, or servicing you, provided those parties agree to keep this 
                  information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organisational measures to protect 
                  your personal information against unauthorised access, alteration, disclosure, 
                  or destruction. However, no method of transmission over the Internet is 
                  completely secure.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">6. Your Rights</h2>
                <p className="mb-4">Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">7. Cookies</h2>
                <p>
                  We use cookies to enhance your experience on our website. For more 
                  information, please see our <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">8. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or wish to exercise your 
                  rights, please contact us at:
                </p>
                <div className="mt-4 bg-background-secondary rounded-lg p-4">
                  <p><strong>ECS Systems Limited</strong></p>
                  <p>75 Station Road, Sidcup, DA15 7DN</p>
                  <p>Email: <a href="mailto:privacy@ecssystems.co.uk" className="text-accent hover:underline">privacy@ecssystems.co.uk</a></p>
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
