import { Home, Search, ShoppingBag, UserCircle2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function NavBarIcons({ setActiveFilter }) {
  
  const handleFilter = () => {
    setActiveFilter("all")
  }

  const getIconStyles = (isActive, hasFill = false) => {
    if (hasFill) {
      return {
        fill: isActive ? 'white' : 'transparent',
        color: isActive ? 'transparent' : 'currentColor'
      }
    }
    return {
      color: isActive ? 'white' : 'currentColor'
    }
  }

  return (
    <div className='flex justify-between bg-void fixed bottom-0 left-0 right-0 border-t border-white/10 p-7 text-white/70'>

      {/* 1. Home / All Feed */}
      <NavLink to="/" end onClick={handleFilter}>
        {({ isActive }) => (
            <Home
              size={24}
              strokeWidth={2.5}
              className="transition-all duration-200 ease-in-out"
              {...getIconStyles(isActive, true)}
            />
        )}
      </NavLink>


      <NavLink to="/search">
        {({ isActive }) => (
          <Search
            size={24}
            strokeWidth={2.5}
            className="transition-all duration-300 ease-in-out"
            {...getIconStyles(isActive)}
          />
        )}
      </NavLink>



      <NavLink to="/market">
        {({ isActive }) => (
          <ShoppingBag
            size={24}
            strokeWidth={2.5}
            className="transition-all duration-300 ease-in-out"
            {...getIconStyles(isActive)}
          />
        )}
      </NavLink>

      <NavLink to="/profile">
        {({ isActive }) => (
          <UserCircle2
            size={24}
            strokeWidth={2.5}
            className="transition-all duration-300 ease-in-out"
            {...getIconStyles(isActive)}
          />
        )}
      </NavLink>

    </div>
  )
}