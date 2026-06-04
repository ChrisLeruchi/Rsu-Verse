import { PostCard } from "../../assets/Postcard"
import { NavLink } from "react-router-dom"
import { FeedFilter } from "./FeedFilter"
import { Plus } from "lucide-react"




export function Feed({ posts, activeFilter, setActiveFilter, handleUpvote, handleDownvotes, handleRepost, handleSave, onPlusClick, getVerseIcon}) {


  const getIconStyles = (isActive, hasFill = false) => {
    if (hasFill) {
      return {
        fill: isActive ? 'white' : 'transparent',
        color: isActive ? 'transparent' : 'currentColor'
      }
    }
    return {
      color: isActive ? 'white' : 'currentColor'
    }
  }



  return (
    <>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-full relative pb-14">
        <FeedFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="flex flex-col">
          {posts.length === 0
            ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-xs font-semibold text-white/40 tracking-wide">
                  No posts in this Verse yet.
                </p>
                <p className="text-[10px] text-white/20">
                  Be the first to start the converstion.
                </p>
              </div>
            )
            : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  handleUpvote={handleUpvote}
                  handleDownvotes={handleDownvotes}
                  handleRepost={handleRepost}
                  handleSave={handleSave}
                  getVerseIcon={getVerseIcon}
                />
              ))
            )}
        </div>
        <NavLink
          to="/plus"
          onClick={onPlusClick}
          className='fixed bottom-22 right-5 flex justify-center items-center gap-2 bg-cyan/100 p-3 rounded-full'
        >
          {({ isActive }) => (
            <>
              <Plus
                size={24}
                strokeWidth={2.5}
                className="transition-all duration-300 ease-in-out"
                {...getIconStyles(isActive)}
              />
              <span 
                className="text-lg font-semibold text-white tracking-wide items-center"
              >Post</span>
            </>
          )}
        </NavLink>
      </div>
    </>
  )
}