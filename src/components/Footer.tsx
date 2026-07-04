import { Heart, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Footer({ onNavigate, currentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-md border-t border-white/10 relative z-20 py-6" style={{ marginTop: '8rem' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-2 md:space-y-0">
          <div>
            <p>&copy; {currentYear} CampusBae. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-300">
              <span>Made with</span>
              <Heart className="mx-2 text-red-500 fill-current" size={16} />
              <span>by team CampusBae</span>
            </div>
            <a
              href="https://www.instagram.com/campusbae01/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-200 cursor-pointer"
              title="Follow us on Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://chat.whatsapp.com/IsDcwlhyQ0BFBwLz6ZNEVx?mode=ems_copy_t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors duration-200 cursor-pointer"
              title="Join our WhatsApp group"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
