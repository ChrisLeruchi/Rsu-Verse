import { Bell, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Header({activeFilter, setActiveFilter}) {
  const navigate = useNavigate();

  return(
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-void/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div
          onClick={() => 
            {setActiveFilter("home"); navigate("/");}}
          className="text-sm font-black tracking-widest text-white cursor-pointer select-none"
        >
          RSU<span
            className="text-cyan text-xs ml-0.5"
          >VERSE</span>
        </div>

        <div className="flex items-center space-x-5 text-white/60">
            <button
              onClick={() => 
                {setActiveFilter("notifications"); navigate("/notifications");}}
              className={`hover:text-white transition-colors relative p-1 ${activeFilter === "notifications" 
                ? "text-cyan"
                : ""
              }`}
            >
              <Bell 
                size={18}
                strokeWidth={2.2}
              />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose rounded-full"></span>
            </button>

            <button 
              onClick={() => {
                setActiveFilter("menu"); navigate("/menu");
              }}
              className={`hover:text-white transition-colors p-1 ${activeFilter === "menu"
                ? "text-cyan"
                : ""
              }`}
            >
              <Menu 
                size={18}
                strokeWidth={2.2}
              />
            </button>
        </div>
      </header>
    </>
  )
}