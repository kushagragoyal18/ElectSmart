import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Share2, Download, CheckCircle2, Cloud, Loader2, ExternalLink, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useTranslation } from '../hooks/useTranslation.js';
import { getStateName, getElectionByState } from '../data/elections.js';
import { FULL_CIRCLE_DEGREES, READINESS_MAX, SHARE_CARD_SCALE, SHARE_ROTATION_OFFSET } from '../constants.js';
import { trackEvent, storage, db } from '../firebase.js';
import { ref, uploadString, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { useAuth } from '../context/AuthContext.jsx';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

/** Renders a downloadable and shareable voter readiness card with Firebase Storage integration. */
export function ShareCard({ profile, readiness, nextAction }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const cardRef = useRef(null);
  const election = getElectionByState(profile.state);
  const [isUploading, setIsUploading] = useState(false);
  const [savedCards, setSavedCards] = useState([]);

  // Fetch saved card URLs from Firestore
  useEffect(() => {
    async function fetchSavedCards() {
      if (!user) return;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().savedCards) {
        setSavedCards(userDoc.data().savedCards);
      }
    }
    fetchSavedCards();
  }, [user]);

  /** Captures the card as a PNG and downloads it locally. */
  async function handleDownload() {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: SHARE_CARD_SCALE,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `ElectSmart-Readiness-${profile.state}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      trackEvent('download_share_card', { readiness });
    } catch (err) {
      trackEvent('share_card_download_error', { message: err instanceof Error ? err.message : 'unknown' });
    }
  }

  /** Captures and uploads the card to Firebase Storage. */
  async function handleCloudSave() {
    if (!cardRef.current || !user) return;
    setIsUploading(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: SHARE_CARD_SCALE,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const imageData = canvas.toDataURL('image/png');
      const filename = `readiness_${Date.now()}.png`;
      const storageRef = ref(storage, `users/${user.uid}/cards/${filename}`);
      
      await uploadString(storageRef, imageData, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save URL to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        savedCards: arrayUnion(downloadURL)
      });
      
      setSavedCards(prev => [...prev, downloadURL]);
      trackEvent('upload_card_to_storage', { status: 'success' });
      alert('Card saved to your digital locker!');
    } catch (err) {
      console.error('Upload error:', err);
      trackEvent('upload_card_to_storage_error', { error: err.message });
      alert('Failed to save to cloud.');
    } finally {
      setIsUploading(false);
    }
  }

  /** Deletes a card from storage and Firestore. */
  async function handleDeleteCard(url) {
    if (!user) return;
    try {
      // Extract filename from URL (simplified for this demo)
      // In a real app, you'd store the storage path
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        savedCards: arrayRemove(url)
      });
      
      setSavedCards(prev => prev.filter(c => c !== url));
      trackEvent('delete_card_from_storage', { status: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
      trackEvent('delete_card_from_storage_error', { error: err.message });
    }
  }

  /** Uses the browser share sheet when available. */
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'I am Election Ready!',
        text: `My voting readiness score is ${readiness}%! Check yours at ElectSmart.`,
        url: window.location.href,
      });
      trackEvent('share_readiness_card', { readiness });
    }
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-sm mx-auto animate-fade-in font-inter">
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
                style={{ transform: `rotate(${(readiness / READINESS_MAX) * FULL_CIRCLE_DEGREES - SHARE_ROTATION_OFFSET}deg)` }}
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
              <CheckCircle2 size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Next Priority</p>
              <p className="text-sm font-bold text-ink">{nextAction.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
        <div className="flex gap-2">
          <button 
            onClick={handleDownload}
            aria-label="Download readiness card"
            className="flex-1 bg-[#000080] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-md active:scale-95"
          >
            <Download size={18} aria-hidden="true" />
            Download
          </button>
          {user && (
            <button 
              onClick={handleCloudSave}
              disabled={isUploading}
              aria-label="Save to cloud"
              className="flex-1 bg-white border-2 border-[#000080] text-[#000080] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Cloud size={18} />}
              {isUploading ? 'Saving...' : 'Cloud Save'}
            </button>
          )}
          <button 
            onClick={handleShare}
            aria-label="Share readiness card"
            className="p-3 bg-white border border-slate-200 text-ink rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Share2 size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Saved Gallery */}
        {savedCards.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">My Saved Cards ({savedCards.length})</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {savedCards.map((url, idx) => (
                <div key={idx} className="relative group shrink-0">
                  <img src={url} alt="Saved card" className="w-16 h-20 object-cover rounded-lg border border-slate-200" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                    <a href={url} target="_blank" rel="noreferrer" className="p-1 text-white hover:text-eci-saffron">
                      <ExternalLink size={12} />
                    </a>
                    <button onClick={() => handleDeleteCard(url)} className="p-1 text-white hover:text-red-400">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ShareCard.propTypes = {
  profile: PropTypes.shape({
    state: PropTypes.string.isRequired,
  }).isRequired,
  readiness: PropTypes.number.isRequired,
  nextAction: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

