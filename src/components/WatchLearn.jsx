import { Play } from 'lucide-react';
import { VIDEO_DATA, YOUTUBE_THUMBNAIL_BASE_URL, YOUTUBE_WATCH_BASE_URL } from '../constants.js';
import { trackEvent } from '../firebase.js';

/**
 * Shows official-style video learning links with thumbnails.
 * Tracks video views for analytics.
 */
export function WatchLearn() {
  /**
   * Tracks when a user clicks on a video link.
   * @param {string} title - Title of the video.
   */
  const handleVideoClick = (title) => {
    trackEvent('watch_video', { video_title: title });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="watch-learn-title">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
          <Play className="h-6 w-6 fill-current" aria-hidden="true" />
        </div>
        <h2 id="watch-learn-title" className="text-xl font-bold text-gray-900">Watch & Learn</h2>
      </div>

      <div className="grid gap-4">
        {VIDEO_DATA.map((video) => (
          <a
            key={video.id}
            href={`${YOUTUBE_WATCH_BASE_URL}?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleVideoClick(video.title)}
            aria-label={`Watch video: ${video.title} on YouTube`}
            className="group relative block overflow-hidden rounded-lg border border-gray-100 bg-gray-50 transition-all hover:border-indigo-200"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={`${YOUTUBE_THUMBNAIL_BASE_URL}/${video.id}/mqdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full bg-white/90 p-3 shadow-lg">
                  <Play className="h-6 w-6 fill-indigo-600 text-indigo-600" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="p-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
              {video.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
