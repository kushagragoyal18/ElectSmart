import { BookOpen, Info } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.js';

const educationData = [
  {
    id: 'evm',
    title: 'How EVMs Work',
    explanation: 'Electronic Voting Machines (EVMs) record votes electronically without paper ballots. Each machine consists of a Control Unit and a Balloting Unit connected by a cable. They are battery-powered and standalone to prevent remote hacking.',
    fact: 'EVMs were first used in Kerala in 1982.'
  },
  {
    id: 'mcc',
    title: 'Model Code of Conduct',
    explanation: 'The Model Code of Conduct is a set of guidelines issued by the Election Commission to regulate political parties and candidates during elections. It ensures free and fair campaigning and prevents the misuse of official machinery by the ruling party.',
    fact: 'MCC kicks in immediately after the election schedule is announced.'
  },
  {
    id: 'counting',
    title: 'How Votes are Counted',
    explanation: 'Counting is done in secure halls under strict supervision of the Returning Officer and candidate agents. Control Units are unsealed, and votes are tallied round by round. VVPAT slips are also partially counted to verify the electronic results.',
    fact: 'VVPAT slips from 5 random booths per assembly segment are verified.'
  },
  {
    id: 'nota',
    title: 'What NOTA is',
    explanation: 'None of the Above (NOTA) allows voters to officially register a vote of rejection for all candidates in the fray. It provides a way for voters to express their dissatisfaction while still participating in the democratic process.',
    fact: 'NOTA does not affect the election result even if it gets the most votes.'
  },
  {
    id: 'eci',
    title: 'Role of ECI',
    explanation: 'The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering all election processes in India. Its role includes preparing electoral rolls, conducting polls, and enforcing the code of conduct.',
    fact: 'ECI was established on January 25, 1950.'
  },
  {
    id: 'phases',
    title: 'Phases of Elections',
    explanation: 'Due to India\'s massive size, general elections are held in multiple phases over several weeks. This allows security forces and polling officials to move across regions effectively, ensuring a peaceful and manageable voting process.',
    fact: 'The 2024 general election was held in 7 phases.'
  }
];

export function EducationCards() {
  const { t } = useTranslation();

  return (
    <section className="premium-card p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-eci-green text-white shadow-sm">
          <BookOpen size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('learn_title')}</h2>
          <p className="text-sm text-muted">Essential knowledge for every Indian voter.</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {educationData.map((card) => (
          <div 
            key={card.id}
            className="min-w-[280px] md:min-w-[320px] bg-white border border-slate-100 rounded-2xl p-5 shadow-sm snap-start flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold text-civic-navy">{card.title}</h3>
            <p className="text-sm text-ink leading-relaxed flex-1">
              {card.explanation}
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 items-start">
              <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Key Fact</p>
                <p className="text-xs text-blue-900 font-medium">{card.fact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
