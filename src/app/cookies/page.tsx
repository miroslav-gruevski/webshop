import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy',
  description: 'ECS Systems Cookie Policy. Learn how we use cookies and similar technologies on our website.',
};

export default function CookiesPage() {
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
          <h1 className="text-3xl lg:text-4xl font-bold">Cookie Policy</h1>
          <p className="text-white/80 mt-4">Last updated: January 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-foreground-muted">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are placed on your device when you visit a 
                  website. They are widely used to make websites work more efficiently and provide 
                  information to website owners.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">How We Use Cookies</h2>
                <p className="mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly, including maintaining your session and shopping cart.</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings to enhance your experience.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website so we can improve it.</li>
                  <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-border rounded-lg overflow-hidden">
                    <thead className="bg-background-secondary">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Purpose</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm">session_id</td>
                        <td className="px-4 py-3 text-sm">Maintains your session</td>
                        <td className="px-4 py-3 text-sm">Session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">cart</td>
                        <td className="px-4 py-3 text-sm">Stores shopping cart contents</td>
                        <td className="px-4 py-3 text-sm">30 days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">preferences</td>
                        <td className="px-4 py-3 text-sm">Remembers your settings</td>
                        <td className="px-4 py-3 text-sm">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">_ga</td>
                        <td className="px-4 py-3 text-sm">Google Analytics tracking</td>
                        <td className="px-4 py-3 text-sm">2 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Third-Party Cookies</h2>
                <p>
                  Some cookies are placed by third-party services that appear on our pages. 
                  We use Google Analytics to help us understand how our site is used. These 
                  third parties may use cookies in accordance with their own privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Managing Cookies</h2>
                <p className="mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>View what cookies are stored on your device</li>
                  <li>Delete cookies individually or all at once</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block all cookies from being set</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p className="mt-4">
                  Please note that blocking or deleting cookies may affect your experience on 
                  our website and you may not be able to access all features.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Browser Settings</h2>
                <p className="mb-4">
                  To manage cookies, please refer to your browser&apos;s help documentation:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. Any changes will be posted 
                  on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-4">Contact Us</h2>
                <p>
                  If you have questions about our use of cookies, please contact us:
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
