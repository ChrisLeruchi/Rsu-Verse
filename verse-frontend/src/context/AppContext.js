import React, { createContext, useContext, useMemo, useState } from "react";
import { useFeedState } from "../assets/states/context";
import { useNotificationState } from "../assets/states/notificationMgt";
import { useSupportState } from "../assets/states/supportMgt";
import { useProfileState } from "../assets/states/profileMgt";
import { usePrivacystate } from "../assets/states/privacyMgt";
import { useUtilityState } from "../assets/states/utitilities";

const FeedContext = createContext(null);
const UIContext = createContext(null);

export const mock_chat = {
  chats: [
    {
      id: "1",
      department: "Computer Engineering",
      faculty: "Engineering",
      initials: "CE",
      lastMessage: "Did you hear what that lecturer did?",
      timeStamp: "2m",
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: "m3", senderId: "other", text: "Did you hear what that lecturer did?", time: "4:16 PM" },
        { id: "m2", senderId: "me", text: "Which one? The GNS guy?", time: "4:15 PM" },
        { id: "m1", senderId: "other", text: "Hey! You in the engineering group?", time: "4:12 PM" },
      ],
    },
    {
      id: "2",
      department: "Management Sciences",
      faculty: "Management",
      initials: "MS",
      lastMessage: "Sent an attachment: Marketplace Item",
      timeStamp: "1h",
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: "m2", senderId: "me", text: "Sent an attachment: Marketplace Item", time: "3:10 PM" },
        { id: "m1", senderId: "other", text: "Do you have any textbooks for sale?", time: "3:08 PM" },
      ],
    },
    {
      id: "3",
      department: "Law",
      faculty: "Law",
      initials: "LW",
      lastMessage: "The moot court schedule just dropped",
      timeStamp: "1d",
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: "m1", senderId: "other", text: "The moot court schedule just dropped", time: "Yesterday" },
      ],
    },
  ],
};

export function AppProvider({ children }) {

  const { posts, setPosts, activeFilter, setActiveFilter, activeTab, setActiveTab, recents, setRecents, search, setSearch } = useFeedState();

  const [ mockChat, setMockChat ] = useState(mock_chat);
  const [notifications, setNotifications] = useState([
      {
        id: "ntf_1",
        postId: posts[0]?.id ?? null,
        type: "reply",
        title: "Post from",
        body: "Computer Engineering",
        department: "CE",
        timestamp: "2m",
        isRead: false,
      },
      {
        id: "ntf_3",
        postId: posts[1]?.id ?? null,
        type: "marketplace",
        title: "Offer on MacBook Pro",
        body: "Emeka Didi",
        department: "MS",
        timestamp: "5h",
        isRead: true,
      },
      {
        id: "ntf_4",
        postId: posts[2]?.id ?? null,
        type: "verse",
        title: "Post from",
        body: "Law",
        department: "LW",
        timestamp: "1d",
        isRead: true,
      },
    ])


  const { selectedTheme, setSelectedTheme, isSellerActive, setIsSellerActive, showCurrentPassword, setShowCurrentPassword, showNewPassword, setShowNewPassword, twoFactorActive, setTwoFactorActive, biometricsActive, setBiometricsActive } = useProfileState();

  const { anonymousDefault, setAnonymousDefault, hideDetails, setHideDetails, allowDirectMessages, setAllowDirectMessages } = usePrivacystate();

  const { pushMaster, setPushMaster, emailDigest, setEmailDigest, socialAlerts, setSocialAlerts, confessionAlerts, setConfessionAlerts, marketAlerts, setMarketAlerts, verseAlerts, setVerseAlerts } = useNotificationState();

  const { searchQuery, setSearchQuery, bio, setBio, username, setUsername, displayName, setDisplayName } = useUtilityState();

  const { isOpen, setIsOpen, selectedTopic, setSelectedTopic, isSubmitted, setIsSubmitted, message, setMessage, attachment, setAttachment } = useSupportState();

  const matchingPosts = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];

    return posts.filter((post) => {
      if (!post || post.verse === 'market') return false;

      const text = post.content?.text?.toLowerCase() || '';
      const verse = post.verse?.toLowerCase() || '';
      const authorName = post.author?.name?.toLowerCase() || '';
      const department = post.author?.department?.toLowerCase() || '';
      const faculty = post.author?.faculty?.toLowerCase() || '';
      const isAnonymous = !!post.author?.anonymous;

      const matchesText = text.includes(query);
      const matchesVerse = verse.includes(query);
      const matchesAuthor = !isAnonymous && authorName.includes(query);
      const matchesDept = department.includes(query);
      const matchesFaculty = faculty.includes(query);

      const matchesTags = Array.isArray(post.content?.tags) &&
        post.content.tags.some(
          (tag) => typeof tag === "string" && tag.toLowerCase().includes(query)
        );

      return matchesText || matchesVerse || matchesAuthor || matchesDept || matchesFaculty || matchesTags;
    });
  }, [posts, search]);


  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      if (activeFilter === "all" || activeFilter === "new") {
        return post.verse !== "market";
      }
      return post.verse === activeFilter;
    });

    if (activeFilter === "new") {
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const now = Date.now();

      result = result
        .filter((post) => {
          if (!post.meta?.createdAt) return false;
          const postTime = new Date(post.meta.createdAt).getTime();
          return (now - postTime) < ONE_DAY;
        })
        .sort((a, b) => {
          const timeA = new Date(a.meta?.createdAt).getTime();
          const timeB = new Date(b.meta?.createdAt).getTime();
          if (timeA !== timeB) return timeB - timeA;
          const scoreA = (a.engagement?.upvotes || 0) + (a.engagement?.comments?.length || 0);
          const scoreB = (b.engagement?.upvotes || 0) + (b.engagement?.comments?.length || 0);
          return scoreB - scoreA;
        });
    }
    return result;
  }, [posts, activeFilter]);

  const feedContextValue = useMemo(() => ({
    posts, setPosts,
    activeFilter, setActiveFilter,
    activeTab, setActiveTab,
    recents, setRecents,
    search, setSearch,
    matchingPosts,
    filteredPosts
  }), [
    posts, activeFilter, activeTab, recents, search, matchingPosts, filteredPosts,
    setPosts, setActiveFilter, setActiveTab, setRecents, setSearch
  ]);

  const uiContextValue = useMemo(() => ({
    selectedTheme, setSelectedTheme,
    isSellerActive, setIsSellerActive,
    showCurrentPassword, setShowCurrentPassword,
    showNewPassword, setShowNewPassword,
    twoFactorActive, setTwoFactorActive,
    biometricsActive, setBiometricsActive,
    anonymousDefault, setAnonymousDefault,
    hideDetails, setHideDetails,
    allowDirectMessages, setAllowDirectMessages,
    pushMaster, setPushMaster,
    emailDigest, setEmailDigest,
    socialAlerts, setSocialAlerts,
    confessionAlerts, setConfessionAlerts,
    marketAlerts, setMarketAlerts,
    verseAlerts, setVerseAlerts,
    searchQuery, setSearchQuery,
    bio, setBio,
    username, setUsername,
    displayName, setDisplayName,
    isOpen, setIsOpen,
    selectedTopic, setSelectedTopic,
    isSubmitted, setIsSubmitted,
    message, setMessage,
    attachment, setAttachment,
    mockChat, setMockChat,
    notifications, setNotifications
  }), [
    selectedTheme, isSellerActive, showCurrentPassword, showNewPassword,
    twoFactorActive, biometricsActive, anonymousDefault, hideDetails,
    allowDirectMessages, pushMaster, emailDigest, socialAlerts, mockChat, setMockChat,
    confessionAlerts, marketAlerts, verseAlerts, searchQuery,
    bio, username, displayName, isOpen, selectedTopic,
    isSubmitted, message, attachment,
    setSelectedTheme, setIsSellerActive, setShowCurrentPassword, setShowNewPassword,
    setTwoFactorActive, setBiometricsActive, setAnonymousDefault, setHideDetails,
    setAllowDirectMessages, setPushMaster, setEmailDigest, setSocialAlerts,
    setConfessionAlerts, setMarketAlerts, setVerseAlerts, setSearchQuery,
    setBio, setUsername, setDisplayName, setIsOpen, setSelectedTopic,
    setIsSubmitted, setMessage, setAttachment,
    notifications, setNotifications
  ]);


  return (
    <UIContext.Provider value={uiContextValue}>
      <FeedContext.Provider value={feedContextValue}>
        {children}
      </FeedContext.Provider>
    </UIContext.Provider>
  );
}

export function useAppContext() {
  const feedData = useContext(FeedContext);
  const uiData = useContext(UIContext);

  if (!feedData || !uiData) {
    throw new Error('useAppContext must be executed cleanly within an AppProvider wrapper');
  }

  return useMemo(() => ({ ...feedData, ...uiData }), [feedData, uiData]);
}