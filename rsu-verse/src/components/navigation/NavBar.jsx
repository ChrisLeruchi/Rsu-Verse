import { NavBarIcons } from "./NavBarIcons";

export function NavBar({activeFilter, setActiveFilter, handlePlusClick}) {
  return (
    <>
      <NavBarIcons
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onPlusClick={handlePlusClick}
      />
    </>
  )
}