export function formatRelativeTime(isoString) {

  const sanitizedString = typeof isoString === 'string' 
    ? isoString.replace('t', 'T') 
    : isoString;

  const now = new Date();
  const past = new Date(sanitizedString)
  const diffInSeconds = Math.floor((now - past) / 1000)

  if (diffInSeconds < 60) return 'Just now';

  const diffInMinutes = Math.floor((diffInSeconds) / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24); 
  
  return `${diffInDays}d ago`
}