 import { useState } from "react";
 import { campusFeed } from "../campusFeed";
 
 export function useFeedState () {
 const [posts, setPosts] = useState(campusFeed);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("/");
  const [recents, setRecents] = useState([]);
  const [search, setSearch] = useState("");

  return {
    posts, setPosts,
    activeFilter, setActiveFilter,
    activeTab, setActiveTab,
    recents, setRecents,
    search, setSearch
  }
 }
 
