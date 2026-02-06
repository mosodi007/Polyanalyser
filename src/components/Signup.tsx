import { useState } from 'react';
import { X, Mail, Lock, Chrome, Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface SignupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onClose, onSwitchToLogin }: SignupProps) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            full_name: fullName.trim(),
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        const token = crypto.randomUUID();

        const { error: tokenError } = await supabase
          .from('email_verification_tokens')
          .insert([
            {
              user_id: data.user.id,
              token,
              email,
            },
          ]);

        if (tokenError) {
          console.error('Error creating verification token:', tokenError);
          setError('Failed to create verification token');
          return;
        }

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
          setError('Failed to send confirmation email');
          return;
        }

        onClose();
        navigate('/confirmation-sent', { state: { email } });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (signInError) throw signInError;
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md glass-white rounded-3xl shadow-2xl border-2 border-black/10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-lg transition-colors z-10"
          aria-label="Close signup"
        >
          <X className="w-5 h-5 text-black/50" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/polyanalyser.png" alt="PolyAnalyser" className="w-10 h-10" />
              <h2 className="text-2xl font-bold text-black">Polyanalyser</h2>
            </div>
            <p className="text-black/60">Create your account to get started</p>
          </div>

          <>
              <button
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 glass-strong hover:bg-black/5 text-black font-medium rounded-xl transition-all border-2 border-black/10 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-black/50">Or sign up with email</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full pl-11 pr-4 py-3 glass-strong rounded-xl border-2 border-black/10 focus:outline-none focus:border-[#1552F0] focus:ring-4 focus:ring-[#1552F0]/20 transition-all text-black placeholder-black/40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3 glass-strong rounded-xl border-2 border-black/10 focus:outline-none focus:border-[#1552F0] focus:ring-4 focus:ring-[#1552F0]/20 transition-all text-black placeholder-black/40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      className="w-full pl-11 pr-11 py-3 glass-strong rounded-xl border-2 border-black/10 focus:outline-none focus:border-[#1552F0] focus:ring-4 focus:ring-[#1552F0]/20 transition-all text-black placeholder-black/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-black/40" />
                      ) : (
                        <Eye className="w-5 h-5 text-black/40" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                      className="w-full pl-11 pr-11 py-3 glass-strong rounded-xl border-2 border-black/10 focus:outline-none focus:border-[#1552F0] focus:ring-4 focus:ring-[#1552F0]/20 transition-all text-black placeholder-black/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-black/40" />
                      ) : (
                        <Eye className="w-5 h-5 text-black/40" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3.5 bg-[#1552F0] hover:bg-[#0f3ec4] text-white font-semibold rounded-xl transition-all shadow-lg border-2 border-[#1552F0] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-black/60">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-[#1552F0] hover:underline font-medium"
                  >
                    Log in
                  </button>
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-black/50">
                  By signing up, you agree to our{' '}
                  <a href="/terms" className="text-[#1552F0] hover:underline">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-[#1552F0] hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </>
        </div>
      </div>
    </div>
  );
}
