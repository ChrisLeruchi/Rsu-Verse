import { useState, useEffect } from "react";
import { formatRelativeTime } from "./formatRelativeTime";

export function useRelativeTime(isoString) {
  const [relativeTime, setRelativeTime] = useState(() => formatRelativeTime(isoString));

  useEffect(() => {
    setRelativeTime(formatRelativeTime(isoString));

    const intervalId = setInterval(() => {
      setRelativeTime(formatRelativeTime(isoString));
    }, 60000); 

    
    return () => clearInterval(intervalId);
  }, [isoString]);

  return relativeTime;
}