import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, LinkedinIcon, Github, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');


  const students = [
    {
      id: 1,
      name: 'Arya Sharma',
      branch: 'CSEAI',
      year: '4th Year',
      description: 'Passionate about AI/ML and full-stack development. Leading technical initiatives at college.',
      linkedin: 'https://linkedin.com/in/aryasharma',
      github: 'https://github.com/aryasharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Priya Mehta',
      branch: 'CSE',
      year: '3rd Year',
      description: 'Frontend developer with a passion for creating beautiful user experiences.',
      linkedin: 'https://linkedin.com/in/priyamehta',
      github: 'https://github.com/priyamehta',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Sakshi Gupta',
      branch: 'ECEAI',
      year: '4th Year',
      description: 'Working on IoT and embedded systems research. Interested in hardware-software integration.',
      linkedin: 'https://linkedin.com/in/sakshigupta',
      github: 'https://github.com/sakshigupta',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Neha Singh',
      branch: 'AIML',
      year: '3rd Year',
      description: 'Data enthusiast working on machine learning projects and data analytics.',
      linkedin: 'https://linkedin.com/in/nehasingh',
      github: 'https://github.com/nehasingh',
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Kavya Reddy',
      branch: 'IT',
      year: '4th Year',
      description: 'Aspiring product manager with experience in user research and product strategy.',
      linkedin: 'https://linkedin.com/in/kavyareddy',
      github: 'https://github.com/kavyareddy',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Rhea Kapoor',
      branch: 'MAC',
      year: '4th Year',
      description: 'Building a fintech startup focused on student financial literacy and management.',
      linkedin: 'https://linkedin.com/in/rheakapoor',
      github: 'https://github.com/rheakapoor',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Ananya Kumar',
      branch: 'ECE',
      year: '2nd Year',
      description: 'Electronics enthusiast working on signal processing and communication systems.',
      linkedin: 'https://linkedin.com/in/ananyakumar',
      github: 'https://github.com/ananyakumar',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Simran Verma',
      branch: 'MAE',
      year: '3rd Year',
      description: 'Mechanical engineering student passionate about automation and robotics.',
      linkedin: 'https://linkedin.com/in/simranverma',
      github: 'https://github.com/simranverma',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const branches = ['all', 'CSEAI', 'CSE', 'MAC', 'IT', 'AIML', 'ECEAI', 'ECE', 'MAE'];
  const years = ['all', '1st Year', '2nd Year', '3rd Year', '4th Year'];


  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || student.branch === selectedBranch;
    const matchesYear = selectedYear === 'all' || student.year === selectedYear;

    return matchesSearch && matchesBranch && matchesYear;
  });



  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Student Networking
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Connect with talented students, share experiences, and build your professional network
          </p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
              <Input
                placeholder="Search students..."
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

            {/* Year Filter */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GlassCard>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: '#A0AEC0' }}>
            Showing {filteredStudents.length} students
          </p>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <GlassCard key={student.id}>
              {/* Profile Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <ImageWithFallback
                    src={student.image}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div 
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#101828]"
                    style={{ backgroundColor: '#00FF88' }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#EAEAEA' }}>
                    {student.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm" style={{ color: '#A0AEC0' }}>
                    <div className="flex items-center gap-1">
                      <GraduationCap size={14} />
                      {student.branch} • {student.year}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm mb-6" style={{ color: '#A0AEC0' }}>
                {student.description}
              </p>

              {/* Contact Links */}
              <div className="flex items-center justify-center gap-6">
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
                  style={{ color: '#0077B5' }}
                >
                  <LinkedinIcon size={18} />
                  LinkedIn
                </a>
                <a
                  href={student.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
                  style={{ color: '#A0AEC0' }}
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl mb-2" style={{ color: '#A0AEC0' }}>
              No students found
            </p>
            <p style={{ color: '#A0AEC0' }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Networking Tips */}
        <GlassCard className="mt-12">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAEAEA' }}>
            🤝 Networking Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>Be Genuine</h4>
              <p style={{ color: '#A0AEC0' }}>
                Focus on building authentic relationships rather than just collecting connections.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>Share Knowledge</h4>
              <p style={{ color: '#A0AEC0' }}>
                Offer help and share your expertise with others. Networking is a two-way street.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>Stay Active</h4>
              <p style={{ color: '#A0AEC0' }}>
                Regularly engage with your network through events, discussions, and collaborations.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
