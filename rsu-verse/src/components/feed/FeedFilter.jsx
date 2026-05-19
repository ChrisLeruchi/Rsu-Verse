import { Zap, ShoppingBag, MessagesSquare } from "lucide-react";

export function FeedFilter({ activeFilter, setActiveFilter }) {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-void backdrop-blur-md sticky top-16 z-40">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 ${activeFilter === 'all'
              ? "bg-white/10 text-white border-white/10"
              : "bg-ink/40 text-white/40 border-transparent hover:text-white/70"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveFilter("pulse")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 ${activeFilter === "pulse"
              ? "bg-rose/10 text-rose border-rose/20 glow-rose"
              : "bg-ink/40 text-white/40 border-transparent hover:text-white/70"
            }`}
        >
          <Zap size={12} strokeWidth={2.5} />
        </button>

        <button
          onClick={() => setActiveFilter("market")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 ${activeFilter === "market"
              ? "bg-cyan/10 text-cyan border-cyan/20 glow-cyan"
              : "bg-ink/40 text-white/40 border-transparent hover:text-white/70"
            }`}
        >
          <ShoppingBag size={12} strokeWidth={2.5} />
        </button>

        <button onClick={() => setActiveFilter("gist")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider border transition-all duration-300 ${activeFilter === "gist"
              ? "bg-lavender/10 text-lavender border-lavender/20 glow-lavender"
              : "bg-ink/40 text-white/40 border-transparent hover:text-white/70"
            }`}>
          <MessagesSquare size={12} strokeWidth={2.5} />
        </button>
      </div>
    </>
  )
}