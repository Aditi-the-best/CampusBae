import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, LinkedinIcon, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');


  interface Student {
    id: number;
    name: string;
    branch: string;
    year: string;
    linkedin: string;
    image: string;
  }

  const students: Student[] = [
    {
      id: 1,
      name: 'Ishanvi Srivastava',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/ishanvi-srivastava-16i/',
      image: '/ish.png'
    },
    {
      id: 2,
      name: 'Nishtha',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/nishtha-malik-8877a6325/',
      image: '/nish.png'
    },
    {
      id: 3,
      name: 'Kavya Jain',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/kavya-jain-b6b0a0320/',
      image: '/kj.png'
    },
    {
      id: 4,
      name: 'Radhika Jindal',
      branch: 'CSEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/radhika-2213b3345/',
      image: '/rj.png'
    },
    
    {
      id: 5,
      name: 'Manvi',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'http://www.linkedin.com/in/manvi-falwaria-097834319/',
      image: '/manvi.png'
    },
    {
      id: 6,
      name: 'Prachi Gupta',
      branch: 'CSEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/prachi-gupta-19ab61318/',
      image: '/pg.png'
    },
    {
      id: 7,
      name: 'Kritika Singh',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/kritika1220/',
      image: '/kk.png'
    },
    {
      id: 8,
      name: 'Jayati s. Tiwary',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/jayati-s-tiwary/',
      image: '/jayati.png'
    },
    {
      id: 9,
      name: 'Payal',
      branch: 'CSEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/payal-b8a5a2323/',
      image: '/payal.jpg'
    },
    {
      id: 10,
      name: 'Aafia Iqbal',
      branch: 'AIML',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/aafia-iqbal/',
      image: '/aafia.jpg'
    },
    {
      id: 11,
      name: 'Richa Sukla',
      branch: 'CSE',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/richa-sukla-2484482bb/',
      image: '/rs.png'
    },
    {
      id: 12,
      name: 'Baani Kaur',
      branch: 'ECEAI',
      year: '3rd Year',
      linkedin: 'https://www.linkedin.com/in/baani-kaur-048a61307/',
      image: '/baani.jpg'
    },
    {
      id: 13,
      name: 'Sripriya Agarwal',
      branch: 'ECEAI',
      year: '',
      linkedin: 'https://www.linkedin.com/in/sripriya-agarwal-483475261/',
      image: '/sripriya.jpeg'
    },
    {
      id: 14,
      name: 'Joysa Jain',
      branch: 'CSEAI',
      year: '4th Year',
      linkedin: 'https://www.linkedin.com/in/joysa-jain-86b589283/',
      image: '/joysa.jpeg'
    },
    {
      id: 15,
      name: 'Aarohi Chaddha',
      branch: 'CSEAI',
      year: '4th Year',
      linkedin: 'https://www.linkedin.com/in/aarohi-chadha/',
      image: '/aarohi.jpeg'
    },
    {
      id: 16,
      name: 'Aditi Choudhary',
      branch: 'ECEAI',
      year: '2nd Year',
      linkedin: 'https://www.linkedin.com/in/aditi-choudhary-2044822a8/',
      image: '/aditi.jpg'
    },
    {
      id: 17,
      name: 'Vrinda Garg',
      branch: 'CSE',
      year: '2nd Year',
      linkedin: 'https://www.linkedin.com/in/vrinda-garg-13a525372/',
      image: '/vrinda.jpg'
    }
  ];

  const branches = ['all', 'CSEAI', 'CSE', 'MAC', 'IT', 'AIML', 'ECEAI', 'ECE', 'MAE'];
  const years = ['all', '1st Year', '2nd Year', '3rd Year', '4th Year'];


  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.branch.toLowerCase().includes(searchQuery.toLowerCase());
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
            Senior Networking
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Connect with the Seniors who are ready to guide you through the chaos! and build your professional network.
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
            <GlassCard key={student.id} className="p-4">
              <div className="flex items-center gap-4">
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
                  <h3 className="text-xl font-bold" style={{ color: '#EAEAEA' }}>
                    {student.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm mt-1" style={{ color: '#A0AEC0' }}>
                    <GraduationCap size={14} />
                    {student.branch}{student.year ? ` • ${student.year}` : ''}
                  </div>
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm mt-3 px-4 py-1.5 rounded-lg transition-all duration-200 hover:bg-white/10"
                    style={{ color: '#0077B5' }}
                  >
                    <LinkedinIcon size={18} />
                    LinkedIn
                  </a>
                </div>
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
