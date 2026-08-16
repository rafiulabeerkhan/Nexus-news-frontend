export const getImageUrl = (path) => {
  if (!path) return "";
  
  // Clean path to ensure it starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Route through the Vite proxy in development
  if (cleanPath.startsWith('/path')) return cleanPath;
  return `/path${cleanPath}`;
};
