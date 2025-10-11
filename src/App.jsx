// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import StudentDashboard from "./components/StudentDashboard";
import TutorDashboard from "./components/TutorDashboard";

function DashboardSelector() {
  const { user } = useAuth();
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }
  
  return user.userType === 'tutor' ? <TutorDashboard /> : <StudentDashboard />;
}

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light' ? false : true;
  });
  const { user, logout } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to right, #8b5cf6 0%, #581c87 50%, #000000 100%)' }}>
      
      <nav className="bg-gradient-to-r from-violet-500/30 via-purple-900/30 to-black/30 backdrop-blur-xl border-b border-violet-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-400">
              TutorFinder
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">About Us</a>
              <a href="#tutors" className="text-slate-400 hover:text-white transition-colors">Tutors</a>
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</a>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-slate-300">Welcome, {user.name}!</span>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white rounded-lg transition-all font-semibold"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-gradient-to-r from-violet-500/30 via-purple-900/30 to-black/30 hover:from-violet-500/50 hover:via-purple-900/50 hover:to-black/50 text-slate-300 rounded-lg transition-all border border-violet-400/30 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                   className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white rounded-lg transition-all font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gradient-to-r from-violet-500/30 via-purple-900/30 to-black/30 hover:from-violet-500/50 hover:via-purple-900/50 hover:to-black/50 text-slate-300 border border-violet-400/30 transition-all"
              >
                {darkMode ? <BsSun size={20} className="text-yellow-400" /> : <BsMoon size={20} />}
              </button>

              <button
                className="md:hidden text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-gradient-to-r from-violet-500/30 via-purple-900/30 to-black/30 backdrop-blur-xl border-b border-violet-400/20">
          <a href="#about" className="text-slate-300 hover:text-white transition-colors">About Us</a>
          <a href="#tutors" className="text-slate-300 hover:text-white transition-colors">Tutors</a>
          <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</a>
          {user ? (
            <>
              <span className="text-slate-300">Welcome, {user.name}!</span>
              <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
              <button onClick={logout} className="text-left text-slate-300 hover:text-white transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
              <Link to="/signup" className="text-slate-300 hover:text-white transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-violet-500/10 via-purple-900/10 to-black/10 backdrop-blur-xl rounded-2xl p-12 shadow-2xl border border-violet-400/20">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-8">
            Find Your Perfect Tutor
          </h1>

          <h2 className="text-3xl font-bold mt-16 mb-12 text-white text-center">Why Choose Us?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-violet-500/10 via-purple-900/10 to-black/10 backdrop-blur-xl rounded-xl p-6 border border-violet-400/20 hover:border-violet-400/40 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-white">Verified Tutors</h3>
              <p className="text-slate-300">
                All tutors are background-checked and verified by our team.
              </p>
            </div>
            <div className="bg-gradient-to-r from-violet-500/10 via-purple-900/10 to-black/10 backdrop-blur-xl rounded-xl p-6 border border-violet-400/20 hover:border-violet-400/40 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-white">Flexible Scheduling</h3>
              <p className="text-slate-300">
                Book sessions at your convenience, online or in-person.
              </p>
            </div>
            <div className="bg-gradient-to-r from-violet-500/10 via-purple-900/10 to-black/10 backdrop-blur-xl rounded-xl p-6 border border-violet-400/20 hover:border-violet-400/40 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-white">Affordable Rates</h3>
              <p className="text-slate-300">
                Choose from a variety of price points that suit your budget.
              </p>
            </div>
          </div>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto mt-16 text-slate-300 text-center">
            Connect with expert tutors in any subject, anytime, anywhere.
          </p>
          
          <div className="text-center mt-8">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white rounded-lg shadow-lg transition-all text-xl font-semibold"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white rounded-lg shadow-lg transition-all text-xl font-semibold"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-violet-500/30 via-purple-900/30 to-black/30 backdrop-blur-xl border-t border-violet-400/20 text-slate-300 text-center py-6 mt-12">
        <p>
          © {new Date().getFullYear()} TutorFinder. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Signup />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireAuth={true}>
                <DashboardSelector />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}