import { Mail, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ConfirmationSentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleResend = async () => {
    setResending(true);
    setResendMessage(null);

    try {
      // Generate a new token
      const token = crypto.randomUUID();

      // Update the token in the database
      const { data: updateData, error: updateError } = await supabase
        .from('email_verification_tokens')
        .update({
          token,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        })
        .eq('email', email)
        .is('verified_at', null) // Only update unverified tokens
        .select();

      if (updateError) {
        console.error('Error updating token:', updateError);
        setResendMessage({ type: 'error', text: 'Failed to generate new verification link. Please try signing up again.' });
        return;
      }

      if (!updateData || updateData.length === 0) {
        setResendMessage({ type: 'error', text: 'Your email may already be verified. Please try logging in.' });
        return;
      }

      // Send the email
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation-email`;
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      const emailResponse = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, token }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send confirmation email');
        setResendMessage({ type: 'error', text: 'Failed to send confirmation email. Please try again.' });
        return;
      }

      setResendMessage({ type: 'success', text: 'Email sent! Check your inbox.' });
    } catch (error) {
      console.error('Resend error:', error);
      setResendMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#000] rounded-full opacity-50 animate-pulse"></div>
              <div className="relative bg-[#000] rounded-full p-4">
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

          <div className="bg-blue-50 rounded-xl p-6 space-y-4 border-l-4 border-[#1552F0]">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 font-medium">
                  We've sent a confirmation email to:
                </p>
                <p className="text-[#1552F0] font-semibold mt-1 break-all">
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

          {resendMessage && (
            <div
              className={`rounded-lg p-4 ${
                resendMessage.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {resendMessage.text}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <p className="text-center text-sm text-gray-500">
              Didn't receive the email?{' '}
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-[#1552F0] hover:text-[#0d3cb8] font-semibold underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? 'Resending...' : 'Resend'}
              </button>
            </p>
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
