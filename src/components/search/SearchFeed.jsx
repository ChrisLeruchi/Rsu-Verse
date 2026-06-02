import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowBigUp, ArrowBigDown, Repeat, Repeat1, Bookmark, Share, MoreHorizontal, ArrowUpRight, MessageCircle } from "lucide-react";
import { formatRelativeTime } from "../../assets/formatRelativeTime";


export function SearchFeed({ posts, handleSave, handleRepost, handleUpvote, handleDownvotes, getVerseIcon }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { query, clickedPostId } = location.state || { query: "", clickedPostId: null };


  const matchingPosts = posts.filter((post) => {
    if (!query) return false;

    const cleanQuery = query.toLowerCase();
    const matchesText = post.content?.text?.toLowerCase().includes(cleanQuery);
    const matchesVerse = post.verse.includes(cleanQuery)
    const matchesAuthor = post.author?.name?.toLowerCase().includes(cleanQuery) && !post.author?.anonymous;
    const matchesTags = Array.isArray(post.content?.tags) && post.content.tags.some(tag =>
      typeof tag === 'string' && tag.toLowerCase().includes(cleanQuery)
    );

    return matchesText || matchesAuthor || matchesTags || matchesVerse;
  });


  const prioritizedPosts = [...matchingPosts].sort((a, b) => {
    if (a.id === clickedPostId) return -1;
    if (b.id === clickedPostId) return 1;
    return 0;
  });

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen bg-void  pb-24 pt-5 gap-5">

      <div className="flex items-center gap-3 border-b border-white/5 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)} 
          className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-[15px] font-semibold text-white tracking-tight">Search Results</h1>
          <p className="text-[12px] text-white/40">Filtered records for "{query || "..."}"</p>
        </div>
      </div>

     
      <div className="flex flex-col gap-3">
        {prioritizedPosts.length > 0 ? (
          prioritizedPosts.map((post) => {

            return (
              <div
                key={post.id}
                className={` ${post.verse === 'confession'
                  ? 'bg-rose/[0.04] border-rose/20'
                  : 'bg-void'} 
        border-b border-white/10 flex flex-col py-5 gap-4`}
              >
                <div className="flex flex-col px-3 justify-between w-full min-w-0">
                  <div className="flex gap-3 min-w-0 w-full">
                    <div className=" w-14 h-14 rounded-full bg-gradient-to-tr from-black to-gray-500 shrink-0" />

                    <div className="flex flex-col flex-1 gap-3 min-w-0">
                      <div className="flex font-semibold text-white items-start gap-2 min-w-0 w-full justify-between">
                        {post.verse === "market"
                          ? (
                            <div className="flex flex-col text-[20px] min-w-0 flex-1">
                              <div className="flex items-center gap-1 min-w-0 w-full">
                                <h4 className="truncate flex-1 min-w-0 whitespace-nowrap">
                                  {post.author?.name}
                                </h4>
                              </div>
                              <div className="flex gap-1 min-w-0 w-full items-center">
                                <p className="text-[16px] font-light text-white/30 truncate">
                                  @{post.author?.department}
                                </p>
                                <p className="text-[16px] font-light text-white/30 shrink-0"> &bull; {formatRelativeTime(post.meta.createdAt)}</p>
                              </div>
                            </div>
                          )

                          : (
                            <div className="flex flex-col text-[20px] min-w-0 flex-1">
                              <div className="flex items-center gap-1 min-w-0 w-full">
                                <h4 className="truncate flex-1 min-w-0 whitespace-nowrap">{post.author?.faculty}</h4>
                              </div>
                              <div className="flex gap-1 truncate">
                                <p className="text-[16px] font-light text-white/30">
                                  @{post.author?.department}
                                </p>
                                <p className="text-[16px] font-light text-white/30 truncate"> &bull; {formatRelativeTime(post.meta.createdAt)}</p>
                              </div>
                            </div>
                          )}
                        <div className="text-white/30 flex gap-1 shrink-0">
                          <button>
                            <MoreHorizontal size={20} />
                          </button>
                          <button className={`${post.verse === 'confession'
                            ? 'text-rose'
                            : post.theme?.text} 
                  p-1 rounded-full`}>
                            {getVerseIcon(post.verse)}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {post.verse === 'confession' ? (
                  <div className="px-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose bg-rose/5 w-fit py-1 px-2 flex shrink-0">
                      Confession
                    </span>
                  </div>
                ) : (
                  <div className="px-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan bg-cyan/5 w-fit py-1 px-2 flex shrink-0">
                      {post.verse}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-4 px-3 leading-snug text-[18px] tracking-tight font-normal text-white/90">
                  <div >
                    {post.content?.text}
                  </div>
                </div>
                <div>
                  {post.content?.images && post.content.images.length > 0 && (
                    <div className={`mt-3 grid gap-1.5 overflow-hidden border border-white/5 ${post.content.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                      }`}>
                      {post.content.images.map((imgUrl, index) => (
                        <img
                          key={index}
                          src={imgUrl}
                          alt="Broadcast attachment"
                          className={`w-full object-cover bg-ink/50 ${post.content.images.length === 1
                            ? 'max-h-[440px] aspect-auto bg-ink/30'
                            : 'aspect-square bg-ink/50'
                            }`}
                          onLoad={() => {
                            if (imgUrl.startsWith('blob:')) {
                              // Optional: URL.revokeObjectURL(imgUrl); 
                              
                            }
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-3">
                  {post.verse === 'market' && (
                    <div className="flex items-center justify-between">
                      <div className="flex min-w-0 gap-1">
                        <h4 className="text-[18px] text-white font-semibold truncate">
                          ₦{post.marketPlace?.price}
                        </h4>
                        <p>-</p>
                        <h4 className="text-[18px] text-white font-medium truncate">
                          {post.marketPlace?.condition}
                        </h4>
                      </div>
                      <div className="shrink-0 min-w-0">
                        <button className="font-semibold bg-cyan text-white/90 text-[18px] px-3 py-2 rounded-md active:scale-95 transition-transform flex items-center  whitespace-nowrap">
                          Buy Now <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex gap-3 items-center text-white/70">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className={`flex gap-1 flex-1 items-center relative h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.voteStatus === 'up' ? 'text-[#17CB49]' : 'hover:text-[#17CB49]/80 text-white/70'
                          }`}>
                        {post.userInteraction?.voteStatus === 'up' && (
                          <span className="absolute left-[9px] top-[7px] w-[18px] h-[18px] rounded-full border-emerald-400 pointer-events-none animate-neon-blast"></span>
                        )}
                        <ArrowBigUp
                          size={24}
                          className={`shrink-0 transform-gpu ${post.userInteraction?.voteStatus === 'up' ? 'animate-cyber-pop' : 'group-active:scale-90 transition-transform'
                            }`}
                          fill={post.userInteraction?.voteStatus === 'up' ? "currentColor" : "transparent"}
                          color={post.userInteraction?.voteStatus === 'up' ? "transparent" : "currentColor"}
                          strokeWidth={post.userInteraction?.voteStatus === 'up' ? 2 : 1.5}
                        />
                        <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">{post.engagement?.upvotes}</span>
                      </button>
                      <button
                        onClick={() => { handleDownvotes(post.id) }}
                        className=
                        {`flex gap-1 flex-1 items-center relative h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.voteStatus === 'down' ? 'text-rose' : 'hover:text-rose/80 text-white/70'
                          }`}>
                        {post.userInteraction?.voteStatus === 'down' && (
                          <span className="absolute left-[9px] top-[7px] w-[18px] h-[18px] rounded-full border-rose pointer-events-none animate-neon-blast"></span>
                        )}
                        <ArrowBigDown
                          size={24}
                          className={`shrink-0 transform-gpu ${post.userInteraction?.voteStatus === 'down' ? 'animate-cyber-drop' : 'group-active:scale-90 transition transform'
                            }`}
                          fill={post.userInteraction?.voteStatus === 'down' ? "currentColor" : "transparent"}
                          strokeWidth={post.userInteraction?.voteStatus === 'down' ? 2 : 1.5}
                        />
                        <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">{post.engagement?.downvotes}</span>
                      </button>
                      <button className="flex gap-1 flex-1 items-center">
                        <MessageCircle size={24} />
                        <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">{post.engagement?.comments === 0 ? '' : post.engagement?.comments}</span>
                      </button>
                      <button
                        onClick={() => handleRepost(post.id)}
                        className={`relative flex flex-1  items-center gap-1 h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.reposts ? 'text-white' : 'hover:text-white text-white/70'
                          }`}>
                        {post.userInteraction?.reposts ? <Repeat1
                          size={24}
                          className={`shrink-0 transform-gpu ${post.userInteraction?.reposts ? 'animate-cyber-spin' : 'group-active:scale-90 transition-transform'
                            }`}
                        /> : <Repeat
                          size={24}
                          className={`shrink-0 transform-gpu ${post.userInteraction?.reposts ? 'animate-cyber-spin' : 'group-active:scale-90 transition-transform'
                            }`}
                        />}
                        <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">{post.engagement?.reposts === 0 ? '' : post.engagement?.reposts}</span>
                      </button>
                    </div>
                    <div className="flex gap-3 items-center text-white/70">
                      <button
                        onClick={() => handleSave(post.id)}
                        className={`relative flex flex-1 items-center gap-1 h-8 transition-colors select-none group outline-none justify-self-start ${post.userInteraction?.saved ? 'text-amber' : 'hover:text-amber/80 text-white/70'
                          }`}>
                        <Bookmark size={24}
                          className={`shrink-0 transform-gpu ${post.userInteraction?.saved ? 'animate-cyber-pop' : 'group-active:scale-90 transition-transform'
                            }`}
                          fill={post.userInteraction?.saved ? "currentColor" : "transparent"}
                          strokeWidth={post.userInteraction?.saved ? 2 : 1.5}
                        />
                      </button>
                      <button className="flex gap-1 flex-1 items-center">
                        <Share size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="p-12 text-center bg-ink border border-white/5 rounded-2xl text-[14px] text-white/30 font-light">
            No related campus results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}