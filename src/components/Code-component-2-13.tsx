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
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="backdrop-blur-lg border-b border-white/10"
        style={{
          background: 'rgba(16, 24, 40, 0.8)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">
                <span style={{ color: '#EAEAEA' }}>Campus</span>
                <span style={{ color: '#00E5FF', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>Bae</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`transition-colors duration-200 ${
                      currentPage === item.id
                        ? 'text-[#00E5FF]'
                        : 'text-[#EAEAEA] hover:text-[#00E5FF]'
                    }`}
                    style={{
                      textShadow: currentPage === item.id ? '0 0 8px rgba(0, 229, 255, 0.5)' : 'none'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ color: '#EAEAEA' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`block px-3 py-2 w-full text-left transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-[#00E5FF]'
                      : 'text-[#EAEAEA] hover:text-[#00E5FF]'
                  }`}
                  style={{
                    textShadow: currentPage === item.id ? '0 0 8px rgba(0, 229, 255, 0.5)' : 'none'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
