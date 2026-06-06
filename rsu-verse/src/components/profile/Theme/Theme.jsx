import { NavLink } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

export function Theme({selectedTheme, setSelectedTheme, Themes}) {

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink
          to="/profile"
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>
        <h1 className="text-[20px] font-semibold tracking-tight">Theme</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-7 px-4 pt-4">
        <section className="flex flex-col gap-3">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Appearance</p>

          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 overflow-hidden">
          {Themes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => setSelectedTheme(mode.theme)}
              className={`p-4 flex items-center justify-between cursor-pointer transition-colors duration-150 relative
                    border-b border-white/5
                    hover:bg-white/[0.01] active:bg-white/[0.02]
            `}
            >
              <div className="flex gap-3.5 items-center">
                <div className="shrink-0 flex items-center justify-center w-6 h-6">
                  {mode.icon}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[16px] font-medium transition-colors text-white`}>
                    {mode.theme}
                  </span>
                  <span className="text-[14px] font-light text-white/40 mt-0.5 leading-normal">

                  </span>
                </div>
              </div>

              {selectedTheme === mode.theme && (
                <Check size={18} className="text-white shrink-0 animate-scaleIn" strokeWidth={2.5} />
              )}
            </div>
          ))}
          </div>
        </section>
      </main>
    </div>
  )
}