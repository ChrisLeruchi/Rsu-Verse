import { View, ScrollView, StyleSheet, Pressable, Text } from "react-native";
import React, {useState, useRef, useCallback,} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, Clock } from "lucide-react-native";
import { HapticEngine } from "../../../haptics";


export function FeedFilter({ activeFilter, setActiveFilter }) {

  const filters = [
    { id: "all", label: "Versn'", icon: null, isRose: false },
    { id: "new", label: "New", icon: Clock, isRose: false },
    { id: "gist", label: "Gist", icon: MessagesSquare, isRose: false },
    { id: 'confession', label: "Confession", icon: Flame, isRose: true },
    { id: "music", label: "Music", icon: Music, isRose: false },
    { id: "politics", label: "Politics", icon: Landmark, isRose: false },
    { id: "relationship", label: "Relationship", icon: HeartHandshake, isRose: false },
  ]

   const scrollViewRef = useRef(null);
    const [localInput, setLocalInput] = useState("");
  
    useFocusEffect(
      useCallback(() => {
  
        return () => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: false });
          setLocalInput("");
        };
      }, [])
    );
  return (
    <View style={styles.stickyContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ref={scrollViewRef}
      >
        {filters.map((verse) => {
          const Icon = verse.icon
          const isActive = activeFilter === verse.id

          let activeBorderColor = "#00BA34"
          let activeTextColor = "#FFFFFF";
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
                setActiveFilter(verse.id)}}
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
                  color={isActive ? activeBorderColor : inactiveColor}
                />
              )}
              <Text
                style={[
                  styles.tabText,
                  isActive ? { color: activeTextColor } : styles.textInactive
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
    backgroundColor: "#000000",  
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
 
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#000000'
  },

  tabButton: {
    minHeight: 32,
    minWidth: 140,
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