import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Trash2, Play } from "lucide-react";
import { ClipLoader } from "react-spinners";

import useVideos from "../../hooks/useVideos";
import { useTriggerRefreshStore } from "../../store/triggerRefreshStore";
import { toast } from "react-toastify";

const getYoutubeId = (url) => {
  if (!url) return "";

  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[1] ? match[1] : "";
};

const getYoutubeThumbnail = (url) => {
  const id = getYoutubeId(url);

  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

const PublishVideos = () => {
  const { createVideos, getVideos, deleteVideo } = useVideos();

  const [formData, setFormData] = useState({
    title: "",
    youtubeUrl: "",
  });

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const { triggerRefresh, setTriggerRefresh } = useTriggerRefreshStore();

  const resetForm = () => {
    setFormData({
      title: "",
      youtubeUrl: "",
    });
  };

  const fetchVideos = async () => {
    try {
      setFetching(true);

      const res = await getVideos();

      if (res.success) {
        setVideos(res.data || []);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [triggerRefresh]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      return Swal.fire("Validation", "Title is required.", "warning");
    }

    if (!formData.youtubeUrl.trim()) {
      return Swal.fire("Validation", "Youtube URL is required.", "warning");
    }

    try {
      setLoading(true);

      const res = await createVideos(formData);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Video Added",
          timer: 1500,
          showConfirmButton: false,
        });

        resetForm();
        fetchVideos();
        setTriggerRefresh();
      } else {
        Swal.fire("Error", res.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Video?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await deleteVideo(id);
    if (res.success) {
      toast.success(res.message);
      fetchVideos();
      setTriggerRefresh();
    }
  };

  return (
    <div className="grid xl:grid-cols-3 gap-6">
      {/* FORM */}

      <div>
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-[#00386f] p-6">
            <h2 className="text-xl text-white font-bold">Publish Video</h2>

            <p className="text-white/80 mt-1">Publish Youtube videos.</p>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="font-medium block mb-2">Video Title</label>

              <input
                className="w-full border rounded-xl px-4 py-3"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="font-medium block mb-2">Youtube URL</label>

              <input
                className="w-full border rounded-xl px-4 py-3"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    youtubeUrl: e.target.value,
                  })
                }
              />
            </div>

            {formData.youtubeUrl &&
              getYoutubeThumbnail(formData.youtubeUrl) && (
                <img
                  src={getYoutubeThumbnail(formData.youtubeUrl)}
                  className="rounded-xl w-full"
                />
              )}

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-primary-500 text-white rounded-xl py-3"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>

              <button onClick={resetForm} className="px-6 border rounded-xl">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO LIST */}

      <div className="xl:col-span-2">
        <div className="bg-white rounded-2xl border shadow h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">Published Videos</h2>

            {!fetching && (
              <span className="text-sm bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-semibold">
                {videos.length} Videos
              </span>
            )}
          </div>

          {/* Scrollable Body */}
          <div className="p-5 overflow-y-auto h-[700px]">
            {fetching && (
              <div className="flex justify-center items-center h-full">
                <ClipLoader />
              </div>
            )}

            {!fetching && videos.length === 0 && (
              <div className="flex justify-center items-center h-full text-gray-500">
                No videos found.
              </div>
            )}

            {!fetching && videos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="group bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative">
                      <img
                        src={getYoutubeThumbnail(video.youtubeUrl)}
                        alt={video.title}
                        className="w-full aspect-video object-cover"
                      />

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
                        {video.title}
                      </h3>

                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-red-600 text-white py-2 text-sm hover:bg-red-700 transition"
                      >
                        <Play size={15} />
                        Watch
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishVideos;
