import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HeaderLayout } from './components/navigation/HeaderLayout';
import './index.css'
import { Feed } from './components/feed/Feed';
import { NavBar } from './components/navigation/NavBar';
import { CreatePost } from './components/create/CreatePost';
import { Market } from './components/market/Market';
import { ProfilePage } from './components/profile/ProfilePage';
import { SearchPage } from './components/search/SearchPage';
import { ManageProfile } from './components/profile/Manage-Profile/ManageProfile';
import { PasswordSecurity } from './components/profile/Password_Security/Security/PasswordSecurity';
import { Notification } from './components/profile/Notification/Notification';
import { Theme } from './components/profile/Theme/Theme';
import { PrivacySafety } from './components/profile/Password_Security/Security/Privacy/PrivacySafety';
import { AboutVerse } from './components/profile/AboutVerse/AboutVerse';
import { HelpCenter } from './components/profile/HelpCenter/HelpCenter';
import { ContactUs } from './components/profile/ContactUs/ContactUs';
import { Sun, Moon, MessagesSquare, HeartHandshake, Landmark, Music, Flame, ShoppingBag } from 'lucide-react';
import { SearchFeed } from './components/search/SearchFeed';
import { PostDetail } from './assets/PostDetail';

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
      text: "Oraimo Freepods 4.",
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
      comments: [],
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
      description: "Oraimo Freepods 4",
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
      comments: [{
        id: crypto.randomUUID(),
        author: { name: "Amina", department: "Law" },
        text: "Me too.",
        createdAt: "2026-05-30T10:00:00Z",
        engagement: {
          upvotes: 0,
          downvotes: 0,
          replies: [],
          shares: 0,
          saves: 0,
          reposts: 0
        }
      }
      ],
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
      comments: [{
        id: crypto.randomUUID(),
        author: { name: "Amina", department: "Law" },
        text: "I agree with this Information.",
        createdAt: "2026-05-30T10:00:00Z",
        engagement: {
          upvotes: 0,
          downvotes: 0,
          replies: [],
          shares: 0,
          saves: 0,
          reposts: 0
        }
      },
      {
        id: crypto.randomUUID(),
        author: { "name": "Tobi", "department": "Computer Science" },
        text: "Ah, yes! Bless you. I thought they've abandoned it completely.",
        createdAt: "2026-05-30T10:15:00Z",
        engagement: {
          upvotes: 0,
          downvotes: 0,
          replies: [],
          shares: 0,
          saves: 0,
          reposts: 0
        }
      }
      ],
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

const getVerseIcon = (verse) => {
  switch (verse) {
    case "market": return <ShoppingBag size={20} />
    case "gist": return <MessagesSquare size={20} />
    case "confession": return <Flame size={20} />
    case "music": return <Music size={20} />
    case "politics": return <Landmark size={20} />
    case "relationship": return <HeartHandshake size={20} />
    default: return <MessagesSquare size={20} />
  }
}

function App() {
  const [posts, setPosts] = useState(() => {
    const savedNetworkData = localStorage.getItem("campus_posts");
    return savedNetworkData ? JSON.parse(savedNetworkData) : campusFeed;
  });

  useEffect(() => {
    localStorage.setItem("campus_posts", JSON.stringify(posts));
  }, [posts]);

  const [stories, setStories] = useState(pulseStories)
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/")

  const handlePlusClick = () => {
    setActiveFilter("plus")
    navigate("/plus")
  }

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
        return (Date().now() - postTime) < ONE_DAY;
      })

      .sort((a, b) => {
        const timeA = new Date(a.meta.createdAt).getTime();
        const timeB = new Date(b.meta.createdAt).getTime();

        const scoreA = a.engagement.upvotes + a.engagement.comments;
        const scoreB = b.engagement.upvotes + b.engagement.comments;

        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }

        return timeB - timeA;
      });
  }


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
  const handleShare = (postId) => {
  const postUrl = `${window.location.origin}/post/${postId}`;
  navigator.clipboard.writeText(postUrl)
    .then(() => {
      // You can trigger a local toast message here later
      alert("Link copied to clipboard!"); 
    })
    .catch((err) => console.error("Could not copy link: ", err));
};
const handleCommentUpvote = (postId, commentId) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) => {
      if (post.id !== postId) return post;

      return {
        ...post,
        engagement: {
          ...post.engagement,
          comments: post.engagement.comments.map((comment) => {
            if (comment.id !== commentId) return comment;

            const currentStatus = comment.userInteraction?.voteStatus;
            const isUpvoted = currentStatus === 'up';
            const isDownvoted = currentStatus === 'down';

            let upvoteAdjustment = isUpvoted ? -1 : 1;
            let downvoteAdjustment = isDownvoted ? -1 : 0;

            return {
              ...comment,
              engagement: {
                ...comment.engagement,
                upvotes: (comment.engagement.upvotes || 0) + upvoteAdjustment,
                downvotes: (comment.engagement.downvotes || 0) + downvoteAdjustment,
              },
              userInteraction: {
                ...comment.userInteraction,
                voteStatus: isUpvoted ? null : 'up',
              },
            };
          }),
        },
      };
    })
  );
};

  const [isSellerActive, setIsSellerActive] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorActive, setTwoFactorActive] = useState(false);
  const [biometricsActive, setBiometricsActive] = useState(true);
  const [pushMaster, setPushMaster] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const [socialAlerts, setSocialAlerts] = useState(true);
  const [confessionAlerts, setConfessionAlerts] = useState(false);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [verseAlerts, setVerseAlerts] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("Dark");

  const Themes = [
    {
      id: crypto.randomUUID(),
      theme: "Light",
      icon: <Sun size={16} />
    },
    {
      id: crypto.randomUUID(),
      theme: "Dark",
      icon: <Moon size={16} />
    }
  ]

  const [anonymousDefault, setAnonymousDefault] = useState(true);
  const [hideDetails, setHideDetails] = useState(false);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);
  const currentYear = new Date().getFullYear();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const topics = [
    { id: "marketplace", label: "Marketplace & Orders" },
    { id: "account", label: "Account & Verification" },
    { id: "privacy", label: "Privacy & Reporting" },
    { id: "technical", label: "App Bugs & Feedback" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTopic && message) {
      setIsSubmitted(true);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [recents, setRecents] = useState([
    
  ]);

  const [search, setSearch] = useState("")

  const matchingPosts = posts.filter((post) => {
    const query = search.toLowerCase();
    const matchesText = post.content?.text?.toLowerCase().includes(query);
    const matchesAuthor = post.content?.faculty?.toLowerCase().includes(query);

    const matchesVerse = post.verse !== "market" ? post.verse.toLowerCase().includes(query) : ''

    const matchesTags = Array.isArray(post.content?.tags) && post.content.tags.some(tag =>
      typeof tag === 'string' && tag.toLowerCase().includes(query)
    );

    return matchesText || matchesAuthor || matchesTags || matchesVerse;
  })

  const handleAddComment = () => {
    return
  }

  return (
    <>
      <Routes>
        <Route
          element={
            <HeaderLayout
              isScrolled={isScrolled}
              isVisible={isVisible}
              lastScrollY={lastScrollY}
              setIsScrolled={setIsScrolled}
              setIsVisible={setIsVisible}
              setLastScrollY={setLastScrollY}
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
              <>
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
                  handleShare={handleShare}
                  handleSave={handleSave}
                  onPlusClick={handlePlusClick}
                  isVisible={isVisible}
                  setIsScrolled={setIsScrolled}
                  setIsVisible={setIsVisible}
                  setLastScrollY={setLastScrollY}
                  lastScrollY={lastScrollY}
                  getVerseIcon={getVerseIcon}
                  handleAddComment={handleAddComment}
                />

                <NavBar
                  activeTab={activeTab}
                  setActiveFilter={setActiveFilter}
                  handlePlusClick={handlePlusClick}
                />
              </>

            }
          />

        </Route>

        <Route
          path='/comments/:postId'
          element={
            <PostDetail
              posts={posts}
              setPosts={setPosts}
              handleSave={handleSave}
              handleRepost={handleRepost}
              handleDownvotes={handleDownvotes}
              handleUpvote={handleUpvote}
              handleCommentUpvote={handleCommentUpvote}
              getVerseIcon={getVerseIcon}
            />
          }
        />


        <Route
          path="/market"
          element={
            <>
              <Market posts={posts} />
              <NavBar
                activeTab={activeTab}
                setActiveFilter={setActiveFilter}
                handlePlusClick={handlePlusClick}
              />
            </>
          }
        />


        <Route
          path="/plus"
          element={
            <CreatePost
              setPosts={setPosts}
              setActiveFilter={setActiveFilter}
            />
          }
        />

        <Route
          path='/search'
          element={
            <>
              <SearchPage
                setActiveFilter={setActiveFilter}
                recents={recents}
                setRecents={setRecents}
                posts={posts}
                search={search}
                setSearch={setSearch}
                matchingPosts={matchingPosts}
                getVerseIcon={getVerseIcon}
              />
              <NavBar
                activeTab={activeTab}
                setActiveFilter={setActiveFilter}
                handlePlusClick={handlePlusClick}
              />
            </>
          }
        />

        <Route
          path='/search_feed'
          element={
            <>
              <SearchFeed
                posts={posts}
                getVerseIcon={getVerseIcon}
                handleSave={handleSave}
                handleRepost={handleRepost}
                handleUpvote={handleUpvote}
                handleDownvotes={handleDownvotes}
                search={search}
                setSearch={setSearch}
              />
              <NavBar
                activeTab={activeTab}
                setActiveFilter={setActiveFilter}
                handlePlusClick={handlePlusClick}
              />
            </>

          }
        />

        <Route
          path='/profile'
          element={
            <>
              <ProfilePage selectedTheme={selectedTheme} />

              <NavBar
                activeTab={activeTab}
                setActiveFilter={setActiveFilter}
                handlePlusClick={handlePlusClick}
              />
            </>

          }
        />

        <Route
          path='/manage_profile'
          element={<ManageProfile
            isSellerActive={isSellerActive}
            setIsSellerActive={setIsSellerActive}
          />}
        />

        <Route
          path='/password_security'
          element={<PasswordSecurity
            showCurrentPassword={showCurrentPassword}
            showNewPassword={showNewPassword}
            twoFactorActive={twoFactorActive}
            biometricsActive={biometricsActive}
            setShowCurrentPassword={setShowCurrentPassword}
            setShowNewPassword={setShowNewPassword}
            setTwoFactorActive={setTwoFactorActive}
            setBiometricsActive={setBiometricsActive}
          />}
        />

        <Route
          path='/notification_settings'
          element={<Notification
            pushMaster={pushMaster}
            emailDigest={emailDigest}
            socialAlerts={socialAlerts}
            confessionAlerts={confessionAlerts}
            marketAlerts={marketAlerts}
            verseAlerts={verseAlerts}
            setPushMaster={setPushMaster}
            setEmailDigest={setEmailDigest}
            setSocialAlerts={setSocialAlerts}
            setConfessionAlerts={setConfessionAlerts}
            setMarketAlerts={setMarketAlerts}
            setVerseAlerts={setVerseAlerts}
          />}
        />

        <Route
          path='/theme_settings'
          element={<Theme
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            Themes={Themes}
          />}
        />

        <Route
          path='/privacy-safety'
          element={<PrivacySafety
            anonymousDefault={anonymousDefault}
            hideDetails={hideDetails}
            allowDirectMessages={allowDirectMessages}
            setAnonymousDefault={setAnonymousDefault}
            setHideDetails={setHideDetails}
            setAllowDirectMessages={setAllowDirectMessages}
          />}
        />

        <Route
          path='/about_verse'
          element={<AboutVerse
            currentYear={currentYear}
          />}
        />

        <Route
          path='/help_center'
          element={<HelpCenter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />}
        />

        <Route
          path='/contact_us'
          element={<ContactUs
            isOpen={isOpen}
            selectedTopic={selectedTopic}
            message={message}
            isSubmitted={isSubmitted}
            attachment={attachment}
            topics={topics}
            handleSubmit={handleSubmit}
            setIsOpen={setIsOpen}
            setSelectedTopic={setSelectedTopic}
            setMessage={setMessage}
            setIsSubmitted={setIsSubmitted}
            setAttachment={setAttachment}
          />}
        />
      </Routes>


    </>
  )
}

export default App
