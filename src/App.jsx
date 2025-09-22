// @ts-nocheck
import { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";

// Simple Auth Context
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        userType: 'student'
      };
      setUser(newUser);
      setLoading(false);
    }, 1000);
  };

  const signup = async (userData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        userType: userData.userType || 'student'
      };
      setUser(newUser);
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Simple Login Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="auth-page-container min-h-screen w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-16 w-full shadow-2xl" style={{ maxWidth: '800px', minWidth: '600px' }}>
        <div className="text-center mb-12">
          <Link to="/" className="text-5xl font-bold text-white hover:text-blue-200 transition-colors">
            TutorFinder
          </Link>
          <h2 className="mt-10 text-4xl font-semibold text-white">Welcome Back</h2>
          <p className="mt-4 text-blue-200 text-xl">Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label htmlFor="email" className="text-white text-xl font-medium mb-4 block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-8 py-6 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-xl"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="text-white text-xl font-medium mb-4 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-8 py-6 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-xl"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-800 text-2xl"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-white/20 text-center">
          <p className="text-blue-200 text-xl">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white font-semibold hover:text-blue-200 transition-colors text-xl">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple Signup Component
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    campus: 'maseru',
    // Tutor-specific fields
    expertise: '',
    bio: '',
    yearOfStudy: ''
  });
  const { signup, loading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
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

    // Additional validation for tutors
    if (formData.userType === 'tutor') {
      if (!formData.expertise || !formData.bio || !formData.yearOfStudy) {
        setError('Please fill in all tutor-specific fields');
        return;
      }
    }

    signup(formData);
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
    <div className="auth-page-container min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-4xl shadow-2xl my-8">
        <div className="text-center mb-8 sticky top-0 bg-inherit z-10 pb-4">
          <Link to="/" className="text-3xl font-bold text-white hover:text-blue-200 transition-colors">
            TutorFinder
          </Link>
          <h2 className="mt-6 text-2xl font-semibold text-white">Join TutorFinder</h2>
          <p className="mt-2 text-blue-200">Create your account and start learning</p>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div>
            <label className="text-white text-sm font-medium mb-3 block">
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
                  className="mr-3 text-blue-600 focus:ring-blue-500"
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
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-white text-lg">Tutor</span>
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-white text-sm font-medium mb-2 block">
                Full Name <span className="text-red-300">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-white text-sm font-medium mb-2 block">
                Email Address <span className="text-red-300">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Campus Selection */}
          <div>
            <label htmlFor="campus" className="text-white text-sm font-medium mb-2 block">
              Campus <span className="text-red-300">*</span>
            </label>
            <select
              id="campus"
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
              required
            >
              <option value="maseru" className="bg-blue-900 text-white">Maseru Campus</option>
              <option value="botswana" className="bg-blue-900 text-white">Botswana Campus</option>
            </select>
          </div>

          {/* Password Fields */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="text-white text-sm font-medium mb-2 block">
                Password <span className="text-red-300">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Create password (6+ characters)"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-white text-sm font-medium mb-2 block">
                Confirm Password <span className="text-red-300">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {/* Tutor-specific fields */}
          {formData.userType === 'tutor' && (
            <div className="space-y-6 pt-6 border-t border-white/20">
              <h3 className="text-white text-xl font-semibold">Tutor Information</h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expertise" className="text-white text-sm font-medium mb-2 block">
                    Subject Expertise <span className="text-red-300">*</span>
                  </label>
                  <input
                    id="expertise"
                    name="expertise"
                    type="text"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                    placeholder="e.g., Mathematics, Physics, English"
                    required={formData.userType === 'tutor'}
                  />
                </div>
                
                <div>
                  <label htmlFor="yearOfStudy" className="text-white text-sm font-medium mb-2 block">
                    Year of Study <span className="text-red-300">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm text-lg"
                    required={formData.userType === 'tutor'}
                  >
                    <option value="" className="bg-blue-900 text-white">Select year</option>
                    <option value="1st year" className="bg-blue-900 text-white">1st Year</option>
                    <option value="2nd year" className="bg-blue-900 text-white">2nd Year</option>
                    <option value="3rd year" className="bg-blue-900 text-white">3rd Year</option>
                    <option value="4th year" className="bg-blue-900 text-white">4th Year</option>
                    <option value="graduate" className="bg-blue-900 text-white">Graduate</option>
                    <option value="postgraduate" className="bg-blue-900 text-white">Postgraduate</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="text-white text-sm font-medium mb-2 block">
                  Bio <span className="text-red-300">*</span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm resize-none text-lg"
                  placeholder="Tell students about your experience, teaching style, and achievements..."
                  required={formData.userType === 'tutor'}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-6 py-4 rounded-lg text-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-800 text-lg"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-blue-200 text-lg">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold hover:text-blue-200 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple Dashboard Component
const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">TutorFinder</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user?.name}!</span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            {user?.userType === 'tutor' ? 'Tutor Dashboard' : 'Student Dashboard'}
          </h2>
          <p className="text-xl mb-8">
            Welcome to your dashboard, {user?.name}!
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Getting Started</h3>
            <p className="text-blue-200">
              Your authentication system is now working! You can expand from here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user } = useAuth();

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Landing Page Component
function LandingPageContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { user, logout } = useAuth();

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} font-sans min-w-screen`}>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-indigo-900 via-blue-900 to-black">
        <div className="text-2xl font-bold">TutorFinder</div>

        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-white">Welcome, {user.name}!</span>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-indigo-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-black/20 hover:bg-white/30"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-gradient-to-b from-indigo-900 to-black">
          <a href="#about" className="hover:text-indigo-400">About Us</a>
          <a href="#tutors" className="hover:text-indigo-400">Tutors</a>
          <a href="#contact" className="hover:text-indigo-400">Contact Us</a>
          
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}!</span>
              <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
              <button onClick={logout} className="text-left hover:text-indigo-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400">Login</Link>
              <Link to="/signup" className="hover:text-indigo-400">Sign Up</Link>
            </>
          )}
        </div>
      )}
      
      <div className="font-sans min-w-screen">
        <header className="bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white text-center py-10 px-6 min-h-screen">
          <h1 className="text-4xl md:text-6xl font-bold">
            Find Your Perfect Tutor
          </h1>

          <h2 className="text-3xl font-bold mt-20 mb-10">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
              <p className="text-white">
                All tutors are background-checked and verified by our team.
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-white">
                Book sessions at your convenience, online or in-person.
              </p>
            </div>
            <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-black shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Affordable Rates</h3>
              <p className="text-white">
                Choose from a variety of price points that suit your budget.
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-15">
            Connect with expert tutors in any subject, anytime, anywhere.
          </p>
          
          {user ? (
            <Link
              to="/dashboard"
              className="inline-block mt-6 px-6 py-3 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white rounded-lg shadow hover:bg-gray-100 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="inline-block mt-6 px-6 py-3 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white rounded-lg shadow hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          )}
        </header>
      </div>
        
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>
          © {new Date().getFullYear()} TutorFinder. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageContent />} />
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignupPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireAuth={true}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}