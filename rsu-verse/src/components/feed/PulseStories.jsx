import { Zap } from "lucide-react";

export function PulseStories({ stories }) {
  return (
    <>
      <div className="flex items-center gap-4 py-4 px-6 overflow-x-auto no-scrollbar border-b border-white/5 bg-void/50">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex-shrink-0 flex flex-col items-center space-y-2 group cursor-pointer">

            <div className={`w-14 h-14 rounded-full p-[2px] transition-transform duration-300 group-active:scale-95 ${
              story.active
                ? 'bg-gradient-to-tr from-rose to-amber' 
                : 'bg-white/10'
            }`}>
              <div className="w-full h-full rounded-full bg-void flex items-center justify-center border-2 border-void">
                <Zap
                  size={18}
                  className={`text-[10px] font-medium tracking-wide text-white/50 group-hover:text-white/80 transition-colors`}
                />
              </div>
            </div>
            <span className="text-[10px] font-medium tracking-wide text-white/50 group-hover:text-white/80 transition-colors">
              {story.location}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}