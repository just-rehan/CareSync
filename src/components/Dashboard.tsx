import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Home, 
  Search, 
  Bell, 
  User, 
  MessageSquare, 
  Clock, 
  Plus, 
  Calendar,
  Activity,
  Heart,
  FileText,
  Stethoscope,
  PhoneCall,
  Star,
  CheckCircle,
  MapPin,
  ChevronRight,
  Video,
  X,
  Shield,
  Send,
  Zap,
  Check,
  AlertCircle,
  QrCode,
  LayoutDashboard,
  BrainCircuit,
  Smartphone,
  Layout,
  Settings,
  HelpCircle,
  ShieldCheck,
  Construction,
  LogOut,
  List,
  BarChart3,
  Users
} from 'lucide-react';

// --- Types ---
interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
}

interface PatientRecord {
  id: string;
  date: string;
  doctor: string;
  symptoms: string;
  diagnosis: string;
  prescription: string;
}

interface PatientData {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
}

// --- Components ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={`bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '', variant = 'neutral' }: { children: React.ReactNode; className?: string; variant?: 'neutral' | 'success' | 'danger' | 'warning' | 'primary'; [key: string]: any }) => {
  const variants = {
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    danger: 'bg-rose-50 text-rose-600 border-rose-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    primary: 'bg-blue-50 text-blue-600 border-blue-100',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'; className?: string; disabled?: boolean }) => {
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/10',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200',
    outline: 'bg-white text-black border border-gray-200 hover:border-black',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200',
    ghost: 'hover:bg-gray-100 text-gray-500 hover:text-black',
  };
  
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Main Application ---
export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analyzer' | 'timeline' | 'insurance' | 'chat' | 'profile' | 'settings'>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [view, setView] = useState<'registration' | 'patient' | 'doctor' | 'admin'>('patient');
  const [patientData, setPatientData] = useState<PatientData | null>({
    id: 'CS-8421',
    name: 'David Rehan',
    age: '38',
    gender: 'Male',
    phone: '+1 234 567 890'
  });
  const [healthOverview, setHealthOverview] = useState({
    conditions: ['Hypertension', 'Lactose Intolerance'],
    allergies: ['Peanuts', 'Penicillin'],
    reportsCount: 12,
    riskLevel: 'Medium' as 'Low' | 'Medium' | 'High'
  });
  const [timelineEvents, setTimelineEvents] = useState([
    { date: 'Oct 12, 2025', title: 'Hypertension Diagnosis', type: 'Diagnosis', desc: 'Blood pressure recorded at 150/90. Started initial screening.' },
    { date: 'Dec 05, 2025', title: 'Cardiac Stress Test', type: 'Test', desc: 'Standard Bruce protocol treadmill test. Result: Normal.' },
    { date: 'Jan 20, 2026', title: 'Statin Prescription', type: 'Prescription', desc: 'Atorvastatin 10mg prescribed for cholesterol management.' },
  ]);
  const [analyzedRecords, setAnalyzedRecords] = useState([
    { id: '1', date: 'April 20, 2026', type: 'Blood Test', findings: 'Elevated Glucose (110 mg/dL)', status: 'Analyzed' },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: '1', name: 'Amoxicillin', dosage: '500mg', time: '08:00 AM', status: 'taken' },
    { id: '2', name: 'Paracetamol', dosage: '650mg', time: '12:00 PM', status: 'pending' },
    { id: '3', name: 'Cetirizine', dosage: '10mg', time: '09:00 PM', status: 'pending' },
  ]);
  const [records, setRecords] = useState<PatientRecord[]>([
    { id: '1', date: 'April 20, 2026', doctor: 'Dr. Sarah Johnson', symptoms: 'Fever, Cough', diagnosis: 'Common Flu', prescription: 'Paracetamol 650mg, Rest' },
  ]);
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your CareSync AI Analyst. I can help you understand your uploaded lab reports and medical timeline. What would you like to know?' }
  ]);

  const addNotification = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: `CS-${Math.floor(Math.random() * 10000)}`,
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      gender: formData.get('gender') as string,
      phone: formData.get('phone') as string,
    };
    setPatientData(data);
    setView('patient');
    addNotification('Registration successful! Welcome to CareSync.');
  };

  const handleMarkTaken = (id: string, status: 'taken' | 'missed') => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    addNotification(`Medicine marked as ${status}.`);
  };

  const generateAiSummary = () => {
    setIsGeneratingSummary(true);
    setTimeout(() => {
      setAiSummary("Based on the recent records, the patient shows symptoms of viral flu. Adherence to Paracetamol is high (90%), but rest periods are irregular. Recommended follow-up in 3 days.");
      setIsGeneratingSummary(false);
      addNotification("AI Summary generated.");
    }, 1500);
  };

  const sendReminder = (medicineName: string) => {
    addNotification(`WhatsApp Reminder Sent for ${medicineName}!`);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    
    setTimeout(() => {
      const responses = [
        "Based on your latest blood report from April 20th, your glucose levels are slightly above optimal. I've flagged this in your dashboard.",
        "Your health timeline has been updated with the new cardiology results. Would you like a summary of the findings?",
        "I detected a potential allergy to Penicillin in your historical records. I've updated your profile to alert clinical staff.",
        "Your Risk Level is currently Medium. This is primarily influenced by the 'Hypertension' diagnosis on your timeline."
      ];
      const randomMsg = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { sender: 'ai', text: randomMsg }]);
    }, 1000);
  };

  const handleAdminAccess = () => {
    setView('admin');
    addNotification('Accessing Secure Admin Dashboard...');
  };

  const takenCount = medicines.filter(m => m.status === 'taken').length;
  const adherenceRate = medicines.length > 0 ? Math.round((takenCount / medicines.length) * 100) : 0;

  // --- Keyboard shortcut for Admin (Secret Action) ---
  useEffect(() => {
    let keyCount = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        keyCount++;
        if (keyCount === 3) {
          handleAdminAccess();
          keyCount = 0;
        }
      } else {
        keyCount = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-black/5 flex">
      {/* Toast Notifications */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
            >
              <Zap className="text-amber-400" size={18} fill="currentColor" />
              <span className="text-xs font-bold leading-none">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar - Only shown in Patient View after registration */}
      {view === 'patient' && patientData && (
        <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} border-r border-gray-100 flex flex-col bg-white sticky top-0 h-screen transition-all duration-300 ease-in-out`}>
          <div className={`p-8 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <Activity className="text-white" size={20} />
            </button>
            {!isSidebarCollapsed && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-lg font-black tracking-tighter">CareSync</h1>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Healthy Living</p>
              </motion.div>
            )}
          </div>

          <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto no-scrollbar">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'analyzer', label: 'Report Analyzer', icon: FileText },
              { id: 'timeline', label: 'Health Timeline', icon: Clock },
              { id: 'insurance', label: 'Insurance Plans', icon: ShieldCheck },
              { id: 'chat', label: 'Chatbox', icon: MessageSquare },
              { id: 'profile', label: 'Health Profile', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                  activeTab === item.id 
                    ? 'bg-black text-white shadow-xl shadow-black/10' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-black'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-black'} />
                {!isSidebarCollapsed && (
                  <span className="text-[11px] font-black uppercase tracking-widest truncate">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-50 mt-auto">
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-2 py-1`}>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-black text-blue-600 text-sm shrink-0">
                {patientData.name.charAt(0)}
              </div>
              {!isSidebarCollapsed && (
                <div className="overflow-hidden flex-1">
                  <p className="text-xs font-black truncate">{patientData.name}</p>
                  <p className="text-[10px] font-bold text-gray-400 truncate tracking-tight">{patientData.id}</p>
                </div>
              )}
              {!isSidebarCollapsed && (
                <button 
                  onClick={() => setPatientData(null)}
                  className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Log Out"
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* Main Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${view === 'patient' && patientData ? 'h-screen overflow-hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
              <Smartphone className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase">{activeTab === 'dashboard' ? 'Health Overview' : activeTab.replace('-', ' ')}</h1>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">AI Health Report Analyzer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {view !== 'registration' && (
              <div className="flex bg-gray-100 p-1 rounded-2xl">
                <button 
                  onClick={() => setView('patient')}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'patient' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
                >
                  Patient
                </button>
                <button 
                  onClick={() => setView('doctor')}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'doctor' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
                >
                  Doctor
                </button>
              </div>
            )}
            
            {/* Hidden Admin Access Button (Transparent/Small) */}
            <button 
              onClick={handleAdminAccess} 
              className="w-2 h-2 opacity-0 hover:opacity-10 rounded-full bg-gray-200 transition-all cursor-default"
            />
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            
            {/* 1. Switchable Patient Tabs */}
            {view === 'patient' && patientData && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-12"
              >
                {/* 1. Dashboard Tab Overview */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: 'Conditions Detected', value: healthOverview.conditions.length.toString(), trend: 'Updated', icon: Activity, color: 'text-amber-600' },
                        { label: 'Active Allergies', value: healthOverview.allergies.length.toString(), trend: 'Verified', icon: Shield, color: 'text-rose-600' },
                        { label: 'Reports Analyzed', value: healthOverview.reportsCount.toString(), trend: '+2', icon: FileText, color: 'text-blue-600' },
                        { label: 'Risk Level', value: healthOverview.riskLevel, trend: 'Calculated', icon: AlertCircle, color: healthOverview.riskLevel === 'High' ? 'text-rose-600' : 'text-emerald-600' },
                      ].map((stat, i) => (
                        <div key={i}>
                          <Card className="p-6 border-none shadow-sm bg-white">
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                                <stat.icon size={20} />
                              </div>
                              <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{stat.trend}</span>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-black tracking-tight">{stat.value}</h4>
                          </Card>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8">
                        <Card className="p-8">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                               <h3 className="text-xl font-black tracking-tight">Health Summary</h3>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Extracted Clinical Trends</p>
                            </div>
                            <Badge variant="primary">AI Analysis</Badge>
                          </div>
                          
                          <div className="space-y-6">
                             <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                                <div className="flex items-center gap-3 mb-4">
                                   <BrainCircuit className="text-blue-600" size={18} />
                                   <h5 className="text-xs font-black uppercase tracking-widest text-blue-900">Latest Insights</h5>
                                </div>
                                <p className="text-sm font-medium text-blue-900/70 leading-relaxed">
                                   Your clinical profile indicates stable hypertension but suggests monitoring glucose levels following your recent blood panel. Adherence to prescribed Statins is optimal.
                                </p>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Detected Conditions</p>
                                   <div className="flex flex-wrap gap-2">
                                      {healthOverview.conditions.map(c => <Badge key={c} variant="warning">{c}</Badge>)}
                                   </div>
                                </div>
                                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Known Allergies</p>
                                   <div className="flex flex-wrap gap-2">
                                      {healthOverview.allergies.map(a => <Badge key={a} variant="danger">{a}</Badge>)}
                                   </div>
                                </div>
                             </div>
                          </div>
                        </Card>
                      </div>

                      <div className="lg:col-span-4">
                        <Card className="p-8 h-full flex flex-col">
                          <div className="mb-8">
                            <h3 className="text-xl font-black tracking-tight">Timeline Snapshot</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Events</p>
                          </div>
                          <div className="space-y-6 flex-1">
                             {timelineEvents.slice(0, 2).map((event, i) => (
                                <div key={i} className="flex gap-4 group">
                                   <div className="flex flex-col items-center">
                                      <div className={`w-3 h-3 rounded-full mt-1 ${event.type === 'Diagnosis' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                      {i === 0 && <div className="w-0.5 flex-1 bg-gray-100 my-1 group-last:hidden" />}
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{event.date}</p>
                                      <h5 className="text-sm font-black tracking-tight">{event.title}</h5>
                                      <p className="text-xs text-gray-400 line-clamp-1">{event.desc}</p>
                                   </div>
                                </div>
                             ))}
                          </div>
                          <Button variant="outline" className="w-full mt-6" onClick={() => setActiveTab('timeline')}>
                             View Full Timeline <ChevronRight size={14} />
                          </Button>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Report Analyzer Tab */}
                {activeTab === 'analyzer' && (
                  <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-3xl font-black tracking-tighter">Report Analyzer</h3>
                       <Badge variant="primary">Secured with AES-256</Badge>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                       <div className="lg:col-span-12">
                          <Card className="p-12 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors cursor-pointer group">
                             <div className="w-20 h-20 rounded-[2.5rem] bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Plus size={32} />
                             </div>
                             <h4 className="text-xl font-black mb-2">Upload Medical Record</h4>
                             <p className="text-gray-400 font-medium max-w-sm mb-8">Drop your PDF reports, lab results, or prescription images here for instant AI extraction.</p>
                             <div className="flex gap-4">
                                <Button variant="primary" onClick={() => {
                                   setIsAnalyzing(true);
                                   setTimeout(() => {
                                      setIsAnalyzing(false);
                                      addNotification("Report analyzed successfully!");
                                   }, 2000);
                                }}>
                                   {isAnalyzing ? 'Analyzing...' : 'Select Files'}
                                </Button>
                             </div>
                          </Card>
                       </div>

                       <div className="lg:col-span-12 space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Recently Analyzed</h4>
                          {analyzedRecords.map(record => (
                             <Card key={record.id} className="p-8 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                   <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600">
                                      <FileText size={24} />
                                   </div>
                                   <div>
                                      <h5 className="font-black text-lg">{record.type}</h5>
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{record.date} • {record.findings}</p>
                                   </div>
                                </div>
                                <Badge variant="success">{record.status}</Badge>
                             </Card>
                          ))}
                       </div>
                    </div>
                  </div>
                )}

                {/* 3. Timeline Tab */}
                {activeTab === 'timeline' && (
                  <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center">
                       <h3 className="text-4xl font-black tracking-tighter mb-4">Patient Timeline</h3>
                       <p className="text-gray-400 font-medium tracking-tight">A chronological history of your healthcare journey.</p>
                    </div>

                    <div className="relative pl-8 md:pl-0">
                       <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />
                       
                       <div className="space-y-12">
                          {timelineEvents.map((event, i) => (
                             <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2 z-10" />
                                <Card className="w-full md:w-[45%] p-8 hover:scale-[1.02] transition-transform">
                                   <Badge variant={event.type === 'Diagnosis' ? 'warning' : event.type === 'Test' ? 'primary' : 'success'} className="mb-4">
                                      {event.type}
                                   </Badge>
                                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{event.date}</p>
                                   <h4 className="text-xl font-black mb-2">{event.title}</h4>
                                   <p className="text-sm text-gray-400 leading-relaxed font-medium">{event.desc}</p>
                                </Card>
                                <div className="hidden md:block w-[45%]" />
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
                )}

                {/* 4. Insurance Tab */}
                {activeTab === 'insurance' && (
                  <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex items-center gap-6 mb-12">
                       <div className="w-20 h-20 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-100">
                          <ShieldCheck size={32} />
                       </div>
                       <div>
                          <h3 className="text-4xl font-black tracking-tighter">Insurance Suggestion</h3>
                          <p className="text-gray-400 font-medium tracking-tight">Optimized coverage based on your clinical risk data.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <Card className="p-10 bg-black text-white border-none shadow-2xl shadow-black/20 overflow-hidden relative">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                          <h4 className="text-2xl font-black mb-6">Patient Risk Assessment</h4>
                          <div className="space-y-8 relative z-10">
                             <div>
                                <div className="flex justify-between mb-3">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Overall Risk Level</span>
                                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Medium</span>
                                </div>
                                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                   <div className="w-1/2 h-full bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                </div>
                             </div>
                             
                             <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">AI Verdict</p>
                                <p className="text-sm font-medium leading-relaxed">
                                   "Medium Risk – Recommended Standard Health Plan due to recurring hypertension and specific dietary requirements detected in recent lab reports."
                                </p>
                             </div>
                          </div>
                       </Card>

                       <Card className="p-10">
                          <h4 className="text-2xl font-black mb-8 tracking-tighter">Recommended Plans</h4>
                          <div className="space-y-6">
                             {[
                                { name: 'Standard Care Plus', price: '$420/mo', active: true },
                                { name: 'Premium Wellness', price: '$650/mo', active: false },
                             ].map((plan, i) => (
                                <div key={i} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${plan.active ? 'border-blue-600 bg-blue-50/20' : 'border-gray-50 hover:border-gray-200'}`}>
                                   <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-black text-lg">{plan.name}</h5>
                                      {plan.active && <Badge variant="primary">Recommended</Badge>}
                                   </div>
                                   <p className="text-sm font-medium text-gray-500">{plan.price}</p>
                                </div>
                             ))}
                             <Button variant="primary" className="w-full py-5">View Plan Details</Button>
                          </div>
                       </Card>
                    </div>
                  </div>
                )}

                {/* 3. Chatbox Tab */}
                {activeTab === 'chat' && (
                  <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
                    <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-2xl shadow-blue-900/5 bg-white">
                      <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                          <BrainCircuit size={20} />
                        </div>
                        <div>
                          <h4 className="font-black text-sm">CareSync AI</h4>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active & Secure</p>
                        </div>
                      </div>
                      <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50/20 no-scrollbar">
                        {chatHistory.map((chat, i) => (
                          <div key={i} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] p-5 rounded-3xl text-sm font-medium ${
                              chat.sender === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm'
                            }`}>
                              {chat.text}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 bg-white border-t border-gray-50">
                        <div className="relative">
                          <input 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                            placeholder="Ask me anything..." 
                            className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-8 pr-16 text-sm font-bold focus:ring-1 focus:ring-black/5 outline-none transition-all shadow-inner"
                          />
                          <button 
                            onClick={handleChatSend}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* 6. Health Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <Card className="lg:col-span-4 p-12 text-center flex flex-col items-center">
                      <div className="w-24 h-24 rounded-[2.5rem] bg-blue-50 text-blue-600 flex items-center justify-center text-4xl font-black mb-8 shadow-xl shadow-blue-100">
                        {patientData.name.charAt(0)}
                      </div>
                      <h3 className="text-2xl font-black mb-2">{patientData.name}</h3>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{patientData.id}</p>
                      
                      <div className="mt-12 w-full pt-12 border-t border-gray-50 space-y-4">
                         {[
                            { label: 'Blood Group', value: 'O+' },
                            { label: 'Age', value: `${patientData.age} Years` },
                            { label: 'Gender', value: patientData.gender },
                            { label: 'Coverage', value: 'Standard Care Plus' },
                         ].map(item => (
                            <div key={item.label} className="flex justify-between text-[10px]">
                               <span className="font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                               <span className="font-bold text-black">{item.value}</span>
                            </div>
                         ))}
                      </div>
                      <Button variant="outline" className="w-full mt-8" onClick={() => addNotification('Profile link copied to clipboard!')}>
                         Share Health Profile <Search size={14} />
                      </Button>
                    </Card>
                    <div className="lg:col-span-8 space-y-8">
                       <Card className="p-10 bg-black text-white border-none flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-2xl shadow-black/20">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                          <div className="relative z-10 max-w-sm">
                            <Badge variant="primary" className="mb-6 bg-white/10 text-white border-white/20">Clinical Access</Badge>
                            <h4 className="text-3xl font-black mb-4 tracking-tighter">Unified Health ID</h4>
                            <p className="text-white/50 text-sm font-medium leading-relaxed">Present this encrypted QR to licensed clinical staff for secure synchronization of your AI-analyzed medical timeline and lab results.</p>
                          </div>
                          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl relative z-10 shrink-0 transform hover:scale-105 transition-transform duration-500">
                             <QRCodeSVG value={patientData.id} size={180} level="H" />
                          </div>
                       </Card>

                       <Card className="p-10">
                          <h4 className="text-xl font-black mb-6 tracking-tight">Active Consents</h4>
                          <div className="space-y-4">
                             {[
                                { entity: 'Dr. Sarah Johnson (Cardiology)', access: 'Full Access', expiry: 'May 2026' },
                                { entity: 'Standard Care Insurance', access: 'Report Summary Only', expiry: 'Indefinite' },
                             ].map((consent, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                   <div>
                                      <h5 className="font-black text-sm">{consent.entity}</h5>
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{consent.access} • Exp: {consent.expiry}</p>
                                   </div>
                                   <Button variant="ghost" className="text-rose-500 hover:bg-rose-50 px-4">Revoke</Button>
                                </div>
                             ))}
                          </div>
                       </Card>
                    </div>
                  </div>
                )}

                {/* 7. Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="max-w-4xl mx-auto space-y-8">
                     <h3 className="text-3xl font-black tracking-tighter text-blue-900">Account Settings</h3>
                     
                     <div className="space-y-6">
                        <Card className="p-8">
                           <h4 className="text-xl font-black mb-6">Security & Privacy</h4>
                           <div className="space-y-6">
                              {[
                                 { label: 'Two-Factor Authentication', desc: 'Secure your medical data with 2FA.', enabled: true },
                                 { label: 'Report Encryption', desc: 'Automatically encrypt all uploaded PDFs.', enabled: true },
                              ].map((item, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                       <h5 className="font-bold text-sm">{item.label}</h5>
                                       <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                                    </div>
                                    <div className="flex gap-2">
                                       <Badge variant={item.enabled ? 'success' : 'neutral'}>{item.enabled ? 'Enabled' : 'Disabled'}</Badge>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Card>
                     </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. Doctor View */}
            {view === 'doctor' && (
              <motion.div
                key="doctor"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left: Patient Lookup */}
                <div className="lg:col-span-4 space-y-8">
                  <section className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tighter">Scan ID</h3>
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                      <input 
                        defaultValue={patientData?.id}
                        placeholder="Patient ID (e.g. CS-1234)" 
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none shadow-lg shadow-black/5"
                      />
                    </div>
                  </section>

                  {patientData && (
                    <Card className="p-8 space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black">
                          {patientData.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xl font-black tracking-tight">{patientData.name}</h4>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{patientData.id}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl text-center">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Age</p>
                          <p className="font-black">{patientData.age}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl text-center">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Gender</p>
                          <p className="font-black">{patientData.gender}</p>
                        </div>
                      </div>
                      <Button variant="secondary" className="w-full py-4 text-xs" onClick={() => sendReminder('Upcoming Checkup')}>
                        <MessageSquare size={16} /> WhatsApp Reminder
                      </Button>
                    </Card>
                  )}

                  {/* AI Summary Card */}
                  <Card className="p-8 bg-blue-50/50 border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-blue-200">
                      <BrainCircuit size={48} />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-black tracking-tight mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-blue-600" fill="currentColor" /> AI Assistant
                      </h4>
                      {aiSummary ? (
                        <p className="text-blue-900/70 text-sm font-medium leading-relaxed mb-6 italic">
                          "{aiSummary}"
                        </p>
                      ) : (
                        <p className="text-blue-400 text-sm font-medium leading-relaxed mb-6">
                          Generate an AI summary of the patient's records and adherence to assist in diagnosis.
                        </p>
                      )}
                      <Button 
                        variant="secondary" 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        onClick={generateAiSummary}
                        disabled={isGeneratingSummary}
                      >
                        {isGeneratingSummary ? 'Processing...' : 'Generate Health Insights'}
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Right: Records & Add */}
                <div className="lg:col-span-8 space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black tracking-tighter">Medical Records</h3>
                      <button className="text-[10px] font-black uppercase tracking-widest text-blue-600">History Log</button>
                    </div>
                    <div className="space-y-4">
                      {records.map(record => (
                        <div key={record.id}>
                          <Card className="p-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                <Calendar size={20} />
                              </div>
                              <div>
                                <h5 className="font-black leading-tight text-lg">{record.diagnosis}</h5>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{record.doctor} • {record.date}</p>
                              </div>
                            </div>
                            <Badge variant="primary">Recent</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Symptoms</p>
                              <p className="text-sm font-medium">{record.symptoms}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prescription</p>
                              <p className="text-sm font-black text-blue-600">{record.prescription}</p>
                            </div>
                          </div>
                        </Card>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tighter">Add Clinical Entry</h3>
                    <Card className="p-8">
                      <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newRecord: PatientRecord = {
                          id: Math.random().toString(),
                          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                          doctor: 'Dr. David Rehan',
                          symptoms: formData.get('symptoms') as string,
                          diagnosis: formData.get('diagnosis') as string,
                          prescription: formData.get('prescription') as string,
                        };
                        setRecords(prev => [newRecord, ...prev]);
                        addNotification('Medical record added successfully.');
                        e.currentTarget.reset();
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Symptoms</label>
                            <input name="symptoms" required placeholder="Flu, Body ache..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Diagnosis</label>
                            <input name="diagnosis" required placeholder="Viral Infection..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Prescription / Medication</label>
                          <textarea name="prescription" required placeholder="Medicine names and dosage..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none resize-none h-24" />
                        </div>
                        <div className="flex gap-4">
                          <Button variant="primary" className="flex-1 py-5" onClick={() => {}}>
                            Submit Clinical Report
                          </Button>
                          <Button variant="secondary" className="py-5 px-10" onClick={() => sendReminder('New Medications Added')}>
                             <Smartphone size={18} /> Send Alert
                          </Button>
                        </div>
                      </form>
                    </Card>
                  </section>
                </div>
              </motion.div>
            )}

            {/* 4. Admin View (Secret) */}
            {view === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter mb-2">Systems Overview</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Access Restricted. Secure Health Network Console.</p>
                  </div>
                  <Badge variant="primary" className="px-6 py-3 text-sm">Active</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Patients', value: '1,284', grow: '+12%', icon: Users, color: 'text-blue-600' },
                    { label: 'Records Filed', value: '8,432', grow: '+4%', icon: FileText, color: 'text-emerald-600' },
                    { label: 'Reminders Sent', value: '12.4k', grow: '+18%', icon: Zap, color: 'text-amber-600' },
                    { label: 'Avg. Adherence', value: '84.2%', grow: '+2.1%', icon: Activity, color: 'text-rose-600' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <Card className="p-8 border-none shadow-2xl shadow-black/5 bg-white">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-4 rounded-2xl bg-gray-50 ${stat.color}`}>
                            <stat.icon size={24} />
                          </div>
                          <Badge variant="success" className="bg-emerald-50 text-emerald-600">{stat.grow}</Badge>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-black tracking-tight">{stat.value}</h4>
                      </Card>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                    <h3 className="text-2xl font-black tracking-tighter">Real-time Activity</h3>
                    <Card className="divide-y divide-gray-50">
                      {[
                        { text: 'Patient ID CS-8824 missed dose: Paracetamol', time: '2 mins ago', type: 'alert' },
                        { text: 'Dr. Wilson added clinical record for Alex J.', time: '12 mins ago', type: 'info' },
                        { text: 'New patient registration: Emily Watson', time: '1h ago', type: 'success' },
                        { text: 'System backup completed successfully', time: '4h ago', type: 'info' },
                      ].map((activity, i) => (
                        <div key={i} className="p-6 flex items-center justify-between group hover:bg-gray-50/50 transition-all">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'alert' ? 'bg-rose-500 shadow-lg shadow-rose-200' : 
                              activity.type === 'success' ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-blue-500 shadow-lg shadow-blue-200'
                            }`} />
                            <p className="text-sm font-bold text-gray-700">{activity.text}</p>
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activity.time}</span>
                        </div>
                      ))}
                    </Card>
                  </div>
                  
                  <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-2xl font-black tracking-tighter">Security Logs</h3>
                    <Card className="p-8 bg-black text-white text-[10px] font-mono leading-relaxed h-[400px] overflow-hidden relative">
                      <div className="space-y-2 opacity-60">
                        <p>[2026-04-20 12:44:12] AUTH_SUCCESS: USER_ID=ADM_01</p>
                        <p>[2026-04-20 12:44:15] DB_QUERY: SELECT * FROM PATIENTS WHERE ID='CS-8824'</p>
                        <p>[2026-04-20 13:02:11] ALERT: ADHERENCE_DROP PATIENT_ID='CS-8824'</p>
                        <p>[2026-04-20 13:05:00] WS_REMINDER: DELIVERED TO +XXXXXXXXX</p>
                        <p>[2026-04-20 13:05:01] DB_UPDATE: TABLE=MEDICINES STATUS='reminded'</p>
                        <p className="animate-pulse">[2026-04-20 13:10:04] SYSTEM_HEARTBEAT: OK</p>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  </div>
);
}

// --- Icons Helper ---
function UsersIcon({ size }: { size: number }) {
  return <User size={size} />;
}
