import { GlassCard } from './GlassCard';
import { Book, FileText, Users, ShoppingBag, Calendar, User, Upload, X, Trash2, CheckSquare, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Button } from './ui/button';

interface DashboardProps {
  onNavigate: (page: string, filters?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { userProfile } = useAuth();
  
  // Timetable state management
  const [showTimetableModal, setShowTimetableModal] = useState(false);
  const [timetableImage, setTimetableImage] = useState<string | null>(
    localStorage.getItem('campusbae_timetable') || null
  );

  // Todo state management
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [todos, setTodos] = useState<{id: string, text: string, completed: boolean}[]>(() => {
    const savedTodos = localStorage.getItem('campusbae_todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodoText, setNewTodoText] = useState('');

  const [branchResources] = useState(() => {
    const saved = localStorage.getItem('campusbae_recent_subjects');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.length > 0) {
        return parsed.map((item: any) => ({
          ...item,
          icon: item.type.toLowerCase() === 'notes' || item.type.toLowerCase() === 'book' ? <Book size={24} /> : <FileText size={24} />
        }));
      }
    }
    return [
      { name: 'Applied Mathematics - AM', semester: 'Sem 1', type: 'Notes', icon: <Book size={24} />, branch: 'CSE', subject: 'Applied Mathematics - AM (BAS 101)' },
      { name: 'Data Structures and Algorithms - DSA', semester: 'Sem 2', type: 'PYQs', icon: <FileText size={24} />, branch: 'CSE', subject: 'Data Structures and Algorithms - DSA (BCS 103)' },
      { name: 'Programming with Python - PP', semester: 'Sem 1', type: 'Notes', icon: <Book size={24} />, branch: 'CSE-AI', subject: 'Programming with Python - PP (BAI 101)' },
      { name: 'Web Application Development - WAD', semester: 'Sem 1', type: 'Syllabus', icon: <FileText size={24} />, branch: 'CSE-AI', subject: 'Web Application Development - WAD (BCS 102)' }
    ];
  });

  const societies = [
    { id: 1, name: 'Google Developer Student Clubs(GDSC)', type: 'Technical', members: '500+', image: '/gdsc .png' },
    { id: 2, name: 'Assetmerkle', type: 'Blockchain & Web3', members: '350+', image: '/assetmerkle.png' },
    { id: 3, name: 'IEEE Student Chapter', type: 'Technical', members: '200+', image: '/ieee.png' },
    { id: 4, name: 'Microsoft Student Chapter(MSC)', type: 'Technical', members: '400+', image: '/msc.png' }
  ];

  const marketplaceItems = [
    { title: 'Data Structures Textbook', price: '₹800', seller: 'Priya S.' },
    { title: 'Scientific Calculator', price: '₹500', seller: 'Ananya K.' },
    { title: 'Lab Coat (Size M)', price: '₹300', seller: 'Shruti M.' }
  ];

  // Timetable functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTimetableImage(result);
        localStorage.setItem('campusbae_timetable', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveTimetable = () => {
    setTimetableImage(null);
    localStorage.removeItem('campusbae_timetable');
  };

  const handleCloseTimetableModal = () => {
    setShowTimetableModal(false);
  };

  // Todo functions
  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: crypto.randomUUID(),
        text: newTodoText.trim(),
        completed: false
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('campusbae_todos', JSON.stringify(updatedTodos));
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('campusbae_todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('campusbae_todos', JSON.stringify(updatedTodos));
  };

  const handleCloseTodoModal = () => {
    setShowTodoModal(false);
  };

  return (
    <div className="pt-24 pb-12 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto bg-transparent">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#EAEAEA' }}>
                Hey {userProfile?.name || 'Student'}, welcome back 👋
              </h1>
              <p style={{ color: '#A0AEC0' }}>
                Your campus companion is ready to help you succeed.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowTimetableModal(true)}
                className="bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border-[#00E5FF]/50 text-[#00E5FF] hover:text-[#00E5FF] flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                  border: '1px solid'
                }}
              >
                <Calendar size={18} />
                Timetable
              </Button>
              <Button
                onClick={() => setShowTodoModal(true)}
                className="bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border-[#00E5FF]/50 text-[#00E5FF] hover:text-[#00E5FF] flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  borderColor: 'rgba(0, 229, 255, 0.3)',
                  border: '1px solid'
                }}
              >
                <CheckSquare size={18} />
                Todo
              </Button>
            </div>
          </div>
        </div>

        {/* Branch Resources Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: '#EAEAEA' }}>
              Branch Resources
            </h2>
            <button
              onClick={() => onNavigate('resources')}
              className="text-[#00E5FF] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branchResources.map((resource, index) => (
              <GlassCard 
                key={index} 
                className="cursor-pointer group hover:scale-[1.02] transition-transform"
                onClick={() => onNavigate('resources', {
                  branch: resource.branch,
                  semester: resource.semester.replace('Sem ', ''),
                  subject: resource.subject,
                  type: resource.type
                })}
              >
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
              className="text-[#00E5FF] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {societies.map((society, index) => (
              <GlassCard 
                key={index} 
                className="cursor-pointer"
                onClick={() => onNavigate('societies', { scrollToSociety: society.id })}
              >
                <div className="flex items-center justify-center mb-3 h-12">
                  <img 
                    src={society.image} 
                    alt={society.name}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: '#EAEAEA' }}>
                  {society.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: '#A0AEC0' }}>
                  {society.type}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Marketplace Preview - Temporarily Commented Out
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: '#EAEAEA' }}>
              Marketplace
            </h2>
            <button
              onClick={() => onNavigate('marketplace')}
              className="text-[#00E5FF] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item, index) => (
              <GlassCard 
                key={index} 
                className="cursor-pointer"
                onClick={() => onNavigate('marketplace')}
              >
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
        */}

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

      {/* Timetable Modal Overlay */}
      {showTimetableModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
            style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold" style={{ color: '#EAEAEA' }}>
                My Timetable
              </h3>
              <button
                onClick={handleCloseTimetableModal}
                className="text-gray-400 hover:text-gray-200 p-1 rounded-lg hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!timetableImage ? (
                /* Upload Section */
                <div className="text-center py-12">
                  <Upload size={48} className="mx-auto mb-4 text-[#00E5FF]" />
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                    Upload Your Timetable
                  </h4>
                  <p className="text-sm mb-6" style={{ color: '#A0AEC0' }}>
                    Upload an image of your class timetable to keep it handy
                  </p>
                  <label htmlFor="timetable-upload" className="cursor-pointer">
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        borderColor: 'rgba(0, 229, 255, 0.3)',
                        color: '#00E5FF'
                      }}
                    >
                      <Upload size={18} />
                      Choose Image
                    </div>
                  </label>
                  <input
                    id="timetable-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-xs mt-3" style={{ color: '#A0AEC0' }}>
                    Supported formats: PNG, JPG, JPEG
                  </p>
                </div>
              ) : (
                /* Display Timetable Section */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold" style={{ color: '#EAEAEA' }}>
                      Your Timetable
                    </h4>
                    <Button
                      onClick={handleRemoveTimetable}
                      className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50 text-red-200 px-3 py-1 text-sm"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </Button>
                  </div>
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <img
                      src={timetableImage}
                      alt="Student Timetable"
                      className="w-full h-auto max-h-96 object-contain"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <label htmlFor="timetable-replace" className="cursor-pointer">
                      <div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 text-sm"
                        style={{
                          backgroundColor: 'rgba(0, 229, 255, 0.1)',
                          borderColor: 'rgba(0, 229, 255, 0.3)',
                          color: '#00E5FF'
                        }}
                      >
                        <Upload size={16} />
                        Replace Timetable
                      </div>
                    </label>
                    <input
                      id="timetable-replace"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Todo Modal Overlay */}
      {showTodoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto" style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)' }}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold" style={{ color: '#EAEAEA' }}>
                My Todos
              </h3>
              <button
                onClick={handleCloseTodoModal}
                className="text-gray-400 hover:text-gray-200 p-1 rounded-lg hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Add New Todo */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Add a new todo..."
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF]/50"
                  />
                  <Button
                    onClick={addTodo}
                    className="bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 border-[#00E5FF]/50 text-[#00E5FF] px-4 py-2"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Todo List */}
              <div className="space-y-2">
                {todos.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No todos yet. Add one above!
                  </p>
                ) : (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors ${
                          todo.completed
                            ? 'bg-white border-white'
                            : 'border-white bg-transparent hover:bg-white/10'
                        }`}
                      >
                        {todo.completed && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </button>
                      <span
                        className={`flex-1 transition-all ${
                          todo.completed
                            ? 'text-gray-400 line-through'
                            : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <Button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
