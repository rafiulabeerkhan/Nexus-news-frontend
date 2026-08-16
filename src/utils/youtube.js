export const getYoutubeId = (url) => {
  if (!url) return "";

  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[1] ? match[1] : "";
};

export const getYoutubeThumbnail = (url) => {
  const id = getYoutubeId(url);

  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : "";
};