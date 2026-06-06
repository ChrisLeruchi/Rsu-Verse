import { NavLink } from "react-router-dom";
import { ArrowLeft, Bell, MessageSquare, Flame, Store, Megaphone, Mail } from "lucide-react";

export function Notification({pushMaster, setPushMaster, emailDigest, setEmailDigest,socialAlerts, setSocialAlerts, confessionAlerts, setConfessionAlerts, marketAlerts, setMarketAlerts, verseAlerts, setVerseAlerts}) {

  return (
    <div className="w-full max-w-md mx-auto flexflex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink
          to="/profile"
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>
        <h1 className="text-[20px] font-semibold tracking-tight">Notifications</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-7 px-4 pt-4">
        <section className="flex flex-col gap-3">

          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            {/* Push Notifications Master */}
            <div className="p-3.5 flex items-center justify-between gap-4">
              <div className="flex gap-3 items-center">
                <Bell className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-white/90">Push Notifications</span>
                  <span className="text-[14px] font-light text-white/40 mt-0.5">Get notified about important activity</span>
                </div>
              </div>
              <button
                onClick={() => setPushMaster(!pushMaster)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${pushMaster ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${pushMaster ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>

            <div className="h-px bg-white/5 mx-4" />

            {/* Email Digest */}
            <div className="p-3.5 flex items-center justify-between gap-4">
              <div className="flex gap-3 items-center">
                <Mail className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-white/90">Weekly Recap
                  </span>
                  <span className="text-[14px] font-light text-white/40 mt-0.5">Catch up on trending posts and listings</span>
                </div>
              </div>
              <button
                onClick={() => setEmailDigest(!emailDigest)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${emailDigest ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${emailDigest ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Activity</p>

          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            {/* Gist & Main Stream Activity */}
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <MessageSquare className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Replies & Mentions</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Get notified when someone replies to your post or mentions you.</span>
                </div>
              </div>
              <button
                disabled={!pushMaster}
                onClick={() => setSocialAlerts(!socialAlerts)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${!pushMaster ? 'opacity-30 cursor-not-allowed bg-white/10' : socialAlerts ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${socialAlerts && pushMaster ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>

            <div className="h-px bg-white/5 mx-4" />

            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Flame className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Anonymous Activity</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Replies and reactions on anonymous posts.</span>
                </div>
              </div>
              <button
                disabled={!pushMaster}
                onClick={() => setConfessionAlerts(!confessionAlerts)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${!pushMaster ? 'opacity-30 cursor-not-allowed bg-white/10' : confessionAlerts ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${confessionAlerts && pushMaster ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Marketplace Notifications</p>

          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Store className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Marketplace Messages</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Get notified when someone messages you about an item.</span>
                </div>
              </div>
              <button
                disabled={!pushMaster}
                onClick={() => setMarketAlerts(!marketAlerts)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${!pushMaster ? 'opacity-30 cursor-not-allowed bg-white/10' : marketAlerts ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${marketAlerts && pushMaster ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Verse</p>

          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Megaphone className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Verse Notifications</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Recieve notifications from Verse</span>
                </div>
              </div>
              <button
                disabled={!pushMaster}
                onClick={() => setVerseAlerts(!verseAlerts)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${!pushMaster ? 'opacity-30 cursor-not-allowed bg-white/10' : verseAlerts ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${verseAlerts && pushMaster ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}