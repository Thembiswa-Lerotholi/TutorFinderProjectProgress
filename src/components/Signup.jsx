
// src/components/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    campus: 'maseru',
    // this is for tutors only for the user to fill in if they select tutor as user type
    expertise: '',
    bio: '',
    yearOfStudy: ''
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // the purpose of this validation is to ensure all required fields are filled and valid before calling signup
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    
    if (formData.userType === 'tutor') {
      if (!formData.expertise || !formData.bio || !formData.yearOfStudy) {
        setError('Please fill in all tutor-specific fields');
        return;
      }
    }

    const result = await signup(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Signup failed');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    setError('');
  };

  return (
    <div className="auth-page-container min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 w-full max-w-4xl shadow-2xl border border-blue-400/20">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-white hover:text-blue-400 transition-colors block mb-6">
            TutorFinder
          </Link>
          <h2 className="text-3xl font-semibold text-white mb-2">Join TutorFinder</h2>
          <p className="text-slate-400 text-lg">Create your account and start learning</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div>
            <label className="text-white text-lg font-medium mb-3 block">
              I am a: <span className="text-red-300">*</span>
            </label>
            <div className="flex space-x-8">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={formData.userType === 'student'}
                  onChange={handleChange}
                  className="mr-3 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-white text-lg">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="tutor"
                  checked={formData.userType === 'tutor'}
                  onChange={handleChange}
                  className="mr-3 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-white text-lg">Tutor</span>
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-white text-lg font-medium mb-2 block">
                Full Name <span className="text-red-300">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-white text-lg font-medium mb-2 block">
                Email Address <span className="text-red-300">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Campus Selection */}
          <div>
            <label htmlFor="campus" className="text-white text-lg font-medium mb-2 block">
              Campus <span className="text-red-300">*</span>
            </label>
            <select
              id="campus"
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
              required
            >
              <option value="maseru" className="bg-slate-900 text-white">Maseru Campus</option>
              <option value="botswana" className="bg-slate-900 text-white">Botswana Campus</option>
            </select>
          </div>

          {/* Password Fields */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="text-white text-lg font-medium mb-2 block">
                Password <span className="text-red-300">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Create password (6+ characters)"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-white text-lg font-medium mb-2 block">
                Confirm Password <span className="text-red-300">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {/* Tutor-specific fields */}
          {formData.userType === 'tutor' && (
            <div className="space-y-6 pt-6 border-t border-blue-400/20">
              <h3 className="text-white text-xl font-semibold">Tutor Information</h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expertise" className="text-white text-lg font-medium mb-2 block">
                    Subject Expertise <span className="text-red-300">*</span>
                  </label>
                  <input
                    id="expertise"
                    name="expertise"
                    type="text"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                    placeholder="e.g., Mathematics, Physics, English"
                    required={formData.userType === 'tutor'}
                  />
                </div>
                
                <div>
                  <label htmlFor="yearOfStudy" className="text-white text-lg font-medium mb-2 block">
                    Year of Study <span className="text-red-300">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                    required={formData.userType === 'tutor'}
                  >
                    <option value="" className="bg-slate-900 text-white">Select year</option>
                    <option value="1st year" className="bg-slate-900 text-white">1st Year</option>
                    <option value="2nd year" className="bg-slate-900 text-white">2nd Year</option>
                    <option value="3rd year" className="bg-slate-900 text-white">3rd Year</option>
                    <option value="4th year" className="bg-slate-900 text-white">4th Year</option>
                    <option value="graduate" className="bg-slate-900 text-white">Graduate</option>
                    <option value="postgraduate" className="bg-slate-900 text-white">Postgraduate</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="text-white text-lg font-medium mb-2 block">
                  Bio <span className="text-red-300">*</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-6 py-4 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm resize-none text-lg"
                  placeholder="Tell students about your experience, teaching style, and achievements..."
                  required={formData.userType === 'tutor'}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-400/30 text-red-200 px-6 py-4 rounded-lg text-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-lg"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-blue-400/20 text-center">
          <p className="text-slate-400 text-lg">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold hover:text-blue-400 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
