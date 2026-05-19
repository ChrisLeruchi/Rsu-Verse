import { Home, Zap, Plus, ShoppingBag, MessageCircle } from 'lucide-react'

export function NavBarIcons() {
  return (
    <>
      <div className='flex justify-between bg-void fixed bottom-0 left-0 right-0 bg-void border-t border-white/10 p-5 text-white/70'>
        <div>
          <Home
            size={24}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <Zap
            size={24}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <Plus
            size={24}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <ShoppingBag
            size={24}
            strokeWidth={2.5}
          />
        </div>

        <div>
          <MessageCircle
            size={24}
            strokeWidth={2.5}
          />
        </div>

      </div>
    </>
  )
}