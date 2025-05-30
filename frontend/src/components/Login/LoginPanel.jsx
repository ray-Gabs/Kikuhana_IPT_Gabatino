import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SakuraAnimation from './SakuraAnimation';
import axios from 'axios';  
import { useAuth } from '../../App';  

export default function LoginPanel() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
 
    if (email === 'admin@gmail.com' && password === 'admin') {
      login(email, password);
      navigate('/admin');
      return;
    }
 
    try {
      const response = await axios.post('http://localhost:5000/User/login', {
        email,
        password,
      });
 
      if (response.data && response.data.authToken) {
        login(response.data.authToken);  
        navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) { 
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
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
        <h2 className="mb-6 text-3xl font-bold text-center text-black drop-shadow-sm">
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
            <p className="-mt-2 text-sm text-center text-red-600">
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
  