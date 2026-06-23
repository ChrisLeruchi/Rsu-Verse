import { ThemeTokens } from "../hooks/theme";
import { ShoppingBag, MessagesSquare, Flame, Music, Landmark, HeartHandshake } from "lucide-react-native";

export function verses() {
  const getVerseIcon = (verse) => {
    switch (verse) {
      case "market": return <ShoppingBag size={18} color={ThemeTokens.colors.dark.accent} />;
      case "gist": return <MessagesSquare size={18} color={ThemeTokens.colors.dark.accent} />;
      case "confession": return <Flame size={18} color={ThemeTokens.colors.dark.warning} />;
      case "music": return <Music size={18} color={ThemeTokens.colors.dark.accent} />;
      case "politics": return <Landmark size={18} color={ThemeTokens.colors.dark.accent} />;
      case "relationship": return <HeartHandshake size={18} color={ThemeTokens.colors.dark.accent} />;
      default: return <MessagesSquare size={18} color={ThemeTokens.colors.dark.accent} />;
    }
  };

  return {
    getVerseIcon
  }
}