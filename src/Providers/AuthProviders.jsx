import React, { createContext, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const emptyUser = () => {
    setUser(null);
  }

  const createUser = (email, password) => {

    return createUserWithEmailAndPassword(auth, email, password);
  }
  const login = (email, password) => {

    return signInWithEmailAndPassword(auth, email, password);
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);

  }

  const checkPassword = (password) => {

    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&?"]).{8,}$/.test(password))

  }

  useState(() => {

    const unsbscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsbscribe();
    }
  }, [])

  const logOut = () => {
    return signOut(auth)
  }

  const authInfo = {
    user,
    emptyUser,
    createUser,
    loading,
    login,
    logOut,
    checkPassword,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {
        children
      }
    </AuthContext.Provider>
  )
}

export default AuthProviders