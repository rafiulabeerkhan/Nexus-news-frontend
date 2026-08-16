export function formatDate(isoString, time = false) {
  if (!isoString) return "";

  const date = new Date(isoString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  let formatted = date.toLocaleDateString("en-GB", options);

  if (time) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    formatted += ` ${hours}:${minutes}`;
  }

  return formatted;
}
