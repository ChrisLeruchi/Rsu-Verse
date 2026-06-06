import { ArrowLeft, Camera, Store, GraduationCap, Globe} from "lucide-react";
import { NavLink } from "react-router-dom";

export function ManageProfile({isSellerActive, setIsSellerActive}) {


  return (
    <div className="w-full max-2-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink
          to="/profile"
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>

        <h1 className="text-[20px] font-semibold  flex justify-center">
          Edit Profile
        </h1>

        <button className="text-[18px] font-normal text-white hover:text-white/80 transition-colors duration-200">
          Save
        </button>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-7 px-4 pt-4">
        <section className="flex flex-col items-center justify-center justify-center py-2 relative group">
          <div className="relative cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr fro-zinc-800 to-zinc-700 border-2 border-white/10 overflow-hidden flex items-center justify-center">
              <span className="text-[28px] font-light text-white/40 tracking-tight">
                CI
              </span>
            </div>

            <div className="absolute bottom-0 right-0 p-2 bg-ink text-void rounded-full shadow-lg border border-void/20 transition-transform duration-200 hover:scale-105">
              <Camera size={14} fill="white" strokeWidth={2.5} />
            </div >
          </div>
          <p className="text-[14px] text-white/40 mt-3 tracking-wide">
            Tap
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-light text-white/50 px-0.5">
              Display Name
            </label>
            <input
              type="text"
              defaultValue="Christopher Igwe"
              className="w-full bg-ink/40 border/40 border border-white/5 rounded-xl px-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white focus:outline-none focus:border-white/20 transition-all duration-200"
              placeholder="Name seen on public actions"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-light text-white/50 px-0.5">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[16px] text-white/30 font-light">@</span>
              <input
                type="text"
                defaultValue="chris_igwe"
                className="w-full bg-ink/40 border border-white/5 rounded-xl pl-8 pr-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white focus:outline-none focus:border-white/20 transition-all duration-200"
                placeholder="your_handle"
              />
            </div>
          </div>

          <div>
            <label className="text-[14px] font-light text-white/50 px-0.5">
              Bio
            </label>
            <textarea
              rows={3}
              defaultValue="Coffee addict."
              className="w-full bg-ink/40 border borde-white/5 rounded-xl px-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white resize-none focus:outline-none focus:border-white/20 transition-all duration-200 leading-relaxed"
              placeholder="Tell the campus who you are..."
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase">Campus Credentials</p>
            <span className="text-[14px] font-medium tracking-wider text-white/40 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full">
              <GraduationCap size={14} /> Verified
            </span>
          </div>

          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
            <div className="p-4 flex justify-between items-center bg-white/[0.01]">
              <span className="text-[16px] font-light text-white/60">Faculty</span>
              <span className="text-[16px] font-medium text-white/90">Engineering</span>
            </div>
            <div className="p-4 flex justify-between items-center bg-white/[0.01]">
              <span className="text-[16px] font-light text-white/60">Department</span>
              <span className="text-[16px] font-medium text-white/90">Computer Engineering</span>
            </div>
            <div className="p-4 flex justify-between items-center bg-white/[0.01]">
              <span className="text-[16px] font-light text-white/60">Level</span>
              <span className="text-[16px] font-medium text-white/90">500 Level</span>
            </div>
          </div>
          <p className="text-[12px] text-white/30 px-1 leading-normal">
            Academic verification details are extracted from portal registration data and cannot be modified manually.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Marketplace Settings</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-4 gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Store className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Activate Campus Storefront</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Enables verification options to list gadgets, books, or fashion in the RSU Marketplace.</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSellerActive(!isSellerActive)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${isSellerActive ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${isSellerActive ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'} px-1`}>
                </div>
              </button>
            </div>

            {isSellerActive && (
              <div className="pt-3 border-t border-white/5 flex flex-col gap-3.5 animate-fadeIn">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-light text-white/50 px-0.5">Shop / Brand Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Chris Logistics or Threads Hub"
                    className="w-full bg-void/40 border border-white/5 rounded-xl px-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white focus:outline-none focus:border-white/20 transition-all duration-200"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-light text-white/50 px-0.5">Contact Link (WhatsApp / Telegram)</label>
                  <div className="relative flex items-center">
                    <Globe className="absolute left-3.5 text-[16px] text-white/30" size={16} />
                    <input 
                      type="url" 
                      placeholder="https://wa.me/..."
                      className="w-full bg-void/40 border border-white/5 rounded-xl pl-10 pr-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white focus:outline-none focus:border-white/20 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}