import { useRef } from 'react';
import { Share2, Download, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useTranslation } from '../hooks/useTranslation.js';
import { getStateName, getElectionByState } from '../data/elections.js';

export function ShareCard({ profile, readiness, nextAction }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const election = getElectionByState(profile.state);

  async function handleDownload() {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `ElectSmart-Readiness-${profile.state}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-sm mx-auto animate-fade-in">
      {/* Capture Area */}
      <div ref={cardRef} className="bg-white">
        {/* Tricolor Accent Bar */}
        <div className="flex h-1.5 w-full">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        {/* Card Header */}
        <div className="bg-[#000080] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full" />
          
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-white/70 italic">Voter Readiness</p>
          <h3 className="text-2xl font-black italic">Elect<span className="text-eci-saffron">Smart</span></h3>
        </div>

        {/* Card Body */}
        <div className="p-8 text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 flex items-center justify-center relative">
              <div 
                className="absolute inset-[-12px] rounded-full border-[12px] border-eci-green border-t-transparent border-l-transparent" 
                style={{ transform: `rotate(${(readiness / 100) * 360 - 45}deg)` }}
              />
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-ink">{readiness}%</span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Election Ready</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-[#000080] uppercase tracking-[0.2em] mb-1">
              {getStateName(profile.state)}
            </p>
            <h4 className="text-lg font-extrabold text-ink leading-tight">
              {election?.nextElection?.title || 'Assembly Election'}
            </h4>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 flex gap-3 items-center text-left border border-slate-100">
            <div className="w-10 h-10 bg-eci-green text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Next Priority</p>
              <p className="text-sm font-bold text-ink">{nextAction.title}</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[11px] text-[#000080] font-bold italic">Check yours at ElectSmart</p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <button 
          onClick={handleDownload}
          className="flex-1 bg-[#000080] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-md active:scale-95"
        >
          <Download size={18} />
          Download Card
        </button>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'I am Election Ready!',
                text: `My voting readiness score is ${readiness}%! Check yours at ElectSmart.`,
                url: window.location.href,
              });
            }
          }}
          className="p-3 bg-white border border-slate-200 text-ink rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
}
