import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setErrorMessage('Invalid verification link. Token is missing.');
    }
  }, [token]);

  const handleVerifyEmail = async () => {
    if (!token) return;

    setIsVerifying(true);
    setErrorMessage('');

    try {
      const { data: tokenData, error: tokenError } = await supabase
        .from('email_verification_tokens')
        .select('*')
        .eq('token', token)
        .maybeSingle();

      if (tokenError || !tokenData) {
        throw new Error('Invalid verification token');
      }

      if (tokenData.verified_at) {
        throw new Error('This verification link has already been used');
      }

      if (new Date(tokenData.expires_at) < new Date()) {
        throw new Error('This verification link has expired');
      }

      const { error: updateError } = await supabase
        .from('email_verification_tokens')
        .update({ verified_at: new Date().toISOString() })
        .eq('token', token);

      if (updateError) {
        throw updateError;
      }

      const { error: confirmError } = await supabase.auth.admin.updateUserById(
        tokenData.user_id,
        { email_confirmed_at: new Date().toISOString() }
      );

      if (confirmError) {
        console.error('Failed to confirm email in auth system:', confirmError);
      }

      setVerificationStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setErrorMessage(error.message || 'Failed to verify email. The link may have expired.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              {verificationStatus === 'pending' && (
                <>
                  <div className="absolute inset-0 bg-[#1552F0] rounded-full blur-lg opacity-40"></div>
                  <div className="relative bg-[#000] rounded-full p-4">
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </div>
                </>
              )}
              {verificationStatus === 'success' && (
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              )}
              {verificationStatus === 'error' && (
                <div className="bg-red-100 rounded-full p-4">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-3">
            {verificationStatus === 'pending' && (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  Verify Your Email
                </h1>
                <p className="text-gray-600">
                  Click the button below to confirm your email address and activate your account.
                </p>
              </>
            )}
            {verificationStatus === 'success' && (
              <>
                <h1 className="text-3xl font-bold text-green-600">
                  Email Verified!
                </h1>
                <p className="text-gray-600">
                  Your email has been successfully verified. Redirecting you to search...
                </p>
              </>
            )}
            {verificationStatus === 'error' && (
              <>
                <h1 className="text-3xl font-bold text-red-600">
                  Verification Failed
                </h1>
                <p className="text-gray-600">
                  {errorMessage}
                </p>
              </>
            )}
          </div>

          {verificationStatus === 'pending' && (
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-[#1552F0]">
              <div className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  By confirming your email, you'll be able to:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Access all PolyAnalyser features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Analyze Polymarket data with AI</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Save and track your searches</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-medium">Redirecting to search...</span>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2">
            {verificationStatus === 'pending' && (
              <button
                onClick={handleVerifyEmail}
                disabled={isVerifying || !token}
                className="w-full px-6 py-3 bg-[#1552F0] text-white rounded-lg font-semibold hover:bg-[#0d3cb8] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Confirm Your Signup</span>
                )}
              </button>
            )}

            {verificationStatus === 'error' && (
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full px-6 py-3 bg-[#1552F0] text-white rounded-lg font-semibold hover:bg-[#0d3cb8] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up Again
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help?{' '}
            <a href="mailto:support@polyanalyser.com" className="text-[#1552F0] hover:text-[#0d3cb8] font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
