import { View, ScrollView, StyleSheet, Pressable, Text } from "react-native";
import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, Clock } from "lucide-react-native";
import { HapticEngine } from "../../../haptics";
import { ThemeTokens } from "../../theme";


export function FeedFilter({ activeFilter, setActiveFilter, selectedTheme, setSelectedTheme }) {

  const filters = [
    { id: "all", label: "Versn'", icon: null, isRose: false },
    { id: "new", label: "New", icon: Clock, isRose: false },
    { id: "gist", label: "Gist", icon: MessagesSquare, isRose: false },
    { id: 'confession', label: "Confession", icon: Flame, isRose: true },
    { id: "music", label: "Music", icon: Music, isRose: false },
    { id: "politics", label: "Politics", icon: Landmark, isRose: false },
    { id: "relationship", label: "Relationship", icon: HeartHandshake, isRose: false },
  ]

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;


  return (
    <View style={styles.stickyContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, {backgroundColor: themeColor.background, borderBottomColor: themeColor.surface}]}
      >
        {filters.map((verse) => {
          const Icon = verse.icon
          const isActive = activeFilter === verse.id

          let activeBorderColor = "#00BA34"
          let activeTextColor = themeColor.textPrimary;
          const inactiveColor = "rgba(255, 255, 255, 0.3)"

          if (verse.isRose) {
            activeBorderColor = "#F59E0B"
            activeTextColor = "#F59E0B";
          }

          return (
            <Pressable
              key={verse.id}
              onPress={() => {
                HapticEngine.selection();
                setActiveFilter(verse.id)
              }}
              style={[
                styles.tabButton,
                isActive ? {
                  borderBottomColor: activeBorderColor
                } : styles.borderTransparent
              ]}
            >
              {Icon && (
                <Icon
                  size={16}
                  strokeWidth={2.5}
                  color={isActive ? activeBorderColor : themeColor.textSecondary}
                />
              )}
              <Text
                style={[
                  styles.tabText, 
                  {color: isActive ? activeTextColor : themeColor.textSecondary}
                ]}
              >
                {verse.label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  stickyContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },

  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabButton: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 6,
    borderBottomWidth: 4,
  },
  borderTransparent: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)'
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  textInactive: {
    color: "rgba(255, 255, 255, 0.3)",
  },
});