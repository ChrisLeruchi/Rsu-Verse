import { NavLink } from "react-router-dom";
import { ArrowLeft, EyeOff, UserX, MessageSquare, Shield, ChevronRight } from "lucide-react";

export function PrivacySafety({anonymousDefault, setAnonymousDefault, hideDetails, setHideDetails,allowDirectMessages, setAllowDirectMessages}) {


  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink 
          to="/profile" 
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5}/>
        </NavLink>
        <h1 className="text-[20px] font-semibold tracking-tight">Privacy & Safety</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-6 px-4 pt-4">
        <section className="flex flex-col gap-2.5">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Sharing</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <EyeOff className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/95">Post anonymously by default</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Hide your name and username automatically when creating a new post.</span>
                </div>
              </div>
              <button 
                onClick={() => setAnonymousDefault(!anonymousDefault)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${anonymousDefault ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${anonymousDefault ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>

            <div className="h-px bg-white/5 mx-4" />

     
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Shield className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/95">Hide academic details</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Only show your faculty on anonymous posts. Your department and level will be hidden.</span>
                </div>
              </div>
              <button 
                onClick={() => setHideDetails(!hideDetails)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${hideDetails ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${hideDetails ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Messages</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <MessageSquare className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/95">Allow direct messages</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Let other students message you directly from your posts or marketplace listings.</span>
                </div>
              </div>
              <button 
                onClick={() => setAllowDirectMessages(!allowDirectMessages)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${allowDirectMessages ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${allowDirectMessages ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Moderation</p>
          
          <NavLink to="/profile/blocked" className="w-full bg-ink border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-colors hover:bg-white/[0.01] active:bg-white/[0.02] group">
            <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
              <UserX size={20} strokeWidth={2.5} className="text-white/60" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] font-medium">Blocked accounts</span>
                <span className="text-[14px] font-light text-white/40">Manage the accounts you've restricted.</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
          </NavLink>
        </section>
      </main>
    </div>
  )
}