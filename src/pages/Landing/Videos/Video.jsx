import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import useVideos from "../../../hooks/useVideos";
import { Link } from "react-router-dom";
const Video = () => {
  const { getVideos } = useVideos();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await getVideos();

    console.log("Returned from hook:", res);
    console.log("Videos:", res.videos);
    if (res.success) {
      setVideos(res.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-red-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-red-600 font-medium">Videos</span>
          </div>

          {/* Title */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1.5 h-8 rounded-full bg-red-600"></span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  <span className="text-red-600">News</span> Videos
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Watch the latest news, politics, international, sports, entertainment, and special reports in video format.
                </p>
              </div>
            </div>

            {/* Count */}
            <div className="bg-red-50 text-red-600 px-5 py-3 rounded-xl font-semibold shadow-sm">
              Total Videos: {videos.length}
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border p-20 text-center">
            <div className="text-6xl mb-4">🎥</div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No videos found
            </h3>

            <p className="text-slate-500">
              New videos will be displayed here when available.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Video;
