import React, { createContext, useContext, useEffect, useState } from 'react'
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on app load
    useEffect( () => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            }
            setloading(false)
        }

        checkAuth();
    }, []);

    // Register new user
    const register = async (userData) => {
        try {
            const data = await authAPI.register(userData)
            setUser(data.user);
            setIsAuthenticated(true);
            return {success: true, data}
        } catch (error) {
            return {success: false, error: error.message}
        }
    }

    // Login user
    const login = async (credentials) => {
        try {
            const data = await authAPI.login(credentials);
            setUser(data.user);
            setIsAuthenticated(true);
            return {success: true, data}
        } catch (error) {
            return {success: false, error: error.message}
        }
    }

    // Logout user
    const logout = () => {
        authAPI.logout();
        setUser(null);
        setIsAuthenticated(false)
    }

    const value = {
        user,
        loading,
        isAuthenticated,
        register, 
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}