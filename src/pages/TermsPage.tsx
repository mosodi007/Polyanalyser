import { Link } from 'react-router-dom';

export function TermsPage() {
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

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last Updated: February 6, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service constitute a legally binding agreement made between you, whether
                personally or on behalf of an entity ("you") and Planmoni, Inc., doing business as
                Polyanalyser ("Company", "we", "us", or "our"), concerning your access to and use of the
                Polyanalyser website and services (collectively, the "Services").
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using the Services, you agree that you have read, understood, and agree to
                be bound by all of these Terms of Service. If you do not agree with all of these Terms,
                you are expressly prohibited from using the Services and must discontinue use immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Polyanalyser provides AI-powered analysis and insights for prediction markets, specifically
                focusing on Polymarket data. Our Services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Real-time market analysis powered by artificial intelligence</li>
                <li>Market trend predictions and recommendations</li>
                <li>Historical data tracking and analysis</li>
                <li>Subscription-based access tiers with varying usage limits</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                The Services are provided for informational purposes only and do not constitute financial,
                investment, or trading advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of the Services, you must register for an account. When you
                create an account, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Immediately notify us of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription Plans and Payments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Polyanalyser offers multiple subscription tiers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Free Tier: Limited daily analyses (5 per day)</li>
                <li>Lite Tier: Enhanced daily analyses (50 per day) with basic features</li>
                <li>Pro Tier: Unlimited analyses with advanced features and priority support</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4 mb-2">
                Payment terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All fees are in U.S. Dollars and are non-refundable except as required by law</li>
                <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>You may cancel your subscription at any time through your account settings</li>
                <li>Upon cancellation, you retain access until the end of your billing period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Usage Restrictions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Services for any illegal purpose or in violation of any laws</li>
                <li>Circumvent, disable, or interfere with security features of the Services</li>
                <li>Engage in unauthorized scraping, data mining, or automated data collection</li>
                <li>Attempt to gain unauthorized access to the Services or related systems</li>
                <li>Use the Services to transmit malicious code, viruses, or harmful content</li>
                <li>Impersonate another user or provide false information</li>
                <li>Share your account credentials with third parties</li>
                <li>Exceed the usage limits of your subscription tier through technical means</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Services and their entire contents, features, and functionality (including but not
                limited to all information, software, text, displays, images, video, and audio, and the
                design, selection, and arrangement thereof) are owned by Planmoni, Inc., its licensors, or
                other providers of such material and are protected by United States and international
                copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display,
                publicly perform, republish, download, store, or transmit any of the material on our
                Services without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES
                OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH
                THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
                SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES.
              </p>
              <p className="text-gray-700 leading-relaxed">
                THE COMPANY DOES NOT WARRANT THAT THE SERVICES, THEIR CONTENT, OR THE RESULTS OBTAINED
                FROM USING THE SERVICES WILL BE ACCURATE, RELIABLE, OR CORRECT; THAT THE SERVICES WILL
                MEET YOUR REQUIREMENTS; THAT THE SERVICES WILL BE AVAILABLE AT ANY PARTICULAR TIME OR
                LOCATION; OR THAT THE SERVICES WILL BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Investment Risk Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-red-600">IMPORTANT:</strong> The information provided through
                Polyanalyser is for informational and educational purposes only and should not be
                considered as financial, investment, or trading advice. Prediction markets involve
                substantial risk of loss and are not suitable for all investors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Past performance is not indicative of future results. Any predictions, analyses, or
                recommendations provided by our AI systems are based on historical data and algorithms
                and may not accurately predict future market movements. You should consult with a
                qualified financial advisor before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR
                THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE
                FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH
                YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
                INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL
                INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS
                OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND
                WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF
                FORESEEABLE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors,
                and service providers, and its and their respective officers, directors, employees,
                contractors, agents, licensors, suppliers, successors, and assigns from and against any
                claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees
                (including reasonable attorneys' fees) arising out of or relating to your violation of
                these Terms or your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of
                Florida, United States, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any legal action or proceeding arising under these Terms will be brought exclusively in
                the federal or state courts located in Miami-Dade County, Florida, and the parties
                irrevocably consent to the personal jurisdiction and venue therein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Services immediately, without
                prior notice or liability, for any reason whatsoever, including without limitation if you
                breach these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the Services will immediately cease. All provisions of
                these Terms which by their nature should survive termination shall survive termination,
                including, without limitation, ownership provisions, warranty disclaimers, indemnity, and
                limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material
                changes by posting the new Terms on this page and updating the "Last Updated" date. Your
                continued use of the Services after such changes constitutes your acceptance of the new
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
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
              By using Polyanalyser, you acknowledge that you have read and understood these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
