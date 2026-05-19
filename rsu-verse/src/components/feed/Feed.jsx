import { PostCard } from "../../assets/Postcard"
import { FeedFilter } from "./FeedFilter"
import { PulseStories } from "./PulseStories"

export function Feed({ posts, stories, activeFilter, setActiveFilter, handleUpvote }) {
  return (
    <>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-full">
        <PulseStories
          stories={stories}
          setActiveFilter={setActiveFilter}
        />
        <FeedFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <div className="flex flex-col gap-">
          {posts.length === 0
            ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-xs font-semibold text-white/40 tracking-wide">
                  No transmissions broadcasting on this channel.
                </p>
                <p className="text-[10px] text-white/20">
                  Be the first node to broadcast. Tap the plus icon.
                </p>
              </div>
            )
            : (
              posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  handleUpvote={handleUpvote}
                />
              ))
            )}
        </div>
      </div>
    </>
  )
}