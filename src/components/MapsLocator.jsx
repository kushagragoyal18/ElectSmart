import { MapPinned } from 'lucide-react';
import PropTypes from 'prop-types';
import { GOOGLE_MAPS_EMBED_BASE_URL, GOOGLE_MAPS_SEARCH_BASE_URL } from '../constants.js';

/** Embeds Google Maps polling booth search and opens the full map. */
export function MapsLocator({ election }) {
  const mapUrl = `${GOOGLE_MAPS_EMBED_BASE_URL}?q=${encodeURIComponent(election.pollingSearch)}&output=embed`;
  const externalUrl = `${GOOGLE_MAPS_SEARCH_BASE_URL}/${encodeURIComponent(election.pollingSearch)}`;

  return (
    <section className="premium-card p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-ink">Polling booth locator</h2>
          <p className="mt-1 text-sm text-muted">Google Maps integration for nearby booth search.</p>
        </div>
        <MapPinned className="text-civic-blue" size={24} aria-hidden="true" />
      </div>
      <div className="overflow-hidden rounded-lg border border-civic-line shadow-sm">
        <iframe
          title="Google Maps polling booth locator"
          src={mapUrl}
          className="h-64 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={externalUrl}
        target="_blank"
        rel="noreferrer"
        className="interactive-card mt-4 inline-flex h-10 items-center rounded-lg bg-civic-blue px-4 text-sm font-bold text-white hover:bg-civic-navy"
        aria-label="Open polling booth search in Google Maps"
      >
        Open in Google Maps
      </a>
    </section>
  );
}

MapsLocator.propTypes = {
  election: PropTypes.shape({
    pollingSearch: PropTypes.string.isRequired,
  }).isRequired,
};
