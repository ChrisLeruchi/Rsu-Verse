import { useState } from "react";

export function usePrivacystate() {
   const [anonymousDefault, setAnonymousDefault] = useState(true);
    const [hideDetails, setHideDetails] = useState(false);
    const [allowDirectMessages, setAllowDirectMessages] = useState(true);

    return {
      anonymousDefault, setAnonymousDefault,
      hideDetails, setHideDetails,
      allowDirectMessages, setAllowDirectMessages
    }
}