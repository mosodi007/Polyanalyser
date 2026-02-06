import { Link } from 'react-router-dom';

export function PrivacyPage() {
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

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 6, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Planmoni, Inc., doing business as Polyanalyser ("Company", "we", "us", or "our"), respects
                your privacy and is committed to protecting your personal data. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website and
                use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this
                Privacy Policy, please do not access or use the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Register for an account</li>
                <li>Subscribe to a paid plan</li>
                <li>Contact us for support</li>
                <li>Sign up for our newsletter or communications</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Personal information may include: name, email address, payment information, and account
                credentials.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Usage Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We automatically collect certain information when you visit, use, or navigate the Services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage patterns (pages viewed, time spent, click patterns)</li>
                <li>Search queries and market analysis requests</li>
                <li>Interaction with AI-generated content</li>
                <li>Usage limits and subscription tier information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our Services and store
                certain information. For more details, please see our <Link to="/cookies" className="text-[#1552F0] hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide, operate, and maintain our Services</li>
                <li>Process your transactions and manage your subscriptions</li>
                <li>Improve, personalize, and expand our Services</li>
                <li>Generate AI-powered market analyses and recommendations</li>
                <li>Track usage limits according to your subscription tier</li>
                <li>Communicate with you about your account and customer service</li>
                <li>Send you technical notices, updates, and security alerts</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage and trends to improve user experience</li>
                <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following
                situations:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.1 Service Providers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information with third-party service providers who perform services on our
                behalf, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment processing (Stripe)</li>
                <li>Cloud hosting and infrastructure (Supabase)</li>
                <li>Email delivery services</li>
                <li>Analytics providers</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Business Transfers</h3>
              <p className="text-gray-700 leading-relaxed">
                We may share or transfer your information in connection with, or during negotiations of, any
                merger, sale of company assets, financing, or acquisition of all or a portion of our business
                to another company.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                We may disclose your information where we are legally required to do so in order to comply
                with applicable law, governmental requests, a judicial proceeding, court order, or legal
                process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures designed to protect
                the security of your personal information. However, please note that no electronic
                transmission over the Internet or information storage technology can be guaranteed to be 100%
                secure.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Security measures we employ include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication protocols</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>PCI-DSS compliant payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We will retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this Privacy Policy, unless a longer retention period is required or
                permitted by law. When we no longer need your information, we will securely delete or
                anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
                <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                <li><strong>Object:</strong> Object to processing of your personal information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:legal@polyanalyser.com" className="text-[#1552F0] hover:underline">
                  legal@polyanalyser.com
                </a>
                . We will respond to your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. California Privacy Rights (CCPA)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are a California resident, you have specific rights under the California Consumer
                Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising your CCPA rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. European Privacy Rights (GDPR)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are located in the European Economic Area (EEA), you have certain data protection
                rights under the General Data Protection Regulation (GDPR). We process your personal
                information based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Contract:</strong> To perform our contract with you</li>
                <li><strong>Consent:</strong> Where you have given explicit consent</li>
                <li><strong>Legitimate Interests:</strong> For our legitimate business interests</li>
                <li><strong>Legal Obligation:</strong> To comply with legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Services are not intended for individuals under the age of 18. We do not knowingly
                collect personal information from children under 18. If you are a parent or guardian and
                believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Services may contain links to third-party websites. We are not responsible for the
                privacy practices or content of these third-party sites. We encourage you to read the
                privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material
                changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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
                <p className="text-gray-700">
                  General: <a href="mailto:contact@polyanalyser.com" className="text-[#1552F0] hover:underline">contact@polyanalyser.com</a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Your privacy is important to us. We are committed to protecting your personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
