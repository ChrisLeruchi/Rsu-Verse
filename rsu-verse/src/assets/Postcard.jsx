import { MoreHorizontal, ArrowBigDown, ArrowBigUp, MessageCircle, Share, Repeat, Bookmark } from "lucide-react"

export function PostCard({ post, handleUpvote, handleDownvotes, handleRepost, handleSave }) {
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
                    <h4>{post.author?.name}</h4>
                    <p className="text-sm font-light text-white/30"> &bull; {post.time}</p>
                  </div>
                )

                : (
                  <div className="flex items-center gap-1">
                    <h4>{post.author?.faculty}</h4>
                    <p className="text-sm font-light text-white/30">@{post.author?.department} &bull; {post.time}</p>
                  </div>
                )}
              <div className="text-white/30 flex items-center gap-1">
                <button className={`${post.theme?.text} ${post.theme?.glow} p-1 rounded-full`}>
                  {post.icon}
                </button>

                <button>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 leading-snug text-sm font-light">
              {post.content?.text}
              <div className="flex items-center justify-between">
                <div
                  className="flex flex-1 items-center justify-between text-white/70">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex gap-1 flex-1 items-center relative h-8 transition-colors select-none group outline-none justify-self-start`}>
                    {post.userInteraction?.voteStatus === 'up' && (
                      <span className="absolute left-[9px] top-[7px] w-[18px] h-[18px] rounded-full border-emerald-400 pointer-events-none animate-neon-blast"></span>
                    )}
                    <ArrowBigUp
                      size={18}
                      className={`shrink-0 transform-gpu ${post.userInteraction?.voteStatus === 'up' ? 'animate-cyber-pop' : 'group-active:scale-90 transition-transform'
                        }`}
                      fill={post.userInteraction?.voteStatus === 'up' ? "currentColor" : "transparent"}
                      strokeWidth={post.userInteraction?.voteStatus === 'up' ? 2 : 1.5}
                    />
                    <span className="text-xs font-mono tabular-nums min-w-[16px] text-left">{post.engagement?.upvotes}</span>
                  </button>
                  <button
                    onClick={() => { handleDownvotes(post.id) }}
                    className=
                    {`flex gap-1 flex-1 items-center relative h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.voteStatus === 'down' ? 'text-rose' : 'hover: text-rose/80 text-white/70'
                      }`}>
                    {post.userInteraction?.voteStatus === 'down' && (
                      <span className="absolute left-[9px] top-[7px] w-[18px] h-[18px] rounded-full border-rose pointer-events-none animate-neon-blast"></span>
                    )}
                    <ArrowBigDown
                      size={18}
                      className={`shrink-0 transform-gpu ${post.userInteraction?.voteStatus === 'down' ? 'animate-cyber-drop' : 'group-active:scale-90 transition transform'
                        }`}
                      fill={post.userInteraction?.voteStatus === 'down' ? "currentColor" : "transparent"}
                      strokeWidth={post.userInteraction?.voteStatus === 'down' ? 2 : 1.5}
                    />
                    <span className="text-xs font-mono tabular-nums min-w-[16px] text-left">{post.engagement?.downvotes}</span>
                  </button>
                  <button className="flex gap-1 flex-1 items-center">
                    <MessageCircle size={18} />
                    <span className="text-xs font-mono tabular-nums min-w-[16px] text-left">{post.engagement?.comments === 0 ? '' : post.engagement?.comments}</span>
                  </button>
                  <button
                    onClick={() => handleRepost(post.id)}
                    className={`relative flex flex-1  items-center gap-1 h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.reposts ? 'text-lavender' : 'hover:text-lavender/80 text-white/70'
                      }`}>
                    <Repeat
                      size={18}
                      className={`shrink-0 transform-gpu ${post.userInteraction?.reposts ? 'animate-cyber-spin' : 'group-active:scale-90 transition-transform'
                        }`}
                    />
                    <span className="text-xs font-mono tabular-nums min-w-[16px] text-left">{post.engagement?.reposts === 0
                      ? '' : post.engagement?.reposts}</span>
                  </button>
                </div>
                <div className="flex items-center gap-5 text-white/70">
                  <button
                    onClick={() => handleSave(post.id)}
                    className={`relative flex flex-1 items-center gap-1 h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.saved ? 'text-amber' : 'hover:text-amber/80 text-white/70'
                      }`}>
                    <Bookmark size={18}
                      className={`shrink-0 transform-gpu ${post.userInteraction?.saved ? 'animate-cyber-pop' : 'group-active:scale-90 transition-transform'
                        }`}
                      fill={post.userInteraction?.saved ? "currentColor" : "transparent"}
                      strokeWidth={post.userInteraction?.saved ? 2 : 1.5}
                    />
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