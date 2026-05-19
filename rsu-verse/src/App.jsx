import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HeaderLayout } from './components/navigation/HeaderLayout';
import './index.css'
import { Feed } from './components/feed/Feed';
import { NavBar } from './components/navigation/NavBar';
import { ShoppingBag } from 'lucide-react';

const campusFeed = [
  {
    id: `rsu-verse-${crypto.randomUUID()}`,
    verse: "market",
    time: "15m",
    icon: <ShoppingBag size={15} />,
    author: {
      anonymous: true,
      name: "Chris L",
      faculty: "Engineering",
      department: "Comp Eng",
      level: "500",
      rating: 4.7,
      totalSales: 13,
      hostel: null
    },
    content: {
      text: "Clean Oraimo Freepods 4. Used for just 3 weeeks. Battery health 100%. DM if interested.",
      images: [],
      tags: ["earbuds", "oraimo", "sale"]
    },
    meta: {
      createdAt: "2026-05-18t12:30:00Z",
      location: "RSU",
      edited: false
    },
    engagement: {
      upvotes: 5,
      downvotes: 0,
      comments: 2,
      shares: 0,
      saves: 1,
      reposts: 0
    },
    userInteraction: {
      voteStatus: null,
      saved: false
    },
    marketPlace: {
      price: 18000,
      condition: "Used",
      category: "Gadgets",
      negotiable: true
    },
    theme: {
      bg: "bg-cyan/10",
      text: "text-cyan",
      glow: "glow-cyan",
      border: "border-cyan/20"
    }
  }
]

const pulseStories = [
  {
    id: crypto.randomUUID(),
    location: "Hostel C",
    active: true
  },
  {
    id: crypto.randomUUID(),
    location: "LT",
    active: true
  },
  {
    id: crypto.randomUUID(),
    location: "Back Gate",
    active: false
  },
]

function App() {
  const [posts, setPosts] = useState(campusFeed);
  const [stories, setStories] = useState(pulseStories)
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const handlePlusClick = () => {
    setActiveFilter("plus")
    navigate("/plus")
  }

  const filteredPosts = posts.filter((post) => activeFilter === "all" || post.verse === activeFilter)


const handleUpvote = (postId) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id === postId) {
        const currentStatus = post.userInteraction.voteStatus;
        const isUpvoted = currentStatus === 'up';
        const isDownvoted = currentStatus === 'down';

        // Clean calculations supporting switches between upvote and downvote
        let upvoteAdjustment = isUpvoted ? -1 : 1;
        let downvoteAdjustment = isDownvoted ? -1 : 0;

        return {
          ...post,
          engagement: {
            ...post.engagement, // Keeps downvotes, comments, shares, saves, reposts intact
            upvotes: post.engagement.upvotes + upvoteAdjustment,
            downvotes: post.engagement.downvotes + downvoteAdjustment,
          },
          userInteraction: {
            ...post.userInteraction,
            voteStatus: isUpvoted ? null : 'up'
          }
        }
      }
      return post;
    }))    
  }
console.log(posts)

  return (
    <>
      <Routes>
        <Route
          element={
            <HeaderLayout
              activeFilter={activeFilter === "all"
                ? "home"
                : activeFilter}
              setActiveFilter={(tab) => {
                if (tab === "home") setActiveFilter("all");
                else setActiveFilter(tab)
              }}
              handlePlusClick={handlePlusClick}
            />
          }
        >
          <Route
            index
            element={
              <Feed
                posts={filteredPosts}
                setPosts={setPosts}
                stories={stories}
                setStories={setStories}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                handleUpvote={handleUpvote}
              />} />


          <Route path="/market" element={<div className="p-6 text-xs font-mono text-white/40">Marketplace Frame Ready.</div>} />
          <Route path="/user" element={<div className="p-6 text-xs font-mono text-white/40">User Profile Frame Ready.</div>} />
          <Route path="/notifications" element={<div className="p-6 text-xs font-mono text-white/40">Notifications Frame Ready.</div>} />
          <Route path="/menu" element={<div className="p-6 text-xs font-mono text-white/40">Menu Settings Frame Ready.</div>} />
        </Route>
        <Route
          path="/plus"
          element={
            <div className="min-h-screen bg-ink p-8 flex flex-col justify-between">
              <div className="text-sm font-mono text-rose">Transmission Engine Initialization Block.</div>
              <button onClick={() => { setActiveFilter("home"); navigate("/"); }} className="text-xs text-white/40 text-left underline">Abort Stream</button>
            </div>
          }
        />
      </Routes>

      <NavBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        handlePlusClick={handlePlusClick}
      />
    </>
  )
}

export default App
