
// src/components/Dashboard.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedType, setSelectedType] = useState('All Types');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

 
  const tutors = [
    {
      id: 1,
      name: 'Maime Retselisitsoe',
      rating: 4.9,
      reviews: 2,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Experienced Computer Science professor with 8+ years of teaching experience. I specialize in helping...',
      expertise: ['Computer Science', 'Programming', 'Software Development'],
      courses: ['Introduction to Programming', 'Data Structures & Algorithms'],
      price: 60,
      type: 'Both'
    },
    {
      id: 2,
      name: 'Michael Mohlolo',
      rating: 4.8,
      reviews: 1,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      bio: 'CPA with extensive experience in corporate accounting and financial management. I help students unde...',
      expertise: ['Accounting', 'Financial Management', 'Auditing'],
      courses: ['Financial Accounting', 'Managerial Accounting'],
      price: 55,
      type: 'Online'
    },
    {
      id: 3,
      name: 'Khothato Tente',
      rating: 4.7,
      reviews: 0,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      bio: 'Risk Management specialist with 10+ years in healthcare administration. I combine theoretical knowle...',
      expertise: ['Risk Management', 'Healthcare Policy', 'Quality Assurance'],
      courses: ['Healthcare Risk Management', 'Patient Safety'],
      price: 65,
      type: 'In-Person'
    },
    {
      id: 4,
      name: 'Thembiswa Lerotholi',
      rating: 4.9,
      reviews: 2,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      bio: 'Mathematics expert specializing in calculus and statistics. Passionate about making complex concepts...',
      expertise: ['Mathematics', 'Statistics', 'Calculus'],
      courses: ['Advanced Calculus', 'Statistical Analysis'],
      price: 70,
      type: 'Both'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      {/* Navigation */}
      <nav className="bg-slate-900/30 backdrop-blur-xl border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
              Tutor Finder
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <input
                type="text"
                placeholder="Search tutors, subjects, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="text-slate-300">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User  '}!
          </h1>
          <p className="text-slate-400">Find the perfect tutor for your learning needs</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-blue-400/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
                Browse Tutors
              </button>
              <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
                Favorites (0)
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search tutors, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>All Subjects</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Accounting</option>
              <option>Healthcare</option>
            </select>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-3 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>All Prices</option>
              <option>$0 - $50</option>
              <option>$50 - $70</option>
              <option>$70+</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-slate-900/30 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>All Types</option>
              <option>Online</option>
              <option>In-Person</option>
              <option>Both</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-slate-400 mb-6">{tutors.length} tutors found</p>

        {/* Tutor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all hover:transform hover:scale-105"
            >
              {/* Header with Image and Basic Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-400/30"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{tutor.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-semibold">{tutor.rating}</span>
                      <span className="text-slate-400 text-sm">({tutor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Bio */}
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {tutor.bio}
              </p>

              {/* Expertise Tags */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs font-semibold mb-2">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.expertise.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/30 text-slate-300 text-xs rounded-full border border-blue-400/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {tutor.expertise.length > 3 && (
                    <span className="px-3 py-1 bg-blue-500/30 text-slate-300 text-xs rounded-full border border-blue-400/30">
                      +{tutor.expertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Courses */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs font-semibold mb-2">📚 Courses</p>
                <div className="space-y-1">
                  {tutor.courses.slice(0, 2).map((course, index) => (
                    <p key={index} className="text-slate-300 text-sm">• {course}</p>
                  ))}
                  {tutor.courses.length > 2 && (
                    <p className="text-slate-400 text-xs">+{tutor.courses.length - 2} more</p>
                  )}
                </div>
              </div>

              {/* Price and Type */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="text-slate-300">
                  <span className="text-white font-semibold">${tutor.price}/hour</span>
                </div>
                <div className="text-slate-400">
                   {tutor.type}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                  Contact
                </button>
                <button className="px-4 py-2 bg-slate-900/30 border border-blue-400/30 text-slate-300 hover:bg-slate-900/50 rounded-lg transition-all">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
