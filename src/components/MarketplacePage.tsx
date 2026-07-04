import { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Search, MessageCircle, Heart, Plus, Upload, X, Phone, Trash2, Copy, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { marketplaceService, MarketplaceItem, NewMarketplaceItem } from '../services/marketplaceService';
import { useAuth } from '../context/AuthContext';

export function MarketplacePage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [contactingItems, setContactingItems] = useState<Set<string>>(new Set());
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  
  // Sell item form state
  const [sellForm, setSellForm] = useState({
    title: '',
    sellerName: '',
    phoneNumber: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    branch: '',
    image: null as File | null
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load marketplace items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const marketplaceItems = await marketplaceService.getItems();
      setItems(marketplaceItems);
      setIsOffline(marketplaceService.isUsingOfflineMode());
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Books', 'Electronics', 'Clothing', 'Stationery', 'Others'];
  const branches = ['all', 'CSEAI', 'CSE', 'MAC', 'IT', 'AIML', 'ECEAI', 'ECE', 'MAE', 'All'];

  const filteredItems = items.filter(item => {
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
      case 'Average': return '#FF9800';
      default: return '#A0AEC0';
    }
  };

  const handleContact = (itemId: string) => {
    setContactingItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleLike = async (itemId: string) => {
    try {
      await marketplaceService.toggleLike(itemId);
      await loadItems(); // Reload items to show updated likes
    } catch (error) {
    }
  };

  const handleCopyPhone = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedPhone(phoneNumber);
      
      // Clear the copied state after 2 seconds
      setTimeout(() => {
        setCopiedPhone(null);
      }, 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = phoneNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedPhone(phoneNumber);
      
      // Clear the copied state after 2 seconds
      setTimeout(() => {
        setCopiedPhone(null);
      }, 2000);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSellForm({ ...sellForm, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSellFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sellForm.title || !sellForm.sellerName || !sellForm.phoneNumber || 
        !sellForm.description || !sellForm.category || !sellForm.condition || 
        !sellForm.price) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      
      const newItem: NewMarketplaceItem = {
        title: sellForm.title,
        sellerName: sellForm.sellerName,
        phoneNumber: sellForm.phoneNumber,
        description: sellForm.description,
        category: sellForm.category,
        condition: sellForm.condition,
        price: sellForm.price,
        branch: sellForm.branch || 'All',
        image: sellForm.image || undefined
      };
      
      
      const addedItem = await marketplaceService.addItem(newItem, user?.id);
      
      await loadItems(); // Reload items to show the new item
      
      // Reset form
      setIsDialogOpen(false);
      setSellForm({
        title: '',
        sellerName: '',
        phoneNumber: '',
        description: '',
        category: '',
        condition: '',
        price: '',
        branch: '',
        image: null
      });
      setImagePreview(null);
      
      // Item listed successfully - no alert needed
    } catch (error) {
      alert('Failed to list item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const removeImage = () => {
    setSellForm({ ...sellForm, image: null });
    setImagePreview(null);
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!window.confirm('Are you sure you want to remove this item?')) {
      return;
    }

    try {
      await marketplaceService.removeItem(itemId);
      // Remove item from local state
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      alert('Failed to remove item. Please try again.');
    }
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
          {isOffline && (
            <div className="mt-4 p-3 rounded-lg border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm">
              <p className="text-yellow-400 font-medium text-sm flex items-center gap-2">
                <span className="text-yellow-500">⚠️</span>
                Using local storage. Items will sync when database connection is restored.
              </p>
            </div>
          )}
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                  border: 'none'
                }}
              >
                <Plus size={20} />
                Sell Item
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: '#101828',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#EAEAEA'
              }}
            >
              <DialogHeader>
                <DialogTitle style={{ color: '#EAEAEA' }}>List Your Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSellFormSubmit} className="space-y-6 mt-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                    Item Photo
                  </label>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-400 mb-4">Click to upload or drag and drop</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white transition-all duration-300"
                        >
                          Choose File
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                    Item Title *
                  </label>
                  <Input
                    value={sellForm.title}
                    onChange={(e) => setSellForm({ ...sellForm, title: e.target.value })}
                    placeholder="e.g., Data Structures Textbook"
                    required
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#EAEAEA'
                    }}
                  />
                </div>

                {/* Seller Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                      Your Name *
                    </label>
                    <Input
                      value={sellForm.sellerName}
                      onChange={(e) => setSellForm({ ...sellForm, sellerName: e.target.value })}
                      placeholder="Enter your name"
                      required
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#EAEAEA'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                      Phone Number *
                    </label>
                    <Input
                      value={sellForm.phoneNumber}
                      onChange={(e) => setSellForm({ ...sellForm, phoneNumber: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#EAEAEA'
                      }}
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                    Price *
                  </label>
                  <Input
                    value={sellForm.price}
                    onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })}
                    placeholder="₹500"
                    required
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#EAEAEA'
                    }}
                  />
                </div>

                {/* Category and Condition */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                      Category *
                    </label>
                    <Select value={sellForm.category} onValueChange={(value: string) => setSellForm({ ...sellForm, category: value })}>
                      <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Stationery">Stationery</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                      Condition *
                    </label>
                    <Select value={sellForm.condition} onValueChange={(value: string) => setSellForm({ ...sellForm, condition: value })}>
                      <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                      Branch
                    </label>
                    <Select value={sellForm.branch} onValueChange={(value: string) => setSellForm({ ...sellForm, branch: value })}>
                      <SelectTrigger style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#EAEAEA' }}>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Branches</SelectItem>
                        <SelectItem value="CSEAI">CSEAI</SelectItem>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="MAC">MAC</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="AIML">AIML</SelectItem>
                        <SelectItem value="ECEAI">ECEAI</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="MAE">MAE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#EAEAEA' }}>
                    Description *
                  </label>
                  <Textarea
                    value={sellForm.description}
                    onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
                    placeholder="Describe the item's condition, usage, and any other relevant details..."
                    rows={4}
                    required
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#EAEAEA'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#EAEAEA'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: submitting 
                        ? 'linear-gradient(135deg, #6b7280, #9ca3af)' 
                        : 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                      border: 'none',
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? 'Listing...' : 'List Item'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: '#A0AEC0' }}>
            Showing {filteredItems.length} items {loading && '(Loading...)'}
          </p>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p style={{ color: '#A0AEC0' }}>Loading items...</p>
            </div>
          </div>
        ) : (
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
                <div className="absolute top-3 right-3 flex gap-2">
                  {/* Remove button - only show for user's own items */}
                  {item.userId === user?.id && (
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                      style={{ 
                        backgroundColor: 'rgba(220, 38, 38, 0.8)',
                        color: '#FFFFFF'
                      }}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  
                  {/* Like button */}
                  <button 
                    onClick={() => handleLike(item.id)}
                    className="p-2 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                    style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: item.liked ? '#FF69B4' : '#EAEAEA'
                    }}
                  >
                    <Heart size={18} fill={item.liked ? '#FF69B4' : 'none'} />
                  </button>
                </div>
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
                  onClick={() => handleContact(item.id)}
                  className="w-full flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: contactingItems.has(item.id) 
                      ? 'linear-gradient(135deg, #16a34a, #22c55e)' 
                      : 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                    border: 'none'
                  }}
                >
                  {contactingItems.has(item.id) ? (
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <span>{item.sellerPhone}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyPhone(item.sellerPhone);
                        }}
                        className={`p-1 rounded transition-all duration-200 ${
                          copiedPhone === item.sellerPhone 
                            ? 'bg-green-100 hover:bg-green-200' 
                            : 'hover:bg-gray-100'
                        }`}
                        title={copiedPhone === item.sellerPhone ? "Copied!" : "Copy phone number"}
                      >
                        {copiedPhone === item.sellerPhone ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <Copy size={14} className="text-gray-600 hover:text-gray-800" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <>
                      <MessageCircle size={16} />
                      Contact Seller
                    </>
                  )}
                </Button>
              </div>
            </GlassCard>
            ))}
          </div>
        )}

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
