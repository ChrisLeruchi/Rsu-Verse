import { useState } from "react";

export function useNotificationState() {
   const [pushMaster, setPushMaster] = useState(true);
    const [emailDigest, setEmailDigest] = useState(false);
    const [socialAlerts, setSocialAlerts] = useState(true);
    const [confessionAlerts, setConfessionAlerts] = useState(false);
    const [marketAlerts, setMarketAlerts] = useState(true);
    const [verseAlerts, setVerseAlerts] = useState(true);

    return {
      pushMaster, setPushMaster,
      emailDigest, setEmailDigest,
      socialAlerts, setSocialAlerts,
      confessionAlerts, setConfessionAlerts,
      marketAlerts, setMarketAlerts,
      verseAlerts, setVerseAlerts
    }
}