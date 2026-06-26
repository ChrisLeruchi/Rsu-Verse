import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Pressable, Animated, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ThemeTokens } from "../../../hooks/theme";

export function ProfileFilter({ selectedTheme, activeFilter, setActiveFilter }) {
  const isDark = selectedTheme === 'dark'
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light

  const filters = [
    { id: 'posts', label: 'Posts' },
    { id: 'reposts', label: 'Reposts' },
    { id: 'comments', label: 'Comments' },
    { id: 'upvotes', label: 'Upvotes' },
    { id: 'downvotes', label: 'Downvotes' },
  ]

  const [layouts, setLayouts] = useState({})
  const scrollViewRef = useRef(null);
  const indicatorPosition = useRef(new Animated.Value(0)).current
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setActiveFilter('posts');
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
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: activeLayout.x - 20,
          animated: true,
        });
      }
    }
  }, [activeFilter, layouts]);

  const handleTabLayout = (id, event) => {
    const { x, width } = event.nativeEvent.layout;
    setLayouts((prev) => ({ ...prev, [id]: { x, width } }))
  }
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.profileFilter}
      >


        {filters.map((filter) => {
          const id = filter.id
          const text = filter.label
          const isActive = id === activeFilter

          let activeTextColor = themeColor.textPrimary;
          const inactiveColor = themeColor.textMuted

          return (
            <Pressable
              key={id}
              onLayout={(event) => handleTabLayout(id, event)}
              onPress={() => setActiveFilter(id)}
              style={styles.filterBtn}
            >
              <Text style={[styles.filterText, isActive ? { color: activeTextColor, } : { color: inactiveColor }]}>
                {text}
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
              backgroundColor: "#00BA34",
              opacity: layouts[activeFilter] ? 1 : 0
            }
          ]}
        />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  outerContainer: {
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
  },
  profileFilter: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    position: 'relative',
    paddingBottom: 8,
    paddingHorizontal: 16
  },
  filterBtn: {
    minWidth: 70,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 8,

  },
  filterText: {
    fontWeight: 500
  },
  slidingIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    borderRadius: 1,
  }
})

