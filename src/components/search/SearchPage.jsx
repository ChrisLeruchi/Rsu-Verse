import { NavLink } from "react-router-dom"
import { ChevronLeft, Search, ClockFadingIcon, ArrowUpRight, MessageSquare, Store } from "lucide-react"


export function SearchPage({ setActiveFilter, recents, setRecents, search, setSearch, matchingPosts }) {


  const handleClearAll = () => {
    setRecents([])
  }

  const filteredRecents = recents.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  )



  return (
    <>
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen bg-void px-4 pb-12 pt-5 gap-4">
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            end
            onClick={() => setActiveFilter("all")}
          >
            <ChevronLeft size={20} />
          </NavLink>

          <div className="flex bg-ink flex-1 border border-white/5 focus-within:border-cyan/30 rounded-full items-center px-3.5 gap-2.5 transition-all">
            <Search size={18} className="text-white/30 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-transparent py-2.5 text-[18px] text-white/90 placeholder-white/30 w-full outline-none font-sans"
            />
          </div>
        </div>
        {recents.length > 0 && (
          <div className="flex text-[14px] font-semibold tracking-wide text-white/30 uppercase items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-2">
              <ClockFadingIcon size={14} className="text-white/40" />
              <p className="tracking-wide">Recents</p>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              className="font-medium text-[14px] text-white/40 hover:text-white/80 normal-case transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      
        <div className="font-medium text-[14px] flex flex-col overflow-hidden">
          {filteredRecents.length > 0 ? (
            filteredRecents.map((item, index) => (
              <div
                key={index}
                onClick={() => setSearch(item)}
                className="flex justify-between items-center p-4 hover:bg-white/[0.01] last:border-none text-white/80 hover:text-white cursor-pointer transition-colors group"
              >
                {item}
                <span>
                  <ArrowUpRight
                    size={16}
                    className="text-white/30 group-hover:text-white/60 transition-colors"
                  />
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-semibold tracking-wider text-white/30 uppercase px-1">
                Search Results ({matchingPosts.length})
              </div>

              <div className="flex flex-col gap-2">
                {matchingPosts.length > 0 ? (
                  matchingPosts.map((post) => (
                    <NavLink
                      to='/search_feed'
                      state={{
                        query: search, clickedPostId: post.id
                      }}
                      className="block decoration-none group"
                      key={crypto.randomUUID()}
                    >
                      <div
                        key={post.id}
                        className="bg-ink border border-white/5 p-4 rounded-2xl flex flex-col gap-2.5 transition-all hover:border-white/10"
                      >
                        {/* Result Card Context Info Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/40">
                            {post.verse === "market" ? (
                              <>
                                <Store size={13} className="text-white/40" />
                                <span>Marketplace</span>
                              </>
                            ) : (
                              <>
                                <MessageSquare size={13} className="text-white/40" />
                                <span className="capitalize">{post.verse} feed</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{post.time} ago</span>
                          </div>


                          {post.verse === "market" && post.marketPlace && (
                            <span className="text-[14px] font-semibold text-white/90">
                              ₦{post.marketPlace.price.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <p
                          className="text-[14px] text-white/80 font-normal leading-relaxed line-clamp-2">
                          {post.content.text}
                        </p>


              
                        {post.content.tags && post.content.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {post.content.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[12px] font-light bg-white/5 border border-white/5 text-white/50 px-2 py-0.5 rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className="p-12 text-center bg-ink border border-white/5 rounded-2xl text-[14px] text-white/30 font-light">
                    No matching campus posts found for "{search}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}