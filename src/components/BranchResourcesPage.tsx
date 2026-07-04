import { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter } from 'lucide-react';
import { ResourcesList } from './ResourcesList';
import { branches, semesters, types, getSubjectsForBranchSemester } from '../config/subjectMapping';

interface BranchResourcesPageProps {
  initialBranch?: string;
  initialSemester?: string;
  initialSubject?: string;
  initialType?: string;
}

export function BranchResourcesPage({ initialBranch = '', initialSemester = '', initialSubject = '', initialType = '' }: BranchResourcesPageProps) {
  // Load saved filters from localStorage or use initial values
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = localStorage.getItem('branchResources_searchQuery');
    return saved || '';
  });
  const [selectedBranch, setSelectedBranch] = useState(() => {
    if (initialBranch) return initialBranch;
    const saved = localStorage.getItem('branchResources_branch');
    return saved || '';
  });
  const [selectedSemester, setSelectedSemester] = useState(() => {
    if (initialSemester) return initialSemester;
    const saved = localStorage.getItem('branchResources_semester');
    return saved || '';
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(() => {
    if (initialSubject) return [initialSubject];
    const saved = localStorage.getItem('branchResources_subjects');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    if (initialType) {
      let normalizedType = initialType.toLowerCase();
      if (normalizedType === 'syllabus') normalizedType = 'syllab';
      return [normalizedType];
    }
    const saved = localStorage.getItem('branchResources_types');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Available subjects based on branch and semester
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  // Sync props when they change (e.g. from Dashboard navigation)
  useEffect(() => {
    if (initialBranch) setSelectedBranch(initialBranch);
  }, [initialBranch]);

  useEffect(() => {
    if (initialSemester) setSelectedSemester(initialSemester);
  }, [initialSemester]);

  useEffect(() => {
    if (initialSubject) setSelectedSubjects([initialSubject]);
  }, [initialSubject]);

  useEffect(() => {
    if (initialType) {
      let normalizedType = initialType.toLowerCase();
      if (normalizedType === 'syllabus') normalizedType = 'syllab';
      setSelectedTypes([normalizedType]);
    }
  }, [initialType]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('branchResources_searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('branchResources_branch', selectedBranch);
  }, [selectedBranch]);

  useEffect(() => {
    localStorage.setItem('branchResources_semester', selectedSemester);
  }, [selectedSemester]);

  useEffect(() => {
    localStorage.setItem('branchResources_subjects', JSON.stringify(selectedSubjects));
    
    // Save to recently visited subjects list
    if (selectedSubjects.length > 0 && selectedBranch && selectedSemester) {
      const subjectName = selectedSubjects[0];
      const typeName = selectedTypes[0] || 'notes';
      const displayName = subjectName.split(' (')[0];
      
      const newItem = {
        name: displayName,
        semester: `Sem ${selectedSemester}`,
        type: typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase(),
        branch: selectedBranch,
        subject: subjectName
      };

      const saved = localStorage.getItem('campusbae_recent_subjects');
      let recentList = saved ? JSON.parse(saved) : [];
      recentList = recentList.filter((item: any) => !(item.subject === subjectName && item.branch === selectedBranch));
      recentList.unshift(newItem);
      recentList = recentList.slice(0, 4);
      localStorage.setItem('campusbae_recent_subjects', JSON.stringify(recentList));
    }
  }, [selectedSubjects, selectedBranch, selectedSemester, selectedTypes]);

  useEffect(() => {
    localStorage.setItem('branchResources_types', JSON.stringify(selectedTypes));
  }, [selectedTypes]);

  // Update available subjects when branch or semester changes
  useEffect(() => {
    if (selectedBranch && selectedSemester) {
      const subjects = getSubjectsForBranchSemester(selectedBranch, selectedSemester);
      setAvailableSubjects(subjects);
      
      // Clear selected subject ONLY if it's not valid for the new branch/semester
      // But allow keeping initialSubject if it is valid.
      setSelectedSubjects(prev => {
        if (initialSubject && subjects.includes(initialSubject)) {
          return [initialSubject];
        }
        return prev.filter(s => subjects.includes(s));
      });
    } else {
      setAvailableSubjects([]);
      setSelectedSubjects([]);
    }
  }, [selectedBranch, selectedSemester, initialSubject]);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        return [];
      } else {
        return [subject];
      }
    });
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return [];
      } else {
        return [type];
      }
    });
  };

  const selectAllSubjects = () => {
    // Disabled select all since only one subject can be selected at a time
  };

  const clearAllSubjects = () => {
    setSelectedSubjects([]);
  };

  const selectAllTypes = () => {
    // Disabled select all since only one type can be selected at a time
  };

  const clearAllTypes = () => {
    setSelectedTypes([]);
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
        <div className="space-y-6 mb-8">
          {/* Primary Filters */}
          <GlassCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Search */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
                <Input
                  placeholder="Search files..."
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
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Semester Filter */}
              <Select 
                value={selectedSemester} 
                onValueChange={setSelectedSemester}
                disabled={!selectedBranch}
              >
                <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(sem => (
                    <SelectItem key={sem} value={sem}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </GlassCard>

          {/* Subject Selection */}
          {availableSubjects.length > 0 && (
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: '#EAEAEA' }}>Subjects</h3>
                <div className="flex gap-2">
                  <button
                    onClick={clearAllSubjects}
                    className="text-xs px-3 py-1 rounded-full transition-colors"
                    style={{ backgroundColor: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B' }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {availableSubjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`text-sm px-3 py-2 rounded-lg transition-all ${
                      selectedSubjects.includes(subject) 
                        ? 'scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: selectedSubjects.includes(subject)
                        ? 'rgba(0, 229, 255, 0.3)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: selectedSubjects.includes(subject) ? '#00E5FF' : '#EAEAEA',
                      border: `1px solid ${selectedSubjects.includes(subject) 
                        ? 'rgba(0, 229, 255, 0.5)' 
                        : 'rgba(255, 255, 255, 0.1)'}`
                    }}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Coming Soon Message when no subjects available */}
          {selectedBranch && selectedSemester && availableSubjects.length === 0 && (
            <GlassCard>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#00E5FF' }}>
                  Coming Soon!
                </h3>
                <p className="text-lg mb-2" style={{ color: '#EAEAEA' }}>
                  We're working hard to add resources for
                </p>
                <p className="text-xl font-semibold mb-4" style={{ color: '#00E5FF' }}>
                  {selectedBranch} - Semester {selectedSemester}
                </p>
                <p className="text-sm" style={{ color: '#A0AEC0' }}>
                  Stay tuned for updates! 📚✨
                </p>
                <div className="mt-6 text-sm" style={{ color: '#A0AEC0' }}>
                  <p>Want to help us add resources faster?</p>
                  <p style={{ color: '#00E5FF' }}>Contact us via WhatsApp or Instagram below! 👇</p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Type Selection */}
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#EAEAEA' }}>Resource Types</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearAllTypes}
                  className="text-xs px-3 py-1 rounded-full transition-colors"
                  style={{ backgroundColor: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B' }}
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`text-sm px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                    selectedTypes.includes(type) 
                      ? 'scale-105'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: selectedTypes.includes(type)
                      ? 'rgba(156, 39, 176, 0.3)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: selectedTypes.includes(type) ? '#9C27B0' : '#EAEAEA',
                    border: `1px solid ${selectedTypes.includes(type) 
                      ? 'rgba(156, 39, 176, 0.5)' 
                      : 'rgba(255, 255, 255, 0.1)'}`
                  }}
                >
                  <Filter size={16} />
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Resources List */}
        <ResourcesList
          selectedBranch={selectedBranch}
          selectedSemester={selectedSemester}
          selectedSubjects={selectedSubjects}
          selectedTypes={selectedTypes}
          searchQuery={searchQuery}
        />

        {/* Upload Note */}
        <GlassCard className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#EAEAEA' }}>
            Want to help us curate the best notes?
          </h3>
          <p className="mb-4" style={{ color: '#A0AEC0' }}>
            Do you want to help us in curating the best notes by contributing? Then contact us!
          </p>
          <p className="text-sm" style={{ color: '#00E5FF' }}>
            Reach out to us via WhatsApp or Instagram in the footer below 👇
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
