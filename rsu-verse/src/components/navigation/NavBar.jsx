import { NavBarIcons } from "./NavBarIcons";

export function NavBar({activeTab, setActiveTab, handlePlusClick, setActiveFilter}) {
  return (
    <>
      <NavBarIcons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveFilter={setActiveFilter}
        onPlusClick={handlePlusClick}
      />
    </>
  )
}