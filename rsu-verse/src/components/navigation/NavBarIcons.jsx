import { Home, Zap, Plus, ShoppingBag, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function NavBarIcons({ activeFilter, setActiveFilter, onPlusClick }) {
  const navigate = useNavigate();

  const handleNav = (filter, path = '/') => {
    setActiveFilter(filter)
    navigate(path)
  }
  return (
    <>
      <div className='flex justify-between bg-void fixed bottom-0 left-0 right-0 bg-void border-t border-white/10 p-5 text-white/70'>
        <button onClick={() => handleNav('all')}>
          <Home
            size={24}
            strokeWidth={2.5}
            style={{ transition: '200ms ease-in-out' }}
            fill={`${activeFilter === 'all'
              ? 'white'
              : 'transparent'}`}
            color={`${activeFilter === 'all' ? 'transparent' : 'currentColor'}`}
          />
        </button>

        <button onClick={() => handleNav('pulse')}>
          <Zap
            size={24}
            strokeWidth={2.5}
            style={{ transition: '300ms ease-in-out' }}
            fill={`${activeFilter === 'pulse'
              ? 'white'
              : 'transparent'}`}
            color={`${activeFilter === 'pulse'
              ? 'transparent'
              : 'currentColor'}`}
          />
        </button>

        <button onClick={onPlusClick}>
          <Plus
            size={24}
            strokeWidth={2.5}
            style={{ transition: '300ms ease-in-out' }}
            color={`${activeFilter === 'plus'
              ? 'white'
              : 'currentColor'}`}
          />
        </button>

        <button onClick={() => handleNav("market")}>
          <ShoppingBag
            size={24}
            strokeWidth={2.5}
            style={{ transition: '300ms ease-in-out' }}
            color={`${activeFilter === 'market'
              ? 'white'
              : 'currentColor'}`}
          />
        </button>

        <button onClick={() => {handleNav('chat')}}>
          <MessageCircle
            size={24}
            strokeWidth={2.5}
            style={{ transition: '300ms ease-in-out' }}
            fill={`${activeFilter === 'chat'
              ? 'white'
              : 'transparent'}`}
            color={`${activeFilter === 'chat'
              ? 'white'
              : 'currentColor'}`}
          />
        </button>

      </div>
    </>
  )
}