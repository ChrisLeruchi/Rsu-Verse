import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, MessagesSquare, ArrowLeft, Image, ShieldAlert, X, Flame, Landmark, Music, HeartHandshake } from "lucide-react";

export function CreatePost({ setPosts, setActiveFilter }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null)
  const [verse, setVerse] = useState("gist");
  const [text, setText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Used");
  const [images, setImages] = useState([]);

  const [category, setCategory] = useState("general");

const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (images.length + files.length > 4) {
      alert("Maximum of 4 images allowed per post.")
      return;
    }

    const conversionPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Strings = await Promise.all(conversionPromises);
      setImages((prevImages) => [...prevImages, ...base64Strings]);
    } catch (error) {
      console.error("Failed to read image files: ", error);
    }
  };


  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handlePriceKeyDown = (e) => {

    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (allowedKeys.includes(e.key)) {
      return;
    }


    if (!/^[0-890-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (verse === "gist" && !text.trim() && images.length === 0) return;

    if (verse === "market" && (!text.trim() || !price)) return;

    setIsSubmitting(true)

    let themeConfig = {
      bg: "bg-lavender/10",
      text: "text-lavender",
      glow: "glow-lavender",
      border: "border-lavender/20"
    };

    if (verse === "market") {
      themeConfig = {
        bg: "bg-cyan/10",
        text: "text-cyan",
        glow: "glow-cyan",
        border: "border-cyan/20"
      };
    }

    const displayName = isAnonymous && verse !== "market" ? "Engineering" : "Christopher Igwe Leruchi";

    const displayHandle = "Comp Eng"

    const newTransmission = {
      id: `rsu-verse-${crypto.randomUUID()}`,
      verse,
      time: "Just Now",
      author: {
        anonymous: verse === "market" ? false : isAnonymous,
        name: displayName,
        department: displayHandle,
        faculty: displayName,
        Department: "Comp Eng",
        Level: "500",
        rating: 4.7,
        totalSales: verse === "market" ? 14 : ""
      },
      content: {
        text: text,
        images: images,
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
        reposts: 0
      },
      userInteraction: {
        voteStatus: null,
        reposts: false,
        saved: false
      },
      theme: themeConfig,
      ...(verse === "market" && {
        marketPlace: {
          price: Number(price) || 0,
          condition: condition,
          description: text,
          category: category
        }
      })
    };

    setPosts((prevPosts) => [newTransmission, ...prevPosts]);
    setIsSubmitting(false);

    if (verse === "market") {
      navigate("/market");
    } else {
      setActiveFilter("all");
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-void text-white font-sans selection:bg-cyan/30 max-w-md mx-auto border-x border-white/5 overflow-hidden pb-25">
      <header className="flex justify-between items-center h-24 px-4">
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => {
              setActiveFilter("all")
              navigate('/')
            }}
            disabled={isSubmitting}
            className="disabled:opacity-30"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="flex-1 text-[24px] font-bold  flex justify-start">
          <p>New Post</p>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={handleBroadcast}
            disabled={verse === "market"
              ? (isSubmitting || !text.trim() || !price || images.length === 0)
              : (!text.trim() && images.length === 0)}
            className={`${verse === 'confession' ? 'bg-rose' : 'bg-lavender'} font-bold text-[18px] px-4 py-2 rounded-lg disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 duration-200`}
          >
            {isSubmitting ? "Sharing..." : "Share"}
          </button>
        </div>
      </header>
      <main className="overflow-y-auto flex-1 flex flex-col gap-2 no-scrollbar min-h-0">
        <div className="p-3 flex items-center gap-3 font-semibold text-white/100 shrink-0">
          <div className=" w-12 h-12 rounded-full shrink-0 bg-gradient-to-tr from-black to-gray-500 flex-shrink-0" />
          <div className="text-[20px]">
            <h4>{isAnonymous && verse !== "market" ? "Comp Eng" : "Christopher Igwe"}</h4>
          </div>
        </div>
        <div className="p-3 flex flex-col gap-6 shrink-0">
          <label className="text-[18px] font-sans  text-white/30 uppercase">
            Select Verse
          </label>
          <div className="flex items-center overflow-x-scroll gap-2 bg-ink border border-white/5 scrollbar-none">
            {[
              { id: 'gist', label: 'Gist', icon: <MessagesSquare size={16} />, activeClass: 'bg-lavender/10 text-lavender border-lavender/20' },
              { id: 'market', label: 'Market', icon: <ShoppingBag size={16} />, activeClass: 'bg-cyan/10 text-cyan border-cyan/20' },
              { id: 'confession', label: 'Confession', icon: <Flame size={16} />, activeClass: 'bg-rose/10 text-rose border-rose/20' },
              { id: 'music', label: 'Music', icon: <Music size={16} />, activeClass: 'bg-cyan/10 text-cyan border-cyan/20' },
              { id: 'politics', label: 'Politics', icon: <Landmark size={16} />, activeClass: 'bg-cyan/10 text-cyan border-cyan/20' },
              { id: 'relationship', label: 'Relationship', icon: <HeartHandshake size={16} />, activeClass: 'bg-cyan/10 text-cyan border-cyan/20' },
            ].map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => setVerse(channel.id)}
                className={`flex items-center justify-center gap-1.5 py-2.5  text-[18px] font-semibold border transition-all duration-300 min-w-35 shrink-0 ${verse === channel.id
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
        <div className="p-3 shrink-0 flex flex-col gap-2 min-h-[280px]">
          <div className="bg-ink rounded-xl border border-white/5 p-4 flex flex-col gap-3 focus-within:border-white/10 transition-colors flex-1">
            <textarea
              value={text}
              maxLength={500}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                verse === "market" ? "Describe what you want to sell..." : "What's on your mind?..."
              }
              className="bg-transparent text-white/90 placeholder-white/20 text-[18px] leading-relaxed resize-none w-full outline-none min-h-[120px]"
            />
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-[180px] overflow-y-auto no-scrollbar pb-1">
                {images.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-void">
                    <img src={url} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1.5 right-1.5 bg-black/80 hover:bg-black p-1 rounded-full text-white/80 hover:text-white transition-colors border border-white/5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors group text-[16px] font-medium p-1 rounded-md`}
              >
                <Image size={20}
                  className={` ${verse === 'confession' ? 'text-rose' : 'text-cyan' } 
                  group-hover:scale-105 transition-transform
                  `}
                />
                <span>Media</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="flex items-center gap-2.5 text-[14px] text-white/30 font-sans tabular-nums">
                <span className={text.length >= 480 ? "text-rose/70 font-semibold" : ""}>
                  {text.length}/500
                </span>
                {images.length > 0 && (
                  <>
                    <span className="text-white/10 text-[10px]">•</span>
                    <span>{images.length} attached</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {verse === "market" && (
          <div className="flex flex-col shrink-0 gap-4 bg-ink border border-white/5 p-3 rounded-xl">
            <div className="text-[18px] font-sans text-cyan flex items-center gap-1.5 mb-1">
              ITEM SPEC
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[18px] font-sans  text-white/30">
                  PRICE (₦)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || Number(val) >= 0) {
                      setPrice(val)
                    }
                  }}
                  onKeyDown={handlePriceKeyDown}
                  placeholder="e.g 10000"
                  className="border-2 border-solid border-white/30 w-full bg-void rounded-lg px-3 py-2 text-white text-[18px] focus:border-lavender/40 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none scrollbar-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[18px] font-sans text-white/30">
                  CONDITION
                </label>
                <div className="grid grid-cols-3 gap-2 bg-void p-1 rounded-lg border border-white/5">
                  {["Brand New", "Used", "Fixable"].map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setCondition(cond)}
                      className={`py-2 text-[16px] font-medium rounded-md border transition-all duration-200 ${condition === cond
                        ? "bg-cyan/10 border-cyan/20 font-semibold "
                        : "bg-transparent text-white/40 border-transparent hover:text-white/60"
                        }`}
                    >
                      {cond === "Fixable"
                        ? "Needs Repair"
                        : cond
                      }
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[18px] font-sans text-white/30">
                  CATEGORY
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Gadgets", "Books", "Fashion", "Hostels"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 text-[16px] font-medium rounded-md border transition-all text-left flex justify-between items-center ${category === cat
                        ? "bg-cyan/10 text-cyan border-cyan/20 font-semibold"
                        : "bg-void text-white/40 border-white/5 hover:text-white/60"
                        }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(6,182,212,0.5)]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {verse !== 'market' ? (
          <div className="p-3 shrink-0">
            <div className="bg-ink border border-white/5 rounded-xl px-3 py-4 flex items-center justify-between gap-4">
              <div className="flex gap-3 items-start min-w-0">
                <div className="p-2 bg-void rounded-lg border border-white/5 shrink-0 text-white/40">
                  <ShieldAlert size={18} />
                </div>
                <div className="flex flex-col min-w-0" >
                  <h5 className="text-[18px] font-semibold text-white/100">
                    Post Anonymously
                  </h5>
                  <p className="text-[16px] text-white/30 leading-normal mt-0.5 truncate">
                    Your department will be displayed
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-10 h-6 rounded-full transition-colors relative outline-none shrink-0 disabled:opacity-20 ${verse === 'confession' ? isAnonymous ? "bg-rose" : "bg-white/10"
                  :  isAnonymous ? "bg-lavender" : "bg-white/10"}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isAnonymous ? "translate-x-4" : "translate-x-0"
                  }`} />
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );

}