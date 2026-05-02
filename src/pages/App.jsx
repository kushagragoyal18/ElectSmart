import { ElectionSummary } from '../components/ElectionSummary.jsx';
import { MapsLocator } from '../components/MapsLocator.jsx';
import { NextActionCard } from '../components/NextActionCard.jsx';
import { Onboarding } from '../components/Onboarding.jsx';
import { Roadmap } from '../components/Roadmap.jsx';
import { WatchLearn } from '../components/WatchLearn.jsx';
import { Shell } from '../components/Shell.jsx';
import { SmartAssistant } from '../components/SmartAssistant.jsx';
import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { useElectionPlan } from '../hooks/useElectionPlan.js';

export function App() {
  const { profile, setProfile, resetProfile } = useVoterProfile();
  const plan = useElectionPlan(profile);

  return (
    <Shell hasProfile={Boolean(profile)} onReset={resetProfile}>
      {!profile ? (
        <Onboarding onComplete={setProfile} />
      ) : (
        <div className="fade-in grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <ElectionSummary
              profile={profile}
              election={plan.election}
              countdown={plan.countdown}
              readiness={plan.readiness}
            />
            <NextActionCard action={plan.nextAction} />
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
            <MapsLocator election={plan.election} />
          </aside>
        </div>
      )}
    </Shell>
  );
}
