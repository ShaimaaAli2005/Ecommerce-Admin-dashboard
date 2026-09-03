import React from "react";
import { createContext , useContext , useEffect , useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ( { children }) => {
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=> {
        const checkAuthStatus = () => {
            const savedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (savedUser && token) {
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };
        checkAuthStatus();
    }, []);

const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
};

return (
    <AuthContext.Provider value={{ user, login, loading, logout}}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = ( ) => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an authProvider')
    }
    return context;
};