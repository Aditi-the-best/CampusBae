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
        className="backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all duration-300"
        style={{
          background: 'rgba(20, 22, 30, 0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="px-6 py-2 max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-10 md:h-11 gap-8">
            {/* Logo */}
            <div className="flex items-center cursor-pointer mr-2" onClick={() => handleNavigate('home')}>
              <h1 className="text-base font-bold tracking-tight">
                <span className="text-white">Campus</span>
                <span style={{ color: '#00E5FF' }}>Bae</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border border-white/10 shadow-sm'
                          : 'border border-transparent hover:bg-white/5 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#C0C4CC',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
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
            <div className="px-4 py-3 space-y-1 text-center bg-gray-950/95 rounded-b-3xl">
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
