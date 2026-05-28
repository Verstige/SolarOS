'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Zap, BarChart3, Users, Megaphone, Shield, Calendar,
  ArrowRight, CheckCircle2, Sun, ChevronRight, Play,
  Star, Menu, X, Clock, DollarSign, Wrench, TrendingUp,
  ChevronDown, Globe, Server, FileText, ArrowUpRight,
  Activity, Building2, CalendarDays, LayoutDashboard, Mail
} from 'lucide-react';

// ─── Theme ───────────────────────────────────────────────────────────────────
const SOLAR = {
  primary: '#FF6B00',
  secondary: '#00D4AA',
  accent: '#FFD60A',
  bg: '#050507',
  surface: '#0D0D14',
  surface2: '#111120',
  border: 'rgba(255,255,255,0.06)',
  borderMid: 'rgba(255,255,255,0.1)',
  muted: '#6B7280',
  text: '#FFFFFF',
  success: '#30D158',
  warning: '#FF9F0A',
  danger: '#FF453A',
};

// ─── Count-up Hook ────────────────────────────────────────────────────────────
function useCountUp(end: number, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { ref, count, suffix };
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedStat({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const { ref, count } = useCountUp(value, 1800);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold tracking-tight mb-1" style={{ color }}>{count}{suffix}</div>
      <div className="text-sm leading-tight" style={{ color: SOLAR.muted }}>{label}</div>
    </div>
  );
}

// ─── Mesh Gradient BG ─────────────────────────────────────────────────────────
function MeshGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div style={{
        position: 'absolute', top: '-20%', left: '10%', width: '600px', height: '600px',
        background: `radial-gradient(circle, ${SOLAR.primary}25 0%, transparent 70%)`,
        borderRadius: '50%', filter: 'blur(80px)',
        animation: 'meshFloat1 12s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '-10%', width: '500px', height: '500px',
        background: `radial-gradient(circle, ${SOLAR.secondary}20 0%, transparent 70%)`,
        borderRadius: '50%', filter: 'blur(60px)',
        animation: 'meshFloat2 15s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '40%', width: '400px', height: '400px',
        background: `radial-gradient(circle, ${SOLAR.accent}15 0%, transparent 70%)`,
        borderRadius: '50%', filter: 'blur(70px)',
        animation: 'meshFloat3 18s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes meshFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes meshFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes meshFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,30px)} }
      `}</style>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300${scrolled ? '' : ''}`}
      style={{
        background: scrolled ? 'rgba(5,5,7,0.92)' : 'rgba(5,5,7,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? `1px solid ${SOLAR.border}` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${SOLAR.primary}, ${SOLAR.accent})` }}>
            <Sun size={16} style={{ color: '#050507' }} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">SolarOS</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Modules', 'Pricing', 'Testimonials'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm transition-colors hover:text-white"
              style={{ color: SOLAR.muted }}>{item}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="/dashboard" className="text-sm px-4 py-2 rounded-xl transition-colors"
            style={{ color: SOLAR.muted, border: `1px solid ${SOLAR.border}` }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = SOLAR.borderMid)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = SOLAR.border)}>
            Sign In
          </a>
          <a href="/dashboard" className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ background: SOLAR.primary, color: '#050507' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Get Started
          </a>
        </div>
        <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: SOLAR.surface }}
          onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-4 space-y-2"
            style={{ background: SOLAR.bg, borderTop: `1px solid ${SOLAR.border}` }}
          >
            {['Features', 'Modules', 'Pricing', 'Testimonials'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="block text-sm py-2" style={{ color: SOLAR.muted }}
                onClick={() => setOpen(false)}>{item}</a>
            ))}
            <a href="/dashboard" className="block text-sm font-semibold py-2"
              style={{ color: SOLAR.primary }}>Get Started Free</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 px-6">
      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text Column */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
                style={{ background: `${SOLAR.primary}15`, border: `1px solid ${SOLAR.primary}30`, color: SOLAR.primary }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: SOLAR.primary }} />
                Live in 140+ solar companies across Florida
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6"
                style={{ color: SOLAR.text }}>
                The OS<br />
                <span style={{ color: SOLAR.primary }}>Built for</span><br />
                Solar
              </h1>

              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
                style={{ color: SOLAR.muted }}>
                Proposals. Pipeline. Crew. Permits. Social. One platform running your entire solar operation — from first call to final inspection.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href="/dashboard"
                  className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold transition-all"
                  style={{ background: SOLAR.primary, color: '#050507' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                  Launch App <ArrowRight size={17} />
                </a>
                <a href="#features"
                  className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium transition-all"
                  style={{ border: `1px solid ${SOLAR.borderMid}`, color: SOLAR.muted }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = SOLAR.primary, e.currentTarget.style.color = SOLAR.text)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = SOLAR.borderMid, e.currentTarget.style.color = SOLAR.muted)}>
                  <Play size={14} /> See How It Works
                </a>
              </div>

              {/* Quick proof badges */}
              <div className="flex items-center gap-6 mt-10 pt-10"
                style={{ borderTop: `1px solid ${SOLAR.border}` }}>
                {[
                  { v: '$1.2M', l: 'Pipeline tracked' },
                  { v: '2hrs', l: 'Avg proposal time' },
                  { v: '99.8%', l: 'Permit accuracy' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-xl font-bold" style={{ color: SOLAR.text }}>{item.v}</div>
                    <div className="text-xs mt-0.5" style={{ color: SOLAR.muted }}>{item.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dashboard Preview Column */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Terminal-style dashboard mockup */}
            <div className="relative rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${SOLAR.borderMid}`, boxShadow: `0 40px 80px -20px rgba(255,107,0,0.15)` }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-4"
                style={{ background: SOLAR.surface, borderBottom: `1px solid ${SOLAR.border}` }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28CA41' }} />
                </div>
                <div className="flex-1 text-center text-xs font-medium" style={{ color: SOLAR.muted }}>
                  solaros.app / command-center
                </div>
                <div className="w-4" />
              </div>

              {/* Dashboard content */}
              <div style={{ background: SOLAR.bg }}>
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3"
                  style={{ borderBottom: `1px solid ${SOLAR.border}` }}>
                  <div className="flex items-center gap-2 text-xs" style={{ color: SOLAR.muted }}>
                    <Activity size={12} style={{ color: SOLAR.success }} />
                    All systems operational
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono" style={{ color: SOLAR.muted }}>May 27, 2026</div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${SOLAR.primary}, ${SOLAR.secondary})`, color: '#050507' }}>JD</div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-px" style={{ background: SOLAR.border }}>
                  {[
                    { label: 'Pipeline Value', value: '$1.2M', color: SOLAR.primary, delta: '+12%' },
                    { label: 'Active Jobs', value: '34', color: SOLAR.secondary, delta: '+5' },
                    { label: 'Proposals', value: '$284K', color: SOLAR.accent, delta: '+8%' },
                  ].map((s) => (
                    <div key={s.label} className="px-5 py-4" style={{ background: SOLAR.bg }}>
                      <div className="text-xs mb-1" style={{ color: SOLAR.muted }}>{s.label}</div>
                      <div className="text-2xl font-bold tracking-tight" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs mt-1" style={{ color: SOLAR.success }}>{s.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Pipeline preview */}
                <div className="px-5 py-4" style={{ borderTop: `1px solid ${SOLAR.border}` }}>
                  <div className="text-xs font-semibold mb-3" style={{ color: SOLAR.muted }}>ACTIVE PIPELINE</div>
                  <div className="flex gap-2">
                    {[
                      { stage: 'Discovery', count: '8', w: '20%', c: SOLAR.muted },
                      { stage: 'Quote', count: '12', w: '28%', c: SOLAR.warning },
                      { stage: 'Negotiation', count: '6', w: '22%', c: SOLAR.primary },
                      { stage: 'Won', count: '9', w: '30%', c: SOLAR.success },
                    ].map((col) => (
                      <div key={col.stage} className="rounded-xl px-3 py-2 flex-1 text-center"
                        style={{ background: `${col.c}12`, border: `1px solid ${col.c}25` }}>
                        <div className="text-xs font-bold mb-1" style={{ color: col.c }}>{col.count}</div>
                        <div className="text-[10px]" style={{ color: SOLAR.muted }}>{col.stage}</div>
                        <div className="h-1 mt-2 rounded-full" style={{ background: `${col.c}30`, width: col.w }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom action row */}
                <div className="flex gap-2 px-5 py-3"
                  style={{ borderTop: `1px solid ${SOLAR.border}`, background: SOLAR.surface }}>
                  {[
                    { icon: Zap, label: 'New Proposal', color: SOLAR.primary },
                    { icon: Calendar, label: 'Schedule Job', color: SOLAR.secondary },
                    { icon: Megaphone, label: 'Post Social', color: '#FF2D55' },
                  ].map((a) => (
                    <button key={a.label}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                      style={{ background: `${a.color}15`, color: a.color, border: `1px solid ${a.color}25` }}>
                      <a.icon size={12} /> {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.borderMid}`, boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5)` }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${SOLAR.success}20` }}>
                <CheckCircle2 size={16} style={{ color: SOLAR.success }} />
              </div>
              <div>
                <div className="text-xs font-semibold">Proposal #2848 sent</div>
                <div className="text-[10px]" style={{ color: SOLAR.muted }}>Roberto Martinez · $42,500 · 2m ago</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-xs" style={{ color: SOLAR.muted }}>Scroll</div>
        <ChevronDown size={14} style={{ color: SOLAR.muted }} />
      </motion.div>
    </section>
  );
}

// ─── Stats Band ───────────────────────────────────────────────────────────────
function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 relative"
      style={{ borderTop: `1px solid ${SOLAR.border}`, borderBottom: `1px solid ${SOLAR.border}` }}>
      <div className="max-w-6xl mx-auto">
        {inView && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value={2} suffix="hrs" label="Average proposal time — down from 3 days" color={SOLAR.primary} />
            <AnimatedStat value={40} suffix="%" label="More installs per quarter on average" color={SOLAR.secondary} />
            <AnimatedStat value={6} suffix="hrs" label="Saved per week on social media management" color={SOLAR.accent} />
            <AnimatedStat value={52} suffix="%" label="Faster permitting cycles with automation" color="#BF5FFF" />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Zap, title: 'AI-Powered Proposals', desc: 'Generate professional solar proposals in under 2 hours. AI analyzes roof specs, energy usage, and local utility rates to build compelling quotes that close deals.', color: SOLAR.primary },
  { icon: BarChart3, title: 'Visual Pipeline', desc: 'Track every project from lead to activation. Drag-and-drop kanban board with real-time status, priority flags, and milestone tracking.', color: SOLAR.secondary },
  { icon: Users, title: 'Team Management', desc: 'Onboard installers, electricians, and sales reps with structured workflows. Training modules, certifications, and performance metrics in one place.', color: '#BF5FFF' },
  { icon: Megaphone, title: 'Social Hub', desc: 'Manage Facebook, Instagram, LinkedIn, and YouTube from one dashboard. Schedule posts, track ad performance, and generate AI-powered content.', color: '#FF2D55' },
  { icon: Calendar, title: 'Smart Scheduling', desc: 'Auto-schedule installations based on crew availability, permits, and weather windows. Never double-book or miss a deadline.', color: '#5856D6' },
  { icon: Shield, title: 'Permit Automation', desc: 'Automated permit preparation and submission. Track inspection status and receive alerts when docs are approved or rejected.', color: SOLAR.warning },
];

function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" ref={ref} className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: SOLAR.primary, letterSpacing: '0.15em' }}>Platform Capabilities</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: SOLAR.text }}>Everything your team needs</h2>
          <p className="text-lg max-w-2xl" style={{ color: SOLAR.muted }}>
            Stop juggling 7 different tools. SolarOS brings proposals, pipeline, social, and team management into one coherent operating system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl p-6 overflow-hidden cursor-pointer"
              style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = `${f.color}40`;
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = SOLAR.border;
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${f.color}10 0%, transparent 60%)` }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${f.color}15` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: SOLAR.muted }}>{f.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: f.color }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Modules ──────────────────────────────────────────────────────────────────
const MODULES = [
  { icon: Zap, label: 'AI Proposals', color: SOLAR.primary, badge: 'AI-Powered', desc: '2-hour turnaround' },
  { icon: BarChart3, label: 'Pipeline', color: SOLAR.secondary, badge: null, desc: '7-stage kanban' },
  { icon: Megaphone, label: 'Social Hub', color: '#FF2D55', badge: '4 accounts', desc: 'Auto-scheduling' },
  { icon: Users, label: 'Team', color: '#BF5FFF', badge: 'Onboarding', desc: '12 active members' },
  { icon: Calendar, label: 'Scheduling', color: '#5856D6', badge: null, desc: '5 jobs today' },
  { icon: Shield, label: 'Permits', color: SOLAR.warning, badge: '2 pending', desc: 'Auto-filing' },
  { icon: Server, label: 'Google Workspace', color: '#4285F4', badge: null, desc: 'Gmail + Drive' },
  { icon: DollarSign, label: 'Revenue', color: SOLAR.success, badge: null, desc: '$847K tracked' },
];

function Modules() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="modules" ref={ref} className="py-28 px-6"
      style={{ background: SOLAR.surface }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: SOLAR.secondary, letterSpacing: '0.15em' }}>Platform Modules</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: SOLAR.text }}>One platform.<br />Every workflow.</h2>
          <p className="text-lg max-w-2xl" style={{ color: SOLAR.muted }}>
            SolarOS connects your proposals, pipeline, crew, and social presence into one unified command center.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MODULES.map((m, i) => (
            <motion.a
              key={m.label}
              href="/dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-5 group overflow-hidden block"
              style={{ background: SOLAR.bg, border: `1px solid ${SOLAR.border}` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${m.color}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = SOLAR.border)}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${m.color}08 0%, transparent 70%)` }} />

              {m.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                  style={{ background: `${m.color}20`, color: m.color, letterSpacing: '0.05em' }}>
                  {m.badge}
                </span>
              )}

              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${m.color}15` }}>
                <m.icon size={20} style={{ color: m.color }} />
              </div>
              <div className="font-semibold text-sm mb-1">{m.label}</div>
              <div className="text-xs" style={{ color: SOLAR.muted }}>{m.desc}</div>

              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowUpRight size={14} style={{ color: m.color }} />
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'David R.', role: 'Owner, Tampa Solar Co.', content: 'We cut our proposal time from 3 days to 4 hours. The AI does the heavy lifting on roof calculations and financing scenarios — our close rate is up 23%.',
    rating: 5, color: SOLAR.primary, logo: 'TSC'
  },
  {
    name: 'Maria L.', role: 'Operations Director, SunVolt FL', content: 'Managing 12 crews used to be chaos. SolarOS gave us total clarity. We know exactly where every job stands every morning — and our clients actually get real updates.',
    rating: 5, color: SOLAR.secondary, logo: 'SV'
  },
  {
    name: 'James T.', role: 'Sales Manager, Skyline Energy', content: 'The social calendar alone saves us 6 hours a week. Our Instagram engagement is up 40% since we started using the AI content suggestions. Game changer.',
    rating: 5, color: '#FF2D55', logo: 'SE'
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: SOLAR.accent, letterSpacing: '0.15em' }}>Customer Stories</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: SOLAR.text }}>Trusted by solar companies</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="rounded-2xl p-6 relative overflow-hidden cursor-pointer"
              style={{
                background: SOLAR.surface,
                border: `1px solid ${i === active ? t.color + '40' : SOLAR.border}`,
                boxShadow: i === active ? `0 0 40px -10px ${t.color}20` : 'none',
              }}
              onClick={() => setActive(i)}
              onMouseEnter={e => { if (i !== active) (e.currentTarget as HTMLElement).style.borderColor = `${t.color}25`; }}
              onMouseLeave={e => { if (i !== active) (e.currentTarget as HTMLElement).style.borderColor = SOLAR.border; }}
              whileHover={{ y: -4 }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: t.color }} />

              <div className="flex gap-1 mb-4 mt-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} style={{ color: SOLAR.accent }} fill={SOLAR.accent} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: SOLAR.text }}>
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs"
                  style={{ background: `${t.color}20`, color: t.color }}>
                  {t.logo}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: SOLAR.muted }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Starter', price: '299', desc: 'For small solar companies getting started',
    features: ['1 User', '50 Proposals/mo', 'Pipeline Tracking', 'Email Support'],
    color: SOLAR.muted, highlight: false,
  },
  {
    name: 'Growth', price: '599', desc: 'For growing teams that need more power',
    features: ['5 Users', 'Unlimited Proposals', 'Social Hub', 'Team Management', 'Priority Support'],
    color: SOLAR.primary, highlight: true,
  },
  {
    name: 'Scale', price: '999', desc: 'For established companies at scale',
    features: ['15 Users', 'Everything in Growth', 'Permit Automation', 'Google Workspace', 'Dedicated Account Manager'],
    color: SOLAR.secondary, highlight: false,
  },
  {
    name: 'Enterprise', price: 'Custom', desc: 'Custom solution for large operations',
    features: ['Unlimited Users', 'White-Label Options', 'Custom Integrations', 'SLA & Onboarding', 'API Access'],
    color: SOLAR.accent, highlight: false,
  },
];

function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" ref={ref} className="py-28 px-6"
      style={{ background: SOLAR.surface }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: SOLAR.primary, letterSpacing: '0.15em' }}>Simple Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: SOLAR.text }}>Start free. Scale as you grow.</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: SOLAR.muted }}>
            No per-seat gotchas. No hidden fees. Just a platform that grows with your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative rounded-2xl p-6"
              style={{
                background: p.highlight ? `${p.color}08` : SOLAR.bg,
                border: `1px solid ${p.highlight ? p.color + '40' : SOLAR.border}`,
                boxShadow: p.highlight ? `0 0 50px -15px ${p.color}20` : 'none',
              }}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: p.color, color: '#050507' }}>
                  Most Popular
                </div>
              )}

              <div className="text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ color: p.color }}>{p.name}</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-3xl font-bold tracking-tight">${p.price}</span>
                {p.price !== 'Custom' && <span className="text-sm mb-1" style={{ color: SOLAR.muted }}>/mo</span>}
              </div>
              <div className="text-xs mb-5" style={{ color: SOLAR.muted }}>{p.desc}</div>

              <div className="space-y-2.5 mb-6">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-xs" style={{ color: SOLAR.muted }}>
                    <CheckCircle2 size={13} style={{ color: p.color }} />
                    {f}
                  </div>
                ))}
              </div>

              <a href="/dashboard"
                className="block text-center text-sm font-semibold py-2.5 rounded-xl transition-all"
                style={{
                  background: p.highlight ? p.color : `${p.color}20`,
                  color: p.highlight ? '#050507' : p.color,
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 70% at 50% 100%, rgba(255,107,0,0.1) 0%, transparent 60%)` }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: SOLAR.primary }}>Get Started Today</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          style={{ color: SOLAR.text }}>
          Run your solar company<br />like a well-oiled machine
        </h2>
        <p className="text-lg mb-10" style={{ color: SOLAR.muted }}>
          Join solar companies across Florida closing more deals, installing faster, and spending less time on admin.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/dashboard"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold transition-all"
            style={{ background: SOLAR.primary, color: '#050507' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
            Start Free Trial <ArrowRight size={17} />
          </a>
          <div className="flex items-center gap-2 text-sm" style={{ color: SOLAR.muted }}>
            <Clock size={14} />No credit card required
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 py-12" style={{ borderTop: `1px solid ${SOLAR.border}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sun size={14} style={{ color: SOLAR.primary }} />
          <span className="font-bold text-sm">SolarOS</span>
          <span className="text-xs hidden sm:inline" style={{ color: SOLAR.muted }}>· The Operating System for Solar Companies</span>
        </div>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Contact'].map(item => (
            <a key={item} href="#" className="text-xs transition-colors hover:text-white"
              style={{ color: SOLAR.muted }}>{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function SolarLandingPage() {
  return (
    <div style={{ background: SOLAR.bg, color: SOLAR.text, minHeight: '100dvh' }}>
      <MeshGradient />
      <Nav />
      <Hero />
      <StatsBand />
      <Features />
      <Modules />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}