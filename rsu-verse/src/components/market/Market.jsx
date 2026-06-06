import { useState } from "react";
import { ShoppingBag, Search, Tag, ArrowUpRight} from "lucide-react";


export function Market({ posts = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const marketItems = posts.filter(post => {
    if (post.verse !== "market") return false;

    const matchesSearch = post.content?.text?.toLowerCase().includes(searchQuery.toLowerCase()) || post.marketPlace?.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || post.marketPlace?.category?.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory;
  })

  const handleMakeOffer = (item) => {
    const sellerPhone = "07032848480";
    const textMessage = `Hello, I saw your listing for "${item.content?.text?.substring(0, 30)}..." on RSU Verse. Is it still available?`;
    window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(textMessage)}`, "_blank")
  }

  return (
    <div
      className="w-full max-w-md mx-auto flex flex-col min-h-screen bg-void px-4 pb-12 pt-5">
      <header className="flex sticky">
        <h4 className="text-[28px] font-bold  text-cyan">Shop</h4>
      </header>
      <div className="sticky top-1 bg-void/90 backdrop-blur-md pt-4 pb-3 z-30 flex flex flex-col gap-3 border-b border-white/5">
        <div className="flex be-ink border border-white/5 focus-within:border-cyan/30 rounded-xl items-center px-3.5 gap-2.5 transition-all">
          <Search size={18} className="text-white/30 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gadgets, books, bedspaces..."
            className="bg-transparent py-2.5 text-[18px] text-white/90 placeholder-white/30 w-full outline-none font-sans"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "all", label: "All Items" },
            { id: "gadgets", label: "Gadgets" },
            { id: "books", label: "Books" },
            { id: "fashion", label: "Fashion" },
            { id: "hostels", label: "Hostels" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-[16px] font-sans uppercase  px-3.5 py-1.5 rounded-lg border transition-all duration-200 whitespace-nowrap ${selectedCategory === cat.id
                ? 'by-cyan/10 text-cyan border-cyan/20 glow-cyan'
                : 'bg-ink/40 text-white border-transparent hover:text-white/60'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      {marketItems.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center space-y-2">
          <ShoppingBag size={28} className="text-white/10 animate-pulse" />
          <p className="text-[20px] font-sans text-white/30 ">
            Search not found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {marketItems.map((item) => (
            <div
              key={item.id}
              className="bg-ink border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-white/10 group relative overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full aspect-square  bg-void overflow-hidden border border-white/5 relative">
                  {item.content?.images && item.content.images.length > 0 ? (
                    <img
                      src={item.content.images[0]} alt="Market asset fil"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <Tag size={16} />
                    </div>
                  )}
                  <span className="absolute top-1.5 right-1.5 text-[14px] font-sans  bg-void/80 backdrop-blur px-2 py-1 rounded-md border border-white/10 text-white/60">
                    {item.marketPlace?.condition}
                  </span>
                </div>

                <div className="px-1 flex flex-col gap-0.5">
                  <h4 className="text-[18px] font-semibold text-white/90 line-clamp-2 min-h-[32px] leading-tight ">
                    {item.content?.text}
                  </h4>
                </div>
              </div>
              <div className=" pt-2 border-t border-white/5 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-[16px] font-black  text-white px-1 ">
                    ₦{item.marketPlace?.price?.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => handleMakeOffer(item)}
                  className="w-full bg-cyan font-bold text-[16px] py-2  flex items-center justify-center gap-1 active:scale-95 transition-transform duration-150 shadow-md shadow-cyan/5 hover:bg-cyan/90"
                >
                  <span>Buy Now</span>
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}