import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Send, Bookmark, Repeat, Repeat1, MessageCircle, ArrowBigDown, ArrowBigUp, ArrowUpRight, MoreHorizontal, ArrowLeft } from "lucide-react";
import { formatRelativeTime } from "./formatRelativeTime";

export function PostDetail({ posts, setPosts, handleSave, handleRepost, handleDownvotes, handleUpvote, getVerseIcon }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState("");


  const post = posts.find(
    post => post.id === postId
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-void flex flex-col items-center justify-center text-center p-6">
        <p className="tex t-white/40 text-sm font-medium">
          Post not found or has been removed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-xs font-semibold text-cyan hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Feed
        </button>
      </div>
    );
  }

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newCommentId = crypto.randomUUID();

    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id !== postId) return p;

        if (replyingTo) {

          return {
            ...p,
            engagement: {
              ...p.engagement,
              comments: p.engagement.comments.map((c) => {
                if (c.id !== replyingTo) return c;
                return {
                  ...c,
                  engagement: {
                    ...c.engagement,
                    replies: [...c.engagement.replies, commentText.trim()]
                  }
                };
              })
            }
          };
        } else {

          const newComment = {
            id: newCommentId,
            author: {
              name: post.verse === "market" ? "Anonymous Buyer" : "Anonymous Explorer",
              department: "Anonymous"
            },
            text: commentText.trim(),
            createdAt: new Date().toISOString(),
            engagement: { upvotes: 0, downvotes: 0, replies: [], shares: 0, saves: 0, reposts: 0 }
          };

          return {
            ...p,
            engagement: {
              ...p.engagement,
              comments: [newComment, ...p.engagement.comments]
            }
          };
        }
      })
    );

    setCommentText("");
    setReplyingTo(null);
  };

 return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-void text-white flex flex-col pb-32">
      
      <div className="sticky top-0 z-50 bg-void/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between p-4 py-3">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1.5 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>


      <div
        className={`${
          post.verse === "confession"
            ? "bg-rose/[0.04] border-rose/20"
            : "bg-ink"
        } border-b border-white/10 flex flex-col py-5 gap-4`}
      >
        <div className="flex flex-col px-3 justify-between w-full min-w-0">
          <div className="flex gap-3 min-w-0 w-full">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 shrink-0" />

            <div className="flex flex-col flex-1 gap-3 min-w-0">
              <div className="flex font-semibold text-white items-start gap-2 min-w-0 w-full justify-between">
                {post.verse === "market" ? (
                  <div className="flex flex-col text-[18px] min-w-0 flex-1">
                    <div className="flex items-center gap-1 min-w-0 w-full">
                      <h4 className="truncate flex-1 min-w-0 whitespace-nowrap">
                        {post.author?.name}
                      </h4>
                    </div>
                    <div className="flex gap-1 min-w-0 w-full items-center">
                      <p className="text-[16px] font-light text-white/30 truncate">
                        @{post.author?.department}
                      </p>
                      <p className="text-[16px] font-light text-white/30 shrink-0"> 
                        &bull; {formatRelativeTime(post.meta?.createdAt || post.createdAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col text-[18px] min-w-0 flex-1">
                    <div className="flex items-center gap-1 min-w-0 w-full">
                      <h4 className="truncate flex-1 min-w-0 whitespace-nowrap">
                        {post.author?.faculty}
                      </h4>
                    </div>
                    <div className="flex gap-1 truncate">
                      <p className="text-[16px] font-light text-white/30">
                        @{post.author?.department}
                      </p>
                      <p className="text-[16px] font-light text-white/30 truncate"> 
                        &bull; {formatRelativeTime(post.meta?.createdAt || post.createdAt)}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="text-white/30 flex gap-1 shrink-0">
                  <button className={`${
                    post.verse === "confession" ? "text-rose" : post.theme?.text || "text-cyan"
                  } p-1 rounded-full`}>
                    {getVerseIcon(post.verse)}
                  </button>
                  <button className="hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3">
          <span className={`text-xs font-bold uppercase tracking-wider w-fit py-1 px-2 flex shrink-0 ${
            post.verse === "confession" ? "text-rose bg-rose/5" : "text-cyan bg-cyan/5"
          }`}>
            {post.verse}
          </span>
        </div>

        <div className="flex flex-col gap-4 px-3 leading-snug text-[18px] tracking-tight font-normal text-white/90">
          <div>{post.content?.text}</div>
        </div>

  
        <div>
          {post.content?.images && post.content.images.length > 0 && (
            <div className={`mt-3 grid gap-1.5 overflow-hidden border border-white/5 ${
              post.content.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}>
              {post.content.images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt="Broadcast attachment"
                  className={`w-full object-cover bg-ink/50 ${
                    post.content.images.length === 1
                      ? "max-h-[440px] aspect-auto bg-ink/30"
                      : "aspect-square bg-ink/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-3">
          {post.verse === "market" && (
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 gap-1">
                <h4 className="text-[18px] text-white font-semibold truncate">
                  ₦{post.marketPlace?.price}
                </h4>
                <p className="text-white/30">-</p>
                <h4 className="text-[18px] text-white font-medium truncate">
                  {post.marketPlace?.condition}
                </h4>
              </div>
              <div className="shrink-0 min-w-0">
                <button className="font-semibold bg-cyan text-white/90 text-[18px] px-3 py-2 rounded-md active:scale-95 transition-transform flex items-center whitespace-nowrap gap-1">
                  Buy Now <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

    
        <div className="px-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center text-white/70">
              {/* Upvote Control */}
              <button
                onClick={() => handleUpvote(post.id)}
                className={`flex gap-1 flex-1 items-center relative h-8 transition-colors select-none group outline-none justify-center ${
                  post.userInteraction?.voteStatus === "up" ? "text-[#17CB49]" : "hover:text-[#17CB49]/80 text-white/70"
                }`}
              >
                {post.userInteraction?.voteStatus === "up" && (
                  <span className="absolute left-[9px] top-[7px] w-[18px] h-[18px] rounded-full border-emerald-400 pointer-events-none animate-neon-blast"></span>
                )}
                <ArrowBigUp
                  size={24}
                  className={`shrink-0 transform-gpu ${
                    post.userInteraction?.voteStatus === "up" ? "animate-cyber-pop" : "group-active:scale-90 transition-transform"
                  }`}
                  fill={post.userInteraction?.voteStatus === "up" ? "currentColor" : "transparent"}
                  color={post.userInteraction?.voteStatus === "up" ? "transparent" : "currentColor"}
                  strokeWidth={post.userInteraction?.voteStatus === "up" ? 2 : 1.5}
                />
                <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">
                  {post.engagement?.upvotes}
                </span>
              </button>

              <button
                onClick={() => handleDownvotes(post.id)}
                className={`flex gap-1 flex-1 items-center relative h-8 transition-colors select-none group outline-none justify-center ${
                  post.userInteraction?.voteStatus === "down" ? "text-rose" : "hover:text-rose/80 text-white/70"
                }`}
              >
                {post.userInteraction?.voteStatus === "down" && (
                  <span className="absolute left-[9px] top-[7px] w-[18px] h-[18px] rounded-full border-rose pointer-events-none animate-neon-blast"></span>
                )}
                <ArrowBigDown
                  size={24}
                  className={`shrink-0 transform-gpu ${
                    post.userInteraction?.voteStatus === "down" ? "animate-cyber-drop" : "group-active:scale-90 transition transform"
                  }`}
                  fill={post.userInteraction?.voteStatus === "down" ? "currentColor" : "transparent"}
                  strokeWidth={post.userInteraction?.voteStatus === "down" ? 2 : 1.5}
                />
                <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">
                  {post.engagement?.downvotes || 0}
                </span>
              </button>

            
              <button
                onClick={() => handleRepost(post.id)}
                className={`relative flex flex-1 items-center gap-1 h-8 transition-colors select-none group outline-none justify-center ${
                  post.userInteraction?.reposts ? "text-white" : "hover:text-white text-white/70"
                }`}
              >
                {post.userInteraction?.reposts ? (
                  <Repeat1
                    size={24}
                    className={`shrink-0 transform-gpu ${post.userInteraction?.reposts ? "animate-cyber-spin" : "group-active:scale-90 transition-transform"}`}
                  />
                ) : (
                  <Repeat
                    size={24}
                    className={`shrink-0 transform-gpu ${post.userInteraction?.reposts ? "animate-cyber-spin" : "group-active:scale-90 transition-transform"}`}
                  />
                )}
                <span className="text-[14px] font-sans tabular-nums min-w-[16px] text-left">
                  {post.engagement?.reposts === 0 ? "" : post.engagement?.reposts}
                </span>
              </button>
            </div>

            <div className="flex gap-3 items-center text-white/70">
            
              <button
                onClick={() => handleSave(post.id)}
                className={`relative flex flex-1 items-center gap-1 h-8 transition-colors select-none group outline-none justify-center ${
                  post.userInteraction?.saved ? "text-amber" : "hover:text-amber/80 text-white/70"
                }`}
              >
                <Bookmark 
                  size={24}
                  className={`shrink-0 transform-gpu ${
                    post.userInteraction?.saved ? "animate-cyber-pop" : "group-active:scale-90 transition-transform"
                  }`}
                  fill={post.userInteraction?.saved ? "currentColor" : "transparent"}
                  strokeWidth={post.userInteraction?.saved ? 2 : 1.5}
                />
              </button>
   
              <button className="flex gap-1 flex-1 items-center hover:text-white transition-colors">
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="flex flex-col gap-4 pt-5">
        {!post.engagement?.comments || post.engagement.comments.length === 0 ? (
          <div className="flex justify-center items-center text-white/40 px-3 py-10">
            No comments yet
          </div>
        ) : (
          post.engagement.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col border-b  border-white/5 pb-6 px-3 gap-2"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="flex items-center flex-1 gap-1">
                        <span className="text-[18px] font-medium">
                          {comment.author?.department}
                        </span>
                        <span className="text-white/30">
                          &bull; {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-white/30">
                      <MoreHorizontal size={20} />
                    </div>
                  </div>

                  <div className="text-white/90 text-[18px]">
                    {comment.text}
                  </div>

       
                  <div className="flex items-center gap-4 mt-1">
                    <button 
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className={`text-[16px] font-semibold transition-colors ${
                        replyingTo === comment.id ? "text-cyan" : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
                    </button>
                  </div>

                 
                  <div className="flex justify-between items-center text-white/70 mt-2">
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <MessageCircle size={20} strokeWidth={2} />
                      <span className="text-xs font-sans">
                        {comment.engagement?.replies?.length || ""}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <Repeat size={20} strokeWidth={2} />
                      <span className="text-xs font-sans">
                        {comment.engagement?.reposts || ""}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <ArrowBigUp size={20} strokeWidth={2} />
                      <span className="text-xs font-sans">
                        {comment.engagement?.upvotes || ""}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <ArrowBigDown size={20} strokeWidth={2} />
                      <span className="text-xs font-sans">
                        {comment.engagement?.downvotes || ""}
                      </span>
                    </button>
                    <button className="hover:text-white transition-colors">
                      <Bookmark size={20} strokeWidth={2} />
                    </button>
                    <button className="hover:text-white transition-colors">
                      <Send size={20} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-void/90 backdrop-blur-lg border-t border-white/10 p-3 px-4 z-50">
        <form onSubmit={handleSendComment} className="flex items-center gap-2 w-full relative">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder= 'Post your reply'
            className="flex-1 bg-white/[0.03] border border-white/5 text-white placeholder-white/20 text-[18px] p-2.5 px-4 rounded-full outline-none focus:border-cyan/30 focus:bg-white/[0.04] transition-all"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2.5 bg-cyan text-white rounded-full hover:bg-cyan/90 disabled:opacity-40 disabled:hover:bg-cyan active:scale-95 transition-transform shrink-0 flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

    </div>
  );
}

