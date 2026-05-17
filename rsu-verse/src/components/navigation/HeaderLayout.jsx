import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { NavBarIcons } from "./NavBarIcons";

export function HeaderLayout({activeTab, setActiveTab, onPlusClick}) {
  return(
    <>
    <div className="min-h-screen bg-void flex flex-col">
      <Header
        activeTab = {activeTab}
        setActiveTab = {setActiveTab}
      />

      <main className="flex-1 mt-16 pb-24 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>

      <NavBarIcons 
        activeTab = {activeTab}
        setActiveTab = {setActiveTab}
        onPlusClick = {onPlusClick} 
      />

    </div>
    </>
  );
};