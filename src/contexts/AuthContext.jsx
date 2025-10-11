import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { auth, db, storage } from "../firebase/config"; 

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ uid: firebaseUser.uid, ...userDoc.data() });
          } else {
            const basicUser = {
              uid: firebaseUser.uid,
              name: firebaseUser.email.split('@')[0],
              email: firebaseUser.email,
              role: 'student'
            };
            await setDoc(doc(db, "users", firebaseUser.uid), basicUser);
            setUser(basicUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const userDoc = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        campus: userData.campus,
        ...(userData.role === 'tutor' && {
          expertise: userData.expertise,
          bio: userData.bio,
          yearOfStudy: userData.yearOfStudy,
          hourlyRate: '',
          availability: ''
        })
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userDoc);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userId, updates) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "users", userId), updates, { merge: true });
      
      setUser(prev => ({ ...prev, ...updates }));
      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

const uploadProfilePicture = async (userId, file) => {
  try {
    const storageRef = ref(storage, `profile-pictures/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await setDoc(doc(db, "users", userId), { image: downloadURL }, { merge: true });
    setUser(prev => ({ ...prev, image: downloadURL }));
    return { success: true, imageUrl: downloadURL };
  } catch (error) {
    console.error("Profile picture upload error:", error);
    return { success: false, error: error.message };
  }
};

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    uploadProfilePicture,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};