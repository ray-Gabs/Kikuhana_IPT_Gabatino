import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SakuraAnimation from './SakuraAnimation';
import { useAuth } from '../../App'; // Make sure the path is correct

export default function LoginPanel() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Only admin is allowed in here.');
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl border border-[#e2222f] backdrop-blur-xl z-10 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff0f0] to-[#ffe6e6] opacity-70 z-0" />
      <SakuraAnimation />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-4 right-4 text-[#e2222f] hover:text-[#b90005] transition z-20"
        aria-label="Back to Home"
      >
        <ArrowBackIcon fontSize="medium" />
      </Link>

      <div className="relative z-20">
        <h2 className="text-3xl font-bold text-black mb-6 text-center drop-shadow-sm">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-inner focus:ring-[#e2222f] focus:border-[#e2222f] focus:outline-none bg-white/80 backdrop-blur"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-inner focus:ring-[#e2222f] focus:border-[#e2222f] focus:outline-none bg-white/80 backdrop-blur"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center -mt-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#e2222f] text-white rounded-md hover:bg-[#b90005] transition font-semibold shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
