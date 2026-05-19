import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function HeaderLayout({activeFilter, setActiveFilter}) {
  return(
    <>
    <div className="min-h-screen bg-void flex flex-col">
      <Header
        activeFilter = {activeFilter}
        setActiveFilter = {setActiveFilter}
      />

      <main className="flex-1 mt-16 pb-24 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>
    </div>
    </>
  );
};