
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requireAuth = true, userType = null }) {
  const { user, loading } = useAuth();

  // the purpose of this component is to wrap around routes that need protection based on authentication status and user type
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // this is is whereby if the route requires authentication but the user is not logged in, they are redirected to login
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // and this is whereby if the route does not require authentication but the user is logged in, they are redirected to dashboard
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // this section checks if the route is restricted to a specific user type and if the logged-in user matches that type
  if (requireAuth && user && userType && user.userType !== userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center px-4">
        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-blue-200 mb-6">
            This page is only available for {userType}s.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}