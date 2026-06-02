import { NavLink } from "react-router-dom";
import { ArrowLeft, BookOpen, LucideShieldQuestion, FileText, Heart } from "lucide-react";

export function AboutVerse({currentYear}) {
  
  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink
          to="/profile"
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>
        <h1 className="text-[20px] font-semibold tracking-tight">About Verse</h1>
        <div className="w-9" /> {/* Visual layout balancer */}
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-8 px-4 pt-6">
        <section className="flex flex-col items-center text-center py-4">
          <div className="w-28 h-14 flex items-center justify-center mb-4 ">
            <img src="/favicon.ico" alt="RSU Verse" />
          </div>
          <h2 className="text-[18px] font-bold tracking-tight">RSU Verse</h2>
          <p className="text-[14px] text-white/40 mt-1">Version 1.0.0</p>
        </section>

        <section className="max-w-[290px] mx-auto px-2 text-center">
          <p className="text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-white/60">
            A modern campus space for RSU students to share thoughts, connect anonymously, and discover what’s happening around school.
          </p>
        </section>

        <section className="flex flex-col gap-2.5">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Safety & Terms</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 overflow-hidden">
            <NavLink 
              to="/profile/about/guidelines" 
              className="p-4 flex items-center justify-between hover:bg-white/[0.01] active:bg-white/[0.02] border-b border-white/5 transition-colors group"
            >
              <div className="flex gap-3.5 items-center">
                <BookOpen size={18} className="text-white/50" />
                <span className="text-[16px] font-medium text-white/90">Community Guidelines</span>
              </div>
              <span className="text-[14px] text-white/30 group-hover:text-white/50 transition-colors">Read</span>
            </NavLink>

           
            <NavLink 
              to="/profile/about/terms" 
              className="p-4 flex items-center justify-between hover:bg-white/[0.01] active:bg-white/[0.02] border-b border-white/5 transition-colors group"
            >
              <div className="flex gap-3.5 items-center">
                <FileText size={18} className="text-white/50" />
                <span className="text-[16px] font-medium text-white/90">Terms of Service</span>
              </div>
              <span className="text-[14px] text-white/30 group-hover:text-white/50 transition-colors">View</span>
            </NavLink>

            <NavLink 
              to="/profile/about/privacy" 
              className="p-4 flex items-center justify-between hover:bg-white/[0.01] active:bg-white/[0.02] transition-colors group"
            >
              <div className="flex gap-3.5 items-center">
                <LucideShieldQuestion size={18} className="text-white/50" />
                <span className="text-[16px] font-medium text-white/90">Privacy Policy</span>
              </div>
              <span className="text-[14px] text-white/30 group-hover:text-white/50 transition-colors">View</span>
            </NavLink>
          </div>
        </section>

        <section className="mt-auto pt-6 flex flex-col items-center gap-1.5 opacity-30 text-[14px] tracking-wide font-light">
          <div className="flex items-center gap-1">
            <span>Built for Students of RSU</span>
            <Heart size={12} className="fill-white text-white" />
          </div>
          <span>&copy; {currentYear} RSU Verse. All rights reserved.</span>
        </section>
      </main>
    </div>
  )
}