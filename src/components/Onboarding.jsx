import { useState } from 'react';
import { ArrowRight, Search, ChevronDown, MessageSquare, Mail, Calendar, Share2, Palette } from 'lucide-react';
import { getStateName, states } from '../data/elections.js';
import ashokaEmblem from '../assets/ashoka_emblem.png';
import heroBg from '../assets/hero_bg.png';

export function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    state: 'andhra-pradesh',
    age: '18',
    registrationStatus: 'not_registered',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const age = Number(form.age);
    const nextErrors = {};

    if (!states.includes(form.state)) nextErrors.state = 'Choose a valid state or union territory.';
    if (!Number.isFinite(age) || age < 1 || age > 120) nextErrors.age = 'Enter an age between 1 and 120.';
    
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onComplete({
      ...form,
      age,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with dark overlay - Full Viewport Coverage */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/202412/jharkhand-assembly-election-1st-phase-voting-13th-november-125945963-16x9.png?VersionId=b_gEd06hG6jod7XCJabjLyhqZBeSeqi_&size=690:388')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
        {/* State Emblem */}
        <div className="mb-6 flex flex-col items-center animate-fade-in">
          <img src={ashokaEmblem} alt="State Emblem of India" className="h-32 w-auto mb-2 mix-blend-screen" />
          <p className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">सत्यमेव जयते</p>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight flex items-center justify-center gap-2 drop-shadow-2xl">
            Elect<span className="text-eci-saffron">Smart</span>
            <span className="bg-eci-saffron text-black text-xs font-bold px-2 py-0.5 rounded ml-2 align-middle">BETA</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mt-2 tracking-wide opacity-90">
            Election Assistant of India
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-eci-saffron via-white to-eci-green mx-auto mt-4 rounded-full" />
          <p className="text-white/70 text-sm mt-4 font-medium italic">
            "Where Citizen Engagement Converges"
          </p>
        </div>

        {/* Central Search-style Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="w-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row p-1.5 gap-1.5 md:h-16">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={20} />
              <input 
                type="number"
                placeholder="Enter your age"
                value={form.age}
                onChange={(e) => updateField('age', e.target.value)}
                className="w-full h-full pl-12 pr-4 text-ink font-semibold focus:outline-none placeholder:text-gray-400"
              />
            </div>
            
            <div className="h-px w-full md:h-full md:w-px bg-gray-200" />
            
            <div className="flex-1 relative flex items-center">
              <select
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
                className="w-full h-full appearance-none pl-4 pr-10 text-ink font-semibold bg-transparent focus:outline-none cursor-pointer"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {getStateName(state)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 text-gray-400 pointer-events-none" size={18} />
            </div>

            <button 
              type="submit"
              className="bg-[#ef4040] hover:bg-red-700 text-white font-bold px-12 h-full rounded-md transition-colors flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
            >
              Start <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex gap-8 mt-12 items-center">
            <label className="flex items-center gap-3 text-white cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all ${form.registrationStatus === 'registered' ? 'bg-eci-saffron border-eci-saffron' : ''}`}>
                <input 
                  type="radio" 
                  className="hidden" 
                  name="reg" 
                  checked={form.registrationStatus === 'registered'}
                  onChange={() => updateField('registrationStatus', 'registered')}
                />
                {form.registrationStatus === 'registered' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm font-bold opacity-80 group-hover:opacity-100">Registered</span>
            </label>
            <label className="flex items-center gap-3 text-white cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all ${form.registrationStatus === 'not_registered' ? 'bg-eci-saffron border-eci-saffron' : ''}`}>
                <input 
                  type="radio" 
                  className="hidden" 
                  name="reg" 
                  checked={form.registrationStatus === 'not_registered'}
                  onChange={() => updateField('registrationStatus', 'not_registered')}
                />
                {form.registrationStatus === 'not_registered' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-sm font-bold opacity-80 group-hover:opacity-100">Not Registered</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
