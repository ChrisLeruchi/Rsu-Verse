import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ShoppingBag, MessagesSquare, ArrowLeft, Sparkles, Image, Shield, ShieldAlert } from "lucide-react";

export function CreatePost({ setPosts }) {
  const navigate = useNavigate();
  const [verse, setVerse] = useState("gist");
  const [text, setText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Used");
  const [imageUrl, setImageUrl] = useState("");

  const [category, setCategory] = useState("general");

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let themeConfig = {
      bg: "bg-lavender/10",
      text: "text-lavender",
      glow: "glow-lavender",
      border: "border-lavender/20"
    };
    if (verse === "pulse") {
      themeConfig = {
        bg: "bg-rose/10",
        text: "text-rose",
        glow: "glow-rose",
        border: "border-rose/20"
      };
    }
    if (verse === "market") {
      themeConfig = {
        bg: "bg-cyan/10",
        text: "text-cyan",
        glow: "glow-cyan",
        border: "border-cyan/20"
      };
    }


    const newTransmission = {
      id: `rsu-verse-${crypto.randomUUID()}`,
      verse,
      author: {
        name: isAnonymous ? "Anonymous Rabbit" : "Chris L",
        Faculty: "Engineering",
        Department: "Comp Eng",
        Level: "500",
        rating: 4.7,
        totalSales: verse === "market" ? 14 : ""
      },
      content: {
        text: text,
        images: imageUrl.trim() ? [imageUrl.trim()] : [],
        tags: verse === "market" ? [category.toLowerCase()] : [verse.toUpperCase()]
      },
      meta: {
        createdAt: new Date().toISOString(),
        location: "RSU",
        edited: false
      },
      engagement: {
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        repost: 0
      },
      theme: themeConfig,
      ...(verse === "market" && {
        marketPlace: {
          price: Number(price) || 0,
          condition: condition
        }
      })
    };


    setPosts((prevPosts) => [newTransmission, ...prevPosts]);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-cyan/30 max-w-md mx-auto border-x border-white/5">
      <header className="flex justify-between items-center h-24 px-4">
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} />
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <p>New Post</p>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={handleBroadcast}
            disabled={!text.trim() || (verse === "market" && !price)}
            className="bg-white text-void font-bold text-xs px-4 py-2 rounded-lg disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 duration-200"
          >
            Share
          </button>
        </div>
      </header>
      <div className="p-3 flex items-center gap-3 font-bold text-white/100 tracking-tight">
        <div className=" w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
        <div>
          <h4>Chiamaka Morah</h4>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        <label className="text-[10px] font-sans tracking-wider text-white/30 uppercase">
          Select Verse
        </label>
        <div className="grid grid-cols-3 gap-2 bg-ink p-1 rounded-xl border border-white/5">
          {[
            { id: 'gist', label: 'Gist', icon: <MessagesSquare size={14} />, activeClass: 'bg-lavender/10 text-lavemder border-lavender/20' },
            { id: 'pulse', label: 'Pulse', icon: <Zap size={14} />, activeClass: 'bg-rose/10 text-rose border-rose/20' },
            { id: 'market', label: 'Market', icon: <ShoppingBag size={14} />, activeClass: 'bg-cyan/10 text-cyan border-cyan/20' }
          ].map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => setVerse(channel.id)}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg  text-xs font-semibold border transition-all duration-300 ${verse === channel.id
                ? channel.activeClass
                : 'bg-transparent text-white/40 border-transparent hover:text-white/70'
                }`}
            >
              {channel.icon}
              <span>{channel.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="p-3 flex flex-col gap-2 flex-1 min-h-[250px]">
        <div className="bg-ink rounded-xl borderborder-white/5 p-4 flex flex-col gap-3 focus-within:border-white/10 transition-colors flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              verse === "market" ? "What do you want to sell?..." : verse === "pulse" ? "What's happening in Campus?..." : "What's on your mind?..."
            }
            className="bg-transparent text-white/90 placeholder-white/20 text-[15px] leading-relaxed resize-none w-full flex-1 outline-none min-h-[140px] maxLength = {600}"
          />

        </div>
      </div>
      {verse === "market" && (
        <div className="flex flex-col gap-4 b-ink border- border-white/5 p-3 rounded-xl">
          <div className="text-xs font-mono tracking-wid text-cyan flex items-center gap-1.5 mb-1">
            ITEM SPEC
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider text-white/40">
                PRICE (₦)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g 10000"
                className="bg-surface border-white/5 rounded-lg px-3 py-2 text-sm font-mono text-white focus:border-cyan/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider text-white/40">
                CONDITION
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="bg-surface border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus: border-cyan/40 appearance-none outline-none"
              >
                <option value="Brand New">Brand New</option>
                <option value="Used">Used</option>
                <option value="Fixable">Needs Repair</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider text-white/40">IMAGE URL (TEMPORARY DEV INJECTION)</label>
            <div className="flex bg-surface border border-white/5 rounded-lg items-center px-3 gap-2">
              <Image size={14} className="text-white/30" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste direct Url to picture of product"
                className="bg-transparent py-2 text-xs font-mono text-white w-full outline-none"
              />
            </div>
          </div>
        </div>
      )}
      <div className="p-3">
        <div className="bg-ink border border-white/5 rounded-xl px-3 py-4 flex items-center justify-between gap-4">
          <div className="flex gap-3 items-start min-w-0">
            <div className="p-2 bg-void rounded-lg border border-white/5 shrink-0 text-white/40">
              <ShieldAlert size={16} />
            </div>
            <div className="flex flex-col min-w-0" >
              <h5 className="text-xs font-semibold text-white/90">
                Post Anonymously
              </h5>
              <p className="text-[10px] text-white/40 leading-normal mt-0.5 truncate">
                Your name and profile will be hidden from other students.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            disabled={verse === "pulse"} // Pulse alerts are strictly official/public broadcast actions
            className={`w-10 h-6 rounded-full transition-colors relative outline-none shrink-0 disabled:opacity-20 ${isAnonymous ? "bg-cyan" : "bg-white/10"
              }`}
          >
            <span className={`absolute top-1 left-1 bg-void w-4 h-4 rounded-full transition-transform ${isAnonymous ? "translate-x-4" : "translate-x-0"
              }`} />
          </button>
        </div>
      </div>
    </div>
  );

}