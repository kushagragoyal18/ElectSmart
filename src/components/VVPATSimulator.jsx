import { useState } from 'react';
import { Fingerprint, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import { EVM_CANDIDATES, VVPAT_PRINT_DELAY_MS, VVPAT_VISIBLE_MS } from '../constants.js';

/** Simulates the EVM selection and VVPAT verification flow. */
export function VVPATSimulator() {
  const [step, setStep] = useState('ready');
  const [selected, setSelected] = useState(null);
  const [vvpatVisible, setVvpatVisible] = useState(false);

  /** Records a simulated vote and reveals the VVPAT slip after a delay. */
  function handleVote(candidate) {
    if (step !== 'ready') return;
    setSelected(candidate);
    setStep('voting');

    setTimeout(() => {
      setStep('printing');
      setVvpatVisible(true);

      setTimeout(() => {
        setVvpatVisible(false);
        setStep('success');
      }, VVPAT_VISIBLE_MS);
    }, VVPAT_PRINT_DELAY_MS);
  }

  /** Resets the simulator to its initial ready state. */
  function reset() {
    setStep('ready');
    setSelected(null);
    setVvpatVisible(false);
  }

  return (
    <section className="premium-card overflow-hidden">
      <div className="border-b border-civic-line bg-slate-50 p-5">
        <h2 className="text-xl font-extrabold text-ink">EVM & VVPAT Simulation</h2>
        <p className="text-sm text-muted">Experience the secure voting process used in India.</p>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-t-lg bg-slate-800 p-3 text-white">
            <span className="text-xs font-bold uppercase tracking-widest">Ballot Unit - 01</span>
            <div
              aria-label={`Ballot unit status ${step}`}
              className={`h-3 w-3 rounded-full ${step === 'ready' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-900'}`}
            />
          </div>

          <div className="rounded-b-lg border-x border-b border-slate-300 bg-slate-100 p-4 shadow-inner">
            <div className="space-y-2">
              {EVM_CANDIDATES.map((candidate) => (
                <div key={candidate.id} className="flex items-center gap-3 rounded border border-slate-300 bg-white p-2 shadow-sm">
                  <span className="w-6 text-center text-xs font-bold text-slate-500">{candidate.id}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-ink">{candidate.name}</div>
                    <div className="text-[10px] uppercase text-muted">{candidate.party}</div>
                  </div>
                  <div className="text-2xl" aria-label={`Symbol ${candidate.symbol}`}>{candidate.symbol}</div>
                  <button
                    type="button"
                    disabled={step !== 'ready'}
                    onClick={() => handleVote(candidate)}
                    className={`h-10 w-10 rounded-full border-2 border-slate-400 shadow-sm transition-all active:scale-95 ${
                      step === 'ready' ? 'cursor-pointer bg-eci-saffron hover:bg-orange-600' : 'cursor-not-allowed bg-slate-400 opacity-50'
                    }`}
                    aria-label={`Vote for ${candidate.name}`}
                  />
                </div>
              ))}
            </div>

            {step === 'voting' && (
              <div className="mt-4 flex items-center justify-center gap-2 rounded bg-orange-50 p-2 text-xs font-bold text-eci-saffron animate-pulse">
                <Fingerprint size={16} aria-hidden="true" />
                RECORDING VOTE...
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-[280px] space-y-4">
            <div className="relative rounded-xl border-4 border-slate-700 bg-slate-800 p-4 shadow-xl">
              <div className="mb-4 text-center text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
                VVPAT UNIT - PRINTER STATUS: {step === 'printing' ? 'PRINTING' : 'IDLE'}
              </div>

              <div className="relative h-64 w-full overflow-hidden rounded bg-slate-900 shadow-inner ring-4 ring-slate-700" role="status" aria-live="polite">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10" />

                {vvpatVisible && (
                  <div className="absolute inset-x-4 top-4 bg-white p-4 text-center shadow-lg animate-vvpat-drop">
                    <div className="mb-2 border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Voter Verifiable Paper Audit Trail
                    </div>
                    <div className="my-4 text-4xl">{selected?.symbol}</div>
                    <div className="text-lg font-black text-ink">{selected?.name}</div>
                    <div className="text-xs font-bold text-muted uppercase">{selected?.party}</div>
                    <div className="mt-4 text-[8px] text-slate-400 border-t border-dashed pt-2">SR NO: 10000</div>
                  </div>
                )}

                {!vvpatVisible && (
                  <div className="flex h-full items-center justify-center text-center p-6">
                    <p className="text-xs font-medium text-slate-500">
                      {step === 'ready' ? 'Waiting for ballot selection...' : step === 'success' ? 'Vote cast successfully.' : ''}
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute inset-x-4 top-8 h-64 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent z-20 opacity-30" />
            </div>

            <div className="rounded-lg bg-orange-50 p-4 text-center text-xs text-orange-900 border border-orange-100">
              {step === 'ready' && (
                <div className="flex items-center gap-2 justify-center">
                  <AlertCircle size={14} className="text-eci-saffron" aria-hidden="true" />
                  <span className="font-medium">Select a candidate on the left to begin simulation.</span>
                </div>
              )}
              {step === 'printing' && (
                <div className="font-bold text-[#9a5a00]">
                  Verify your selection on the paper slip. It will be visible for 7 seconds.
                </div>
              )}
              {step === 'success' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 justify-center font-bold text-[#138808]">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>Your vote has been securely recorded.</span>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Reset VVPAT simulator"
                    className="inline-flex items-center gap-1 font-bold text-[#9a5a00] hover:underline"
                  >
                    <RefreshCcw size={12} aria-hidden="true" />
                    Try again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vvpat-drop {
          0% { transform: translateY(-100%); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-vvpat-drop {
          animation: vvpat-drop 7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
