import { Mail, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ConfirmationSentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Check Your Email
            </h1>
            <p className="text-gray-600 text-lg">
              Confirmation email sent successfully!
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 font-medium">
                  We've sent a confirmation email to:
                </p>
                <p className="text-blue-600 font-semibold mt-1 break-all">
                  {email}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">
                Click the confirmation link in the email to verify your account and complete your registration.
              </p>
              <p className="text-gray-500 text-sm">
                The email should arrive within a few minutes. Don't forget to check your spam folder!
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Go to Login
            </button>

            <p className="text-center text-sm text-gray-500">
              Didn't receive the email?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Try signing up again
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help?{' '}
            <a href="mailto:support@polyanalyser.com" className="text-blue-600 hover:text-blue-700 font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
