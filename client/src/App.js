import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import LearningAgents from './pages/LearningAgents';
import LearningCustomers from './pages/LearningCustomers';
import AdminDashboard from './pages/AdminDashboard';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learning/agents" element={<LearningAgents />} />
          <Route path="/learning/customers" element={<LearningCustomers />} />

          {/* CRM Routes - Protected */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={['admin', 'management']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/executive/dashboard"
            element={
              <ProtectedRoute roles={['executive', 'employee']}>
                <ExecutiveDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
