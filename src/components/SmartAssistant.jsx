import { useMemo, useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { assistantTree, resolveAssistantMessage } from '../utils/assistantTree.js';

export function SmartAssistant({ profile, election, nextAction, planState }) {
  const [nodeId, setNodeId] = useState('start');
  const [history, setHistory] = useState([]);
  const node = assistantTree[nodeId];

  const botMessage = useMemo(
    () => resolveAssistantMessage(node, { profile, election, nextAction, planState }),
    [election, nextAction, node, planState, profile],
  );

  function choose(option) {
    setHistory((current) => [
      ...current,
      { role: 'assistant', text: botMessage },
      { role: 'user', text: option.label },
    ]);

    if (option.next) {
      setNodeId(option.next);
      return;
    }

    if (option.action === 'maps') {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(election.pollingSearch)}`, '_blank');
    }

    if (option.action === 'registration' || option.action === 'verify') {
      window.open(election.registration.portal, '_blank');
    }

    if (option.action === 'nextAction') {
      window.open(nextAction.actionUrl, '_blank');
    }
  }

  return (
    <section className="premium-card p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-civic-navy text-white shadow-sm">
          <Bot size={22} aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-ink">Smart assistant</h2>
            <Sparkles size={16} className="text-civic-saffron" aria-hidden="true" />
          </div>
          <p className="text-sm text-muted">Personal guidance based on your current scenario.</p>
        </div>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto rounded-lg border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4">
        {history.slice(-4).map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={`max-w-[88%] rounded-lg px-3 py-2 text-sm shadow-sm ${
              message.role === 'user' ? 'ml-auto bg-civic-blue text-white' : 'bg-white text-ink'
            }`}
          >
            {message.text}
          </p>
        ))}
        <p className="max-w-[92%] rounded-lg bg-white px-3 py-2 text-sm leading-6 text-ink shadow-sm">
          {botMessage}
        </p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {node.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => choose(option)}
            className="interactive-card inline-flex min-h-11 items-center justify-between gap-2 rounded-lg border border-civic-line bg-white px-3 text-left text-sm font-bold text-civic-navy hover:border-civic-blue hover:bg-blue-50"
          >
            {option.label}
            <Send size={15} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
