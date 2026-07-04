import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Book, FileText, Download, Eye, Loader2, AlertCircle } from 'lucide-react';
import { resourcesService, ProcessedResource } from '../services/resourcesService';
import { PDFViewerModal } from './PDFViewerModal';

interface ResourcesListProps {
  selectedBranch: string;
  selectedSemester: string;
  selectedSubjects: string[];
  selectedTypes: string[];
  searchQuery: string;
}

export function ResourcesList({ 
  selectedBranch, 
  selectedSemester, 
  selectedSubjects, 
  selectedTypes, 
  searchQuery 
}: ResourcesListProps) {
  const [resources, setResources] = useState<ProcessedResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<ProcessedResource | null>(null);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  // Load resources when filters change
  useEffect(() => {
    loadResources();
  }, [selectedSubjects, selectedTypes, searchQuery]);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Don't fetch if no subjects or types selected
      if (selectedSubjects.length === 0 || selectedTypes.length === 0) {
        setResources([]);
        return;
      }

      const fetchedResources = await resourcesService.getFilteredFiles({
        subjects: selectedSubjects,
        types: selectedTypes,
        searchQuery
      });

      setResources(fetchedResources);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'notes': return <Book size={20} />;
      case 'book': return <Book size={20} />;
      case 'pyqs': return <FileText size={20} />;
      case 'syllab': return <FileText size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'notes': return '#00E5FF';
      case 'book': return '#4CAF50';
      case 'pyqs': return '#FF9800';
      case 'syllab': return '#9C27B0';
      default: return '#00E5FF';
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return 'Unknown date';
    }
  };

  const handleOpen = (resource: ProcessedResource) => {
    setSelectedResource(resource);
    setIsPDFViewerOpen(true);
  };

  const closePDFViewer = () => {
    setIsPDFViewerOpen(false);
    setSelectedResource(null);
  };

  const handleDownload = async (resource: ProcessedResource) => {
    try {
      // Extract file ID from Google Drive URL
      const fileId = resource.publicUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      
      if (!fileId) {
        throw new Error('Could not extract file ID');
      }

      // Open Google Drive in new tab - user can download from there
      const downloadUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      window.open(downloadUrl, '_blank');
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open original URL
      window.open(resource.publicUrl, '_blank');
    }
  };

  const getUnitDisplayName = (unit?: string): string => {
    if (!unit) return '';
    
    // Handle different unit formats
    if (unit.toLowerCase().startsWith('u')) {
      return `Unit ${unit.substring(1)}`;
    } else if (unit.toLowerCase() === 'midsem') {
      return 'Mid Semester';
    } else if (unit.toLowerCase() === 'endsem') {
      return 'End Semester';
    }
    
    return unit;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin mr-2" size={24} style={{ color: '#00E5FF' }} />
        <span style={{ color: '#EAEAEA' }}>Loading resources...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4" size={48} style={{ color: '#FF6B6B' }} />
          <p className="text-xl mb-2" style={{ color: '#FF6B6B' }}>
            Error Loading Resources
          </p>
          <p className="mb-4" style={{ color: '#A0AEC0' }}>
            {error}
          </p>
          <button
            onClick={loadResources}
            className="px-4 py-2 rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: 'rgba(0, 229, 255, 0.2)',
              color: '#00E5FF',
              border: '1px solid rgba(0, 229, 255, 0.3)'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show message when no filters are selected
  if (selectedSubjects.length === 0 || selectedTypes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-2" style={{ color: '#A0AEC0' }}>
          Select filters to view resources
        </p>
        <p style={{ color: '#A0AEC0' }}>
          Choose branch, semester, subjects, and resource types to get started
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Results Count */}
      <div className="mb-6">
        <p style={{ color: '#A0AEC0' }}>
          Showing {resources.length} resources
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <GlassCard key={resource.id} className="cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div style={{ color: getTypeColor(resource.type) }}>
                  {getTypeIcon(resource.type)}
                </div>
                <div>
                  <span 
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${getTypeColor(resource.type)}20`,
                      color: getTypeColor(resource.type)
                    }}
                  >
                    {resource.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span 
                  className="text-xs px-2 py-1 rounded-full block mb-1"
                  style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', color: '#00E5FF' }}
                >
                  {resource.subject}
                </span>
                {resource.unit && (
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(156, 39, 176, 0.2)', color: '#9C27B0' }}
                  >
                    {getUnitDisplayName(resource.unit)}
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2 line-clamp-2" style={{ color: '#EAEAEA' }}>
              {resource.displayName}
            </h3>

            <p className="text-sm mb-2" style={{ color: '#A0AEC0' }}>
              {resource.subject} • {resource.type.toUpperCase()}
              {resource.unit && ` • ${getUnitDisplayName(resource.unit)}`}
            </p>

            <p className="text-sm mb-4" style={{ color: '#A0AEC0' }}>
              Updated: {formatDate(resource.lastModified)}
            </p>

            <div className="flex items-center justify-between text-xs mb-4" style={{ color: '#A0AEC0' }}>
              <span>{formatFileSize(resource.size)}</span>
              <span>{selectedBranch} Sem {selectedSemester}</span>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleOpen(resource)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(0, 229, 255, 0.2)', 
                  color: '#00E5FF',
                  border: '1px solid rgba(0, 229, 255, 0.3)'
                }}
              >
                <Eye size={16} />
                View
              </button>
              <button 
                onClick={() => handleDownload(resource)}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(76, 175, 80, 0.2)', 
                  color: '#4CAF50',
                  border: '1px solid rgba(76, 175, 80, 0.3)'
                }}
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* No Results */}
      {resources.length === 0 && !loading && (
        <div className="text-center py-12">
          {parseInt(selectedSemester) > 2 ? (
            <div>
              <p className="text-xl mb-2" style={{ color: '#00E5FF' }}>
                Coming Soon! 🚀
              </p>
              <p style={{ color: '#A0AEC0' }}>
                We're working hard to add resources for Semester {selectedSemester}
              </p>
              <p className="text-sm mt-2" style={{ color: '#A0AEC0' }}>
                Stay tuned for updates!
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-2" style={{ color: '#00E5FF' }}>
                Coming Soon! 🚀
              </p>
              <p style={{ color: '#A0AEC0' }}>
                {searchQuery 
                  ? `No files match "${searchQuery}" in the selected filters` 
                  : 'No files found for the selected subjects and types'
                }
              </p>
              <div className="mt-4 text-sm" style={{ color: '#A0AEC0' }}>
                <p>Selected: {selectedSubjects.join(', ')} • {selectedTypes.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        resource={selectedResource}
        isOpen={isPDFViewerOpen}
        onClose={closePDFViewer}
      />
    </>
  );
}
