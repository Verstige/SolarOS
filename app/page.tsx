'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Users, BarChart3, Calendar, FileText, 
  Megaphone, Shield, Wrench, Settings, Bell,
  TrendingUp, TrendingDown, ArrowRight, ChevronRight,
  Sun, DollarSign, Clock, CheckCircle2, AlertCircle,
  Facebook, Instagram, Linkedin, Youtube,
  Mail, HardDrive, CalendarCheck, FileCheck,
  Plus, Search, Eye, Edit, PlusCircle, ArrowUpRight
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

const MODULES = [
  { icon: Zap, label: 'AI Proposals', color: '#FF6B00', desc: '2-hour proposals', path: '/pipeline', badge: 'AI-Powered' },
  { icon: BarChart3, label: 'Pipeline', color: '#00D4AA', desc: '7-stage kanban', path: '/pipeline', badge: null },
  { icon: Users, label: 'Team', color: '#BF5FFF', desc: '12 active', path: '/employees', badge: 'Onboarding' },
  { icon: Megaphone, label: 'Social Hub', color: '#FF2D55', desc: '4 accounts', path: '/social', badge: '3 Scheduled' },
  { icon: CalendarCheck, label: 'Scheduling', color: '#5856D6', desc: '5 jobs today', path: '/pipeline', badge: null },
  { icon: FileCheck, label: 'Permits', color: '#FF9F0A', desc: '2 pending', path: '/pipeline', badge: 'Urgent' },
  { icon: Mail, label: 'Google Workspace', color: '#4285F4', desc: 'Gmail + Drive + Calendar', path: '/social', badge: null },
  { icon: DollarSign, label: 'Revenue', color: '#30D158', desc: '$847K this quarter', path: '/pipeline', badge: null },
];

const SOCIAL_ACCOUNTS = [
  { platform: 'facebook', icon: Facebook, connected: true, name: 'Tampa Solar Co', followers: '12.4K' },
  { platform: 'instagram', icon: Instagram, connected: true, name: '@tampasolarco', followers: '8.2K' },
  { platform: 'linkedin', icon: Linkedin, connected: true, name: 'Tampa Solar Co', followers: '3.1K' },
  { platform: 'youtube', icon: Youtube, connected: false, name: 'YouTube', followers: '' },
];

const RECENT_PROPOSALS = [
  { id: '#PRO-2847', client: 'Roberto Martinez', value: '$42,500', status: 'Sent', date: '2h ago' },
  { id: '#PRO-2846', client: 'Jennifer Walsh', value: '$38,200', status: 'Draft', date: '5h ago' },
  { id: '#PRO-2845', client: 'Mark Thompson', value: '$56,000', status: 'Won', date: 'Yesterday' },
  { id: '#PRO-2844', client: 'Sarah Chen', value: '$44,800', status: 'Lost', date: '2d ago' },
];

function MetricCard({ label, value, delta, icon: Icon, color, delay = 0 }: { label: string; value: string; delta?: string; icon: any; color: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl p-5 group cursor-pointer"
      style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}
    >
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity" style={{ background: color }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {delta && (
          <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
            style={{ background: delta.startsWith('+') ? `${SOLAR.success}20` : `${SOLAR.danger}20`, color: delta.startsWith('+') ? SOLAR.success : SOLAR.danger }}>
            {delta.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold mb-1 tracking-tight">{value}</div>
      <div className="text-sm" style={{ color: SOLAR.muted }}>{label}</div>
    </motion.div>
  );
}

function ModuleCard({ module, index }: { module: typeof MODULES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl p-5 cursor-pointer"
      style={{ background: SOLAR.surface, border: `1px solid ${hovered ? SOLAR.borderHover : SOLAR.border}`, transform: hovered ? 'translateY(-2px)' : 'none', transition: 'all 0.2s ease-out' }}
    >
      {module.badge && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: `${module.color}20`, color: module.color }}>
          {module.badge}
        </span>
      )}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${module.color}18` }}>
        <module.icon size={22} style={{ color: module.color }} />
      </div>
      <div className="font-semibold text-base mb-1">{module.label}</div>
      <div className="text-sm" style={{ color: SOLAR.muted }}>{module.desc}</div>
      <motion.div className="absolute bottom-4 right-4" initial={{ opacity: 0, x: -5 }} animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5 }} transition={{ duration: 0.15 }}>
        <ArrowRight size={16} style={{ color: module.color }} />
      </motion.div>
    </motion.div>
  );
}

function ProposalRow({ id, client, value, status, date }: { id: string; client: string; value: string; status: string; date: string }) {
  const statusColors: Record<string, string> = { Draft: '#8E8E93', Sent: '#FF9F0A', Won: '#30D158', Lost: '#FF453A' };
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer group" style={{ borderBottom: `1px solid ${SOLAR.border}` }}>
      <div className="flex-1">
        <div className="font-medium text-sm">{client}</div>
        <div className="text-xs mt-0.5" style={{ color: SOLAR.muted }}>{id} · {date}</div>
      </div>
      <div className="font-semibold text-sm">{value}</div>
      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${statusColors[status]}20`, color: statusColors[status] }}>{status}</span>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Eye size={13} style={{ color: SOLAR.muted }} /></button>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Edit size={13} style={{ color: SOLAR.muted }} /></button>
      </div>
    </div>
  );
}

function SocialPreview({ platform, content, scheduled }: { platform: string; content: string; scheduled?: string }) {
  const icons: Record<string, any> = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, youtube: Youtube };
  const colors: Record<string, string> = { facebook: '#1877F2', instagram: '#E4405F', linkedin: '#0A66C2', youtube: '#FF0000' };
  const Icon = icons[platform] || Facebook;
  const color = colors[platform] || '#1877F2';
  return (
    <div className="rounded-xl p-4" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium capitalize">{platform}</div>
          {scheduled && <div className="text-xs" style={{ color: SOLAR.muted }}>Scheduled for {scheduled}</div>}
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${SOLAR.warning}20`, color: SOLAR.warning }}>SCHEDULED</span>
      </div>
      <p className="text-sm leading-relaxed">{content}</p>
    </div>
  );
}

export default function SolarDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pb-24" style={{ background: SOLAR.bg }}>
      <motion.header className="sticky top-0 z-50 px-6 py-4 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.85)', borderBottom: `1px solid ${SOLAR.border}` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${SOLAR.primary}, ${SOLAR.accent})` }}>
              <Sun size={18} style={{ color: SOLAR.bg }} />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight">SolarOS</div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: SOLAR.muted }}>Operating System</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl flex-1 max-w-md" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
            <Search size={16} style={{ color: SOLAR.muted }} />
            <input type="text" placeholder="Search proposals, clients, tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" style={{ color: SOLAR.text }} />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: SOLAR.primary, color: '#000' }}><Plus size={15} />New Proposal</button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}><Bell size={16} style={{ color: SOLAR.muted }} /></button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}><Settings size={16} style={{ color: SOLAR.muted }} /></button>
            <div className="w-9 h-9 rounded-full ml-2 cursor-pointer" style={{ background: `linear-gradient(135deg, ${SOLAR.primary}, ${SOLAR.secondary})` }} />
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Command Center</h1>
          <p style={{ color: SOLAR.muted }}>Overview of your solar operations — May 27, 2026</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 mb-8 mt-6">
          <MetricCard label="Active Proposals" value="$284K" delta="+12%" icon={FileText} color={SOLAR.primary} delay={0} />
          <MetricCard label="Pipeline Value" value="$1.2M" delta="+8%" icon={BarChart3} color={SOLAR.secondary} delay={0.05} />
          <MetricCard label="Installations" value="34" delta="+5" icon={Wrench} color={SOLAR.accent} delay={0.1} />
          <MetricCard label="Team Members" value="12" delta="+2" icon={Users} color="#BF5FFF" delay={0.15} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Platform Modules</h2>
            <button className="text-sm flex items-center gap-1 hover:opacity-80" style={{ color: SOLAR.primary }}>View all <ChevronRight size={14} /></button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {MODULES.map((mod, i) => <ModuleCard key={mod.label} module={mod} index={i} />)}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Proposals</h3>
              <button className="text-sm" style={{ color: SOLAR.primary }}>+ New</button>
            </div>
            {RECENT_PROPOSALS.map((p) => <ProposalRow key={p.id} {...p} />)}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Social Hub</h3>
              <div className="flex gap-1">
                {SOCIAL_ACCOUNTS.slice(0,3).map((acc) => (
                  <div key={acc.platform} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: SOLAR.border }}>
                    <acc.icon size={12} style={{ color: SOLAR.muted }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {SOCIAL_ACCOUNTS.map((acc) => (
                <div key={acc.platform} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: acc.connected ? `${SOLAR.success}10` : SOLAR.surface2 }}>
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: acc.connected ? `${SOLAR.success}20` : 'rgba(255,255,255,0.05)' }}>
                    <acc.icon size={11} style={{ color: acc.connected ? SOLAR.success : SOLAR.muted }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{acc.name}</div>
                    {acc.followers && <div className="text-[10px]" style={{ color: SOLAR.muted }}>{acc.followers}</div>}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: acc.connected ? SOLAR.success : SOLAR.muted }} />
                </div>
              ))}
            </div>
            <SocialPreview platform="facebook" content="Just completed a 12kW residential installation in South Tampa! Our clients are now saving $280/month on their electric bills. Ready to make the switch? DM us for a free consultation." scheduled="Tomorrow 9:00 AM" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex items-center justify-center gap-3">
          {[
            { label: 'Create Proposal', icon: FileText, color: SOLAR.primary },
            { label: 'Schedule Post', icon: Megaphone, color: '#FF2D55' },
            { label: 'Add Team Member', icon: Users, color: '#BF5FFF' },
            { label: 'View Permits', icon: Shield, color: SOLAR.warning },
          ].map((action) => (
            <button key={action.label} className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm hover:scale-[1.02] transition-transform" style={{ background: `${action.color}15`, border: `1px solid ${action.color}30`, color: action.color }}>
              <action.icon size={16} />
              {action.label}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
