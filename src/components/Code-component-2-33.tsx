import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Book, FileText, Download, ExternalLink, Search } from 'lucide-react';

export function BranchResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      subject: 'DSA',
      branch: 'CSE',
      semester: 3,
      type: 'Notes',
      author: 'Prof. Sharma',
      size: '2.5 MB',
      downloads: 1200
    },
    {
      id: 2,
      title: 'Computer Networks PYQ 2023',
      subject: 'CN',
      branch: 'CSE',
      semester: 5,
      type: 'PYQs',
      author: 'Question Bank',
      size: '1.8 MB',
      downloads: 890
    },
    {
      id: 3,
      title: 'Database Management Systems',
      subject: 'DBMS',
      branch: 'CSE',
      semester: 4,
      type: 'Books',
      author: 'Korth & Silberschatz',
      size: '15.2 MB',
      downloads: 2100
    },
    {
      id: 4,
      title: 'Operating Systems Syllabus 2024',
      subject: 'OS',
      branch: 'CSE',
      semester: 4,
      type: 'Syllabus',
      author: 'IGDTUW',
      size: '500 KB',
      downloads: 650
    },
    {
      id: 5,
      title: 'Machine Learning Notes',
      subject: 'ML',
      branch: 'CSE',
      semester: 7,
      type: 'Notes',
      author: 'Prof. Gupta',
      size: '4.2 MB',
      downloads: 780
    },
    {
      id: 6,
      title: 'Software Engineering PYQ 2022-23',
      subject: 'SE',
      branch: 'CSE',
      semester: 6,
      type: 'PYQs',
      author: 'Question Bank',
      size: '2.1 MB',
      downloads: 560
    }
  ];

  const branches = ['all', 'CSE', 'IT', 'ECE', 'EEE', 'MAE'];
  const semesters = ['all', 1, 2, 3, 4, 5, 6, 7, 8];
  const types = ['all', 'Notes', 'PYQs', 'Books', 'Syllabus'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || resource.branch === selectedBranch;
    const matchesSemester = selectedSemester === 'all' || resource.semester === parseInt(selectedSemester);
    const matchesType = selectedType === 'all' || resource.type === selectedType;

    return matchesSearch && matchesBranch && matchesSemester && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Notes': return <Book size={20} />;
      case 'Books': return <Book size={20} />;
      case 'PYQs': return <FileText size={20} />;
      case 'Syllabus': return <FileText size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Notes': return '#00E5FF';
      case 'Books': return '#4CAF50';
      case 'PYQs': return '#FF9800';
      case 'Syllabus': return '#9C27B0';
      default: return '#00E5FF';
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Branch Resources
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Access notes, previous year questions, books, and syllabus for all subjects
          </p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
              <Input
                placeholder="Search subjects, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#EAEAEA'
                }}
              />
            </div>

            {/* Branch Filter */}
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map(branch => (
                  <SelectItem key={branch} value={branch}>
                    {branch === 'all' ? 'All Branches' : branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Semester Filter */}
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem.toString()}>
                    {sem === 'all' ? 'All Semesters' : `Semester ${sem}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(type => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GlassCard>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: '#A0AEC0' }}>
            Showing {filteredResources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
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
                      {resource.type}
                    </span>
                  </div>
                </div>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', color: '#00E5FF' }}
                >
                  Sem {resource.semester}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                {resource.title}
              </h3>

              <p className="text-sm mb-2" style={{ color: '#A0AEC0' }}>
                {resource.subject} • {resource.branch}
              </p>

              <p className="text-sm mb-4" style={{ color: '#A0AEC0' }}>
                By {resource.author}
              </p>

              <div className="flex items-center justify-between text-xs mb-4" style={{ color: '#A0AEC0' }}>
                <span>{resource.size}</span>
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>

              <div className="flex gap-2">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'rgba(0, 229, 255, 0.2)', 
                    color: '#00E5FF',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <Download size={16} />
                  Download
                </button>
                <button 
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    color: '#EAEAEA',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <ExternalLink size={16} />
                  View
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl mb-2" style={{ color: '#A0AEC0' }}>
              No resources found
            </p>
            <p style={{ color: '#A0AEC0' }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Upload Note */}
        <GlassCard className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#EAEAEA' }}>
            Can't find what you're looking for?
          </h3>
          <p className="mb-4" style={{ color: '#A0AEC0' }}>
            Help your fellow students by uploading resources you have!
          </p>
          <p className="text-sm" style={{ color: '#00E5FF' }}>
            Upload feature coming soon...
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
