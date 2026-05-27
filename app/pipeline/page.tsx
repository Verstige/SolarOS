'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, ChevronRight, Calendar, User, DollarSign, Home, 
  FileText, Clock, CheckCircle2, AlertCircle, X, Zap, TrendingUp, MoreHorizontal as MoreMenu, Edit, Image as ImageIcon, ArrowRight
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

const STAGES = [
  { id: 'lead', label: 'Lead', icon: User, color: '#8E8E93', next: 'survey' },
  { id: 'survey', label: 'Survey', icon: Home, color: '#5856D6', next: 'design' },
  { id: 'design', label: 'Design', icon: FileText, color: '#FF9F0A', next: 'permit' },
  { id: 'permit', label: 'Permitting', icon: Clock, color: '#BF5FFF', next: 'install' },
  { id: 'install', label: 'Installation', icon: Zap, color: '#FF6B00', next: 'activate' },
  { id: 'activate', label: 'Activation', icon: CheckCircle2, color: '#00D4AA', next: null },
];

const INITIAL_JOBS = [
  { id: 'PROJ-001', client: 'Roberto Martinez', address: '2847 W Palm Ave, Tampa FL 33629', value: '$42,500', stage: 'lead', days: 2, image: true, priority: 'high' },
  { id: 'PROJ-002', client: 'Jennifer Walsh', address: '1123 S Howard Ave, Tampa FL 33606', value: '$38,200', stage: 'lead', days: 5, image: false, priority: 'medium' },
  { id: 'PROJ-003', client: 'Marcus Johnson', address: '445 W Kennedy Blvd, Tampa FL 33606', value: '$61,000', stage: 'lead', days: 1, image: true, priority: 'high' },
  { id: 'PROJ-004', client: 'Sarah Chen', address: '823 W Euclid Ave, Tampa FL 33604', value: '$44,800', stage: 'survey', days: 3, image: false, priority: 'medium' },
  { id: 'PROJ-005', client: 'David Park', address: '1204 S Neptune Ave, Tampa FL 33605', value: '$52,000', stage: 'survey', days: 7, image: true, priority: 'low' },
  { id: 'PROJ-006', client: 'Mark Thompson', address: '3301 Bayshore Blvd #1205, Tampa', value: '$56,000', stage: 'design', days: 4, image: true, priority: 'high' },
  { id: 'PROJ-007', client: 'Emily Rodriguez', address: '901 S Mobley St, Tampa FL 33606', value: '$39,900', stage: 'design', days: 10, image: false, priority: 'low' },
  { id: 'PROJ-008', client: 'Robert Kim', address: '5103 Bayshore Blvd, Tampa FL 33611', value: '$67,200', stage: 'permit', days: 8, image: true, priority: 'high' },
  { id: 'PROJ-009', client: 'Amanda Foster', address: '2215 S Dale Mabry Hwy, Tampa', value: '$41,000', stage: 'permit', days: 14, image: false, priority: 'medium' },
  { id: 'PROJ-010', client: 'Carlos Mendez', address: '4421 W Gandy Blvd, Tampa FL 33611', value: '$58,400', stage: 'install', days: 2, image: true, priority: 'high' },
  { id: 'PROJ-011', client: 'Lisa Thompson', address: '7723 Hanley Rd, Tampa FL 33634', value: '$45,100', stage: 'install', days: 5, image: false, priority: 'medium' },
  { id: 'PROJ-012', client: 'James Wilson', address: '3340 W Kennedy Blvd, Tampa FL', value: '$53,800', stage: 'activate', days: 1, image: true, priority: 'high' },
];

function StageColumn({ stage, jobs, onJobMove, onJobClick }: { stage: typeof STAGES[0]; jobs: typeof INITIAL_JOBS; onJobMove: (jobId: string, direction: 'left' | 'right') => void; onJobClick: (job: typeof INITIAL_JOBS[0]) => void }) {
  const Icon = stage.icon;
  const stageJobs = jobs.filter(j => j.stage === stage.id);
  return (
    <div className="flex-1 min-w-[260px] max-w-[300px]">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${stage.color}20` }}>
          <Icon size={13} style={{ color: stage.color }} />
        </div>
        <span className="text-sm font-semibold">{stage.label}</span>
        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ background: `${stage.color}20`, color: stage.color }}>{stageJobs.length}</span>
      </div>
      <div className="space-y-2.5">
        <AnimatePresence>
          {stageJobs.map((job, i) => (
            <motion.div key={job.id} layout initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04, duration: 0.25 }}
              className="relative rounded-2xl p-4 cursor-pointer group" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}
              onClick={() => onJobClick(job)}>
              {job.priority === 'high' && <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ background: SOLAR.danger }} />}
              {job.image && (
                <div className="w-full h-20 rounded-xl mb-3 overflow-hidden" style={{ background: `${stage.color}15` }}>
                  <div className="w-full h-full flex items-center justify-center"><ImageIcon size={18} style={{ color: `${stage.color}50` }} /></div>
                </div>
              )}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono" style={{ color: SOLAR.muted }}>{job.id}</span>
                <span className="text-[10px] flex items-center gap-0.5" style={{ color: SOLAR.muted }}><Calendar size={9} />{job.days}d</span>
              </div>
              <div className="font-semibold text-sm mb-1">{job.client}</div>
              <div className="text-xs mb-3 leading-relaxed" style={{ color: SOLAR.muted }}>{job.address}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: stage.color }}>{job.value}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); onJobMove(job.id, 'left'); }} className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ChevronRight size={12} className="rotate-180" style={{ color: SOLAR.muted }} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onJobMove(job.id, 'right'); }} className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ChevronRight size={12} style={{ color: SOLAR.muted }} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button className="w-full py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-white/5 transition-colors" style={{ border: `1px dashed ${SOLAR.border}`, color: SOLAR.muted }}>
          <Plus size={13} />Add Job
        </button>
      </div>
    </div>
  );
}

function JobModal({ job, stage, onClose, onMove }: { job: typeof INITIAL_JOBS[0]; stage: typeof STAGES[0] | null; onClose: () => void; onMove: (direction: 'left' | 'right') => void }) {
  if (!job || !stage) return null;
  const Icon = stage.icon;
  const canMoveLeft = stage.id !== 'lead';
  const canMoveRight = stage.next !== null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg rounded-3xl overflow-hidden" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${SOLAR.border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stage.color}20` }}><Icon size={18} style={{ color: stage.color }} /></div>
            <div><div className="font-bold text-lg">{job.client}</div><div className="text-xs" style={{ color: SOLAR.muted }}>{job.id} · {stage.label}</div></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"><X size={16} style={{ color: SOLAR.muted }} /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: `${stage.color}10`, border: `1px solid ${stage.color}20` }}>
              <div className="text-xs mb-1" style={{ color: SOLAR.muted }}>Project Value</div>
              <div className="text-xl font-bold" style={{ color: stage.color }}>{job.value}</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: SOLAR.surface2 }}>
              <div className="text-xs mb-1" style={{ color: SOLAR.muted }}>Timeline</div>
              <div className="text-sm font-semibold">{job.days} days in {stage.label.toLowerCase()}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: SOLAR.muted }}>Installation Address</div>
            <div className="text-sm">{job.address}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: SOLAR.primary, color: '#000' }}>
              <Edit size={14} />Edit Details
            </button>
            <button className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-white/10" style={{ background: SOLAR.surface2 }}>
              <MoreMenu size={16} style={{ color: SOLAR.muted }} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onMove('left')} disabled={!canMoveLeft}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-opacity disabled:opacity-30"
              style={{ border: `1px solid ${SOLAR.border}`, color: SOLAR.muted }}>
              <ChevronRight size={14} className="rotate-180" />Previous Stage
            </button>
            <button onClick={() => onMove('right')} disabled={!canMoveRight}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-opacity disabled:opacity-30"
              style={{ background: canMoveRight ? SOLAR.primary : SOLAR.surface2, color: canMoveRight ? '#000' : SOLAR.muted }}>
              Next Stage<ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PipelineStats({ jobs }: { jobs: typeof INITIAL_JOBS }) {
  const total = jobs.length;
  const highPriority = jobs.filter(j => j.priority === 'high').length;
  const totalValue = jobs.reduce((sum, j) => sum + parseFloat(j.value.replace(/[$,]/g, '')), 0);
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { label: 'Active Projects', value: String(total), icon: Zap, color: SOLAR.primary },
        { label: 'High Priority', value: String(highPriority), icon: AlertCircle, color: SOLAR.danger },
        { label: 'Total Pipeline', value: `$${(totalValue / 1000).toFixed(0)}K`, icon: DollarSign, color: SOLAR.secondary },
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
  );
}

export default function PipelinePage() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<typeof INITIAL_JOBS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleJobMove = (jobId: string, direction: 'left' | 'right') => {
    setJobs(prev => prev.map(job => {
      if (job.id !== jobId) return job;
      const currentStage = STAGES.find(s => s.id === job.stage);
      if (!currentStage) return job;
      if (direction === 'right' && currentStage.next) {
        return { ...job, stage: currentStage.next };
      } else if (direction === 'left') {
        const prevStage = STAGES.find(s => s.next === currentStage.id);
        if (prevStage) return { ...job, stage: prevStage.id };
      }
      return job;
    }));
  };

  const filteredJobs = searchQuery ? jobs.filter(j => j.client.toLowerCase().includes(searchQuery.toLowerCase()) || j.id.toLowerCase().includes(searchQuery.toLowerCase())) : jobs;
  const selectedStage = selectedJob ? STAGES.find(s => s.id === selectedJob.stage) : null;

  return (
    <div className="min-h-screen pb-20" style={{ background: SOLAR.bg }}>
      <header className="sticky top-0 z-40 px-6 py-4 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.85)', borderBottom: `1px solid ${SOLAR.border}` }}>
        <div className="max-w-full mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${SOLAR.secondary}20` }}>
                <TrendingUp size={18} style={{ color: SOLAR.secondary }} />
              </div>
              <div><div className="font-bold text-base">Pipeline</div><div className="text-[10px]" style={{ color: SOLAR.muted }}>Project Tracking</div></div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl flex-1 max-w-md" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
            <Search size={15} style={{ color: SOLAR.muted }} />
            <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" style={{ color: SOLAR.text }} />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ border: `1px solid ${SOLAR.border}`, color: SOLAR.muted }}><Filter size={14} />Filter</button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: SOLAR.primary, color: '#000' }}><Plus size={15} />New Project</button>
          </div>
        </div>
      </header>
      <div className="px-6 pt-6">
        <PipelineStats jobs={filteredJobs} />
        <div className="flex gap-5 overflow-x-auto pb-6 -mx-1 px-1">
          {STAGES.map((stage, i) => (
            <motion.div key={stage.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <StageColumn stage={stage} jobs={filteredJobs} onJobMove={handleJobMove} onJobClick={setSelectedJob} />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedJob && selectedStage && <JobModal job={selectedJob} stage={selectedStage} onClose={() => setSelectedJob(null)} onMove={(direction) => handleJobMove(selectedJob.id, direction)} />}
      </AnimatePresence>
    </div>
  );
}