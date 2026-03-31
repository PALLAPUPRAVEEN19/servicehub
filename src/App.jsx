import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import CustomerSupportPage from './pages/CustomerSupportPage';

// Role-protected dashboards
import AdminDashboard from './pages/AdminDashboard';
import AdminTicketsPage from './pages/AdminTicketsPage';
import UserDashboard from './pages/UserDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import SupportDashboard from './pages/SupportDashboard';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/support" element={<CustomerSupportPage />} />

            {/* Protected: Admin Only */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-tickets"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTicketsPage />
                </ProtectedRoute>
              }
            />

            {/* Protected: User Only */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected: Professional Only */}
            <Route
              path="/professional-dashboard"
              element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected: Customer Support Only */}
            <Route
              path="/support-dashboard"
              element={
                <ProtectedRoute allowedRoles={['customer_support']}>
                  <SupportDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected: Chat (User & Professional) */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute allowedRoles={['user', 'professional']}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
