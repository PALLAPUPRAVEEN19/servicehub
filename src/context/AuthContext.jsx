import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('myservicehub_user');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('myservicehub_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('myservicehub_user');
        }
    }, [user]);

    const login = (userData) => {
        // userData should have: { name, email, role, ... }
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const getDashboardPath = (role) => {
        switch (role) {
            case 'admin': return '/admin-dashboard';
            case 'professional': return '/professional-dashboard';
            case 'customer_support': return '/support-dashboard';
            case 'user':
            default: return '/user-dashboard';
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getDashboardPath, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
