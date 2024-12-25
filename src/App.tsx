import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Hero from './components/Hero';
import ResumeBuilder from './pages/ResumeBuilder';
import BlogPost from './pages/BlogPost';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import PracticalTraining from './pages/services/PracticalTraining';
import InterviewPrep from './pages/services/InterviewPrep';
import ResumeBuilding from './pages/services/ResumeBuilding';
import Mentorship from './pages/services/Mentorship';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Services />
            <Testimonials />
            <CallToAction />
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/services/practical-training" element={<PracticalTraining />} />
        <Route path="/services/interview-prep" element={<InterviewPrep />} />
        <Route path="/services/resume-building" element={<ResumeBuilding />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/services/mentorship" element={<Mentorship />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
