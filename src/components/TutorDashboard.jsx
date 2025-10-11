
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/config";

export default function TutorDashboard() {
  const { user, logout, updateProfile, uploadProfilePicture } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    sessionsCompleted: 0,
    totalEarnings: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        bio: user.bio || '',
        expertise: user.expertise || '',
        hourlyRate: user.hourlyRate || '',
        availability: user.availability || ''
      });
      fetchTutorData();
    }
  }, [user]);

  const fetchTutorData = async () => {
    try {
      const sessionsQuery = query(
        collection(db, "sessions"),
        where("tutorId", "==", user.uid),
        where("status", "==", "scheduled"),
        orderBy("sessionDate", "asc")
      );
      const sessionsSnapshot = await getDocs(sessionsQuery);
      const sessionsData = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUpcomingSessions(sessionsData);

      const reviewsQuery = query(
        collection(db, "reviews"),
        where("tutorId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewsData = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentReviews(reviewsData);

      calculateStats();
    } catch (error) {
      console.error("Error fetching tutor data:", error);
    }
  };

  const calculateStats = async () => {
    setStats({
      totalStudents: 12,
      sessionsCompleted: 48,
      totalEarnings: 2450,
      averageRating: 4.8
    });
  };

  const handleSaveProfile = async () => {
    const result = await updateProfile(user.uid, editForm);
    if (result.success) {
      setIsEditing(false);
    } else {
      alert('Error updating profile: ' + result.error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      return;
    }

    setUploadingImage(true); 

    const result = await uploadProfilePicture(user.uid, file);
    setUploadingImage(false); 
    

    if (result.success) {
      alert('Profile picture updated successfully!');
    } else {
      alert('Error updating profile picture: ' + result.error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)' }}
      >
        <div className="text-purple-300 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)' }}>
      <nav className="bg-purple-900/30 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              TutorFinder
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-purple-200">Welcome, {user.name}!</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name?.split(' ')[0] || 'Tutor'}!
          </h1>
          <p className="text-purple-300">Manage your tutoring profile and sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2">Sessions Completed</h3>
            <p className="text-3xl font-bold text-white">{stats.sessionsCompleted}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-white">${stats.totalEarnings}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2">Average Rating</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-white mr-2">{stats.averageRating}</span>
              <span className="text-yellow-400">⭐</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Your Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative">
                  {uploadingImage ? (
                    <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 flex items-center justify-center bg-purple-900/30">
                      <div className="text-purple-300">Uploading...</div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                        alt={user?.name}
                        className="w-16 h-16 rounded-full border-2 border-purple-500/30"
                      />
                      <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-full cursor-pointer text-xs">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        📷
                      </label>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
                  <p className="text-purple-300">{user?.email}</p>
                  <p className="text-purple-300">Rating: {stats.averageRating} ⭐ ({stats.totalStudents} students)</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Bio</h4>
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => handleEditChange('bio', e.target.value)}
                    className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="3"
                    placeholder="Tell students about your teaching experience and style..."
                  />
                ) : (
                  <p className="text-purple-200 text-sm">
                    {user?.bio || 'No bio added yet. Update your profile to add a bio.'}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Expertise</h4>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.expertise}
                    onChange={(e) => handleEditChange('expertise', e.target.value)}
                    className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Mathematics, Physics, Computer Science"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user?.expertise ? (
                      user.expertise.split(',').map((skill, index) => (
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
                )}
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Hourly Rate</h4>
                {isEditing ? (
                  <input
                    type="number"
                    value={editForm.hourlyRate}
                    onChange={(e) => handleEditChange('hourlyRate', e.target.value)}
                    className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your hourly rate"
                  />
                ) : (
                  <p className="text-purple-200">${user?.hourlyRate || 'Not set'}/hour</p>
                )}
              </div>

              {isEditing && (
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  Save Changes
                </button>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-semibold text-white mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map(session => (
                    <div key={session.id} className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{session.studentName}</h4>
                          <p className="text-purple-300 text-sm">{session.subject}</p>
                        </div>
                        <span className="text-purple-200 text-sm bg-purple-800/50 px-2 py-1 rounded">
                          {new Date(session.sessionDate).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm transition-colors">
                          Start
                        </button>
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-purple-300 text-center">No upcoming sessions</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {recentReviews.length > 0 ? (
                recentReviews.map(review => (
                  <div key={review.id} className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{review.studentName}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-white">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-purple-200 text-sm">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-purple-300 text-center">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}