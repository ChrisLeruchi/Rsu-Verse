import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, Clock } from "lucide-react";

export function FeedFilter({ activeFilter, setActiveFilter }) {
  return (
    <>

      <div className="flex items-center justify-between border-b border-white/5 bg-void/80 backdrop-blur-md sticky top-0 z-40 overflow-x-scroll scrollbar-none">
        <button
          onClick={() => setActiveFilter("all")}
          className={`py-1.5 flex justify-center min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === 'all'
              ? "text-white border-cyan"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          Versn'
        </button>

        <button
          onClick={() => setActiveFilter("new")}
          className={`py-1.5 flex justify-center items-center gap-1.5 min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === 'new'
              ? "text-white border-cyan"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          < Clock size={16} strokeWidth={2.5} />
          New
        </button>

        <button 
          onClick={() => setActiveFilter("gist")}
        
          className={`flex items-center gap-1.5 py-1.5 justify-center min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === "gist"
              ? "text-white border-cyan"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          <MessagesSquare size={16} strokeWidth={2.5} />
          <span>Gist</span>
        </button>

        <button 
          onClick={() => setActiveFilter("confession")}
        
          className={`flex items-center gap-1.5 py-1.5 justify-center min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === "confession"
              ? "text-rose border-rose"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          <Flame size={16} strokeWidth={2.5} />
          <span>Confession</span>
        </button>

        <button 
          onClick={() => setActiveFilter("music")}
        
          className={`flex items-center gap-1.5 py-1.5 justify-center min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === "music"
              ? "text-white border-cyan"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          <Music size={16} strokeWidth={2.5} />
          <span>Music</span>
        </button>

        <button 
          onClick={() => setActiveFilter("politics")}
        
          className={`flex items-center gap-1.5 py-1.5 justify-center min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === "politics"
              ? "text-white border-cyan"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          <Landmark size={16} strokeWidth={2.5} />
          <span>Politics</span>
        </button>

        <button 
          onClick={() => setActiveFilter("relationship")}
        
          className={`flex items-center gap-1.5 py-1.5 justify-center min-h-8 min-w-35 text-[16px] font-light tracking-wider border-b-4 transition-all duration-200 ${activeFilter === "relationship"
              ? "text-white border-cyan"
              : "text-white/30 hover:text-white/90 border-transparent"
            }`}
        >
          <HeartHandshake size={16} strokeWidth={2.5} />
          <span>Relationship</span>
        </button>
      </div>
      
    </>
  )
}