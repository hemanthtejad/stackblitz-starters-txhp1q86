import React from 'react';
import { Menu, X, GraduationCap, ChevronDown, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServicesMenu from './ServicesMenu';
import { useAuth } from '../lib/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50" role="banner">
      <nav className="enterprise-container py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-gray-900" />
            <span className="text-xl font-display font-bold text-gray-900" aria-label="HorizonLync Home">HorizonLync</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <button className="nav-link flex items-center group-hover:text-[#1877F2]">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <ServicesMenu 
                isOpen={isServicesMenuOpen}
                onClose={() => setIsServicesMenuOpen(false)}
              />
            </div>
            <NavLink to="/blog">Blog</NavLink>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="nav-link flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="nav-link flex items-center text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/register" className="btn-primary">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClose={closeMenu}>Home</MobileNavLink>
              <div className="px-4 py-2 font-medium text-gray-900">Services:</div>
              <MobileNavLink to="/services/practical-training" className="pl-8" onClose={closeMenu}>Training</MobileNavLink>
              <MobileNavLink to="/services/interview-prep" className="pl-8" onClose={closeMenu}>Interview Prep</MobileNavLink>
              <MobileNavLink to="/services/resume-building" className="pl-8" onClose={closeMenu}>Resume Building</MobileNavLink>
              <MobileNavLink to="/services/mentorship" className="pl-8" onClose={closeMenu}>Mentorship</MobileNavLink>
              <MobileNavLink to="/blog" onClose={closeMenu}>Blog</MobileNavLink>
              <Link 
                to="/contact" 
                className="w-full btn-primary"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => (
  <Link
    to={to}
    className="nav-link"
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

const MobileNavLink = ({ to, children, className = '', onClose }: MobileNavLinkProps) => (
  <Link
    to={to}
    className={`block nav-link ${className}`}
    onClick={onClose}
  >
    {children}
  </Link>
);

export default Header;