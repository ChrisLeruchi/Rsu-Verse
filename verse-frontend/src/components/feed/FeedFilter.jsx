import { useState, useEffect, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView, StyleSheet, Pressable, Text, Animated, useWindowDimensions } from "react-native";
import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, Clock } from "lucide-react-native";
import { HapticEngine } from "../../../haptics";
import { ThemeTokens } from "../../theme";


export function FeedFilter({ activeFilter, setActiveFilter, selectedTheme, setSelectedTheme, feedRef }) {

  const [layouts, setLayouts] = useState({});
  const { width: screenWidth } = useWindowDimensions();
  const filterScrollRef = useRef(null);
  const indicatorPosition = useRef(new Animated.Value(0)).current
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveFilter('all');
      };
    }, [])
  );

  useEffect(() => {
    const activeLayout = layouts[activeFilter]
    if (activeLayout) {
      Animated.parallel([
        Animated.timing(indicatorPosition, {
          toValue: activeLayout.x,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(indicatorWidth, {
          toValue: activeLayout.width,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start()

      const tabCenter = activeLayout.x + activeLayout.width / 2;
      const scrollToX = tabCenter - screenWidth / 2;

      filterScrollRef.current?.scrollTo({
        x: Math.max(0, scrollToX), 
        animated: true,
      });
    }
  }, [activeFilter, layouts]);

  const handleTabLayout = (id, event) => {
    const { x, width } = event.nativeEvent.layout;
    setLayouts((prev) => ({ ...prev, [id]: { x, width } }))
  }


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

  const activeFilterItem = filters.find(f => f.id === activeFilter);
  const currentIndicatorColor = activeFilterItem?.isRose ? "#F59E0B" : "#00BA34";


  return (
    <View style={styles.stickyContainer}>
      <ScrollView
      ref={filterScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: themeColor.background, borderBottomColor: themeColor.surface }]}
      >
        {filters.map((verse) => {
          const Icon = verse.icon
          const isActive = activeFilter === verse.id

          let activeBorderColor = "#00BA34"
          let activeTextColor = themeColor.textPrimary;
          const inactiveColor = themeColor.textMuted

          if (verse.isRose) {
            activeBorderColor = "#F59E0B"
            activeTextColor = "#F59E0B";
          }

          return (
            <Pressable
              key={verse.id}
              onLayout={(event) => handleTabLayout(verse.id, event)}
              onPress={() => {
                HapticEngine.selection();
                setActiveFilter(verse.id)

                if (feedRef?.current) {
                  feedRef.current.scrollToOffset({ offset: 0, animated: true });
                }
              }}
              style={[
                styles.tabButton,
              ]}
            >
              {Icon && (
                <Icon
                  size={16}
                  strokeWidth={2.5}
                  color={isActive ? activeBorderColor : inactiveColor}
                />
              )}
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? activeTextColor : inactiveColor }
                ]}
              >
                {verse.label}
              </Text>
            </Pressable>
          )
        })}
        <Animated.View
          style={[
            styles.slidingIndicator,
            {
              left: indicatorPosition,
              width: indicatorWidth,
              backgroundColor: currentIndicatorColor,
              opacity: layouts[activeFilter] ? 1 : 0
            }
          ]}
        />
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
    gap: 16,
    position: 'relative',
    paddingBottom: 8,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1
  },

  tabButton: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 6,

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
  slidingIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    borderRadius: 1,
  }
});