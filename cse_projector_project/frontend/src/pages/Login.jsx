import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Monitor,
  LogIn,
  Loader2,
  ShieldCheck,
  MailCheck,
  RefreshCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { requestOtp, verifyOtp, loginWithPassword } = useAuth();

  const [step, setStep] = useState('request'); // request | verify | success
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    otp: ''
  });
  const [passwordLogin, setPasswordLogin] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [credentials, setCredentials] = useState(null);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);

  useEffect(() => {
    let countdown;
    if (step === 'verify' && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => countdown && clearInterval(countdown);
  }, [step, timer]);

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await requestOtp({
      email: formData.email,
      name: formData.name
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setStep('verify');
      setTimer(result.expiresIn || 600);
    } else {
      toast.error(result.message || 'Unable to send OTP');
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await verifyOtp({
      email: formData.email,
      otp: formData.otp,
      name: formData.name
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message || 'OTP verified');
      if (result.credentials) {
        setCredentials(result.credentials);
      }
      setStep('success');
    } else {
      toast.error(result.message || 'Invalid OTP');
    }
  };

  const handleResendOtp = async () => {
    if (loading) return;
    setLoading(true);
    const result = await requestOtp({
      email: formData.email,
      name: formData.name
    });
    setLoading(false);

    if (result.success) {
      toast.success('A new OTP has been sent');
      setTimer(result.expiresIn || 600);
    } else {
      toast.error(result.message || 'Failed to resend OTP');
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);

    const result = await loginWithPassword(passwordLogin);

    setPasswordLoading(false);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-full shadow-lg">
              <Monitor className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SMART PROJECTOR MANAGER
          </h1>
          <p className="text-gray-600">Department of Computer Science and Engineering</p>
        </div>

        <div className="card animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Secure Faculty Access
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              {step === 'request' && 'Step 1: Request OTP'}
              {step === 'verify' && 'Step 2: Verify OTP'}
              {step === 'success' && 'Verified'}
            </span>
          </div>

          {step === 'request' && (
            <form onSubmit={handleOtpRequest} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Official Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input"
                  placeholder="faculty@cse.edu"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <MailCheck className="h-5 w-5" />
                    <span>Send OTP to Email</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleOtpVerification} className="space-y-5">
              <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
                <p className="font-semibold flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>OTP sent to {formData.email}</span>
                </p>
                <p className="mt-1 text-xs text-blue-600">
                  Enter the 6-digit code from your email. This code will expire in {formatTimer()}.
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  required
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '') }))}
                  className="input tracking-widest text-center text-lg"
                  placeholder="------"
                />
              </div>

              <button
                type="submit"
                disabled={loading || formData.otp.length !== 6}
                className="w-full btn btn-primary flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying OTP...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    <span>Verify & Sign In</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <button
                  type="button"
                  className="text-primary hover:text-primary-dark"
                  onClick={() => {
                    setStep('request');
                    setFormData(prev => ({ ...prev, otp: '' }));
                    setTimer(0);
                  }}
                >
                  Change email
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-1 text-primary disabled:text-gray-400"
                  onClick={handleResendOtp}
                  disabled={timer > 0 || loading}
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  <span>{timer > 0 ? `Resend in ${formatTimer()}` : 'Resend OTP'}</span>
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="space-y-5">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 animate-fade-in">
                <p className="font-semibold flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Authentication complete!</span>
                </p>
                <p className="mt-1 text-xs text-emerald-600">
                  You're securely signed in. We've also emailed your credentials for future reference.
                </p>
              </div>

              {credentials && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Your Login Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Username</p>
                      <p className="font-semibold text-gray-900 break-all">{credentials.username}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Password</p>
                      <p className="font-semibold text-gray-900 break-all">{credentials.password}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Tip: Save these credentials securely. You can always request a new OTP if needed.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="w-full btn btn-primary flex items-center justify-center space-x-2"
                onClick={() => navigate('/dashboard', { replace: true })}
              >
                <LogIn className="h-5 w-5" />
                <span>Open Dashboard</span>
              </button>
            </div>
          )}

          <div className="mt-8 border-t border-gray-200 pt-4">
            <button
              type="button"
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700"
              onClick={() => setShowPasswordLogin(prev => !prev)}
            >
              <span>Have credentials already? Sign in with username & password</span>
              {showPasswordLogin ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showPasswordLogin && (
              <form onSubmit={handlePasswordLogin} className="mt-4 space-y-3 animate-fade-in">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={passwordLogin.identifier}
                    onChange={(e) => setPasswordLogin(prev => ({ ...prev, identifier: e.target.value }))}
                    className="input"
                    placeholder="Enter username or email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordLogin.password}
                    onChange={(e) => setPasswordLogin(prev => ({ ...prev, password: e.target.value }))}
                    className="input"
                    placeholder="Enter password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full btn btn-secondary flex items-center justify-center space-x-2"
                >
                  {passwordLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Login with credentials</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Smart Projector Manager</p>
          <p className="text-xs mt-1">
            Designed & Developed by <span className="font-semibold text-primary">Satya Nikhil</span> & <span className="font-semibold text-primary">Sri Varshini</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
