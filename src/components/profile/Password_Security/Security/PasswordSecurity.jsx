import { NavLink } from "react-router-dom";
import { ArrowLeft, Lock, Smartphone, Fingerprint, 
ShieldAlert, ChevronRight, Laptop, CheckCircle2
} from "lucide-react";

export function PasswordSecurity({showCurrentPassword, setShowCurrentPassword, showNewPassword, setShowNewPassword, twoFactorActive, setTwoFactorActive, biometricsActive, setBiometricsActive}) {


  return(
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink 
          to="/profile" 
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>
        <h1 className="text-[20px] font-bold">Password & Security</h1>
        <div className="w-9" /> 
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-7 px-4 pt-4">
        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Update Password</p>
          
          <div className="flex flex-col gap-4 bg-ink p-4 rounded-2xl border border-white/5">
            {/* Current Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[16px] font-light text-white/50 px-0.5">Current Password</label>
              <div className="relative flex items-center">
                <input 
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full bg-void/40 border border-white/5 rounded-xl px-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white focus:outline-none focus:border-white/20 transition-all duration-200"
                  placeholder="Enter current password"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3.5 text-[14px] font-medium text-white/40 hover:text-white/70 transition-colors"
                >
                  {showCurrentPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[16px] font-light text-white/50 px-0.5">New Password</label>
              <div className="relative flex items-center">
                <input 
                  type={showNewPassword ? "text" : "password"}
                  className="w-full bg-void/40 border border-white/5 rounded-xl px-3.5 py-2.5 text-[16px] font-normal tracking-wide text-white focus:outline-none focus:border-white/20 transition-all duration-200"
                  placeholder="Minimum 8 characters"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 text-[14px] font-medium text-white/40 hover:text-white/70 transition-colors"
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Action Trigger Button */}
            <button className="w-full bg-cyan text-white font-semibold text-[16px] py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] mt-1">
              Update Password
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Security</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 p-1">
            {/* Biometric Verification */}
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Fingerprint className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Biometric Authentication</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Use your device biometrics for faster sign in.</span>
                </div>
              </div>
              <button 
                onClick={() => setBiometricsActive(!biometricsActive)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${biometricsActive ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${biometricsActive ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>

            <div className="h-px bg-white/5 mx-4" />

            {/* Two-Factor Toggle */}
            <div className="p-3.5 flex items-start justify-between gap-4">
              <div className="flex gap-3 pt-0.5">
                <Lock className="text-white/60 shrink-0" size={20} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-medium text-white/90">Two-Step Verification (2FA)</span>
                  <span className="text-[14px] font-light text-white/40 leading-normal">Add an extra layer of security when signing in.</span>
                </div>
              </div>
              <button 
                onClick={() => setTwoFactorActive(!twoFactorActive)}
                className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative p-0.5 ${twoFactorActive ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${twoFactorActive ? 'translate-x-4 bg-white' : 'translate-x-0 bg-white/60'}`} />
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Active Sessions</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 overflow-hidden">

            <div className="p-4 flex items-center justify-between bg-white/[0.01]">
              <div className="flex gap-3.5 items-center">
                <div className="text-white/80 p-2 bg-void rounded-xl border border-white/5">
                  <Smartphone size={20} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] font-medium text-white">iPhone 15 Pro</span>
                    <span className="text-[14px] font-semibold bg-white/10 text-white/80 px-1.5 py-0.5 rounded-md tracking-wider uppercase scale-90">Current</span>
                  </div>
                  <span className="text-[14px] font-light text-white/40 mt-0.5">Port Harcourt • Active now</span>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-white/40 shrink-0" />
            </div>


            <div className="p-4 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
              <div className="flex gap-3.5 items-center">
                <div className="text-white/40 p-2 bg-void rounded-xl border border-white/5">
                  <Laptop size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-white/80">MacBook Pro (M3)</span>
                  <span className="text-[14px] font-light text-white/40 mt-0.5">Last active 3 hours ago</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </div>
          </div>

          {/* Device Authorization Flushing */}
          <button className="w-full bg-ink hover:bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between transition-colors duration-200 group cursor-pointer mt-1">
            <div className="flex gap-3 text-white/50 group-hover:text-white transition-colors duration-200">
              <ShieldAlert size={19} strokeWidth={1.8} />
              <span className="text-[16px] font-medium">Log out of other devices</span>
            </div>
            <ChevronRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors duration-200" />
          </button>
        </section>
      </main>
    </div>
  )
}