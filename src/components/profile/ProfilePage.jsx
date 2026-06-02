import { Bell, UserCircle2, LockKeyholeIcon, ArrowRight, NotebookText, SunMoon, EyeOff, HelpCircle, Mail } from "lucide-react"
import { NavLink } from "react-router-dom"

export function ProfilePage({selectedTheme}) {
  return (
    <>
      <div
        className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-25 bg-void"
      >
        <header className="sticky top-0 z-50 flex items-center justify-center px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
          <h1 className="text-[24px] font-bold  flex justify-center">
            Profile
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto flex flex-col gap-6 px-4 pt-4">
          <div className="flex gap-4 px-1 items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 border border-white/10 shrink-0" />
            <div>
              <h1 className="text-[20px] font-semibold text-white">Christopher Igwe</h1>
              <p className="text-[15px] text-white/50 font-light">chrisigwe@gmail.com</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="flex flex-col gap-3 text-[20px]">
            <p className="font-semibold text-white/90 text-[18px] px-1">Account</p>
            <div className="flex flex-col bg-ink rounded-xl border border-white/5 overflow-hidden">
              <NavLink
                to='/manage_profile'
              >
                <div className="p-4 flex items-center border-b border-white/5 justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <UserCircle2 size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Manage Profile</span>
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>

              <NavLink to="/password_security">
                <div className="p-4 flex items-center border-b border-white/5 justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <LockKeyholeIcon size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Password & Security</span>
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>

              <NavLink
                to="/notification_settings"
              >
                <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <Bell size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Notifications</span>
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="flex flex-col gap-3 text-[20px]">
            <p className="font-semibold  text-white/90 text-[18px] px-1">Preferences</p>
            <div className="flex flex-col bg-ink rounded-xl border border-white/5 overflow-hidden">
              <NavLink
                to='/theme_settings'
              >
                <div className="p-4 flex items-center border-b border-white/5 justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <SunMoon size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Theme</span>
                  </div>
                  <div className="flex gap-2 items-center text-white/40 group-hover:text-white/80 transition-colors">
                    <span className="text-[14px] font-light">{selectedTheme}</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>
              <NavLink
                to='/privacy-safety'>
                <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <EyeOff size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Privacy & Safety</span>
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Support Section */}
          <div className="flex flex-col gap-3 text-[20px]">
            <p className="font-semibold text-white/90 text-[18px] px-1">Support</p>
            <div className="flex flex-col bg-ink rounded-xl border border-white/5 overflow-hidden">
              <NavLink to='/about_verse'>
                <div className="p-4 flex items-center border-b border-white/5 justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <NotebookText size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">About Verse</span>
                  </div>

                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>

              <NavLink to='/help_center'>
                <div className="p-4 flex items-center border-b border-white/5 justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <HelpCircle size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Help Center</span>
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>
              <NavLink to='/contact_us'>
                <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex gap-3 text-white/80 group-hover:text-white transition-colors">
                    <Mail size={22} strokeWidth={1.8} />
                    <span className="text-[18px]">Contact Us</span>
                  </div>
                  <div className="text-white/40 group-hover:text-white/80 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}