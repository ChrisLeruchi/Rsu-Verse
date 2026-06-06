import { NavLink } from "react-router-dom";
import { ArrowLeft, Search, Store, MessageSquare, UserCheck, ChevronRight, MessageCircle } from "lucide-react";

export function HelpCenter({searchQuery, setSearchQuery}) {
  
  const popularArticles = [
    {
      id: "market-safety",
      title: "How to buy and sell safely on campus",
      category: "Marketplace",
      icon: <Store size={16} className="text-white/40" />
    },
    {
      id: "anon-works",
      title: "How anonymous posts protect your identity",
      category: "Privacy",
      icon: <MessageSquare size={16} className="text-white/40" />
    },
    {
      id: "verification",
      title: "Fixing student verification issues",
      category: "Account",
      icon: <UserCheck size={16} className="text-white/40" />
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink 
          to="/profile" 
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>
        <h1 className="text-[20px] font-semibold tracking-tight">Help Center</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-7 px-4 pt-4">
        <section className="flex flex-col gap-4 px-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-bold tracking-tight">How can we help?</h2>
            <p className="text-[16px] text-white/40 font-light">Search for guides or browse campus help topics.</p>
          </div>
          
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-white/30" size={20} />
            <input 
              type="text" 
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-ink border border-white/5 rounded-xl pl-11 pr-4 py-3 text-[16px] font-normal text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200"
            />
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Popular Articles</p>
          
          <div className="flex flex-col bg-ink rounded-2xl border border-white/5 overflow-hidden">
            {popularArticles.map((article, index) => (
              <NavLink 
                key={article.id}
                to={`/profile/help/${article.id}`} 
                className={`p-4 flex items-center justify-between hover:bg-white/[0.01] active:bg-white/[0.02] transition-colors group
                  ${index !== popularArticles.length - 1 ? 'border-b border-white/5' : ''}
                `}
              >
                <div className="flex gap-3.5 items-center">
                  <div className="p-2 bg-void rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                    {article.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[16px] font-medium text-white/90 group-hover:text-white transition-colors">{article.title}</span>
                    <span className="text-[14px] font-light text-white/40">{article.category}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:text-white/40 transition-colors" />
              </NavLink>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <p className="text-[14px] font-medium tracking-wide text-white/30 uppercase px-1">Browse Topics</p>
          
          <div className="grid grid-cols-2 gap-3">
            <NavLink to="/profile/help/topics/market" className="p-4 bg-ink border border-white/5 rounded-2xl flex flex-col gap-3 hover:bg-white/[0.01] active:bg-white/[0.02] transition-colors group">
              <Store size={20} className="text-white/50" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] font-medium text-white/90">Marketplace</span>
                <span className="text-[14px] font-light text-white/40">Selling guidelines & tips</span>
              </div>
            </NavLink>

            <NavLink to="/profile/help/topics/privacy" className="p-4 bg-ink border border-white/5 rounded-2xl flex flex-col gap-3 hover:bg-white/[0.01] active:bg-white/[0.02] transition-colors group">
              <MessageSquare size={20} className="text-white/50" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] font-medium text-white/90">Anonymity</span>
                <span className="text-[14px] font-light text-white/40">How your data stays safe</span>
              </div>
            </NavLink>
          </div>
        </section>

        <section className="mt-2">
          <div className="bg-ink rounded-2xl border border-white/5 p-4 flex flex-col gap-4 text-center items-center">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-medium text-white/90">Still need help?</span>
              <span className="text-[14px] font-light text-white/40 max-w-xs leading-normal">
                If you can't find an answer, chat directly with a student support representative.
              </span>
            </div>
            
            <NavLink 
              to="/profile/contact" 
              className="w-full bg-cyan text-white font-semibold text-[14px] py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Contact Support</span>
            </NavLink>
          </div>
        </section>
      </main>
    </div>
  )
}