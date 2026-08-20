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
    { id: 'roadmap', label: 'Roadmaps' },
    { id: 'networking', label: 'Networking' },
    { id: 'profile', label: 'Profile' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div 
        className="backdrop-blur-xl border border-white/15 rounded-full shadow-2xl transition-all duration-300 hover:border-[#00E5FF]/30"
        style={{
          background: 'rgba(16, 24, 40, 0.65)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        }}
      >
        <div className="px-6 py-2 md:py-3 max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-10 md:h-12 gap-8">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
              <h1 className="text-lg font-bold">
                <span style={{ color: '#EAEAEA' }}>Campus</span>
                <span style={{ color: '#00E5FF', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>Bae</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-6 lg:space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`transition-all duration-200 cursor-pointer text-sm font-medium ${
                      currentPage === item.id
                        ? 'text-[#00E5FF] font-semibold scale-105'
                        : 'text-[#EAEAEA]/80 hover:text-[#00E5FF] hover:scale-105'
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
                className="h-8 w-8 p-0"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 rounded-b-3xl">
            <div className="px-4 py-3 space-y-1 text-center bg-gray-950/80 rounded-b-3xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`block px-3 py-2 w-full text-center rounded-lg transition-colors duration-200 cursor-pointer text-sm ${
                    currentPage === item.id
                      ? 'text-[#00E5FF] bg-white/5'
                      : 'text-[#EAEAEA] hover:text-[#00E5FF] hover:bg-white/5'
                  }`}
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
