import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Users, ExternalLink, Calendar, MapPin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SocietiesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const societies = [
    {
      id: 1,
      name: 'TechSoc IGDTUW',
      category: 'Technical',
      description: 'The premier technical society fostering innovation and technical excellence among students.',
      members: '500+',
      president: 'Arya Sharma',
      email: 'techsoc@igdtuw.ac.in',
      website: 'https://techsocigdtuw.com',
      instagram: '@techsocigdtuw',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      upcomingEvents: [
        { name: 'Tech Talk: AI in Healthcare', date: '2024-03-15' },
        { name: 'Hackathon 2024', date: '2024-04-01' }
      ],
      achievements: ['Winner - Inter College Tech Fest 2023', 'Best Technical Society Award 2022']
    },
    {
      id: 2,
      name: 'Cultural Society IGDTUW',
      category: 'Cultural',
      description: 'Celebrating arts, culture, and creativity through various cultural programs and events.',
      members: '350+',
      president: 'Sakshi Gupta',
      email: 'cultural@igdtuw.ac.in',
      website: 'https://culturalsocigdtuw.com',
      instagram: '@culturalsocigdtuw',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
      upcomingEvents: [
        { name: 'Annual Cultural Fest', date: '2024-03-20' },
        { name: 'Dance Workshop', date: '2024-03-25' }
      ],
      achievements: ['Best Cultural Performance 2023', 'Outstanding Organization Award 2022']
    },
    {
      id: 3,
      name: 'Literary Club',
      category: 'Literary',
      description: 'For book lovers, writers, and poetry enthusiasts. Exploring the world of literature together.',
      members: '200+',
      president: 'Meera Joshi',
      email: 'literary@igdtuw.ac.in',
      website: 'https://literaryclubigdtuw.com',
      instagram: '@literaryclubigdtuw',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      upcomingEvents: [
        { name: 'Poetry Recitation', date: '2024-03-18' },
        { name: 'Book Discussion: Modern Classics', date: '2024-03-28' }
      ],
      achievements: ['Best Literary Magazine 2023', 'Inter-College Debate Champions 2022']
    },
    {
      id: 4,
      name: 'Sports Club',
      category: 'Sports',
      description: 'Promoting physical fitness, sports culture, and healthy competition among students.',
      members: '400+',
      president: 'Kavya Reddy',
      email: 'sports@igdtuw.ac.in',
      website: 'https://sportsclubigdtuw.com',
      instagram: '@sportsclubigdtuw',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
      upcomingEvents: [
        { name: 'Inter-Branch Basketball Tournament', date: '2024-03-22' },
        { name: 'Annual Sports Day', date: '2024-04-05' }
      ],
      achievements: ['University Sports Champions 2023', 'Best Sports Organization 2022']
    },
    {
      id: 5,
      name: 'Entrepreneurship Cell',
      category: 'Business',
      description: 'Nurturing entrepreneurial mindset and supporting student startups and business ideas.',
      members: '250+',
      president: 'Rhea Kapoor',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://ecelltigdtuw.com',
      instagram: '@ecelligdtuw',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
      upcomingEvents: [
        { name: 'Startup Pitch Competition', date: '2024-03-30' },
        { name: 'Entrepreneurship Workshop', date: '2024-04-10' }
      ],
      achievements: ['Best E-Cell Award 2023', 'Successful Startup Incubation Program']
    },
    {
      id: 6,
      name: 'Photography Society',
      category: 'Creative',
      description: 'Capturing moments, sharing stories, and exploring the art of photography.',
      members: '180+',
      president: 'Diya Patel',
      email: 'photo@igdtuw.ac.in',
      website: 'https://photosocigdtuw.com',
      instagram: '@photosocigdtuw',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop',
      upcomingEvents: [
        { name: 'Campus Photo Walk', date: '2024-03-16' },
        { name: 'Portrait Photography Workshop', date: '2024-03-26' }
      ],
      achievements: ['Best Photography Exhibition 2023', 'National Photography Contest Winners']
    }
  ];

  const filteredSocieties = societies.filter(society =>
    society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    society.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    society.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return '#00E5FF';
      case 'Cultural': return '#FF6B9D';
      case 'Literary': return '#9C27B0';
      case 'Sports': return '#4CAF50';
      case 'Business': return '#FF9800';
      case 'Creative': return '#E91E63';
      default: return '#00E5FF';
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Societies & Clubs
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Discover and join various societies to enhance your college experience
          </p>
        </div>

        {/* Search */}
        <GlassCard className="mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
            <Input
              placeholder="Search societies, categories, or interests..."
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
        </GlassCard>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: '#A0AEC0' }}>
            Showing {filteredSocieties.length} societies
          </p>
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSocieties.map((society) => (
            <GlassCard key={society.id} className="overflow-hidden">
              {/* Header Image */}
              <div className="relative mb-6 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={society.image}
                  alt={society.name}
                  className="w-full h-48 object-cover"
                />
                <div 
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${getCategoryColor(society.category)}20`,
                    color: getCategoryColor(society.category),
                    border: `1px solid ${getCategoryColor(society.category)}40`
                  }}
                >
                  {society.category}
                </div>
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: '#EAEAEA'
                  }}
                >
                  <Users size={16} className="inline mr-1" />
                  {society.members}
                </div>
              </div>

              {/* Society Details */}
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#EAEAEA' }}>
                  {society.name}
                </h3>

                <p className="mb-4" style={{ color: '#A0AEC0' }}>
                  {society.description}
                </p>

                {/* President & Contact */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div style={{ color: '#A0AEC0' }}>
                    <strong style={{ color: '#EAEAEA' }}>President:</strong> {society.president}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1" style={{ color: '#A0AEC0' }}>
                    <Mail size={14} />
                    <span className="text-[#00E5FF]">{society.email}</span>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: '#A0AEC0' }}>
                    <span className="text-[#00E5FF]">{society.instagram}</span>
                  </div>
                </div>



                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                    Recent Achievements
                  </h4>
                  <div className="space-y-1">
                    {society.achievements.map((achievement, index) => (
                      <div key={index} className="text-sm flex items-start gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(society.category) }}
                        />
                        <span style={{ color: '#A0AEC0' }}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${getCategoryColor(society.category)}, ${getCategoryColor(society.category)}80)`,
                      border: 'none'
                    }}
                  >
                    Join Society
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#EAEAEA'
                    }}
                    onClick={() => window.open(society.website, '_blank')}
                  >
                    <ExternalLink size={16} />
                    Website
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* No Results */}
        {filteredSocieties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl mb-2" style={{ color: '#A0AEC0' }}>
              No societies found
            </p>
            <p style={{ color: '#A0AEC0' }}>
              Try adjusting your search terms
            </p>
          </div>
        )}

        {/* Join Society Info */}
        <GlassCard className="mt-12">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAEAEA' }}>
            🌟 Why Join a Society?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>Skill Development</h4>
              <p style={{ color: '#A0AEC0' }}>
                Enhance your technical, creative, or leadership skills through hands-on experience and workshops.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>Networking</h4>
              <p style={{ color: '#A0AEC0' }}>
                Connect with like-minded peers, seniors, and industry professionals to build lasting relationships.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>Resume Building</h4>
              <p style={{ color: '#A0AEC0' }}>
                Gain valuable experience, certifications, and achievements that strengthen your profile.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
