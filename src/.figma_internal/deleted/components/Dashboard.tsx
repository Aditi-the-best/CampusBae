import { GlassCard } from './GlassCard';
import { Book, FileText, Users, ShoppingBag, Calendar, User } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const branchResources = [
    { name: 'Data Structures', semester: 'Sem 3', type: 'Notes', icon: <Book size={24} /> },
    { name: 'Computer Networks', semester: 'Sem 5', type: 'PYQs', icon: <FileText size={24} /> },
    { name: 'Database Systems', semester: 'Sem 4', type: 'Books', icon: <Book size={24} /> },
    { name: 'Operating Systems', semester: 'Sem 4', type: 'Syllabus', icon: <FileText size={24} /> }
  ];

  const societies = [
    { name: 'TechSoc IGDTUW', type: 'Technical', members: '500+' },
    { name: 'Cultural Society', type: 'Cultural', members: '300+' },
    { name: 'Literary Club', type: 'Literary', members: '200+' },
    { name: 'Sports Club', type: 'Sports', members: '400+' }
  ];

  const marketplaceItems = [
    { title: 'Data Structures Textbook', price: '₹800', seller: 'Priya S.' },
    { title: 'Scientific Calculator', price: '₹500', seller: 'Ananya K.' },
    { title: 'Lab Coat (Size M)', price: '₹300', seller: 'Shruti M.' }
  ];

  return (
    <div className="pt-32 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Hey [Name], welcome back 👋
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Your campus companion is ready to help you succeed.
          </p>
        </div>

        {/* Branch Resources Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: '#EAEAEA' }}>
              Branch Resources
            </h2>
            <button
              onClick={() => onNavigate('resources')}
              className="text-[#00E5FF] hover:underline"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branchResources.map((resource, index) => (
              <GlassCard key={index} className="cursor-pointer group">
                <div className="flex items-center mb-3 text-[#00E5FF]">
                  {resource.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                  {resource.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: '#A0AEC0' }}>
                  {resource.semester} • {resource.type}
                </p>
                <div className="text-xs" style={{ color: '#00E5FF' }}>
                  Click to access →
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Clubs & Societies Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: '#EAEAEA' }}>
              Clubs & Societies
            </h2>
            <button
              onClick={() => onNavigate('societies')}
              className="text-[#00E5FF] hover:underline"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {societies.map((society, index) => (
              <GlassCard key={index} className="cursor-pointer">
                <div className="flex items-center mb-3 text-[#00E5FF]">
                  <Users size={24} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                  {society.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: '#A0AEC0' }}>
                  {society.type}
                </p>
                <div className="text-xs" style={{ color: '#00E5FF' }}>
                  {society.members} members
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Marketplace Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: '#EAEAEA' }}>
              Marketplace
            </h2>
            <button
              onClick={() => onNavigate('marketplace')}
              className="text-[#00E5FF] hover:underline"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item, index) => (
              <GlassCard key={index} className="cursor-pointer">
                <div className="flex items-center mb-3 text-[#00E5FF]">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                  {item.title}
                </h3>
                <p className="text-lg font-semibold mb-2" style={{ color: '#00E5FF' }}>
                  {item.price}
                </p>
                <p className="text-sm" style={{ color: '#A0AEC0' }}>
                  Seller: {item.seller}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#EAEAEA' }}>
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="cursor-pointer" hover={true}>
              <div 
                className="flex items-center p-4"
                onClick={() => onNavigate('profile')}
              >
                <Calendar size={32} className="text-[#00E5FF] mr-4" />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#EAEAEA' }}>
                    Attendance Tracker
                  </h3>
                  <p style={{ color: '#A0AEC0' }}>
                    Track your attendance across all subjects
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="cursor-pointer" hover={true}>
              <div 
                className="flex items-center p-4"
                onClick={() => onNavigate('networking')}
              >
                <User size={32} className="text-[#00E5FF] mr-4" />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#EAEAEA' }}>
                    Student Network
                  </h3>
                  <p style={{ color: '#A0AEC0' }}>
                    Connect with fellow students
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
