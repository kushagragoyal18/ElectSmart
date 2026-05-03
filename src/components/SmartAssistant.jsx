import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import {
  ASSISTANT_FALLBACK_MESSAGE,
  ASSISTANT_QUICK_REPLIES,
  ASSISTANT_TYPING_DELAY_MS,
} from '../constants.js';
import { assistantTree, resolveAssistantMessage } from '../utils/assistantTree.js';
import { useTranslation } from '../hooks/useTranslation.js';
import { trackEvent } from '../firebase.js';

/** Interactive assistant for voter questions and personalized guidance. */
export function SmartAssistant({ profile, election, nextAction = null, planState }) {
  const { t } = useTranslation();
  const [nodeId, setNodeId] = useState('start');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const scrollRef = useRef(null);

  const node = assistantTree[nodeId];

  const botMessage = useMemo(
    () => resolveAssistantMessage(node, { profile, election, nextAction, planState }),
    [election, nextAction, node, planState, profile],
  );

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', text: botMessage }]);
    }
  }, [botMessage, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /** Finds the assistant knowledge node that best matches free text. */
  function findNextNode(text) {
    const input = text.toLowerCase();
    if (input.includes('eligible') || input.includes('age') || input.includes('yogyata')) return 'start';
    if (input.includes('register') || input.includes('prajikaran')) return 'registration';
    if (input.includes('status') || input.includes('check') || input.includes('stithi')) return 'statusCheck';
    if (input.includes('booth') || input.includes('station') || input.includes('kendra')) return 'booth';
    if (input.includes('candidate') || input.includes('ummidwar')) return 'candidates';
    if (input.includes('bring') || input.includes('document') || input.includes('id') || input.includes('pehchan')) return 'documents';
    if (input.includes('vote') || input.includes('polling') || input.includes('matdan')) return 'votingDay';
    if (input.includes('deadline') || input.includes('date') || input.includes('tithi')) return 'deadline';
    return null;
  }

  /** Sends a user message and appends the assistant response. */
  async function handleSend(e, text = null) {
    if (e) e.preventDefault();
    const userText = text || inputValue.trim();
    if (!userText || isTyping) return;

    setHasSentMessage(true);
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);

    setIsTyping(true);
    
    // Simulate thinking/typing
    await new Promise((r) => setTimeout(r, ASSISTANT_TYPING_DELAY_MS));

    const nextNodeId = findNextNode(userText);
    let assistantText = "";

    if (nextNodeId) {
      setNodeId(nextNodeId);
      const nextNode = assistantTree[nextNodeId];
      assistantText = resolveAssistantMessage(nextNode, { profile, election, nextAction, planState });
      trackEvent('assistant_question', { topic: nextNodeId });
    } else {
      assistantText = ASSISTANT_FALLBACK_MESSAGE;
      trackEvent('assistant_question', { topic: 'fallback' });
    }

    setMessages((prev) => [...prev, { role: 'assistant', text: assistantText }]);
    setIsTyping(false);
  }

  return (
    <section className="premium-card flex flex-col h-[520px]">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#000080] text-white shadow-sm">
            <Bot size={22} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-ink">{t('assistant_title')}</h2>
              <Sparkles size={16} className="text-eci-saffron" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted">{t('assistant_subtitle')}</p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                message.role === 'user' 
                  ? 'bg-[#000080] text-white rounded-tr-none' 
                  : 'bg-white text-ink rounded-tl-none border border-slate-100'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-2.5 flex gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-slate-100">
        {!hasSentMessage && (
          <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide border-b border-slate-50">
            {ASSISTANT_QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(null, reply)}
                aria-label={`Ask assistant: ${reply}`}
                className="whitespace-nowrap px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-civic-navy hover:bg-slate-50 hover:border-civic-blue transition-all shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={(e) => handleSend(e)} className="p-4">
          <div className="relative">
            <input
              id="assistant-message"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('type_message')}
              aria-label={t('type_message')}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-civic-blue transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send assistant message"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#000080] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

SmartAssistant.propTypes = {
  profile: PropTypes.shape({
    state: PropTypes.string,
    age: PropTypes.number,
    registrationStatus: PropTypes.string,
  }).isRequired,
  election: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  nextAction: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  planState: PropTypes.string.isRequired,
};
