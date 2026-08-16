export const getImageUrl = (path) => {
  if (!path) return "";
  
  // Clean path to ensure it starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${import.meta.env.VITE_API_URL}${cleanPath}`;
};
