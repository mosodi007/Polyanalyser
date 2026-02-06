import { Link } from 'react-router-dom';

export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-[#1552F0] hover:text-[#0d3cb8] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 6, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet)
                when you visit a website. Cookies are widely used to make websites work more efficiently and
                provide information to website owners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Cookie Policy explains what cookies are, how we use them on the Polyanalyser website and
                services, what types of cookies we use, and how you can control your cookie preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Polyanalyser uses cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Keep you signed in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our Services</li>
                <li>Improve our Services and user experience</li>
                <li>Track usage limits for subscription tiers</li>
                <li>Analyze website traffic and performance</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Essential Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Purpose:</strong> These cookies are strictly necessary for the operation of our
                    Services. They enable core functionality such as security, network management, and
                    accessibility.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Examples:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Authentication cookies (keeping you logged in)</li>
                    <li>Security cookies (protecting against fraud)</li>
                    <li>Session cookies (maintaining your session)</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong>Can be disabled:</strong> No - these cookies are essential for the Services to
                    function properly.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Functional Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Purpose:</strong> These cookies enable enhanced functionality and personalization,
                    such as remembering your preferences and choices.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Examples:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Language preferences</li>
                    <li>Cookie consent preferences</li>
                    <li>Display settings and customizations</li>
                    <li>Filter and sorting preferences</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong>Can be disabled:</strong> Yes - but some features may not work as intended.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Analytics Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Purpose:</strong> These cookies help us understand how visitors interact with our
                    Services by collecting and reporting information anonymously.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Examples:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Page views and navigation patterns</li>
                    <li>Time spent on pages</li>
                    <li>Traffic sources</li>
                    <li>Feature usage statistics</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong>Can be disabled:</strong> Yes - through your cookie preferences.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Performance Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Purpose:</strong> These cookies allow us to count visits and traffic sources so we
                    can measure and improve the performance of our Services.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>Examples:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Error tracking and diagnostics</li>
                    <li>Load time monitoring</li>
                    <li>API performance metrics</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    <strong>Can be disabled:</strong> Yes - through your cookie preferences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In addition to our own cookies, we may use third-party cookies from trusted partners to help
                us provide better services:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-[#1552F0] pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stripe</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use Stripe for payment processing. Stripe may set cookies to enable secure payment
                    transactions and fraud prevention. For more information, visit{' '}
                    <a
                      href="https://stripe.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1552F0] hover:underline"
                    >
                      Stripe's Privacy Policy
                    </a>.
                  </p>
                </div>

                <div className="border-l-4 border-[#1552F0] pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Supabase</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We use Supabase for authentication and database services. Supabase may set cookies to
                    maintain secure authentication sessions. For more information, visit{' '}
                    <a
                      href="https://supabase.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1552F0] hover:underline"
                    >
                      Supabase's Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Duration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies can be either "session cookies" or "persistent cookies":
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Session Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Temporary cookies that are erased when you close your browser. They help maintain your
                    session during a single browsing session.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Persistent Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Cookies that remain on your device for a set period or until you manually delete them.
                    They help remember your preferences across multiple visits.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.1 Cookie Consent Banner</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you first visit Polyanalyser, you'll see a cookie consent banner where you can accept or
                customize your cookie preferences. You can change your preferences at any time by clicking the
                "Cookie Preferences" link in the footer of any page.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.2 Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <p className="text-sm text-gray-700">
                  <strong>Please note:</strong> If you disable cookies, some features of our Services may not
                  function properly, and you may not be able to access certain areas of the website.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">6.3 Browser-Specific Instructions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For instructions on how to manage cookies in popular browsers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1552F0] hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1552F0] hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1552F0] hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1552F0] hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track Signals</h2>
              <p className="text-gray-700 leading-relaxed">
                Some browsers support "Do Not Track" (DNT) signals. Currently, there is no industry standard
                for how DNT signals should be interpreted. We do not currently respond to DNT signals, but we
                respect your right to control cookies through your browser settings and our cookie consent
                banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Cookie Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for
                other operational, legal, or regulatory reasons. We will notify you of any material changes by
                posting the updated policy on this page with a new "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. More Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For more information about how we handle your personal data, please read our{' '}
                <Link to="/privacy" className="text-[#1552F0] hover:underline">Privacy Policy</Link>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Planmoni, Inc.</strong> (d/b/a Polyanalyser)
                </p>
                <p className="text-gray-700">8345 Northwest 66th Street</p>
                <p className="text-gray-700">Miami, FL 33195</p>
                <p className="text-gray-700">United States</p>
                <p className="text-gray-700 mt-4">
                  Email: <a href="mailto:legal@polyanalyser.com" className="text-[#1552F0] hover:underline">legal@polyanalyser.com</a>
                </p>
                <p className="text-gray-700">
                  Support: <a href="mailto:support@polyanalyser.com" className="text-[#1552F0] hover:underline">support@polyanalyser.com</a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              We use cookies to provide you with the best possible experience on Polyanalyser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
