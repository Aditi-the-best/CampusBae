import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { GalaxyBackground } from './GalaxyBackground';
import { FileText, X, AlertCircle } from 'lucide-react';

interface RoadmapPageProps {
  onPdfStateChange: (isOpen: boolean) => void;
}

export function RoadmapPage({ onPdfStateChange }: RoadmapPageProps) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<boolean>(false);

  const roadmaps = [
    {
      id: 1,
      title: 'AI Data Scientist',
      description: 'Master machine learning, data analysis, and AI algorithms to become a data-driven problem solver.',
      pdfPath: '/ai-data-scientist.pdf',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      icon: '🤖'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      description: 'Learn frontend, backend, and database technologies to build complete web applications.',
      pdfPath: '/full-stack.pdf',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      icon: '💻'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      description: 'Specialize in creating beautiful, responsive user interfaces with modern frameworks.',
      pdfPath: '/frontend.pdf',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      icon: '🎨'
    },
    {
      id: 4,
      title: 'Backend Developer',
      description: 'Build robust server-side applications, APIs, and database architectures.',
      pdfPath: '/backend.pdf',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      icon: '⚙️'
    },
    {
      id: 5,
      title: 'Game Developer',
      description: 'Create engaging games using modern engines and programming techniques.',
      pdfPath: '/game-developer.pdf',
      gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
      icon: '🎮'
    },
    {
      id: 6,
      title: 'Machine Learning Engineer',
      description: 'Deploy ML models at scale and build production-ready AI systems.',
      pdfPath: '/machine-learning.pdf',
      gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      icon: '🧠'
    },
    {
      id: 7,
      title: 'Electronics Core',
      description: 'Master electronics fundamentals, circuit design, and embedded systems for hardware innovation.',
      pdfPath: '/CORE_ROADMAP.pdf',
      gradient: 'linear-gradient(135deg, #7F00FF, #E100FF)',
      icon: '⚡'
    }
  ];

  const handleCardClick = (pdfPath: string) => {
    setSelectedPdf(pdfPath);
    setPdfError(false);
    onPdfStateChange(true);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
    setPdfError(false);
    onPdfStateChange(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <GalaxyBackground />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span style={{ color: '#EAEAEA' }}>Career </span>
            <span style={{ color: '#00E5FF', textShadow: '0 0 20px rgba(0, 229, 255, 0.5)' }}>
              Roadmaps
            </span>
          </h1>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#A0AEC0' }}>
            Choose your path and follow comprehensive roadmaps to become a skilled professional. 
            Each roadmap includes step-by-step guidance, resources, and milestones.
          </p>
        </div>

        {/* Roadmap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {roadmaps.map((roadmap) => (
            <GlassCard 
              key={roadmap.id}
              className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => handleCardClick(roadmap.pdfPath)}
            >
              <div className="p-6">
                {/* Icon and Gradient Header */}
                <div 
                  className="w-full h-24 rounded-lg mb-6 flex items-center justify-center text-4xl"
                  style={{ background: roadmap.gradient }}
                >
                  {roadmap.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3" style={{ color: '#EAEAEA' }}>
                  {roadmap.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm mb-6" style={{ color: '#A0AEC0' }}>
                  {roadmap.description}
                </p>
                
                {/* View Button */}
                <div className="flex items-center justify-center w-full">
                  <div 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:shadow-lg"
                    style={{ background: roadmap.gradient }}
                  >
                    <FileText size={16} />
                    View Roadmap
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* PDF Overlay */}
      {selectedPdf && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closePdfViewer}
              className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
              style={{ zIndex: 10 }}
            >
              <X size={24} />
            </button>
            
            {/* PDF Viewer */}
            {!pdfError ? (
              <iframe
                src={`${selectedPdf}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full"
                title="Career Roadmap PDF"
                style={{ border: 'none' }}
                onError={() => {
                  setPdfError(true);
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                <AlertCircle size={64} className="text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">PDF Not Found</h3>
                <p className="text-gray-600 mb-4 text-center px-4">
                  The roadmap PDF file could not be loaded. Please make sure the file exists in the public folder.
                </p>
                <button
                  onClick={() => window.open(selectedPdf, '_blank')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Opening in New Tab
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
