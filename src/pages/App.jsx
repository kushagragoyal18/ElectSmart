import { useEffect, useState } from 'react';
import { ElectionSummary } from '../components/ElectionSummary.jsx';
import { MapsLocator } from '../components/MapsLocator.jsx';
import { NextActionCard } from '../components/NextActionCard.jsx';
import { Onboarding } from '../components/Onboarding.jsx';
import { Roadmap } from '../components/Roadmap.jsx';
import { WatchLearn } from '../components/WatchLearn.jsx';
import { Shell } from '../components/Shell.jsx';
import { SmartAssistant } from '../components/SmartAssistant.jsx';
import { VVPATSimulator } from '../components/VVPATSimulator.jsx';
import { EducationCards } from '../components/EducationCards.jsx';
import { TimelineVisualizer } from '../components/TimelineVisualizer.jsx';
import { Quiz } from '../components/Quiz.jsx';
import { ShareCard } from '../components/ShareCard.jsx';
import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { useElectionPlan } from '../hooks/useElectionPlan.js';
import { useTranslation } from '../hooks/useTranslation.js';
import { APP_TABS } from '../constants.js';
import { trackEvent } from '../firebase.js';
import { LayoutDashboard, BookOpen, HelpCircle, Calendar, Share2, X } from 'lucide-react';

const TAB_ICONS = {
  dashboard: LayoutDashboard,
  timeline: Calendar,
  learn: BookOpen,
  quiz: HelpCircle,
};

/** Renders the main ElectSmart application shell and tabbed dashboard. */
export function App() {
  const { profile, setProfile, resetProfile } = useVoterProfile();
  const { t } = useTranslation();
  const plan = useElectionPlan(profile);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showShareModal, setShowShareModal] = useState(false);

  const tabs = APP_TABS.map((tab) => ({ ...tab, label: t(tab.translationKey), icon: TAB_ICONS[tab.id] }));

  useEffect(() => {
    trackEvent('page_view', { page_title: 'ElectSmart Home', tab: activeTab });
  }, [activeTab]);

  /** Updates the selected dashboard tab and tracks the interaction. */
  function selectTab(tabId) {
    setActiveTab(tabId);
    trackEvent('select_tab', { tab: tabId });
  }

  return (
    <Shell hasProfile={Boolean(profile)} onReset={resetProfile}>
      {!profile ? (
        <Onboarding onComplete={setProfile} />
      ) : (
        <div className="space-y-6">
          {/* Tab Navigation */}
          <nav className="flex gap-1 overflow-x-auto bg-white p-1 rounded-xl shadow-sm border border-slate-100 sticky top-[73px] z-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  aria-label={`Open ${tab.label}`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-[#000080] text-white shadow-md' 
                      : 'text-muted hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="fade-in">
            {activeTab === 'dashboard' && (
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-6">
                  <div className="relative">
                    <ElectionSummary
                      profile={profile}
                      election={plan.election}
                      countdown={plan.countdown}
                      readiness={plan.readiness}
                    />
                    <button 
                      onClick={() => setShowShareModal(true)}
                      aria-label="Open share readiness card"
                      className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                      title={t('share')}
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                  <NextActionCard action={plan.nextAction} />
                  
                  <button 
                    onClick={() => setShowShareModal(true)}
                    aria-label="Open share readiness card"
                    className="w-full premium-card py-4 flex items-center justify-center gap-3 text-civic-navy font-black hover:bg-slate-50 transition-all group"
                  >
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-civic-blue group-hover:text-white transition-colors">
                      <Share2 size={20} />
                    </div>
                    <span>{t('share').toUpperCase()}</span>
                  </button>

                  <Roadmap steps={plan.steps} />
                  <WatchLearn />
                </div>

                <aside className="space-y-6">
                  <SmartAssistant
                    profile={profile}
                    election={plan.election}
                    nextAction={plan.nextAction}
                    planState={plan.planState}
                  />
                  <VVPATSimulator />
                  <MapsLocator election={plan.election} />
                </aside>
              </div>
            )}

            {activeTab === 'timeline' && (
              <TimelineVisualizer election={plan.election} />
            )}

            {activeTab === 'learn' && (
              <EducationCards />
            )}

            {activeTab === 'quiz' && (
              <Quiz />
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm">
            <button 
              onClick={() => setShowShareModal(false)}
              aria-label="Close share readiness card"
              className="absolute -top-12 right-0 p-2 text-white hover:text-eci-saffron transition-colors"
            >
              <X size={32} />
            </button>
            <ShareCard 
              profile={profile} 
              readiness={plan.readiness} 
              nextAction={plan.nextAction} 
            />
          </div>
        </div>
      )}
    </Shell>
  );
}
