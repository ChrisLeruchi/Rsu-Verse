import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function HeaderLayout({ activeFilter, setActiveFilter, isScrolled, setIsScrolled, isVisible, setIsVisible, lastScrollY, setLastScrollY }) {
  return (
    <>
      <div className="min-h-screen bg-void flex flex-col">
        <Header
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          isScrolled={isScrolled}
          isVisible={isVisible}
          lastScrollY={lastScrollY}
          setIsScrolled={setIsScrolled}
          setIsVisible={setIsVisible}
          setLastScrollY={setLastScrollY}
        />

        <main className="flex-1 pb-24 overflow-y-auto no-scrollbar">
          <Outlet />
        </main>
      </div>
    </>
  );
};