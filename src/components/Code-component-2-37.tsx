import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, MessageCircle, Heart, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const marketplaceItems = [
    {
      id: 1,
      title: 'Data Structures Textbook - Cormen',
      price: '₹800',
      originalPrice: '₹1200',
      category: 'Books',
      branch: 'CSE',
      semester: 3,
      condition: 'Good',
      seller: 'Priya Sharma',
      sellerYear: '3rd Year',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop',
      description: 'Well-maintained textbook with minimal highlighting',
      liked: false,
      likes: 12
    },
    {
      id: 2,
      title: 'Scientific Calculator (Casio FX-991ES)',
      price: '₹500',
      originalPrice: '₹800',
      category: 'Electronics',
      branch: 'All',
      semester: 'All',
      condition: 'Excellent',
      seller: 'Ananya Khurana',
      sellerYear: '2nd Year',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      description: 'Rarely used calculator in excellent condition',
      liked: true,
      likes: 8
    },
    {
      id: 3,
      title: 'Lab Coat - Size M',
      price: '₹300',
      originalPrice: '₹500',
      category: 'Clothing',
      branch: 'All',
      semester: 'All',
      condition: 'Good',
      seller: 'Shruti Malik',
      sellerYear: '4th Year',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop',
      description: 'Clean lab coat, used for one semester',
      liked: false,
      likes: 3
    },
    {
      id: 4,
      title: 'Engineering Drawing Instruments Set',
      price: '₹350',
      originalPrice: '₹600',
      category: 'Stationery',
      branch: 'All',
      semester: 1,
      condition: 'Good',
      seller: 'Riya Patel',
      sellerYear: '3rd Year',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
      description: 'Complete set with compass, dividers, and rulers',
      liked: false,
      likes: 15
    },
    {
      id: 5,
      title: 'Computer Networks Book - Tanenbaum',
      price: '₹600',
      originalPrice: '₹900',
      category: 'Books',
      branch: 'CSE',
      semester: 5,
      condition: 'Fair',
      seller: 'Neha Singh',
      sellerYear: '4th Year',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      description: 'Some highlighting and notes in margins',
      liked: true,
      likes: 20
    },
    {
      id: 6,
      title: 'Laptop Stand - Adjustable',
      price: '₹450',
      originalPrice: '₹750',
      category: 'Electronics',
      branch: 'All',
      semester: 'All',
      condition: 'Excellent',
      seller: 'Kavya Agarwal',
      sellerYear: '2nd Year',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
      description: 'Portable and lightweight laptop stand',
      liked: false,
      likes: 6
    }
  ];

  const categories = ['all', 'Books', 'Electronics', 'Clothing', 'Stationery', 'Others'];
  const branches = ['all', 'CSE', 'IT', 'ECE', 'EEE', 'MAE', 'All'];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesBranch = selectedBranch === 'all' || item.branch === selectedBranch || item.branch === 'All';

    return matchesSearch && matchesCategory && matchesBranch;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return '#00FF88';
      case 'Good': return '#FFD700';
      case 'Fair': return '#FF9800';
      default: return '#A0AEC0';
    }
  };

  const handleContact = (seller: string) => {
    // Placeholder for contact functionality
    alert(`Contact feature coming soon! You'll be able to reach out to ${seller}.`);
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
            Marketplace
          </h1>
          <p style={{ color: '#A0AEC0' }}>
            Buy and sell items with your fellow IGDTUW students
          </p>
        </div>

        {/* Filters */}
        <GlassCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
              <Input
                placeholder="Search items..."
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

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
          </div>
        </GlassCard>

        {/* Add Item Button */}
        <div className="mb-8">
          <Button 
            className="flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
              border: 'none'
            }}
          >
            <Filter size={20} />
            Sell Item (Coming Soon)
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: '#A0AEC0' }}>
            Showing {filteredItems.length} items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <GlassCard key={item.id} className="overflow-hidden">
              {/* Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button 
                  className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: item.liked ? '#FF69B4' : '#EAEAEA'
                  }}
                >
                  <Heart size={18} fill={item.liked ? '#FF69B4' : 'none'} />
                </button>
                <div 
                  className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getConditionColor(item.condition)}20`,
                    color: getConditionColor(item.condition),
                    border: `1px solid ${getConditionColor(item.condition)}40`
                  }}
                >
                  {item.condition}
                </div>
              </div>

              {/* Item Details */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', color: '#00E5FF' }}
                  >
                    {item.category}
                  </span>
                  {item.branch !== 'All' && (
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#A0AEC0' }}
                    >
                      {item.branch}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                  {item.title}
                </h3>

                <p className="text-sm mb-3" style={{ color: '#A0AEC0' }}>
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: '#00E5FF' }}>
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm ml-2 line-through" style={{ color: '#A0AEC0' }}>
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{ color: '#A0AEC0' }}>
                    <Heart size={14} />
                    {item.likes}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm" style={{ color: '#A0AEC0' }}>
                  <span>Seller: {item.seller}</span>
                  <span>{item.sellerYear}</span>
                </div>

                <Button
                  onClick={() => handleContact(item.seller)}
                  className="w-full flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                    border: 'none'
                  }}
                >
                  <MessageCircle size={16} />
                  Contact Seller
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl mb-2" style={{ color: '#A0AEC0' }}>
              No items found
            </p>
            <p style={{ color: '#A0AEC0' }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Info Card */}
        <GlassCard className="mt-12">
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAEAEA' }}>
            💡 Marketplace Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" style={{ color: '#A0AEC0' }}>
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>For Buyers:</h4>
              <ul className="space-y-1">
                <li>• Always inspect items before purchasing</li>
                <li>• Meet in public campus areas for safety</li>
                <li>• Negotiate prices respectfully</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: '#00E5FF' }}>For Sellers:</h4>
              <ul className="space-y-1">
                <li>• Post clear, honest descriptions</li>
                <li>• Price items fairly based on condition</li>
                <li>• Respond promptly to interested buyers</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
