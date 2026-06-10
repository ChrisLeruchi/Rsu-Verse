import { NavLink } from "react-router-dom";
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown
} from "lucide-react";

export function ContactUs({isOpen, setIsOpen, selectedTopic, setSelectedTopic, message, setMessage, isSubmitted, attachment, setAttachment, topics, handleSubmit}) {

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen bg-void text-white items-center justify-center px-6 text-center">
        <div className="p-4 bg-white/5 rounded-full text-white mb-4 animate-scaleIn">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-[20px] font-bold tracking-tight">Message sent</h2>
        <p className="text-[14px] text-white/40 font-light mt-2 max-w-xs leading-normal">
          Thanks for reaching out. A student support representative will review your message and reply to your campus email shortly.
        </p>
        <NavLink 
          to="/profile" 
          className="mt-6 bg-white text-void font-semibold text-[14px] px-6 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
        >
          Back to Profile
        </NavLink>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-screen pb-28 bg-void text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
        <NavLink 
          to="/profile" 
          className="p-1 text-white/60 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </NavLink>
        <h1 className="text-[20px] font-semibold tracking-tight">Contact Support</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-6 px-4 pt-4">
     
        <section className="bg-ink rounded-2xl border border-white/5 p-4 flex gap-3 items-start">
          <AlertCircle size={18} className="text-white/40 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-medium text-white/90">Typical response time</span>
            <span className="text-[14px] font-light text-white/40 leading-normal">
              We are online from 8:00 AM to 6:00 PM on school days and usually respond within a couple of hours.
            </span>
          </div>
        </section>

   
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
         
          <div className="flex flex-col gap-1.5 relative z-50">
            <label className="text-[16px] font-light text-white/50 px-0.5">What do you need help with?</label>
       
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-ink border border-white/5 rounded-xl px-4 py-3.5 text-[16px] font-normal text-left text-white focus:outline-none focus:border-white/20 transition-all flex items-center justify-between"
            >
              <span className={selectedTopic ? "text-white" : "text-white/30"}>
                {selectedTopic ? selectedTopic.label : "Select a topic"}
              </span>
              <ChevronDown 
                size={16} 
                className={`text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
              />
            </button>

       
            {isOpen && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-ink border border-white/10 rounded-xl shadow-xl overflow-hidden animate-scaleIn">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[16px] text-white/80 hover:text-white hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors border-b border-white/5 last:border-none"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[16px] font-light text-white/50 px-0.5">Your message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Describe your issue or question in detail..."
              className="w-full bg-ink border border-white/5 rounded-xl px-3.5 py-3 text-[16px] font-normal tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[16px] font-light text-white/50 px-0.5">Attachment (Optional)</label>
            <label className="w-full bg-ink border border-dashed border-white/10 hover:border-white/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => setAttachment(e.target.files[0]?.name || null)}
              />
              <Paperclip size={18} className="text-white/30 group-hover:text-white/50 transition-colors" />
              <span className="text-[14px] font-light text-white/40 group-hover:text-white/60 transition-colors">
                {attachment ? attachment : "Attach a screenshot or image"}
              </span>
            </label>
          </div>

      
          <button 
            type="submit"
            disabled={!selectedTopic || !message}
            className="w-full bg-cyan text-white disabled:opacity-40 disabled:pointer-events-none font-semibold text-[16px] py-3 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            <Send size={15} />
            <span>Send Message</span>
          </button>

        </form>

      </main>
    </div>
  );
}