import { useState } from "react";

export function useUtilityState () {
    const [searchQuery, setSearchQuery] = useState("");
    const [bio, setBio] = useState("Coffee addict...");
    const [username, setUsername] = useState("@comp_eng");
    const [displayName, setDisplayName] = useState("Computer Eng")

    return {
      searchQuery, setSearchQuery,
      bio, setBio,
      username, setUsername,
      displayName, setDisplayName
    }
}