import { useState, useEffect, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Users, ExternalLink, Calendar, MapPin, Mail, Instagram, Linkedin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SocietiesPageProps {
  scrollToSociety?: number;
}

export function SocietiesPage({ scrollToSociety }: SocietiesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const societyRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Scroll to specific society when scrollToSociety prop changes
  useEffect(() => {
    if (scrollToSociety && societyRefs.current[scrollToSociety]) {
      const element = societyRefs.current[scrollToSociety];
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }, [scrollToSociety]);

  const societies = [
    {
      id: 1,
      name: 'Google Developer Student Clubs(GDSC)',
      category: 'Technical',
      description: "GDSC IGDTUW is a dynamic community where students engage with Google\'s technologies through hands-on experiences, workshops, and real-world projects. The club focuses on skill development in areas like Android, Flutter, and Cloud Computing, encouraging members to solve real-world problems and innovate.",
      members: '500+',
      president: 'Akshita Jha',
      email: 'techsoc@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/dscigdtuw',
      instagram: 'https://www.instagram.com/gdg_igdtuw/',
      image: '/gdsc .png',
      upcomingEvents: [
        { name: 'Snow script winter of code', date: '2024-03-15' },
        { name: 'Devcation-2025', date: '2024-04-01' }
      ],
      achievements: ['Snow script winter of code', 'Devcation-2025']
    },
    {
      id: 2,
      name: 'Assetmerkle',
      category: 'Technical',
      description: 'AssetMerkle is a vibrant student-led blockchain and Web3 community that hosts major events, hackathons, and workshops, offering freshers mentorship, support, and hands-on learning in a fun, pressure-free environment. With strong industry and campus connections, it’s the most active club driving innovation and collaboration in the Web3 space.',
      members: '350+',
      president: 'Prerana Arya',
      email: 'cultural@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/asset-merkle/',
      instagram: 'https://www.instagram.com/assetmerkle.igdtuw/',
      image: '/assetmerkle.png',
      upcomingEvents: [
        { name: 'AM Hacks', date: '2024-03-20' },
        { name: 'She On Chain Bootcamp', date: '2024-03-25' }
      ],
      achievements: ['AM Hacks', 'She On Chain Bootcamp']
    },
    {
      id: 3,
      name: 'IEEE Student Chapter',
      category: 'Technical',
      description: 'IEEE IGDTUW empowers young girls to take up technical roles with confidence and create a positive impact on society. Through initiatives like the award-winning Sparsh Outreach Program, where volunteers mentor and inspire girls from orphanages, IEEE IGDTUW fosters growth, learning, and meaningful connections beyond academics.',
      members: '200+',
      president: 'Akanksha Rani',
      email: 'literary@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/ieee-igdtuw/posts/?feedView=all',
      instagram: 'https://www.instagram.com/ieeeigdtuw/',
      image: '/ieee.png',
      upcomingEvents: [
        { name: 'wiempower 6.0', date: '2024-03-18' },
        { name: 'IEEE Week 8.0', date: '2024-03-28' }
      ],
      achievements: ['wiempower 6.0', 'IEEE Week 8.0']
    },
    {
      id: 4,
      name: 'Microsoft Student Chapter(MSC)',
      category: 'Technical',
      description: 'Microsoft Learn Student Ambassador Student Chapter is your go-to community for guidance, mentorship, and exciting sessions to help you excel in your engineering journey. Through initiatives like the Summer Bootcamp, we empower students with hands-on learning in Web Development, App Development, AR/VR, AI/ML, Cybersecurity, Data Analytics, and Product Management, fostering growth and industry-ready skills.',
      members: '400+',
      president: 'Nandini , Amaira',
      email: 'sports@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/microsoft-student-chapter-igdtuw/',
      instagram: 'https://www.instagram.com/msc.igdtuw/',
      image: '/msc.png',
      upcomingEvents: [
        { name: 'Inter-Branch Basketball Tournament', date: '2024-03-22' },
        { name: 'Annual Sports Day', date: '2024-04-05' }
      ],
      achievements: ['Hack-It-Up', 'Figma Fiesta']
    },
    {
      id: 5,
      name: 'Techneeds',
      category: 'Technical',
      description: 'TechNeeds is a vibrant community for tech enthusiasts, beginners, and experts, offering resources, tutorials, and insights on the latest trends and innovations. With hackathons, expert speaker sessions, and engaging discussions, we foster collaboration, learning, and innovation to help individuals thrive in the ever-evolving world of technology.',
      members: '250+',
      president: 'Joysa Jain',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/techneeds-igdtuw/posts/?feedView=all',
      instagram: 'https://www.instagram.com/techneeds_igdtuw_/',
      image: '/techneeds.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Summer Skills Sprint Challenge', 'Shark Tank Igdtuw']
    },
    {
      id: 6,
      name: 'Lean In',
      category: 'Technical',
      description: 'Lean In is a thriving community that fosters collaboration, mentorship, and growth through impactful events and initiatives. With highlights like Lean In Hacks 4.0 attracting 1000+ participants, mentorship circles engaging 400+ mentees, and expert-led sessions on internships, research, finance, and machine learning, we empower members with knowledge, support, and a strong sense of sisterhood.',
      members: '180+',
      president: 'Anushka Gupta',
      email: 'photo@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/lean-in-igdtuw/posts/?feedView=all',
      instagram: 'https://www.instagram.com/leanin.igdtuw/',
      image: '/leanin.png',
      upcomingEvents: [
        { name: 'Campus Photo Walk', date: '2024-03-16' },
        { name: 'Portrait Photography Workshop', date: '2024-03-26' }
      ],
      achievements: ['Lean In Hacks 6.0', 'Lean In Hacks 5.0']
    },
    {
      id: 7,
      name: 'AWS Cloud Club',
      category: 'Technical',
      description: 'The AWS Cloud Club-IGDTUW is dedicated to fostering a vibrant, student-driven community focused on the exploration and application of Amazon Web Services (AWS). Through events, workshops, and industry connections, we strive to deepen students understanding of AWS and its diverse applications. Additionally, by hosting guest speakers, we aim to enrich students knowledge and prepare them for future opportunities in the tech industry.',
      president: 'Arushi Garg',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/aws-cloud-club-igdtuw/',
      instagram: 'https://www.instagram.com/awscloudclubigdtuw/',
      image: '/aws.jpg',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Student Community Day', 'AWSome Meme Contest']
    },
    {
      id: 8,
      name: 'Minerva(virtual tech forum)',
      category: 'Technical',
      description: 'Minerva is the tech forum of IGDTUW, creating a platform where alumni and professionals share expertise in fields like web development, AR/VR, competitive programming, automation, and robotics through sessions and articles. With insights on scholarships and career journeys, Minerva fosters learning, collaboration, and empowerment within the IGDTUW tech community.',
      president: 'Shweta Tyagi',
      
      website: '',
      instagram: 'https://www.instagram.com/minerva.igdtuw/',
      image: '/minerva.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Internship Insider Series 2.0', 'Engineering Fellows Program']
    },
    {
      id: 9,
      name: 'HackClub IGDTUW',
      category: 'Technical',
      description: 'HackClub IGDTUW is a vibrant community of tech enthusiasts, hosting workshops, hackathons, and events that spark creativity, innovation, and collaboration. Whether you’re into coding, design, or simply curious about tech, it’s the perfect place to learn, grow your skills, and be part of an exciting journey with like-minded peers.',
      president: 'Anushka Gupta',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/hack-club-igdtuw/',
      instagram: 'https://www.instagram.com/hackclub_igdtuw/',
      image: '/hackclub.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['C++ and Java Bootcamp', 'Meme Fest']
    },
    {
      id: 10,
      name: 'CodeBenders',
      category: 'Technical',
      description: 'CodeBenders at IGDTUW is a passionate coding community where members grow through DSA bootcamps, technical sessions, and monthly workshops that strengthen problem-solving skills. With mentorship, coding contests, hackathons, and collaboration opportunities, CodeBenders helps you stay updated, connect with peers, and build your future in tech while learning, sharing, and having fun.',
      president: 'Anshika Arora',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://www.linkedin.com/in/codebenders-igdtuw/',
      instagram: 'https://www.instagram.com/codebenders_igdtuw/',
      image: '/codebenders.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['DSA Series Bootcamp 2.0', 'Trivia Thursday']
    },
    {
      id: 11,
      name: 'AI Club',
      category: 'Technical',
      description: ' AI Club at IGDTUW is a dynamic community for students passionate about artificial intelligence and machine learning. Our club provides a collaborative space where members can delve into AI technologies, participate in workshops, and engage with industry experts through guest lectures and hackathons. We are committed to empowering students with cutting-edge knowledge and practical experience, encouraging them to explore the limitless possibilities of AI and transform their ideas into reality.',
      president: 'Ananya Gupta',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/aiclubigdtuw/',
      instagram: 'https://www.instagram.com/aiclubigdtuw/',
      image: '/aiclub.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Mashwara-e-Mentorship', 'A3: AI Arcade Arena']
    },
    {
      id: 12,
      name: 'Tarannum', 
      category: 'Cultural',
      president: 'Vidhi Saxena',
      description: ' Tarannum, the music society of IGDTUW, is a vibrant platform for students to explore and showcase their musical talents. Known for hosting diverse events and competitions across genres like classical, semi-classical, and a capella, Tarannum also organizes workshops with professional musicians, fostering growth, creativity, and excellence for both budding and seasoned performers.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/tarannum.igdtuw/',
      image: '/tarannum.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['', '']
    },
    {
      id: 13,
      name: 'Hypnotics', 
      category: 'Cultural',
      president: 'Vaapi , Mishty',
      description: ' Hypnotics, the Western Dance Society of Indira Gandhi Delhi Technical University for Women, is renowned for its charm and talent. The team has brought numerous laurels to the University, distinguishing itself in the Delhi Dance Circuit. Members of this society excel in a multitude of dance forms, including waacking, locking, hip-hop, freestyle, krump, house, and jazz. They have won several awards and accolades, establishing a prominent place in the dance community. The mission of Hypnotics is to provide professional training and development in various western dance forms, fostering leadership, team spirit, and a continuous learning attitude among its members.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/hypnotics_igdtuw/',
      image: '/hypnotics.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['', '']
    },
    {
      id: 14,
      name: 'Rahnuma', 
      category: 'Cultural',
      president: 'Peehu Sadaran , Chanda Jha',
      description: ' RAHNUMA, the dramatics society of Indira Gandhi Delhi Technical University for Women, was established on 16th November 2013, when the Indira Gandhi Institute of Technology became Indira Gandhi Delhi Technical University for Women. The name "RAHNUMA" is derived from an Urdu word meaning "the one who guides." Over the past eleven years, RAHNUMA has won numerous street play competitions and received widespread acclaim for their productions. The society is dedicated to spreading awareness about various social issues through powerful and empathetic storytelling. Their public performances on various occasions have not only entertained but also enlightened audiences, showcasing their commitment to using theater as a medium for social change and education.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/rahnuma_igdtuw/',
      image: '/rahnuma.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Aaghaz-25', 'The Gag Chapter']
    },
    {
      id: 15,
      name: 'Prekshya', 
      category: 'Media and Creative',
      president: 'Harjas Kaur',
      description: 'Prekshya, the photography society of IGDTUW, hosts creative events like photowalks, workshops, competitions, and photoshoots while capturing the essence of university life through major fests and events. With opportunities for hands-on learning and collaboration, it provides a supportive space for both budding and seasoned photographers to hone their skills, explore creativity, and grow as artists.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/prekshya_igdtuw/',
      image: '/prekshya.jpg',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Yamuna Ghat photowalk', 'Psychedelic Euphoria']
    },
    {
      id: 16,
      name: 'Finivesta', 
      category: 'Literary and Educational',
      president: 'Abhaya Trivedi',
      description: 'The mission of the Finivesta is to cultivate a dynamic and inclusive community of women passionate about finance. Our aim is to help the women understand the world of finance and thereby demonstrate superior knowledge and to spread awareness towards the area of finance. Through educational events, networking opportunities, and community outreach, we aim to foster financial literacy, promote ethical financial practices, and empower our members to be leaders in the ever-changing world of finance.',
      email: 'ecell@igdtuw.ac.in',
      website: 'https://www.linkedin.com/company/finivesta-igdtuw/',
      instagram: 'https://www.instagram.com/finivesta_igdtuw/',
      image: '/finivesta.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Finweek', 'Finopoly']
    },
    {
      id: 17,
      name: 'zena', 
      category: 'Cultural',
      president: 'Navya Kalaria',
      description: 'Zena, the fashion society of IGDTUW, is where creativity and confidence meet the runway. Through performances that highlight social causes, Zena challenges stereotypes in fashion, supports body positivity, and celebrates diversity by welcoming members of all body types. More than glamour, it’s a movement that empowers students to express themselves, raise awareness, and let confidence shine above all.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/zena.igdtuw/',
      image: '/zena.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Diva-Leen', 'Flashmob']
    },
    {
      id: 18,
      name: 'Nirvana', 
      category: 'Technical',
      president: 'Shreya Sisodia , Navya Verma',
      description: 'club offers a unique platform for students to explore, learn, and excel in various design fields such as UI/UX, graphic design, and branding. With exciting competitions, hands-on mentorship, and access to the latest industry trends, Nirvana is the perfect place to develop your skills and prepare for a thriving career in design.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/designclubigdtuw/',
      image: '/nirvana.png',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Designathon', 'Mentorship Circles']
    },
    {
      id: 19,
      name: 'Taarangana', 
      category: 'Fest Organising societies',
      president: '',
      description: 'Taarangana, the annual cultural fest of Indira Gandhi Delhi Technical University for Women (IGDTUW), is a much-anticipated event that brings a burst of energy, creativity, and celebration to the campus. This fest is renowned for its vibrant atmosphere and diverse range of activities, providing students with a unique platform to showcase their talents and immerse themselves in cultural festivities. Taarangana stands out as a hallmark of IGDTUW, fostering a sense of community and artistic expression among students.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/taarangana/',
      image: '/tarrang.jpg',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['taarangana-25(mohit chauhan)', 'taarangana-24(shaan)']
    },
    {
      id: 20,
      name: 'Synergy', 
      category: 'Sports',
      president: 'Pranchal',
      description: 'Synergy is the Official Sports Club of IGDTUW. At Synergy, we are passionate about fostering a love for sports among women. Our club has proudly represented IGDTUW, earning numerous accolades at inter-college sports meets. We host a variety of intra-college tournaments, from volleyball and cricket to badminton and more, ensuring theres something for every sports enthusiast. We believe in the power of sports to bring people together and empower women to break barriers.',
      email: 'ecell@igdtuw.ac.in',
      website: '',
      instagram: 'https://www.instagram.com/synergy_igdtuw/',
      image: '/synergy.jpg',
      upcomingEvents: [
        { name: 'Summer Skills Sprint Challenge', date: '2024-03-30' },
        { name: 'Shark Tank Igdtuw', date: '2024-04-10' }
      ],
      achievements: ['Relay Rush', 'Tug of war']
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
            <div 
              key={society.id}
              ref={el => { societyRefs.current[society.id] = el }}
            >
              <GlassCard className="overflow-hidden">
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
              </div>

              {/* Society Details */}
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#EAEAEA' }}>
                  {society.name}
                </h3>

                <p className="mb-4" style={{ color: '#A0AEC0' }}>
                  {society.description}
                </p>

                {/* President Info */}
                <div className="flex items-center mb-4 text-sm">
                  <div style={{ color: '#A0AEC0' }}>
                    <strong style={{ color: '#EAEAEA' }}>President:</strong> {society.president}
                  </div>
                </div>



                {/* Past Events */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                    Past Events
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

                {/* Social Icons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${getCategoryColor(society.category)}, ${getCategoryColor(society.category)}80)`,
                      border: 'none',
                      flex: '1'
                    }}
                    onClick={() => window.open(society.instagram, '_blank')}
                  >
                    <Instagram size={18} className="mr-1" />
                    Instagram
                  </Button>
                  <Button 
                    className="flex-1 flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${getCategoryColor(society.category)}, ${getCategoryColor(society.category)}80)`,
                      border: 'none',
                      flex: '1'
                    }}
                    onClick={() => window.open(society.website, '_blank')}
                  >
                    <Linkedin size={18} className="mr-1" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </GlassCard>
            </div>
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
