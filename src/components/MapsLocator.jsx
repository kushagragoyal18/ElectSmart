import { Map, ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';
import { GOOGLE_MAPS_SEARCH_BASE_URL } from '../constants.js';
import { trackEvent } from '../firebase.js';

/**
 * Component to locate nearby polling booths using Google Maps.
 * @param {Object} props
 * @param {string} props.state - Current user's state for search context.
 */
export function MapsLocator({ state }) {
  /**
   * Tracks when a user opens Google Maps.
   */
  const handleOpenMaps = () => {
    trackEvent('open_maps_click', { search_state: state });
    window.open(`${GOOGLE_MAPS_SEARCH_BASE_URL}/polling+booth+near+me+in+${state}`, '_blank');
  };

  return (
    <section className="premium-card p-6 border-l-4 border-eci-blue">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eci-sky-bg text-eci-blue shadow-sm">
          <Map size={24} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-ink">Find Your Booth</h2>
          <p className="text-sm text-muted mt-1 leading-relaxed">Locate your designated polling station on Google Maps for your area.</p>
        </div>
        <button
          onClick={handleOpenMaps}
          aria-label="Find polling booth near me on Google Maps"
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white border-2 border-eci-blue text-eci-blue font-black hover:bg-eci-sky-bg transition-all shadow-sm active:scale-95"
        >
          Open Google Maps
          <ExternalLink size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

MapsLocator.propTypes = {
  state: PropTypes.string.isRequired,
};
