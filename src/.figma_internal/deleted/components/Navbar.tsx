import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resources', label: 'Branch Resources' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'societies', label: 'Societies' },
    { id: 'networking', label: 'Networking' },
    { id: 'profile', label: 'Profile' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ">
      {/* Long capsule-shaped navbar container */}
      <div 
        className="backdrop-blur-lg rounded-full px-8 py-4 border border-white/20"
        style={{
          background: 'rgba(16, 24, 40, 0.9)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center mr-4">
            <h1 className="text-lg font-semibold whitespace-nowrap">
              <span style={{ color: '#EAEAEA' }}>Campus</span>
              <span style={{ color: '#00E5FF', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>Bae</span>
            </h1>
          </div>

          {/* Navigation items - Always visible */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium whitespace-nowrap ${
                  currentPage === item.id
                    ? 'text-[#0A0F1C] shadow-lg'
                    : 'text-[#EAEAEA] hover:text-[#00E5FF] hover:bg-white/10'
                }`}
                style={{
                  background: currentPage === item.id 
                    ? 'linear-gradient(135deg, #00E5FF, #0D47A1)' 
                    : 'transparent',
                  textShadow: currentPage === item.id ? 'none' : undefined
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Scrollable horizontal capsule */}
      <div 
        className="lg:hidden backdrop-blur-lg rounded-full px-4 py-3 border border-white/20 overflow-x-auto scrollbar-hide"
        style={{
          background: 'rgba(16, 24, 40, 0.9)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center space-x-4 min-w-max">
          {/* Mobile Logo */}
          <div className="flex items-center mr-2">
            <h1 className="text-sm font-semibold whitespace-nowrap">
              <span style={{ color: '#EAEAEA' }}>Campus</span>
              <span style={{ color: '#00E5FF', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>Bae</span>
            </h1>
          </div>

          {/* Mobile Navigation items */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 text-xs font-medium whitespace-nowrap ${
                currentPage === item.id
                  ? 'text-[#0A0F1C] shadow-lg'
                  : 'text-[#EAEAEA] hover:text-[#00E5FF] hover:bg-white/10'
              }`}
              style={{
                background: currentPage === item.id 
                  ? 'linear-gradient(135deg, #00E5FF, #0D47A1)' 
                  : 'transparent',
                textShadow: currentPage === item.id ? 'none' : undefined
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
