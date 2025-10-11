import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ContactModal from './ContactModal';
import ReviewModal from './ReviewModal';
import BookSessionModal from './BookSessionModal';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedType, setSelectedType] = useState('All Types');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [favorites, setFavorites] = useState([]);
  

  const [activeModal, setActiveModal] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);

 
  useEffect(() => {
    const fetchTutors = async () => {
      try {
      const q = query(
  collection(db, "users"), 
  where("userType", "==", "tutor"),
  orderBy("name")
);
        const querySnapshot = await getDocs(q);
        const tutorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          rating: doc.data().rating || 4.5,
          reviews: doc.data().reviews || 0,
          price: doc.data().hourlyRate || 50,
          type: doc.data().availability || 'Both',
          courses: doc.data().expertise ? doc.data().expertise.split(',').map(s => s.trim()) : ['General Tutoring']
        }));
        setTutors(tutorsData);
        setFilteredTutors(tutorsData);
        
       
        
        if (user) {
          await loadFavorites();
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [user]);

  
  const loadFavorites = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFavorites(userData.favorites || []);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  
  const toggleFavorite = async (tutorId) => {
    try {
      let newFavorites;
      if (favorites.includes(tutorId)) {
        newFavorites = favorites.filter(id => id !== tutorId);
      } else {
        newFavorites = [...favorites, tutorId];
      }
      
      setFavorites(newFavorites);
      await setDoc(doc(db, "users", user.uid), { favorites: newFavorites }, { merge: true });
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  
  const openContactModal = (tutor) => {
    setSelectedTutor(tutor);
    setActiveModal('contact');
  };

  const openReviewModal = (tutor) => {
    setSelectedTutor(tutor);
    setActiveModal('review');
  };

  const openBookSessionModal = (tutor) => {
    setSelectedTutor(tutor);
    setActiveModal('book');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTutor(null);
  };

  
  const handleContactSubmit = async (contactData) => {
    try {
      const sessionData = {
        tutorId: contactData.tutorId,
        tutorName: contactData.tutorName,
        studentId: user.uid,
        studentName: user.name,
        studentEmail: user.email,
        subject: contactData.subject,
        message: contactData.message,
        sessionType: contactData.sessionType,
        preferredDate: contactData.preferredDate,
        preferredTime: contactData.preferredTime,
        status: 'pending',
        createdAt: new Date(),
        type: 'contact'
      };
      
      await setDoc(doc(collection(db, "sessions")), sessionData);
      alert(`Message sent to ${contactData.tutorName}! They will contact you soon.`);
      closeModal();
    } catch (error) {
      console.error("Error sending message:", error);
      alert('Error sending message. Please try again.');
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const reviewDoc = {
        tutorId: reviewData.tutorId,
        tutorName: reviewData.tutorName,
        studentId: user.uid,
        studentName: user.name,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date()
      };
      
      await setDoc(doc(collection(db, "reviews")), reviewDoc);
      alert('Thank you for your review!');
      closeModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert('Error submitting review. Please try again.');
    }
  };

  const handleBookSessionSubmit = async (bookingData) => {
    try {
      const sessionData = {
        tutorId: bookingData.tutorId,
        tutorName: bookingData.tutorName,
        studentId: user.uid,
        studentName: user.name,
        studentEmail: user.email,
        subject: bookingData.subject,
        sessionDate: bookingData.sessionDate,
        sessionTime: bookingData.sessionTime,
        duration: bookingData.duration,
        notes: bookingData.notes,
        price: bookingData.price,
        status: 'pending',
        createdAt: new Date(),
        type: 'booking'
      };
      
      await setDoc(doc(collection(db, "sessions")), sessionData);
      alert(`Session booked with ${bookingData.tutorName}! The tutor will confirm shortly.`);
      closeModal();
    } catch (error) {
      console.error("Error booking session:", error);
      alert('Error booking session. Please try again.');
    }
  };

  
  useEffect(() => {
    let filtered = tutors;

    
    if (searchQuery) {
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.expertise?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    if (selectedSubject !== 'All Subjects') {
      filtered = filtered.filter(tutor => 
        tutor.expertise?.toLowerCase().includes(selectedSubject.toLowerCase())
      );
    }

 
    if (selectedPrice !== 'All Prices') {
      switch (selectedPrice) {
        case '$0 - $50':
          filtered = filtered.filter(tutor => tutor.price <= 50);
          break;
        case '$50 - $70':
          filtered = filtered.filter(tutor => tutor.price > 50 && tutor.price <= 70);
          break;
        case '$70+':
          filtered = filtered.filter(tutor => tutor.price > 70);
          break;
      }
    }

    
    if (selectedType !== 'All Types') {
      filtered = filtered.filter(tutor => 
        tutor.type?.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    setFilteredTutors(filtered);
  }, [searchQuery, selectedSubject, selectedPrice, selectedType, tutors]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewFavorites = () => {
    if (favorites.length === 0) {
      alert('You have no favorite tutors yet!');
      return;
    }
    
    const favoriteTutors = tutors.filter(tutor => favorites.includes(tutor.id));
    setFilteredTutors(favoriteTutors);
    setSearchQuery('');
    setSelectedSubject('All Subjects');
    setSelectedPrice('All Prices');
    setSelectedType('All Types');
  };


  const uniqueSubjects = ['All Subjects', ...new Set(
    tutors.flatMap(tutor => 
      tutor.expertise ? tutor.expertise.split(',').map(s => s.trim()) : []
    )
  )];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)' }}>
        <div className="text-purple-300 text-xl">Loading tutors...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)' }}>
      {/* Navigation */}
      <nav className="bg-purple-900/30 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              TutorFinder
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <input
                type="text"
                placeholder="Search tutors, subjects, or courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-purple-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="text-purple-200">Welcome, {user?.name}!</span>
              <button
                onClick={handleLogout}
                className="text-purple-300 hover:text-white transition-colors"
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
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-purple-300">Find the perfect tutor for your learning needs</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  setFilteredTutors(tutors);
                  setSearchQuery('');
                  setSelectedSubject('All Subjects');
                  setSelectedPrice('All Prices');
                  setSelectedType('All Types');
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold"
              >
                Browse Tutors
              </button>
              <button 
                onClick={handleViewFavorites}
                className="px-4 py-2 text-purple-300 hover:text-white transition-colors"
              >
                Favorites ({favorites.length})
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
              className="px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {uniqueSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>All Prices</option>
              <option>$0 - $50</option>
              <option>$50 - $70</option>
              <option>$70+</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>All Types</option>
              <option>Online</option>
              <option>In-Person</option>
              <option>Both</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-purple-300 mb-6">{filteredTutors.length} tutors found</p>

        {/* Tutor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105"
            >
              {/* Header with Image and Basic Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={tutor.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.name}`}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-500/30"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{tutor.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-semibold">{tutor.rating}</span>
                      <span className="text-purple-300 text-sm">({tutor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFavorite(tutor.id)}
                  className={`transition-colors ${
                    favorites.includes(tutor.id) 
                      ? 'text-red-500 hover:text-red-400' 
                      : 'text-purple-300 hover:text-purple-400'
                  }`}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill={favorites.includes(tutor.id) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Bio */}
              <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                {tutor.bio || 'No bio available.'}
              </p>

              {/* Expertise Tags */}
              <div className="mb-4">
                <p className="text-purple-300 text-xs font-semibold mb-2">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.expertise ? (
                    tutor.expertise.split(',').slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-full border border-purple-500/30"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-purple-300 text-sm">No expertise listed</span>
                  )}
                </div>
              </div>

              {/* Price and Type */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="text-purple-200">
                  <span className="text-white font-semibold">${tutor.price}/hour</span>
                </div>
                <div className="text-purple-300">
                  📍 {tutor.type}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => openContactModal(tutor)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Contact
                </button>
                <button 
                  onClick={() => openBookSessionModal(tutor)}
                  className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-purple-200 hover:bg-purple-900/50 rounded-lg transition-all"
                >
                  Book Session
                </button>
                <button 
                  onClick={() => openReviewModal(tutor)}
                  className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-purple-200 hover:bg-purple-900/50 rounded-lg transition-all"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTutors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-purple-300 text-lg">No tutors found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('All Subjects');
                setSelectedPrice('All Prices');
                setSelectedType('All Types');
                setFilteredTutors(tutors);
              }}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTutor && (
        <>
          <ContactModal
            tutor={selectedTutor}
            isOpen={activeModal === 'contact'}
            onClose={closeModal}
            onSubmit={handleContactSubmit}
          />
          
          <ReviewModal
            tutor={selectedTutor}
            isOpen={activeModal === 'review'}
            onClose={closeModal}
            onSubmit={handleReviewSubmit}
          />
          
          <BookSessionModal
            tutor={selectedTutor}
            isOpen={activeModal === 'book'}
            onClose={closeModal}
            onSubmit={handleBookSessionSubmit}
          />
        </>
      )}
    </div>
  );
}