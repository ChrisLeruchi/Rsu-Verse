import { MoreHorizontal, ArrowBigDown, ArrowBigUp, MessageCircle, Share, Repeat, Bookmark } from "lucide-react"

export function PostCard({ post, handleUpvote }) {
  return (
    <div
      key={post.id}
      className="p-5 bg-void border-t border-white/10 flex flex-col gap-3"
    >
      <div className="flex flex-col justify-between">
        <div className="flex gap-3">
          <div className=" w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />

          <div className="flex flex-col flex-1 gap-2 text-base">
            <div className="flex font-bold text-white/90 tracking-wide items-center justify-between">
              {post.verse === "market"
                ? (
                  <div className="flex items-center gap-1">
                    <h4>{post.author.name}</h4>
                    <p className="text-sm font-light text-white/30">@{post.author.department} &bull; {post.time}</p>
                  </div>
                )

                : (
                  <div className="flex items-center gap-1">
                    <h4>{post.author.faculty}</h4>
                    <p className="text-sm font-light text-white/30">@{post.author.department} &bull; {post.time}</p>
                  </div>
                )}
              <div className="text-white/30 flex items-center gap-1">
                <button className={`${post.theme.text} ${post.theme.glow} p-1 rounded-full`}>
                  {post.icon}
                </button>

                <button>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 leading-snug text-sm font-light">
              {post.content.text}
              <div className="flex items-center justify-between">
                <div
                  className="flex flex-1 items-center justify-between text-white/70">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex gap-1 flex-1 items-center">
                    <ArrowBigUp size={18} />
                    <span>{post.engagement.upvotes}</span>
                  </button>
                  <button className="flex gap-1 flex-1 items-center">
                    <ArrowBigDown size={18} />
                    <span>{post.engagement.downvotes}</span>
                  </button>
                  <button className="flex gap-1 flex-1 items-center">
                    <MessageCircle size={18} />
                    <span>{post.engagement.comments === 0 ? '' : post.engagement.comments}</span>
                  </button>
                  <button className="flex gap-1 flex-1 items-center">
                    <Repeat size={18} />
                    <span>{post.engagement.reposts === 0 
                      ? '' : post.engagement.reposts}</span>
                  </button>
                  <button className="flex gap-1 flex-1 items-center">
                    <Bookmark size={18} />
                  </button>
                  <button className="flex gap-1 flex-1 items-center">
                    <Share size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}