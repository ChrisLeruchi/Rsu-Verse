import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Share, Alert, View, Text, } from 'react-native';
import { HeaderLayout } from './src/components/navigation/HeaderLayout';
import { Feed } from './src/components/feed/Feed';
import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, ShoppingBag } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Crypto from 'expo-crypto';
import { NavBar } from './src/components/navigation/NavBar';
import { Market } from './src/components/market/Market';
import { PostDetail } from './src/assets/PostDetail';
import { CreatePost } from './src/components/create/CreatePost';
import { SearchPage } from './src/components/search/SearchPage';
import { SearchFeed } from './src/components/search/SearchFeed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function ProfileScreenPlaceholder() {
  return (
    <View style={placeholderStyles.centerContainer}>
      <Text style={placeholderStyles.text}>Profile Screen (Empty for now)</Text>
    </View>
  );
}

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
      createdAt: "2026-06-10T18:18:00Z",
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
    time: "45m",
    author: {
      anonymous: false,
      name: "Tari B.",
      faculty: "Management Sciences",
      department: "Accountancy",
      level: "300",
      rating: 4.9,
      totalSales: 42,
      hostel: "NDDC Block B"
    },
    content: {
      text: "Nexus Compact Mini Fridge (50L capacity). Extremely energy-efficient, gets cold very fast and retains freezing even hours after a power outage. Clean interior with zero rust. Perfect size for hostel rooms.",
      images: ["https://images.unsplash.com/photo-1571175452281-014d7e357ab9?q=80&w=600&auto=format&fit=crop"],
      tags: ["nexus", "fridge", "appliances", "hostel"]
    },
    meta: {
      createdAt: "2026-06-10T17:45:00Z",
      location: "NDDC Female Hostel",
      edited: false
    },
    engagement: {
      upvotes: 31,
      downvotes: 1,
      comments: [
        {
          id: Crypto.randomUUID(),
          author: { name: "Amaka", department: "Marketing" },
          text: "Can I come check it out tomorrow morning?",
          createdAt: "2026-06-10T18:05:00Z",
          engagement: { upvotes: 2, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
        }
      ],
      shares: 8,
      saves: 25,
      reposts: 3
    },
    userInteraction: { voteStatus: null, saved: false, reposts: false },
    marketPlace: {
      description: "Nexus 50L Compact Mini Fridge",
      price: 95000,
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
      createdAt: "2026-06-10T16:30:00Z",
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
      createdAt: "2026-06-10T15:30:00Z",
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
      createdAt: "2026-06-10T13:30:00Z",
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
          createdAt: "2026-06-10T14:15:00Z",
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
      createdAt: "2026-06-10T12:30:00Z",
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
      createdAt: "2026-06-10T10:30:00Z",
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
      createdAt: "2026-06-10T08:30:00Z",
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
          createdAt: "2026-06-10T09:45:00Z",
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
      createdAt: "2026-06-10T06:30:00Z",
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
      createdAt: "2026-06-09T18:30:00Z",
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
      createdAt: "2026-06-10T11:45:00Z",
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
          createdAt: "2026-06-10T12:00:00Z",
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
      createdAt: "2026-06-10T10:30:00Z",
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
          createdAt: "2026-06-10T10:45:00Z",
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
      createdAt: "2026-06-10T09:15:00Z",
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
          createdAt: "2026-06-10T09:30:00Z",
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
      createdAt: "2026-06-10T07:00:00Z",
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
          createdAt: "2026-06-10T07:22:00Z",
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
      createdAt: "2026-06-10T05:10:00Z",
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
          createdAt: "2026-06-10T05:40:00Z",
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
      createdAt: "2026-06-09T14:20:00Z",
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
          createdAt: "2026-06-09T15:10:00Z",
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

const getVerseIcon = (verse) => {
  switch (verse) {
    case "market": return <ShoppingBag size={18} color='#00BA34' />;
    case "gist": return <MessagesSquare size={18} color='#00BA34' />;
    case "confession": return <Flame size={18} color='#F59E0B' />;
    case "music": return <Music size={18} color='#00BA34' />;
    case "politics": return <Landmark size={18} color='#00BA34' />;
    case "relationship": return <HeartHandshake size={18} color='#00BA34' />;
    default: return <MessagesSquare size={18} color='#00BA34' />;
  }
};

function HomeStackNavigator({ filteredPosts, activeFilter, setActiveFilter, handleUpvote, handleDownvotes, handleRepost, handleSave, handleShare, handlePlusClick }) {
  return (
    <View style={styles.appContainer}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaHeader}>
        <HeaderLayout
          activeFilter={activeFilter === "all" ? "home" : activeFilter}
          setActiveFilter={(tab) => {
            if (tab === "home") setActiveFilter("all");
            else setActiveFilter(tab);
          }}
        />
      </SafeAreaView>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeFeed'>
          {(props) => (
            <Feed
              {...props}
              posts={filteredPosts}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              handleUpvote={handleUpvote}
              handleDownvotes={handleDownvotes}
              handleRepost={handleRepost}
              handleSave={handleSave}
              handleShare={handleShare}
              onPlusClick={handlePlusClick}
              getVerseIcon={getVerseIcon}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}

function Search({ setActiveFilter, recents, setRecents, search, setSearch, matchingPosts, navigation, getVerseIcon }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SearchPage'>
        {(props) => (
          <SearchPage
            {...props}
            setActiveFilter={setActiveFilter}
            recents={recents}
            setRecents={setRecents}
            search={search}
            setSearch={setSearch}
            matchingPosts={matchingPosts}
            getVerseIcon={getVerseIcon}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function MarketPlace({ posts }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MarketPlace'>
        {(props) => (
          <Market
            {...props}
            posts={posts}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function CommentSection({ posts, setPosts, handleSave, handleRepost, handleDownvotes, handleUpvote, handleCommentUpvote, getVerseIcon, route }) {
  const { postId } = route.params || {};

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='PostDetail'>
        {(props) => (
          <PostDetail
            {...props}
            postId={postId}
            posts={posts}
            setPosts={setPosts}
            handleSave={handleSave}
            handleRepost={handleRepost}
            handleDownvotes={handleDownvotes}
            handleUpvote={handleUpvote}
            getVerseIcon={getVerseIcon}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
function SFeed({ posts, handleSave, handleRepost,
  handleUpvote, handleDownvotes, getVerseIcon,
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Search_feed'>
        {(props) => (
          <SearchFeed
            {...props}
            posts={posts}
            handleSave={handleSave}
            handleRepost={handleRepost}
            handleDownvotes={handleDownvotes}
            handleUpvote={handleUpvote}
            getVerseIcon={getVerseIcon}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function PostCreation({ setPosts, setActiveFilter }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='CreatePage'>
        {(props) => (
          <CreatePost
            {...props}
            setPosts={setPosts}
            setActiveFilter={setActiveFilter}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
export default function App() {
  const [posts, setPosts] = useState(campusFeed);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("/");
  const [recents, setRecents] = useState([]);
  const [search, setSearch] = useState("");


  const matchingPosts = posts.filter((post) => {
    if (post.verse === 'market') return false;

    const query = search.toLowerCase().trim();

    if (!query) return true;

    const matchesText = post.content?.text?.toLowerCase().includes(query);
    const matchesAuthor = post.content?.faculty?.toLowerCase().includes(query);

    const matchesVerse = post.verse.toLowerCase().includes(query)

    const matchesTags = Array.isArray(post.content?.tags) && post.content.tags.some(tag =>
      typeof tag === 'string' && tag.toLowerCase().includes(query)
    );

    return matchesText || matchesAuthor || matchesTags || matchesVerse;
  })

  const handlePlusClick = (navigation) => {
    setActiveFilter("plus");
    if (navigation) navigation.navigate("CreatePost");
  };

  const handleUpvote = (postId) => {
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
            upvotes: post.engagement.upvotes + upvoteAdjustment,
            downvotes: post.engagement.downvotes + downvoteAdjustment,
          },
          userInteraction: {
            ...post.userInteraction,
            voteStatus: isUpvoted ? null : 'up'
          }
        };
      }
      return post;
    }));
  };

  const handleDownvotes = (postId) => {
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
          upvotes: post.engagement.upvotes + upvoteAdjustment,
          downvotes: post.engagement.downvotes + downvoteAdjustment
        },
        userInteraction: {
          ...post.userInteraction,
          voteStatus: isDownvoted ? null : 'down'
        }
      };
    }));
  };

  const handleRepost = (postId) => {
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
  };

  const handleSave = (postId) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;
      const hasSaved = post.userInteraction.saved === true;
      return {
        ...post,
        engagement: {
          ...post.engagement,
          saves: hasSaved ? post.engagement.saves - 1 : post.engagement.saves + 1
        },
        userInteraction: {
          ...post.userInteraction,
          saved: !hasSaved
        }
      };
    }));
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
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <View style={styles.appContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#121212" />
          <Tab.Navigator
            tabBar={(props) => {

              const { routes, index } = props.state;
              const currentRouteName = routes[index].name;


              if (currentRouteName === 'Comments' ||
                currentRouteName === 'CreatePost' ||
                currentRouteName === 'Search'
              ) {
                return null;
              }


              return (
                <NavBar
                  {...props}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  setActiveFilter={setActiveFilter}
                  handlePlusClick={() => handlePlusClick(props.navigation)}
                />
              );
            }}
            screenOptions={{ headerShown: false }}
          >
            <Tab.Screen name="HomeIndex">
              {(props) => (
                <HomeStackNavigator
                  filteredPosts={filteredPosts}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  handleUpvote={handleUpvote}
                  handleDownvotes={handleDownvotes}
                  handleRepost={handleRepost}
                  handleSave={handleSave}
                  handleShare={handleShare}
                  handlePlusClick={() => handlePlusClick(props.navigation)}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name='Comments'>
              {(props) => (
                <CommentSection
                  {...props}
                  posts={posts}
                  setPosts={setPosts}
                  handleSave={handleSave}
                  handleRepost={handleRepost}
                  handleDownvotes={handleDownvotes}
                  handleUpvote={handleUpvote}
                  getVerseIcon={getVerseIcon}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name='CreatePost'>
              {(props) => (
                <PostCreation
                  {...props}
                  setPosts={setPosts}
                  setActiveFilter={setActiveFilter}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name='Search'>
              {(props) => (
                <Search
                  {...props}
                  setActiveFilter={setActiveFilter}
                  recents={recents}
                  setRecents={setRecents}
                  search={search}
                  setSearch={setSearch}
                  matchingPosts={matchingPosts}

                  getVerseIcon={getVerseIcon}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name='Search_feed'>
              {(props) => (
                <SearchFeed
                  {...props}
                  posts={posts}
                  handleSave={handleSave}
                  handleRepost={handleRepost}
                  handleDownvotes={handleDownvotes}
                  handleUpvote={handleUpvote}
                  getVerseIcon={getVerseIcon}
                />
              )}
            </Tab.Screen>


            <Tab.Screen name="Profile" component={ProfileScreenPlaceholder} />
            <Tab.Screen name="Market">
              {(props) => (
                <MarketPlace
                  posts={posts}
                />
              )}
            </Tab.Screen>

          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#121212',
    flexDirection: 'column',
    gap: 60
  },
  safeAreaHeader: {
    zIndex: 100,
    backgroundColor: '#121212',
  }
});


const placeholderStyles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 16,
    fontWeight: '500',
  }
});