'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, Instagram, Linkedin, Youtube, Twitter,
  Megaphone, BarChart3, Calendar, Plus, Search,
  Clock, CheckCircle2, AlertCircle, Settings, Bell,
  TrendingUp, TrendingDown, Eye, Edit, MoreHorizontal,
  Image, Video, FileText, Link2, Send, Pause, Play,
  Sun, ArrowRight, Zap, Globe
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

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', followers: '12.4K', connected: true },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', followers: '8.2K', connected: true },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', followers: '3.1K', connected: true },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000', followers: '1.8K', connected: false },
];

const SCHEDULED_POSTS = [
  { id: 1, platform: 'facebook', content: 'Just completed a 12kW residential installation in South Tampa! Our clients are now saving $280/month on their electric bills. Ready to make the switch? DM us for a free consultation.', date: 'Tomorrow 9:00 AM', status: 'scheduled' },
  { id: 2, platform: 'instagram', content: 'New installation day in Tampa! This beautiful 8kW system will offset 100% of this homeowner\'s electricity bill. Solar is the future.', date: 'May 29 11:00 AM', status: 'scheduled' },
  { id: 3, platform: 'linkedin', content: 'Thrilled to announce our partnership with leading solar equipment manufacturers. Now offering extended warranties on all installations. Learn more.', date: 'May 30 10:00 AM', status: 'scheduled' },
];

const AD_CAMPAIGNS = [
  { id: 'AD-001', name: 'Tampa Solar Awareness', platform: 'facebook', status: 'active', budget: '$2,400/mo', impressions: '142K', clicks: '3,820', ctr: '2.69%', leads: '47', costPerLead: '$17.50', roas: '4.2x' },
  { id: 'AD-002', name: 'Residential Lead Gen', platform: 'facebook', status: 'active', budget: '$1,800/mo', impressions: '98K', clicks: '2,140', ctr: '2.18%', leads: '31', costPerLead: '$19.80', roas: '3.8x' },
  { id: 'AD-003', name: 'Brand Awareness Q2', platform: 'instagram', status: 'paused', budget: '$1,200/mo', impressions: '67K', clicks: '1,390', ctr: '2.07%', leads: '18', costPerLead: '$22.40', roas: '3.1x' },
];

const ANALYTICS = [
  { label: 'Total Impressions', value: '307K', delta: '+12%', icon: Eye, color: '#5856D6' },
  { label: 'Engagements', value: '8.4K', delta: '+8%', icon: TrendingUp, color: '#FF6B00' },
  { label: 'Click Rate', value: '2.31%', delta: '+0.3%', icon: BarChart3, color: '#00D4AA' },
  { label: 'Cost Per Lead', value: '$19.10', delta: '-5%', icon: TrendingDown, color: '#30D158' },
];

function PlatformBadge({ platform, size = 'md' }: { platform: typeof PLATFORMS[0]; size?: 'sm' | 'md' }) {
  const Icon = platform.icon;
  const sz = size === 'sm' ? 14 : 18;
  const box = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
  return (
    <div className={`${box} rounded-lg flex items-center justify-center`} style={{ background: `${platform.color}20` }}>
      <Icon size={sz} style={{ color: platform.color }} />
    </div>
  );
}

function PostCard({ post, index }: { post: typeof SCHEDULED_POSTS[0]; index: number }) {
  const platform = PLATFORMS.find(p => p.id === post.platform)!;
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}
      className="rounded-2xl p-5" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <PlatformBadge platform={platform} />
          <div>
            <div className="text-sm font-medium">{platform.name}</div>
            <div className="text-xs flex items-center gap-1" style={{ color: SOLAR.muted }}>
              <Clock size={10} />{post.date}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: `${SOLAR.warning}20`, color: SOLAR.warning }}>Scheduled</span>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><MoreHorizontal size={14} style={{ color: SOLAR.muted }} /></button>
        </div>
      </div>
      <p className="text-sm leading-relaxed">{post.content}</p>
      <div className="flex items-center gap-2 mt-4">
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: `${SOLAR.primary}20`, color: SOLAR.primary }}><Edit size={11} />Edit</button>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: SOLAR.surface2, color: SOLAR.muted }}><Send size={11} />Post Now</button>
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: `${SOLAR.danger}20`, color: SOLAR.danger }}><Pause size={11} />Cancel</button>
      </div>
    </motion.div>
  );
}

function AdCampaignCard({ campaign, index }: { campaign: typeof AD_CAMPAIGNS[0]; index: number }) {
  const platform = PLATFORMS.find(p => p.id === campaign.platform)!;
  const statusColor = campaign.status === 'active' ? SOLAR.success : SOLAR.muted;
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.07 }}
      className="rounded-2xl p-5" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <PlatformBadge platform={platform} />
          <div>
            <div className="text-sm font-semibold">{campaign.name}</div>
            <div className="text-xs" style={{ color: SOLAR.muted }}>{campaign.budget}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
          <span className="text-xs font-medium capitalize" style={{ color: statusColor }}>{campaign.status}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Impressions', value: campaign.impressions },
          { label: 'Clicks', value: campaign.clicks },
          { label: 'CTR', value: campaign.ctr },
          { label: 'ROAS', value: campaign.roas, highlight: true },
        ].map((metric) => (
          <div key={metric.label} className="rounded-xl p-3" style={{ background: metric.highlight ? `${SOLAR.success}15` : SOLAR.surface2 }}>
            <div className="text-sm font-bold" style={{ color: metric.highlight ? SOLAR.success : SOLAR.text }}>{metric.value}</div>
            <div className="text-[10px]" style={{ color: SOLAR.muted }}>{metric.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${SOLAR.border}` }}>
        <div>
          <span className="text-xs" style={{ color: SOLAR.muted }}>{campaign.leads} leads · ${campaign.costPerLead}/lead</span>
        </div>
        <div className="flex gap-1">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Edit size={12} style={{ color: SOLAR.muted }} /></button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10">{campaign.status === 'active' ? <Pause size={12} style={{ color: SOLAR.muted }} /> : <Play size={12} style={{ color: SOLAR.muted }} />}</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'ads' | 'analytics'>('calendar');

  return (
    <div className="min-h-screen pb-20" style={{ background: SOLAR.bg }}>
      <header className="sticky top-0 z-50 px-6 py-4 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.85)', borderBottom: `1px solid ${SOLAR.border}` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${SOLAR.primary}20` }}>
              <Megaphone size={18} style={{ color: SOLAR.primary }} />
            </div>
            <div>
              <div className="font-bold text-base">Social Hub</div>
              <div className="text-[10px]" style={{ color: SOLAR.muted }}>Multi-Platform Manager</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {PLATFORMS.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.connected ? SOLAR.success : SOLAR.muted }} />
                <p.icon size={12} style={{ color: p.connected ? p.color : SOLAR.muted }} />
                <span className="text-xs" style={{ color: SOLAR.muted }}>{p.followers}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: SOLAR.primary, color: '#000' }}>
              <Plus size={15} />Create Post
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-1 mb-6 p-1 rounded-2xl inline-flex" style={{ background: SOLAR.surface }}>
          {(['calendar', 'ads', 'analytics'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize"
              style={{ background: activeTab === tab ? SOLAR.primary : 'transparent', color: activeTab === tab ? '#000' : SOLAR.muted }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'calendar' && (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {ANALYTICS.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="rounded-2xl p-4 flex items-center gap-3" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs" style={{ color: SOLAR.muted }}>{stat.label}</div>
                  </div>
                  <span className="ml-auto text-xs font-medium" style={{ color: stat.delta.startsWith('+') ? SOLAR.success : SOLAR.danger }}>{stat.delta}</span>
                </motion.div>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-4">Scheduled Posts</h3>
            <div className="grid grid-cols-3 gap-4">
              {SCHEDULED_POSTS.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Campaigns</h3>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: SOLAR.primary, color: '#000' }}>
                <Plus size={14} />New Campaign
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {AD_CAMPAIGNS.map((campaign, i) => <AdCampaignCard key={campaign.id} campaign={campaign} index={i} />)}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="rounded-2xl p-8 text-center" style={{ background: SOLAR.surface, border: `1px solid ${SOLAR.border}` }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${SOLAR.secondary}20` }}>
              <BarChart3 size={28} style={{ color: SOLAR.secondary }} />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p className="text-sm" style={{ color: SOLAR.muted }}>Full analytics with cross-platform insights, AI recommendations, and competitor benchmarking. Coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}