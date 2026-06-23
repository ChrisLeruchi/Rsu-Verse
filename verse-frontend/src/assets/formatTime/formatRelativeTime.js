export function formatRelativeTime(isoString) {

  if (!isoString) return '';

  
  const sanitizedString = typeof isoString === 'string' 
    ? isoString.replace(/t/g, 'T')
    : isoString;

  const now = new Date();
  const past = new Date(sanitizedString);

  if (isNaN(past.getTime())) return '';

  const diffInSeconds = Math.floor((now - past) / 1000);


  if (diffInSeconds < 60) return 'Just now';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24); 
  return `${diffInDays}d`;
}