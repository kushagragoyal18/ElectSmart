import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { useElectionPlan } from '../hooks/useElectionPlan.js';
import { useTranslation } from '../hooks/useTranslation.js';
import { getElectionData } from '../data/elections.js';
import { trackEvent } from '../firebase.js';
import { APP_TABS } from '../constants.js';

// Components
import { Shell } from '../components/Shell.jsx';
import { Onboarding } from '../components/Onboarding.jsx';
import { ElectionSummary } from '../components/ElectionSummary.jsx';
import { Roadmap } from '../components/Roadmap.jsx';
import { NextActionCard } from '../components/NextActionCard.jsx';
import { TimelineVisualizer } from '../components/TimelineVisualizer.jsx';
import { EducationCards } from '../components/EducationCards.jsx';
import { Quiz } from '../components/Quiz.jsx';
import { WatchLearn } from '../components/WatchLearn.jsx';
import { SmartAssistant } from '../components/SmartAssistant.jsx';
import { VVPATSimulator } from '../components/VVPATSimulator.jsx';
import { MapsLocator } from '../components/MapsLocator.jsx';
import { ShareCard } from '../components/ShareCard.jsx';
import { ErrorBoundary } from '../components/ErrorBoundary.jsx';

/**
 * Renders the tab navigation list.
 * @param {Object} props
 * @param {string} props.activeTab - Current active tab ID.
 * @param {Function} props.setActiveTab - Callback to change the active tab.
 */
function TabList({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    trackEvent('switch_tab', { tab: tabId });
  };

  return (
    <nav className="mb-8 flex gap-1 rounded-2xl bg-slate-100 p-1 shadow-inner" role="tablist">
      {APP_TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          onClick={() => handleTabChange(tab.id)}
          className={`flex-1 rounded-xl py-3 text-sm font-black transition-all uppercase tracking-wider ${
            activeTab === tab.id ? 'bg-white text-civic-navy shadow-sm' : 'text-slate-500 hover:text-ink'
          }`}
        >
          {t(tab.translationKey)}
        </button>
      ))}
    </nav>
  );
}

TabList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

/**
 * Main application component for ElectSmart.
 * Handles onboarding flow and dashboard navigation.
 */
export function App() {
  const { profile, setProfile, resetProfile, loading } = useVoterProfile();
  const [activeTab, setActiveTab] = useState('dashboard');

  const electionData = useMemo(() => (profile ? getElectionData(profile.state) : null), [profile]);
  const plan = useElectionPlan(profile, electionData);

  useEffect(() => {
    if (profile) {
      trackEvent('page_view', { page: 'dashboard', tab: activeTab });
    } else {
      trackEvent('page_view', { page: 'onboarding' });
    }
  }, [profile, activeTab]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50" aria-busy="true">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#000080] border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <ErrorBoundary componentName="Onboarding">
        <Onboarding onComplete={setProfile} />
      </ErrorBoundary>
    );
  }

  return (
    <Shell hasProfile onReset={resetProfile}>
      <div className="space-y-8 animate-fade-in">
        <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

        <div id="dashboard-panel" role="tabpanel" aria-labelledby="dashboard-tab" hidden={activeTab !== 'dashboard'}>
          {activeTab === 'dashboard' && (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <ErrorBoundary componentName="ElectionSummary">
                  <ElectionSummary
                    profile={profile}
                    election={electionData}
                    countdown={plan.daysUntilElection}
                    readiness={plan.readiness}
                  />
                </ErrorBoundary>
                
                <ErrorBoundary componentName="VVPATSimulator">
                  <VVPATSimulator />
                </ErrorBoundary>


                <ErrorBoundary componentName="Roadmap">
                  <Roadmap steps={plan.steps} />
                </ErrorBoundary>
              </div>

              <aside className="space-y-8">
                <ErrorBoundary componentName="SmartAssistant">
                  <SmartAssistant
                    profile={profile}
                    election={electionData}
                    nextAction={plan.nextAction}
                    planState={plan.planState}
                  />
                </ErrorBoundary>
                <ErrorBoundary componentName="MapsLocator">
                  <MapsLocator state={profile.state} />
                </ErrorBoundary>
                <ErrorBoundary componentName="ShareCard">
                  <ShareCard readiness={plan.readiness} profile={profile} />
                </ErrorBoundary>
              </aside>
            </div>
          )}
        </div>

        <div id="timeline-panel" role="tabpanel" aria-labelledby="timeline-tab" hidden={activeTab !== 'timeline'}>
          {activeTab === 'timeline' && (
            <ErrorBoundary componentName="Timeline">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <TimelineVisualizer election={electionData} />
                </div>
                <aside>
                  <WatchLearn />
                </aside>
              </div>
            </ErrorBoundary>
          )}
        </div>

        <div id="learn-panel" role="tabpanel" aria-labelledby="learn-tab" hidden={activeTab !== 'learn'}>
          {activeTab === 'learn' && (
            <ErrorBoundary componentName="Education">
              <EducationCards />
            </ErrorBoundary>
          )}
        </div>

        <div id="quiz-panel" role="tabpanel" aria-labelledby="quiz-tab" hidden={activeTab !== 'quiz'}>
          {activeTab === 'quiz' && (
            <ErrorBoundary componentName="Quiz">
              <Quiz />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </Shell>
  );
}
