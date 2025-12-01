import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

export const AunthContext = createContext(null);



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  

  

  function handleCreateUser(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function handleGoogleSignIn() {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  function handleSignIn(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function handleSignOut() {
    return signOut(auth);
  }

  function handleUpdateData(user, profileData) {
    return updateProfile(user, profileData);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Provide the loading context to children
  const authInfo = {
    handleCreateUser,
    loading,
    setLoading,
    user,
    setUser,
    handleGoogleSignIn,
    handleSignIn,
    handleSignOut,
   handleUpdateData,
    details,
    setDetails,
   
  };

  return (
    <AunthContext.Provider value={authInfo}>
     
        {children}
     
    </AunthContext.Provider>
  );
};

export default AuthProvider;
