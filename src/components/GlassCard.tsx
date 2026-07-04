import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  return (
    <div
      className={`
        backdrop-blur-xl rounded-2xl border border-white/15 p-6
        transition-all duration-300
        ${hover ? 'hover:shadow-2xl hover:border-[#00E5FF]/30' : ''}
        ${className}
      `}
      style={{
        background: 'rgba(16, 24, 40, 0.7)',
        boxShadow: hover ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.3)'
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
