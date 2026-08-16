import { FaPlayCircle } from "react-icons/fa";
import { getYoutubeThumbnail } from "../../../utils/youtube";
import { formatDate } from "../../../utils/dateConverter";

const VideoCard = ({ video }) => {
  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={getYoutubeThumbnail(video.youtubeUrl)}
          alt={video.title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <FaPlayCircle className="text-5xl text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Category Badge (Optional) */}
        {video.category && (
          <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
            {video.category}
          </div>
        )}

        {/* Duration (Optional) */}
        {video.duration && (
          <div className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
            {video.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <h2 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-red-600">
          {video.title}
        </h2>

        {video.description && (
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {video.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-sm font-medium text-red-600">
            ▶ Watch Video
          </span>

          {video.createdAt && (
            <span className="text-xs text-slate-500">
              {formatDate(video.createdAt)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
