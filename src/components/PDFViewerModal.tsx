import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ProcessedResource } from '../services/resourcesService';

interface PDFViewerModalProps {
  resource: ProcessedResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PDFViewerModal({ resource, isOpen, onClose }: PDFViewerModalProps) {
  
  // Hide/show navbar when modal opens/closes
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      if (isOpen) {
        navbar.style.display = 'none';
      } else {
        navbar.style.display = '';
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, [isOpen]);

  if (!isOpen || !resource) return null;

  // Convert Google Drive viewer URL to embed URL for iframe
  const getEmbedUrl = (publicUrl: string) => {
    try {
      // Extract file ID from viewer URL
      const match = publicUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const fileId = match[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      return publicUrl;
    } catch (error) {
      return publicUrl;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div>
            <h3 className="text-lg font-semibold truncate" style={{ color: '#EAEAEA' }}>
              {resource.displayName}
            </h3>
            <p className="text-sm" style={{ color: '#A0AEC0' }}>
              {resource.subject} • {resource.type.toUpperCase()}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-red-600/20"
              style={{ color: '#FF6B6B' }}
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="w-full h-full flex items-center justify-center" style={{ height: 'calc(100vh - 73px)' }}>
          <iframe
            src={getEmbedUrl(resource.publicUrl)}
            className="w-full h-full border-0"
            title={`PDF Viewer - ${resource.displayName}`}
            allow="autoplay"
            onError={(e) => {
              console.error('PDF loading error:', e);
            }}
          />
        </div>
      </div>
    </div>
  );
}