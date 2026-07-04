import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, LinkedinIcon, Github, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const students = [
    {
      id: 1,
      name: 'Arya Sharma',
      role: 'President, TechSoc',
      branch: 'CSE',
      year: '4th Year',
      location: 'Delhi, India',
      bio: 'Passionate about AI/ML and full-stack development. Leading technical initiatives at college.',
      skills: ['React', 'Python', 'Machine Learning', 'Leadership'],
      linkedin: 'https://linkedin.com/in/aryasharma',
      github: 'https://github.com/aryasharma',
      email: 'arya.sharma@igdtuw.ac.in',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
      achievements: ['Best Project Award 2023', 'Google Summer of Code 2023'],
      interests: ['Artificial Intelligence', 'Startups', 'Open Source']
    },
    {
      id: 2,
      name: 'Priya Mehta',
      role: 'Software Engineer Intern',
      branch: 'CSE',
      year: '3rd Year',
      location: 'Mumbai, India',
      bio: 'Frontend developer with a passion for creating beautiful user experiences.',
      skills: ['JavaScript', 'React', 'UI/UX Design', 'Node.js'],
      linkedin: 'https://linkedin.com/in/priyamehta',
      github: 'https://github.com/priyamehta',
      email: 'priya.mehta@igdtuw.ac.in',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      achievements: ['Hackathon Winner 2023', 'Dean\'s List 2022-23'],
      interests: ['Web Development', 'Design', 'Photography']
    },
    {
      id: 3,
      name: 'Sakshi Gupta',
      role: 'Research Assistant',
      branch: 'ECE',
      year: '4th Year',
      location: 'Bangalore, India',
      bio: 'Working on IoT and embedded systems research. Interested in hardware-software integration.',
      skills: ['Embedded C', 'Arduino', 'IoT', 'MATLAB'],
      linkedin: 'https://linkedin.com/in/sakshigupta',
      github: 'https://github.com/sakshigupta',
      email: 'sakshi.gupta@igdtuw.ac.in',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      achievements: ['Research Paper Published', 'Best Innovation Award 2023'],
      interests: ['IoT', 'Robotics', 'Research']
    },
    {
      id: 4,
      name: 'Neha Singh',
      role: 'Data Science Intern',
      branch: 'CSE',
      year: '3rd Year',
      location: 'Delhi, India',
      bio: 'Data enthusiast working on machine learning projects and data analytics.',
      skills: ['Python', 'Data Analytics', 'TensorFlow', 'SQL'],
      linkedin: 'https://linkedin.com/in/nehasingh',
      github: 'https://github.com/nehasingh',
      email: 'neha.singh@igdtuw.ac.in',
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face',
      achievements: ['Data Science Competition Winner', 'Kaggle Expert'],
      interests: ['Data Science', 'Machine Learning', 'Analytics']
    },
    {
      id: 5,
      name: 'Kavya Reddy',
      role: 'Product Management Intern',
      branch: 'IT',
      year: '4th Year',
      location: 'Hyderabad, India',
      bio: 'Aspiring product manager with experience in user research and product strategy.',
      skills: ['Product Strategy', 'User Research', 'Agile', 'Figma'],
      linkedin: 'https://linkedin.com/in/kavyareddy',
      github: 'https://github.com/kavyareddy',
      email: 'kavya.reddy@igdtuw.ac.in',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      achievements: ['Product Case Study Winner', 'Innovation Challenge 2023'],
      interests: ['Product Management', 'UX Research', 'Strategy']
    },
    {
      id: 6,
      name: 'Rhea Kapoor',
      role: 'Startup Founder',
      branch: 'CSE',
      year: '4th Year',
      location: 'Gurgaon, India',
      bio: 'Building a fintech startup focused on student financial literacy and management.',
      skills: ['Entrepreneurship', 'Business Strategy', 'Fintech', 'Leadership'],
      linkedin: 'https://linkedin.com/in/rheakapoor',
      github: 'https://github.com/rheakapoor',
      email: 'rhea.kapoor@igdtuw.ac.in',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      achievements: ['Startup Pitch Winner', 'Young Entrepreneur Award 2023'],
      interests: ['Entrepreneurship', 'Fintech', 'Mentoring']
    }
  ];

  const branches = ['all', 'CSE', 'IT', 'ECE', 'EEE', 'MAE'];
  const years = ['all', '1st Year', '2nd Year', '3rd Year', '4th Year'];
  const roles = ['all', 'Student', 'Intern', 'President', 'Research Assistant', 'Founder'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBranch = selectedBranch === 'all' || student.branch === selectedBranch;
    const matchesYear = selectedYear === 'all' || student.year === selectedYear;
    const matchesRole = selectedRole === 'all' || student.role.toLowerCase().includes(selectedRole.toLowerCase());

    return matchesSearch && matchesBranch && matchesYear && matchesRole;
  });

  const handleConnect = (student: any) => {
    // Placeholder for connect functionality
    alert(`Connect feature coming soon! You'll be able to connect with ${student.name}.`);
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Senior Networking
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Connect with the Seniors who are ready to guide you through the chaos! and build your professional network.
          </p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
              <Input
                placeholder="Search students, skills..."
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

            {/* Role Filter */}
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
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
                  <p className="text-sm mb-1" style={{ color: '#00E5FF' }}>
                    {student.role}
                  </p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#A0AEC0' }}>
                    <div className="flex items-center gap-1">
                      <GraduationCap size={12} />
                      {student.branch} • {student.year}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: '#A0AEC0' }}>
                <MapPin size={14} />
                {student.location}
              </div>

              {/* Bio */}
              <p className="text-sm mb-4" style={{ color: '#A0AEC0' }}>
                {student.bio}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 'rgba(0, 229, 255, 0.2)',
                        color: '#00E5FF'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {student.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#A0AEC0'
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>Recent Achievements</h4>
                <div className="space-y-1">
                  {student.achievements.map((achievement, index) => (
                    <div key={index} className="text-xs flex items-start gap-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: '#00E5FF' }}
                      />
                      <span style={{ color: '#A0AEC0' }}>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Links */}
              <div className="flex items-center gap-3 mb-4">
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
                  style={{ color: '#0077B5' }}
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={student.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
                  style={{ color: '#EAEAEA' }}
                >
                  <Github size={18} />
                </a>
                <a
                  href={`mailto:${student.email}`}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
                  style={{ color: '#00E5FF' }}
                >
                  <Mail size={18} />
                </a>
              </div>

              {/* Connect Button */}
              <Button
                onClick={() => handleConnect(student)}
                className="w-full"
                style={{
                  background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                  border: 'none'
                }}
              >
                Connect
              </Button>
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
