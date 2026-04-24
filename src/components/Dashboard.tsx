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
  List
} from 'lucide-react';
import { Timeline } from './ui/modern-timeline';
import FileUpload from './ui/file-upload';
import OnboardingForm from './OnboardingForm';

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
  const [view, setView] = useState<'registration' | 'patient'>('registration');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [healthOverview, setHealthOverview] = useState({
    conditions: ['Hypertension', 'Lactose Intolerance'],
    allergies: ['Peanuts', 'Penicillin'],
    reportsCount: 12,
    riskLevel: 'Medium' as 'Low' | 'Medium' | 'High'
  });
  const [timelineEvents, setTimelineEvents] = useState([
    { 
      date: 'Oct 12, 2025', 
      title: 'Hypertension Diagnosis', 
      type: 'Diagnosis', 
      desc: 'Blood pressure recorded at 150/90. Started initial screening.',
      status: 'completed' as const,
      image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=150&h=150&fit=crop'
    },
    { 
      date: 'Dec 05, 2025', 
      title: 'Cardiac Stress Test', 
      type: 'Test', 
      desc: 'Standard Bruce protocol treadmill test. Result: Normal.',
      status: 'completed' as const,
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=150&h=150&fit=crop'
    },
    { 
      date: 'Jan 20, 2026', 
      title: 'Statin Prescription', 
      type: 'Prescription', 
      desc: 'Atorvastatin 10mg prescribed for cholesterol management.',
      status: 'current' as const,
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=150&h=150&fit=crop'
    },
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

  const handleRegister = (data: any) => {
    const formattedData = {
      id: `CS-${Math.floor(Math.random() * 10000)}`,
      name: data.fullName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
    };
    
    // Update health overview with form data
    setHealthOverview(prev => ({
      ...prev,
      conditions: data.chronicDiseases ? data.chronicDiseases.split(',').map((s: string) => s.trim()) : prev.conditions,
      allergies: data.allergies ? data.allergies.split(',').map((s: string) => s.trim()) : prev.allergies,
    }));

    setPatientData(formattedData);
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

  const takenCount = medicines.filter(m => m.status === 'taken').length;
  const adherenceRate = medicines.length > 0 ? Math.round((takenCount / medicines.length) * 100) : 0;

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
      {patientData && (
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
      <div className={`flex-1 flex flex-col min-w-0 ${patientData ? 'min-h-screen' : ''}`}>
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
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            
            {/* Onboarding Registration View */}
            {view === 'registration' && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                   <Badge variant="primary" className="mb-4">AI Healthcare Onboarding</Badge>
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Welcome to CareSync</h2>
                   <p className="text-gray-400 font-medium text-lg max-w-xl mx-auto mt-4">Let's build your unified health profile and secure medical timeline in few easy steps.</p>
                </div>
                <OnboardingForm onComplete={handleRegister} />
              </motion.div>
            )}

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
                          <FileUpload />
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
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                       <h3 className="text-5xl font-black tracking-tighter mb-4">Patient Timeline</h3>
                       <p className="text-xl text-gray-400 font-medium tracking-tight">A chronological history of your healthcare journey.</p>
                    </div>
                    
                    <Timeline items={timelineEvents.map(event => ({
                      title: event.title,
                      description: event.desc,
                      date: event.date,
                      category: event.type,
                      status: event.status as any,
                      image: event.image
                    }))} />
                  </div>
                )}

                {/* 4. Insurance suggestions Tab */}
                {activeTab === 'insurance' && (
                  <div className="max-w-6xl mx-auto space-y-12">
                    <header className="text-center">
                       <h3 className="text-4xl font-black tracking-tighter mb-4">Recommended Insurance Plans</h3>
                       <p className="text-gray-400 font-medium tracking-tight">AI-driven recommendations based on your health risk profile.</p>
                    </header>

                    {/* Optional Top Summary Card */}
                    <Card className="p-8 bg-blue-600 border-none shadow-2xl shadow-blue-200 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                       <div className="relative z-10">
                          <Badge variant="primary" className="mb-4 bg-white/10 text-white border-white/20">Current Risk: MEDIUM</Badge>
                          <h4 className="text-2xl font-black mb-2">Standard Coverage Recommended</h4>
                          <p className="text-white/60 text-sm font-medium leading-relaxed max-w-md">Based on your recent health data, including blood work and chronic history, a Standard Coverage Plan is recommended for optimal protection.</p>
                       </div>
                       <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 relative z-10">
                          Sync Health Data
                       </Button>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {[
                         { 
                           name: 'Essential Care', 
                           risk: 'Low', 
                           recommended: false, 
                           desc: 'A baseline plan focused on preventive care and routine checkups.', 
                           benefits: ['100% Preventive coverage', 'Free annual lab work']
                         },
                         { 
                           name: 'Standard Care Plus', 
                           risk: 'Medium', 
                           recommended: true, 
                           desc: 'Comprehensive coverage designed for active management of ongoing health needs.', 
                           benefits: ['Medication discounts', 'Specialist consultation access', 'Bi-annual cardiology tests']
                         },
                         { 
                           name: 'Premium Protection', 
                           risk: 'High', 
                           recommended: false, 
                           desc: 'Maximum coverage for serious illness and intensive diagnostic requirements.', 
                           benefits: ['Global hospital access', '24/7 Concierge physician']
                         }
                       ].map((plan, i) => (
                         <Card key={i} className={`p-8 flex flex-col relative ${plan.recommended ? 'shadow-2xl shadow-blue-200 border-blue-600' : ''}`}>
                           {plan.recommended && (
                             <Badge variant="primary" className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 py-1 bg-blue-600 text-white">Best Match</Badge>
                           )}
                           <div className="mb-6 flex justify-between items-start">
                             <h4 className={`text-xl font-black tracking-tight ${plan.recommended ? 'text-blue-600' : 'text-black'}`}>{plan.name}</h4>
                             <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${plan.recommended ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                               Risk: {plan.risk}
                             </span>
                           </div>
                           <p className={`text-sm font-medium leading-relaxed mb-6 ${plan.recommended ? 'text-gray-600' : 'text-gray-400'}`}>{plan.desc}</p>
                           
                           <div className="space-y-3 mb-8 flex-1">
                             {plan.benefits.map((benefit, b) => (
                               <div key={b} className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                 <CheckCircle size={14} className={plan.recommended ? 'text-blue-600' : 'text-emerald-500'} />
                                 {benefit}
                               </div>
                             ))}
                           </div>

                           <Button variant={plan.recommended ? 'primary' : 'outline'} className="w-full py-4">
                             View Plan
                           </Button>
                         </Card>
                       ))}
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
                  <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-black tracking-tight">Patient profile</h2>
                      <div className="flex gap-4">
                        <Button variant="outline" className="rounded-full px-8 py-2">PRINT</Button>
                        <Button variant="secondary" className="rounded-full px-8 py-2">EDIT</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left Column */}
                      <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Profile Card */}
                          <Card className="p-8 flex flex-col items-center justify-center text-center">
                            <div className="relative mb-6">
                              <img 
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" 
                                alt="Kate" 
                                className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
                              />
                            </div>
                            <h3 className="text-2xl font-black mb-2">Kate Prokopchuk</h3>
                            <p className="text-blue-600 font-bold mb-1">+38 (093) 23 45 678</p>
                            <p className="text-gray-400 text-sm">katepro@gmail.com</p>
                          </Card>

                          {/* General Information Card */}
                          <Card className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">General information</h4>
                              <Settings size={14} className="text-gray-300" />
                            </div>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Date of birth:</span>
                                <span className="font-black">23. 07. 1994</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Address:</span>
                                <span className="font-black text-right max-w-[150px]">Lviv, Chornovola street, 67</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Registration Date:</span>
                                <span className="font-black">Thursday, May 25</span>
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* Tabs Section */}
                        <Card className="p-0 overflow-hidden border-none shadow-none bg-transparent">
                          <div className="flex border-b border-gray-100 gap-8 mb-8">
                            <button className="pb-4 text-sm font-black border-b-2 border-blue-600 text-blue-600">Future visits (2)</button>
                            <button className="pb-4 text-sm font-black text-gray-400 hover:text-black transition-colors">Past visits (15)</button>
                            <button className="pb-4 text-sm font-black text-gray-400 hover:text-black transition-colors">Planned treatments</button>
                          </div>

                          <div className="space-y-4">
                            {[
                              { date: '26 Sep 2023', time: '11:00-12:30', service: 'Treatment and cleaning of canals', doctor: 'Oksana Ma...', status: 'Scheduled', color: 'bg-purple-50 border-purple-200 text-purple-600' },
                              { date: '27 Nov 2023', time: '11:00-12:30', service: 'Teeth whitening', doctor: 'Max Oched...', status: 'Scheduled', color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
                            ].map((visit, i) => (
                              <div key={i} className={`flex items-center gap-6 p-6 rounded-3xl border-l-[6px] border ${visit.color} bg-opacity-30 border-t-0 border-r-0 border-b-0`}>
                                <div className="min-w-[120px]">
                                  <p className="text-[10px] font-black uppercase opacity-60 text-gray-500">{visit.time}</p>
                                  <p className="text-sm font-black text-gray-900">{visit.date}</p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] font-black uppercase opacity-60 text-gray-500">Service:</p>
                                  <p className="text-sm font-black text-gray-900">{visit.service}</p>
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] font-black uppercase opacity-60 text-gray-500">Doctor:</p>
                                  <p className="text-sm font-black text-purple-600">{visit.doctor}</p>
                                </div>
                                <div>
                                  <Badge variant="success" className="bg-emerald-500 text-white border-none">{visit.status}</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>

                      {/* Right Column */}
                      <div className="lg:col-span-4 space-y-8">
                        {/* Anamnesis Card */}
                        <Card className="p-8 space-y-6">
                           <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">Anamnesis</h4>
                              <Settings size={14} className="text-gray-300" />
                            </div>
                            <div className="space-y-4 text-xs font-medium">
                               <div className="pb-4 border-b border-gray-50 flex justify-between">
                                  <span className="text-gray-400">Allergies:</span>
                                  <span className="text-right">Nuts, pollen</span>
                               </div>
                               <div className="pb-4 border-b border-gray-50 flex justify-between">
                                  <span className="text-gray-400">Chronic diseases:</span>
                                  <span className="text-right">Asthma</span>
                               </div>
                               <div className="pb-4 border-b border-gray-50 flex justify-between">
                                  <span className="text-gray-400">Blood type:</span>
                                  <span className="text-right">I+</span>
                               </div>
                               <div className="flex justify-between">
                                  <span className="text-gray-400">Past illnesses or injuries:</span>
                                  <span className="text-right">Corona virus</span>
                               </div>
                            </div>
                        </Card>

                        {/* Files Section */}
                        <Card className="p-8 space-y-6">
                           <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">Files</h4>
                              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Download</button>
                            </div>
                            <div className="space-y-4">
                               {[
                                  'Check Up Result.pdf',
                                  'Check Up Result.pdf',
                                  'Medical Prescriptions.pdf',
                                  'Check Up Result.pdf'
                               ].map((file, i) => (
                                  <div key={i} className="flex items-center justify-between text-xs font-medium text-gray-500 hover:text-black transition-colors cursor-pointer group">
                                     <div className="flex items-center gap-2 text-gray-400">
                                        <FileText size={14} className="group-hover:text-blue-500" />
                                        <span className="group-hover:text-blue-500">{file}</span>
                                     </div>
                                     <span className="text-gray-300 text-[10px]">123kb</span>
                                  </div>
                               ))}
                            </div>
                        </Card>

                        {/* Notes Section */}
                        <Card className="p-8 space-y-6">
                           <div className="flex items-center justify-between">
                              <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">Notes</h4>
                              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Download</button>
                            </div>
                            <div className="space-y-4">
                               {[
                                  'Note 31.06.23.pdf',
                                  'Note 23.06.23.pdf'
                               ].map((note, i) => (
                                  <div key={i} className="flex items-center justify-between text-xs font-medium text-gray-500 hover:text-black transition-colors cursor-pointer group">
                                     <div className="flex items-center gap-2 text-gray-400">
                                        <FileText size={14} className="group-hover:text-blue-500" />
                                        <span className="group-hover:text-blue-500">{note}</span>
                                     </div>
                                     <span className="text-gray-300 text-[10px]">123kb</span>
                                  </div>
                               ))}
                            </div>
                        </Card>
                      </div>
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

          </AnimatePresence>
        </main>
      </div>
    </div>
  </div>
);
}

// --- Icons Helper ---
export function UsersIcon({ size }: { size: number }) {
  return <User size={size} />;
}
