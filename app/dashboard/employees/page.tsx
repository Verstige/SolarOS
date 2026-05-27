'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Plus, Search, ChevronRight, Mail, Phone,
  Calendar, CheckCircle2, AlertCircle, Clock, Zap,
  MoreHorizontal, Eye, Edit, Trash2, UserPlus, BookOpen,
  Award, TrendingUp, Sun, Settings, Bell, Shield,
  ArrowRight, Play, Pause, Star, MapPin, DollarSign
} from 'lucide-react';

const SOLAR = {
  primary: '#FF6B00',
  secondary: '#00D4AA', 
  accent: '#FFD60A',
  bg: '#000000',
  surface: '#0A0A0F',
  surface2: '#111118',
  border: 'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  muted: '#8E8E93',
  text: '#FFFFFF',
  success: '#30D158',
  warning: '#FF9F0A',
  danger: '#FF453A',
};

const TEAM_MEMBERS = [
  { id: 1, name: 'Alex Rivera', role: 'Lead Installer', status: 'active', avatar: 'AR', color: '#FF6B00', phone: '(813) 555-0142', email: 'alex.r@companysolar.com', location: 'Tampa, FL', rating: 4.9, jobsCompleted: 47, salary: '$62,000', joined: 'Mar 2024', onboarding: 100 },
  { id: 2, name: 'Maria Santos', role: 'Sales Representative', status: 'active', avatar: 'MS', color: '#00D4AA', phone: '(813) 555-0198', email: 'maria.s@companysolar.com', location: 'Tampa, FL', rating: 4.8, jobsCompleted: 38, salary: '$75,000', joined: 'Jun 2024', onboarding: 100 },
  { id: 3, name: 'Tyler Jackson', role: 'Apprentice Installer', status: 'training', avatar: 'TJ', color: '#5856D6', phone: '(813) 555-0167', email: 'tyler.j@companysolar.com', location: 'Brandon, FL', rating: 4.6, jobsCompleted: 12, salary: '$42,000', joined: 'Jan 2025', onboarding: 65 },
  { id: 4, name: 'Rachel Kim', role: 'Project Manager', status: 'active', avatar: 'RK', color: '#FF9F0A', phone: '(813) 555-0134', email: 'rachel.k@companysolar.com', location: 'Tampa, FL', rating: 4.9, jobsCompleted: 62, salary: '$85,000', joined: 'Feb 2023', onboarding: 100 },
  { id: 5, name: 'Carlos Vega', role: 'Electrician', status: 'active', avatar: 'CV', color: '#BF5FFF', phone: '(813) 555-0155', email: 'carlos.v@companysolar.com', location: 'Riverside, FL', rating: 4.7, jobsCompleted: 31, salary: '$72,000', joined: 'Aug 2023', onboarding: 100 },
  { id: 6, name: 'Jordan Lee', role: 'New Hire - Installer', status: 'onboarding', avatar: 'JL', color: '#FF2D55', phone: '(813) 555-0188', email: 'jordan.l@companysolar.com', location: 'Tampa, FL', rating: 0, jobsCompleted: 0, salary: '$48,000', joined: 'May 2025', onboarding: 30 },
];

const ONBOARDING_STEPS = [
  { id: 1, label: 'Account Setup', status: 'done' },
  { id: 2, label: 'Safety Training', status: 'done' },
  { id: 3, label: 'Tool Assignment', status: 'done' },
  { id: 4, label: 'Shadow Senior Installer', status: 'in_progress' },
  { id: 5, label: 'Permit Exam Prep', status: 'not_started' },
  { id: 6, label: 'First Solo Job', status: 'not_started' },
];

function TeamMemberRow({ member, onClick }: { member: typeof TEAM_MEMBERS[0]; onClick: () => void }) {
  const statusColor = member.status === 'active' ? SOLAR.success : member.status === 'training' ? SOLAR.warning : SOLAR.primary;
  
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer hover:bg-white/[0.02] transition-colors group"
      style={{ borderBottom: `1px solid ${SOLAR.border}` }} onClick={onClick}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: `${member.color}20`, color: member.color }}>
        {member.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{member.name}</span>
          {member.status === 'training' && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: `${SOLAR.warning}20`, color: SOLAR.warning }}>TRAINING</span>
          )}
          {member.status === 'onboarding' && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: `${SOLAR.primary}20`, color: SOLAR.primary }}>ONBOARDING</span>
          )}
        </div>
        <div className="text-xs mt-0.5" style={{ color: SOLAR.muted }}>{member.role}</div>
      </div>
      <div className="hidden md:flex items-center gap-1 text-xs" style={{ color: SOLAR.muted }}>
        <MapPin size={11} />{member.location}
      </div>
      {member.rating > 0 && (
        <div className="hidden lg:flex items-center gap-1">
          <Star size={12} style={{ color: SOLAR.accent }} fill={SOLAR.accent} />
          <span className="text-xs font-medium">{member.rating}</span>
        </div>
      )}
      {member.jobsCompleted > 0 && (
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium">{member.jobsCompleted}</div>
          <div className="text-[10px]" style={{ color: SOLAR.muted }}>jobs</div>
        </div>
      )}
      {member.status === 'onboarding' && (
        <div className="hidden md:block w-32">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px]" style={{ color: SOLAR.muted }}>{member.onboarding}%</span>
          </div>
          <div className="h-1 rounded-full" style={{ background: SOLAR.surface2 }}>
            <div className="h-1 rounded-full" style={{ width: `${member.onboarding}%`, background: SOLAR.primary }} />
          </div>
        </div>
      )}
      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: SOLAR.muted }} />
    </motion.div>
  );
}

function OnboardingStep({ step }: { step: typeof ONBOARDING_STEPS[0] }) {
  const isDone = step.status === 'done';
  const isActive = step.status === 'in_progress';
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: isDone ? `${SOLAR.success}20` : isActive ? `${SOLAR.primary}20` : SOLAR.surface2 }}>
        {isDone ? <CheckCircle2 size={14} style={{ color: SOLAR.success }} /> :
         isActive ? <div className="w-2 h-2 rounded-full" style={{ background: SOLAR.primary }} /> :
         <div className="w-1.5 h-1.5 rounded-full" style={{ background: SOLAR.muted }} />}
      </div>
      <span className="text-sm" style={{ color: isDone ? SOLAR.success : isActive ? SOLAR.text : SOLAR.muted }}>{step.label}</span>
    </div>
  );
}

function MemberModal({ member, onClose }: { member: typeof TEAM_MEMBERS[0]; onClose: () => void }) {
  const isOnboarding = member.status === 'onboarding' || member.status === 'training';
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg rounded-3xl overflow-hidden" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${SOLAR.border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base" style={{ background: `${member.color}20`, color: member.color }}>
              {member.avatar}
            </div>
            <div>
              <div className="font-bold text-lg">{member.name}</div>
              <div className="text-xs" style={{ color: SOLAR.muted }}>{member.role}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10">
            <span style={{ color: SOLAR.muted }}>✕</span>
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          {isOnboarding && (
            <div className="rounded-2xl p-4" style={{ background: `${SOLAR.primary}10`, border: `1px solid ${SOLAR.primary}20` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: SOLAR.primary }}>Onboarding Progress</span>
                <span className="text-sm font-bold" style={{ color: SOLAR.primary }}>{member.onboarding}%</span>
              </div>
              <div className="h-1.5 rounded-full mb-4" style={{ background: `${SOLAR.primary}20` }}>
                <div className="h-1.5 rounded-full" style={{ width: `${member.onboarding}%`, background: SOLAR.primary }} />
              </div>
              <div className="space-y-1">
                {ONBOARDING_STEPS.map((step) => <OnboardingStep key={step.id} step={step} />)}
              </div>
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: SOLAR.muted }}>Contact</h4>
            <div className="space-y-2">
              <a href={`tel:${member.phone}`} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5" style={{ color: SOLAR.text }}>
                <Phone size={14} style={{ color: SOLAR.primary }} />{member.phone}
              </a>
              <a href={`mailto:${member.email}`} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5" style={{ color: SOLAR.text }}>
                <Mail size={14} style={{ color: SOLAR.primary }} />{member.email}
              </a>
              <div className="flex items-center gap-3 px-3 py-2" style={{ color: SOLAR.muted }}>
                <MapPin size={14} />{member.location}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-3 text-center" style={{ background: SOLAR.surface2 }}>
              <div className="text-lg font-bold">{member.jobsCompleted}</div>
              <div className="text-[10px]" style={{ color: SOLAR.muted }}>Jobs Done</div>
            </div>
            {member.rating > 0 && (
              <div className="rounded-xl p-3 text-center" style={{ background: SOLAR.surface2 }}>
                <div className="text-lg font-bold" style={{ color: SOLAR.accent }}>{member.rating}</div>
                <div className="text-[10px]" style={{ color: SOLAR.muted }}>Rating</div>
              </div>
            )}
            <div className="rounded-xl p-3 text-center" style={{ background: SOLAR.surface2 }}>
              <div className="text-lg font-bold">{member.salary}</div>
              <div className="text-[10px]" style={{ color: SOLAR.muted }}>Salary</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90" style={{ background: SOLAR.primary, color: '#000' }}>
              <Edit size={14} />Edit Profile
            </button>
            <button className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-white/10" style={{ background: SOLAR.surface2 }}>
              <MoreHorizontal size={16} style={{ color: SOLAR.muted }} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EmployeesPage() {
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filtered = searchQuery ? TEAM_MEMBERS.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.role.toLowerCase().includes(searchQuery.toLowerCase())) : TEAM_MEMBERS;
  const activeCount = TEAM_MEMBERS.filter(m => m.status === 'active').length;
  const trainingCount = TEAM_MEMBERS.filter(m => m.status !== 'active').length;
  
  return (
    <div className="min-h-screen pb-20" style={{ background: SOLAR.bg }}>
      <header className="sticky top-0 z-40 px-6 py-4 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.85)', borderBottom: `1px solid ${SOLAR.border}` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${SOLAR.secondary}20` }}>
              <Users size={18} style={{ color: SOLAR.secondary }} />
            </div>
            <div>
              <div className="font-bold text-base">Team</div>
              <div className="text-[10px]" style={{ color: SOLAR.muted }}>{TEAM_MEMBERS.length} members · {activeCount} active</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl flex-1 max-w-sm" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
            <Search size={15} style={{ color: SOLAR.muted }} />
            <input type="text" placeholder="Search team members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" style={{ color: SOLAR.text }} />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: SOLAR.primary, color: '#000' }}>
              <UserPlus size={15} />Add Member
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Team', value: TEAM_MEMBERS.length, icon: Users, color: SOLAR.primary },
            { label: 'Active', value: activeCount, icon: CheckCircle2, color: SOLAR.success },
            { label: 'In Training', value: trainingCount, icon: BookOpen, color: SOLAR.warning },
            { label: 'Avg Rating', value: '4.8', icon: Star, color: SOLAR.accent },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-4 flex items-center gap-3" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <div><div className="text-xl font-bold">{stat.value}</div><div className="text-xs" style={{ color: SOLAR.muted }}>{stat.label}</div></div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
          {filtered.map((member, i) => (
            <TeamMemberRow key={member.id} member={member} onClick={() => setSelectedMember(member)} />
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm" style={{ color: SOLAR.muted }}>No team members found</p>
            </div>
          )}
        </div>
      </div>

      {selectedMember && <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </div>
  );
}