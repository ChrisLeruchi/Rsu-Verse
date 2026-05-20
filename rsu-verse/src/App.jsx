import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HeaderLayout } from './components/navigation/HeaderLayout';
import './index.css'
import { Feed } from './components/feed/Feed';
import { NavBar } from './components/navigation/NavBar';
import { CreatePost } from './components/create/CreatePost';

const campusFeed = [
  {
    id: `rsu-verse-${crypto.randomUUID()}`,
    verse: "market",
    time: "15m",
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
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFxOEeFB5-6G9trSnP1OzFordKWR2_unloBQ&s"],
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
      saves: 0,
      reposts: 0
    },
    userInteraction: {
      voteStatus: null,
      saved: false,
      reposts: false
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
  },
  {
    id: `rsu-verse-${crypto.randomUUID()}`,
    verse: "gist",
    time: "15m",
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
      text: "I saw what that Lecturer did.",
      images: [],
      tags: ["Gist", "anonymous", "sale"]
    },
    meta: {
      createdAt: "2026-05-18t12:30:00Z",
      location: "RSU",
      edited: false
    },
    engagement: {
      upvotes: 15,
      downvotes: 2,
      comments: 21,
      shares: 0,
      saves: 0,
      reposts: 0
    },
    userInteraction: {
      voteStatus: null,
      saved: false,
      reposts: false
    },
    theme: {
      bg: "bg-lavender",
      text: "text-lavender",
      glow: "glow-lavender",
      border: "border-lavender/20"
    }

  },
  {
    id: `rsu-verse-${crypto.randomUUID()}`,
    verse: "pulse",
    time: "15m",
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
      text: "The transformer for the faculty of engineering has been fixed",
      images: [],
      tags: ["News", "Important", "sale"]
    },
    meta: {
      createdAt: "2026-05-18t12:30:00Z",
      location: "RSU",
      edited: false
    },
    engagement: {
      upvotes: 50,
      downvotes: 10,
      comments: 11,
      shares: 0,
      saves: 0,
      reposts: 0
    },
    userInteraction: {
      voteStatus: null,
      saved: false,
      reposts: false
    },
    theme: {
      bg: "bg-rose",
      text: "text-rose",
      glow: "glow-rose",
      border: "border-rose/20"
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
 const [posts, setPosts] = useState(() => {
    const savedTransmissions = localStorage.getItem('rsu_verse_feed');
    if (savedTransmissions) {
      try {
        return JSON.parse(savedTransmissions);
      } catch (error) {
        console.error("Error parsing stored transmission data:", error);
        return campusFeed;
      }
    }
    return campusFeed;
  });
  const [stories, setStories] = useState(pulseStories)
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('rsu_verse_feed', JSON.stringify(posts));
  }, [posts]);

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
            ...post.engagement,
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
  const handleDownvotes = (postId) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;

      const currentStatus = post.userInteraction.voteStatus
      const isUpvoted = currentStatus === 'up';
      const isDownvoted = currentStatus === 'down'

      let downvoteAdjustment = isDownvoted ? -1 : 1
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
      }
    }))
  }
  const handleRepost = (postId) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;

      const hasReposted = post.userInteraction?.reposts === true;

      return {
        ...post,
        engagement: {
          ...post.engagement,
          reposts: hasReposted
            ? Math.max(0, post.engagement.reposts - 1)
            : post.engagement.reposts + 1
        },
        userInteraction: {
          ...post.userInteraction,
          reposts: !hasReposted
        }
      }
    }))
  }
  const handleSave = (postId) => {
    setPosts((prevPosts) => prevPosts.map((post) => {
      if (post.id !== postId) return post;

      const hasSaved = post.userInteraction.saved === true;

      console.log(post.engagement.saves)
      return {
        ...post,
        engagement: {
          ...post.engagement,
          saves: hasSaved
            ? post.engagement.saves - 1
            : post.engagement.saves + 1
        },
        userInteraction: {
          ...post.userInteraction,
          saved: !hasSaved
        }
      }
    }))
  }
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
                handleDownvotes={handleDownvotes}
                handleRepost={handleRepost}
                handleSave={handleSave}
              />} />


          <Route path="/market" element={<div className="p-6 text-xs font-mono text-white/40">Marketplace Frame Ready.</div>} />
          <Route path="/user" element={<div className="p-6 text-xs font-mono text-white/40">User Profile Frame Ready.</div>} />
          <Route path="/notifications" element={<div className="p-6 text-xs font-mono text-white/40">Notifications Frame Ready.</div>} />
          <Route path="/menu" element={<div className="p-6 text-xs font-mono text-white/40">Menu Settings Frame Ready.</div>} />
        </Route>
        <Route
          path="/plus"
          element={
            <CreatePost setPosts={setPosts} />
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
