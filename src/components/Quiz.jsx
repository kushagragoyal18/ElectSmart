import { useState } from 'react';
import { HelpCircle, Trophy, RefreshCcw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.js';
import { QUIZ_QUESTIONS } from '../constants.js';
import { trackEvent } from '../firebase.js';

/** Civic knowledge quiz with scoring and retry support. */
export function Quiz() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState('start'); // start, question, result
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  /** Starts or restarts the quiz from the first question. */
  function startQuiz() {
    setQuestionIndex(0);
    setScore(0);
    setCurrentStep('question');
    trackEvent('quiz_start');
  }

  /** Scores an answer and advances to the next question or result. */
  function handleAnswer(option) {
    const isCorrect = option === QUIZ_QUESTIONS[questionIndex].answer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    trackEvent('quiz_answer', { question: questionIndex + 1, correct: isCorrect });

    if (questionIndex < QUIZ_QUESTIONS.length - 1) {
      setQuestionIndex(i => i + 1);
    } else {
      setCurrentStep('result');
    }
  }

  return (
    <section className="premium-card p-6 flex flex-col min-h-[400px]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
          <HelpCircle size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('quiz_title')}</h2>
          <p className="text-sm text-muted">Test how well you know the Indian electoral system.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {currentStep === 'start' && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle size={40} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-ink mb-2">Ready to test your knowledge?</h3>
              <p className="text-muted max-w-xs mx-auto">5 questions about Indian elections. See if you can get them all right!</p>
            </div>
            <button 
              onClick={startQuiz}
              aria-label="Start quiz"
              className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
            >
              {t('quiz_start')}
            </button>
          </div>
        )}

        {currentStep === 'question' && (
          <div className="w-full space-y-8 animate-fade-in">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}</p>
              <h3 className="text-xl font-bold text-ink leading-tight">{QUIZ_QUESTIONS[questionIndex].question}</h3>
            </div>
            <div className="grid gap-3 w-full max-w-md mx-auto">
              {QUIZ_QUESTIONS[questionIndex].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  aria-label={`Answer ${option}`}
                  className="w-full py-4 px-6 bg-white border-2 border-slate-100 rounded-2xl font-bold text-ink hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="space-y-6 animate-bounce-in">
            <div className="w-24 h-24 bg-eci-saffron rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Trophy size={48} className="text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-ink mb-1">{t('quiz_score')}</h3>
              <p className="text-5xl font-black text-indigo-600">{score}/{QUIZ_QUESTIONS.length}</p>
            </div>
            <p className="text-muted">
              {score === QUIZ_QUESTIONS.length ? "Incredible! You're an election expert!" : score >= 3 ? "Great job! You know your stuff." : "Not bad, but there's room to learn!"}
            </p>
            <button 
              onClick={startQuiz}
              aria-label="Retry quiz"
              className="flex items-center gap-2 mx-auto text-indigo-600 font-bold hover:underline"
            >
              <RefreshCcw size={16} />
              {t('quiz_retry')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
