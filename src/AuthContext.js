// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const sessionDuration = 900000;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const timer = setTimeout(() => {
          signOut(auth);
          navigate("/home");
        }, sessionDuration);

        return () => clearTimeout(timer);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate("/editor");
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/home");
    } catch (error) {
      setError('Error al cerrar sesión: ' + error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);