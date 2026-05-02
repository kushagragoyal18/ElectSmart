import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getStateName, states } from '../data/elections.js';

export function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    state: 'andhra-pradesh',
    age: '18',
    registrationStatus: 'not_registered',
  });
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
    if (!['registered', 'not_registered', 'unsure'].includes(form.registrationStatus)) {
      nextErrors.registrationStatus = 'Choose your current registration status.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onComplete({
      ...form,
      age,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <section className="fade-in grid min-h-[calc(100vh-140px)] items-center gap-10 py-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="max-w-xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-civic-blue">Guided voting journey</p>
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Build your personal election plan in under a minute.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          ElectSmart uses your age, state, and registration status to show only the steps that matter next.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {['Context-aware', 'Deadline smart', 'Mobile ready'].map((item) => (
            <div key={item} className="rounded-lg border border-civic-line bg-white/80 px-4 py-3 text-sm font-bold text-civic-navy shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="premium-card p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-ink">Tell us where you are</h2>
          <p className="mt-2 text-sm text-muted">Your answers stay in this browser session.</p>
        </div>

        <label className="mb-5 block">
          <span className="mb-2 block text-sm font-semibold text-ink">State</span>
          <select
            value={form.state}
            onChange={(event) => updateField('state', event.target.value)}
            className="h-12 w-full rounded-md border border-civic-line bg-white px-3 text-ink"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {getStateName(state)}
              </option>
            ))}
          </select>
          {errors.state && <span className="mt-2 block text-sm font-semibold text-red-700">{errors.state}</span>}
        </label>

        <label className="mb-5 block">
          <span className="mb-2 block text-sm font-semibold text-ink">Age</span>
          <input
            min="1"
            max="120"
            type="number"
            value={form.age}
            onChange={(event) => updateField('age', event.target.value)}
            className="h-12 w-full rounded-md border border-civic-line bg-white px-3 text-ink"
          />
          {errors.age && <span className="mt-2 block text-sm font-semibold text-red-700">{errors.age}</span>}
        </label>

        <fieldset className="mb-6">
          <legend className="mb-2 text-sm font-semibold text-ink">Are you registered to vote?</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['registered', 'Yes, registered'],
              ['not_registered', 'No, not yet'],
              ['unsure', 'Not sure'],
            ].map(([value, label]) => (
              <label
                key={value}
                className="interactive-card flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-civic-line px-3 font-semibold text-ink has-[:checked]:border-civic-blue has-[:checked]:bg-blue-50"
              >
                <input
                  type="radio"
                  name="registrationStatus"
                  checked={form.registrationStatus === value}
                  onChange={() => updateField('registrationStatus', value)}
                />
                {label}
              </label>
            ))}
          </div>
          {errors.registrationStatus && (
            <span className="mt-2 block text-sm font-semibold text-red-700">{errors.registrationStatus}</span>
          )}
        </fieldset>

        <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-civic-blue px-5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-civic-navy hover:shadow-soft">
          Create my plan
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
