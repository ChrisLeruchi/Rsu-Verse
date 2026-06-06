import { Bell } from "lucide-react"
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom"

export function Header({ activeFilter, setActiveFilter, isScrolled, setIsScrolled, isVisible, setIsVisible, lastScrollY, setLastScrollY }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);  
      }


      setLastScrollY(currentScrollY, lastScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <>
      <header className={`sticky top-0 left-0 right-0 flex items-center justify-between z-50 duration-300
      ${isVisible
          ? "translate-y-0"
          : "-translate-y-full"
        } 
      ${isScrolled
          ? "bg-void/80 backdrop-blur-md border-white/5 shadow-md"
          : "bg-void border-transparent"}`}>
        <NavLink to="/" onClick={() => setActiveFilter("all")}
          className="flex justify-start overflow-hidden cursor-pointer"
        >
          <img
            src="/favicon.ico" alt="verse-logo"
            className="w-20 object-contain"
          />
        </NavLink>

        <div className="flex items-center justify-end space-x-5 text-white/60">
          <button
            onClick={() => { setActiveFilter("notifications"); navigate("/notifications"); }}
            className={`hover:text-white transition-colors relative p-1 px-7 ${activeFilter === "notifications"
              ? "text-cyan"
              : ""
              }`}
          >
            <Bell
              size={24}
              strokeWidth={2.5}
            />
            <span className="absolute top-1 right-7 w-1.5 h-1.5 bg-rose rounded-full"></span>
          </button>
        </div>
      </header>
    </>
  )
}