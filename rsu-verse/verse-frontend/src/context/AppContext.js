import React, { createContext, useContext, useState } from "react";

import { Share, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';

const AppContext = createContext();

const minsAgo = (m) => new Date(Date.now() - m * 60 * 1000).toISOString();
const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d) => new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();

const campusFeed = [

  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "12m",
    author: {
      anonymous: false,
      name: "Chidi E.",
      faculty: "Engineering",
      department: "Electrical Eng",
      level: "400",
      rating: 4.8,
      totalSales: 19,
      hostel: "Off-Campus (Agip)"
    },
    content: {
      text: "UK-used iPhone 12 Pro, 128GB, Pacific Blue. Battery health is at 84%, Face ID and True Tone are perfectly active. Never been opened or repaired. Minor pocket scratches on the sides, but the screen is flawless.",
      images: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop"],
      tags: ["iphone", "apple", "gadgets", "phone"]
    },
    meta: {
      createdAt: new Date().toISOString(),
      location: "RSU Main Gate",
      edited: false
    },
    engagement: {
      upvotes: 14,
      downvotes: 0,
      comments: [],
      shares: 4,
      saves: 11,
      reposts: 1
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "iPhone 12 Pro 128GB Pacific Blue",
      price: 385000,
      condition: "Used",
      category: "gadgets",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "2h",
    author: {
      anonymous: false,
      name: "Sodiq O.",
      faculty: "Environmental Sciences",
      department: "Architecture",
      level: "200",
      rating: 5.0,
      totalSales: 8,
      hostel: "Off-Campus (Back Gate)"
    },
    content: {
      text: "Standard A1 Engineering Drawing Board paired with an adjustable wooden stand and a premium 24-inch T-Square. Selling because I upgraded my system setup. Ideal for new 100/200L Engineering or Architecture students.",
      images: ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"],
      tags: ["drawingboard", "tsquare", "architecture", "books"]
    },
    meta: {
      createdAt: minsAgo(12),
      location: "Architecture Studio Complex",
      edited: true
    },
    engagement: {
      upvotes: 19,
      downvotes: 0,
      comments: [],
      shares: 12,
      saves: 14,
      reposts: 5
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "A1 Drawing Board & T-Square Combo Pack",
      price: 28000,
      condition: "Used",
      category: "books",
      negotiable: false
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "3h",
    author: {
      anonymous: false,
      name: "Efe Y.",
      faculty: "Law",
      department: "Commercial Law",
      level: "400",
      rating: 4.6,
      totalSales: 15,
      hostel: "Main Hostel Block C"
    },
    content: {
      text: "Slim-fit classic black corporate suit jacket and matching trousers. Only worn twice for the formal faculty defense and Law dinner last session. Cleaned, pressed, and completely free of stains.",
      images: ["https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=600&auto=format&fit=crop"],
      tags: ["suit", "corporate", "law", "fashion"]
    },
    meta: {
      createdAt: hoursAgo(2),
      location: "Law Faculty Block",
      edited: false
    },
    engagement: {
      upvotes: 22,
      downvotes: 1,
      comments: [],
      shares: 3,
      saves: 8,
      reposts: 0
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "Slim-Fit Black Corporate Law Suit Set",
      price: 35000,
      condition: "Used",
      category: "fashion",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "5h",
    author: {
      anonymous: false,
      name: "Victory I.",
      faculty: "Sciences",
      department: "Microbiology",
      level: "300",
      rating: 4.5,
      totalSales: 4,
      hostel: null
    },
    content: {
      text: "Urgent bedspace allocation setup available inside a spacious off-campus self-con apartment at the Back Gate. Self-con has a steady water pumping system, functional security gates, and a personal pre-paid meter already configured.",
      images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop"],
      tags: ["hostels", "bedspace", "accommodation", "rent"]
    },
    meta: {
      createdAt: daysAgo(3),
      location: "RSU Back Gate Area",
      edited: false
    },
    engagement: {
      upvotes: 45,
      downvotes: 2,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Samuel", department: "Biochemistry" },
          text: "Is the price covering total rent or just for one semester?",
          createdAt: daysAgo(2),
          engagement: { upvotes: 5, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 38,
      saves: 52,
      reposts: 19
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "Off-Campus Self-Con Bedspace Rental",
      price: 120000,
      condition: "Used",
      category: "hostels",
      negotiable: false
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "6h",
    author: {
      anonymous: false,
      name: "Precious O.",
      faculty: "Management Sciences",
      department: "Business Admin",
      level: "400",
      rating: 5.0,
      totalSales: 143,
      hostel: "Main Hostel Block A"
    },
    content: {
      text: "Wholesale provision bundle box directly from the wholesale market! Contains 1 full carton of Indomie Hungry Man size, 1 pack of Milo refill (400g), 1 tin of Dano powdered milk, and half a crate of eggs. Perfect survival stack.",
      images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"],
      tags: ["provisions", "indomie", "food", "bundle"]
    },
    meta: {
      createdAt: minsAgo(2),
      location: "Shopping Complex Junction",
      edited: false
    },
    engagement: {
      upvotes: 72,
      downvotes: 0,
      comments: [],
      shares: 14,
      saves: 29,
      reposts: 8
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "End-of-Month Student Provisions Bundle Box",
      price: 24500,
      condition: "New",
      category: "food",
      negotiable: false
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "8h",
    author: {
      anonymous: false,
      name: "Tunde W.",
      faculty: "Sciences",
      department: "Computer Science",
      level: "400",
      rating: 4.7,
      totalSales: 21,
      hostel: "Off-Campus (Agip)"
    },
    content: {
      text: "HP EliteBook 840 G5 laptop. Intel Core i5 8th Gen, 8GB DDR4 RAM, 256GB NVMe SSD. Ultra-slim aluminum chassis, responsive fingerprint scanner, and backlit keyboard configuration. Clean battery backup tracking around 4 hours active use.",
      images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop"],
      tags: ["hp", "laptop", "gadgets", "coding"]
    },
    meta: {
      createdAt: minsAgo(15),
      location: "Science Faculty Lab",
      edited: false
    },
    engagement: {
      upvotes: 18,
      downvotes: 0,
      comments: [],
      shares: 2,
      saves: 13,
      reposts: 1
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "HP EliteBook 840 G5 Core i5",
      price: 185000,
      condition: "Used",
      category: "gadgets",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "10h",
    author: {
      anonymous: false,
      name: "Kelechi A.",
      faculty: "Engineering",
      department: "Mechanical Eng",
      level: "300",
      rating: 4.9,
      totalSales: 67,
      hostel: "NDDC Block B"
    },
    content: {
      text: "Professional UI/UX Design and Frontend Coding Services. I construct premium web application mockups, pixel-perfect layouts using Tailwind CSS, and resolve complex navigation or layout routing bugs inside your project dashboards. DM for pricing timelines.",
      images: ["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"],
      tags: ["uiux", "coding", "services", "freelance"]
    },
    meta: {
      createdAt: hoursAgo(3),
      location: "Engineering Library Hub",
      edited: true
    },
    engagement: {
      upvotes: 39,
      downvotes: 1,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Boma", department: "Civil Eng" },
          text: "Can you assist with a React Native layout adjustment?",
          createdAt: minsAgo(25),
          engagement: { upvotes: 1, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 19,
      saves: 34,
      reposts: 11
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "Premium Digital Brand Interface Mockup & Frontend Services",
      price: 15000,
      condition: "New",
      category: "services",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "12h",
    author: {
      anonymous: false,
      name: "Blessing N.",
      faculty: "Humanities",
      department: "English",
      level: "200",
      rating: 4.4,
      totalSales: 3,
      hostel: "NDDC Block A"
    },
    content: {
      text: "Panasonic Digital Microwave Oven (20L). Perfect working condition, multiple heat settings configuration, timer features functional. Clean turntable tray. Ideal for quickly warming up hostel food plates during exams.",
      images: ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=600&auto=format&fit=crop"],
      tags: ["microwave", "appliances", "cooking", "hostel"]
    },
    meta: {
      createdAt: daysAgo(2),
      location: "NDDC Female Hostel B",
      edited: false
    },
    engagement: {
      upvotes: 12,
      downvotes: 2,
      comments: [],
      shares: 1,
      saves: 7,
      reposts: 0
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "Panasonic 20L Digital Countertop Microwave Oven",
      price: 42000,
      condition: "Used",
      category: "appliances",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "1d",
    author: {
      anonymous: false,
      name: "David O.",
      faculty: "Sciences",
      department: "Computer Science",
      level: "400",
      rating: 4.9,
      totalSales: 35,
      hostel: "NDDC Block B"
    },
    content: {
      text: "Nike Air Max 270 (Triple Black, Size 44). Complete pristine air bubbles, soles are thoroughly intact with clean treading. Lightweight, stylish, and incredibly comfortable for long walking treks across the campus avenues.",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"],
      tags: ["sneakers", "nike", "fashion", "kicks"]
    },
    meta: {
      createdAt: hoursAgo(2),
      location: "RSU Convocation Arena Parking",
      edited: false
    },
    engagement: {
      upvotes: 28,
      downvotes: 0,
      comments: [],
      shares: 5,
      saves: 18,
      reposts: 2
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "Nike Air Max 270 Triple Black Size 44",
      price: 55000,
      condition: "Used",
      category: "fashion",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "market",
    time: "5m",
    author: {
      anonymous: false,
      name: "David O.",
      faculty: "Sciences",
      department: "Computer Science",
      level: "400",
      rating: 4.9,
      totalSales: 34,
      hostel: "NDDC Block B"
    },
    content: {
      text: "Fairly used UK-spec MacBook Pro 2019 for sale. Core i7, 16GB RAM, 512GB SSD. Battery cycle count is clean. Perfect for tech students or creators moving into programming.",
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop"],
      tags: ["macbook", "laptop", "tech", "sale"]
    },
    meta: {
      createdAt: daysAgo(1),
      location: "RSU Main Campus",
      edited: false
    },
    engagement: {
      upvotes: 24,
      downvotes: 1,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Kelechi", department: "Mechanical Eng" },
          text: "Last price? Drop your WhatsApp contact.",
          createdAt: hoursAgo(5),
          engagement: { upvotes: 2, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 3,
      saves: 14,
      reposts: 2
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "MacBook Pro 16-inch 2019 Space Gray",
      price: 420000,
      condition: "Used",
      category: "Gadgets",
      negotiable: true
    },
    theme: {
      bg: "bg-emerald/10",
      text: "text-emerald",
      glow: "glow-emerald",
      border: "border-emerald/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "gist",
    time: "45m",
    author: {
      anonymous: true,
      name: "GistMaster",
      faculty: "Management Sciences",
      department: "Accountancy",
      level: "300",
      rating: 0,
      totalSales: 0,
      hostel: null
    },
    content: {
      text: "Who else noticed the massive queue at the portal registration center today? They said the server went down again right when final-year clearance processing started.",
      images: [],
      tags: ["Portal", "Clearance", "RSU"]
    },
    meta: {
      createdAt: minsAgo(50),
      location: "Admin Block",
      edited: false
    },
    engagement: {
      upvotes: 89,
      downvotes: 4,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Tari", department: "Medical Sciences" },
          text: "I stood there for 3 hours just to update my profile picture. Demanding offline documents for an automated system makes no sense.",
          createdAt: minsAgo(10),
          engagement: { upvotes: 15, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 12,
      saves: 5,
      reposts: 8
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    theme: {
      bg: "bg-lavender",
      text: "text-lavender",
      glow: "glow-lavender",
      border: "border-lavender/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "confession",
    time: "2h",
    author: {
      anonymous: true,
      name: "Phantom",
      faculty: "Law",
      department: "Jurisprudence",
      level: "400",
      rating: 0,
      totalSales: 0,
      hostel: null
    },
    content: {
      text: "I accidentally submitted my project draft file containing my raw coding notes instead of the structured academic analysis document to my external supervisor. He hasn't called me yet, and I am losing my mind.",
      images: [],
      tags: ["Confession", "ProjectPanic", "FinalYear"]
    },
    meta: {
      createdAt: hoursAgo(9),
      location: "Off-Campus",
      edited: false
    },
    engagement: {
      upvotes: 112,
      downvotes: 2,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Precious", department: "Criminology" },
          text: "Just walk up to his office early tomorrow morning and say you uploaded the uncompiled file by mistake before he actually reads it!",
          createdAt: hoursAgo(3),
          engagement: { upvotes: 34, downvotes: 1, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 1,
      saves: 8,
      reposts: 0
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    theme: {
      bg: "bg-rose/10",
      text: "text-rose",
      glow: "glow-rose",
      border: "border-rose/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "music",
    time: "4h",
    author: {
      anonymous: false,
      name: "DJ Vibez",
      faculty: "Humanities",
      department: "Theater Arts",
      level: "200",
      rating: 4.5,
      totalSales: 8,
      hostel: "Main Hostel"
    },
    content: {
      text: "Just dropped a live Afro-fusion instrumental mix recorded directly during the campus faculty week show. Pure nostalgia vibes mixed with new-school rhythms.",
      images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop"],
      tags: ["Afrobeats", "Mixtape", "FacultyWeek"]
    },
    meta: {
      createdAt: minsAgo(2),
      location: "Ampitheater",
      edited: true
    },
    engagement: {
      upvotes: 45,
      downvotes: 3,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Boma", department: "English" },
          text: "That transitions track at 12:40 was insane! Pure talent.",
          createdAt: minsAgo(1),
          engagement: { upvotes: 5, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 19,
      saves: 22,
      reposts: 7
    },
    userInteraction: { voteStatus: "up", saved: true, reposts: false },
    theme: {
      bg: "bg-fuchsia/10",
      text: "text-fuchsia",
      glow: "glow-fuchsia",
      border: "border-fuchsia/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "politics",
    time: "6h",
    author: {
      anonymous: false,
      name: "Comrade Victor",
      faculty: "Social Sciences",
      department: "Political Science",
      level: "400",
      rating: 0,
      totalSales: 0,
      hostel: "Off-Campus"
    },
    content: {
      text: "The SUG executive committee is holding an open-floor deliberation tomorrow regarding the sudden hike in off-campus shuttle transport rates. Every student leader needs to be present.",
      images: [],
      tags: ["SUG", "Transport", "StudentWelfare"]
    },
    meta: {
      createdAt: daysAgo(2),
      location: "SUG Secretariat",
      edited: false
    },
    engagement: {
      upvotes: 132,
      downvotes: 18,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Austin", department: "Law" },
          text: "Please look into the security aspects at the back gate too. The lighting there is completely dead at night.",
          createdAt: hoursAgo(23),
          engagement: { upvotes: 28, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 40,
      saves: 11,
      reposts: 31
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    theme: {
      bg: "bg-amber/10",
      text: "text-amber",
      glow: "glow-amber",
      border: "border-amber/20"
    }
  },
  {
    id: `rsu-verse-${Crypto.randomUUID()}`,
    verse: "relationship",
    time: "1d",
    author: {
      anonymous: true,
      name: "CupidArrow",
      faculty: "Science",
      department: "Biochemistry",
      level: "300",
      rating: 0,
      totalSales: 0,
      hostel: null
    },
    content: {
      text: "Shoutout to the guy in the Faculty of Engineering library who shared his laptop charger with me yesterday when my battery died during revision. I forgot to ask for your handle!",
      images: [],
      tags: ["LibraryLove", "LostFound", "RSUCRUSH"]
    },
    meta: {
      createdAt: minsAgo(26),
      location: "Engineering Library",
      edited: false
    },
    engagement: {
      upvotes: 210,
      downvotes: 5,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Chinedu", department: "Electrical Eng" },
          text: "Was he wearing a black hoodie with a 'TrustLock' logo? If yes, that's probably my tech partner haha.",
          createdAt: minsAgo(9),
          engagement: { upvotes: 42, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 15,
      saves: 30,
      reposts: 12
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    theme: {
      bg: "bg-pink/10",
      text: "text-pink",
      glow: "glow-pink",
      border: "border-pink/20"
    }
  }
];

export function AppProvider({ children }) {
  // Navigation / Navigation Context States
  const [posts, setPosts] = useState(campusFeed);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("/");
  const [recents, setRecents] = useState([]);
  const [search, setSearch] = useState("");

  // Profile management sub-system states
  const [selectedTheme, setSelectedTheme] = useState("Dark");
  const [isSellerActive, setIsSellerActive] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorActive, setTwoFactorActive] = useState(false);
  const [biometricsActive, setBiometricsActive] = useState(true);

  // Privacy metrics
  const [anonymousDefault, setAnonymousDefault] = useState(true);
  const [hideDetails, setHideDetails] = useState(false);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);

  // Notification configuration variables
  const [pushMaster, setPushMaster] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [socialAlerts, setSocialAlerts] = useState(true);
  const [confessionAlerts, setConfessionAlerts] = useState(false);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [verseAlerts, setVerseAlerts] = useState(true);

  // App Utilities / Identity states
  const [searchQuery, setSearchQuery] = useState("");
  const [bio, setBio] = useState("Coffee addict...");
  const [username, setUsername] = useState("@chris_igwe");
  const [displayName, setDisplayName] = useState("Christopher Igwe");

  // Support / Customer Relations Desk
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const simulateNetworkSync = () => new Promise((resolve) => setTimeout(resolve, 600));

 
  const SIMULATE_NETWORK_FAILURE = false;

const handleUpvote = async (postId) => {

    const backupPosts = JSON.parse(JSON.stringify(posts));


    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id === postId) {
        const currentStatus = post.userInteraction.voteStatus;
        const isUpvoted = currentStatus === 'up';
        const isDownvoted = currentStatus === 'down';
        let upvoteAdjustment = isUpvoted ? -1 : 1;
        let downvoteAdjustment = isDownvoted ? -1 : 0;
        return {
          ...post,
          engagement: {
            ...post.engagement,
            upvotes: Math.max(0, post.engagement.upvotes + upvoteAdjustment),
            downvotes: Math.max(0, post.engagement.downvotes + downvoteAdjustment),
          },
          userInteraction: {
            ...post.userInteraction,
            voteStatus: isUpvoted ? null : 'up'
          }
        };
      }
      return post;
    }));

    
    try {
      await simulateNetworkSync();
      if (SIMULATE_NETWORK_FAILURE) throw new Error("Simulated backend crash");
      // Success! UI stays exactly as modified.
    } catch (error) {
      console.warn("Local Engine: Rollback triggered successfully.", error);
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't sync your upvote right now.");
    }
  };

  const handleDownvotes = async (postId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const currentStatus = post.userInteraction.voteStatus;
      const isUpvoted = currentStatus === 'up';
      const isDownvoted = currentStatus === 'down';
      let downvoteAdjustment = isDownvoted ? -1 : 1;
      let upvoteAdjustment = isUpvoted ? -1 : 0;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          upvotes: Math.max(0, post.engagement.upvotes + upvoteAdjustment),
          downvotes: Math.max(0, post.engagement.downvotes + downvoteAdjustment)
        },
        userInteraction: {
          ...post.userInteraction,
          voteStatus: isDownvoted ? null : 'down'
        }
      };
    }));

    try {
      await simulateNetworkSync();
      if (SIMULATE_NETWORK_FAILURE) throw new Error();
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Connection Lost", "We couldn't register your vote choice.", error);
    }
  };

  const handleRepost = async (postId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const hasReposted = post.userInteraction?.reposts === true;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          reposts: hasReposted ? Math.max(0, post.engagement.reposts - 1) : post.engagement.reposts + 1
        },
        userInteraction: {
          ...post.userInteraction,
          reposts: !hasReposted
        }
      };
    }));

    try {
      await simulateNetworkSync();
      if (SIMULATE_NETWORK_FAILURE) throw new Error();
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Network Error", "Unable to forward broadcast metrics.", error);
    }
  };

  const handleSave = async (postId) => {
    const backupPosts = JSON.parse(JSON.stringify(posts));

    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const hasSaved = post.userInteraction.saved === true;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          saves: Math.max(0, hasSaved ? post.engagement.saves - 1 : post.engagement.saves + 1)
        },
        userInteraction: {
          ...post.userInteraction,
          saved: !hasSaved
        }
      };
    }));

    try {
      await simulateNetworkSync();
      if (SIMULATE_NETWORK_FAILURE) throw new Error();
    } catch (error) {
      setPosts(backupPosts);
      Alert.alert("Storage Alert", "Could not synchronize bookmark location tracking.", error);
    }
  };

  const handleShare = async (postId) => {
    try {
      await Share.share({
        message: `Check out this broadcast on Verse: verse://post/${postId}`,
      });
    } catch (error) {
      Alert.alert("Sharing Error", error.message);
    }
  };

  const handleSubmitSupport = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (selectedTopic && message) {
      setIsSubmitted(true);
    }
  };

  
  const matchingPosts = posts.filter((post) => {
    if (!post || post.verse === 'market') return false;
    const query = search.toLowerCase().trim();
    if (!query) return false;

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

  let filteredPosts = posts.filter((post) => {
    if (activeFilter === "all" || activeFilter === "new") {
      return post.verse !== "market";
    }
    return post.verse === activeFilter;
  });

  if (activeFilter === "new") {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    filteredPosts = filteredPosts
      .filter((post) => {
        const postTime = new Date(post.meta.createdAt).getTime();
        return (Date.now() - postTime) < ONE_DAY;
      })
      .sort((a, b) => {
        const timeA = new Date(a.meta.createdAt).getTime();
        const timeB = new Date(b.meta.createdAt).getTime();
        const scoreA = a.engagement.upvotes + (a.engagement.comments?.length || 0);
        const scoreB = b.engagement.upvotes + (b.engagement.comments?.length || 0);
        if (scoreA !== scoreB) return scoreB - scoreA;
        return timeB - timeA;
      });
  }

  return (
    <AppContext.Provider
      value={{
        posts, setPosts,
        activeFilter, setActiveFilter,
        activeTab, setActiveTab,
        recents, setRecents,
        search, setSearch,
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
        handleUpvote,
        handleDownvotes,
        handleRepost,
        handleSave,
        handleShare,
        handleSubmitSupport,
        matchingPosts,
        filteredPosts
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be executed cleanly within an AppProvider wrapper');
  }
  return context;
}