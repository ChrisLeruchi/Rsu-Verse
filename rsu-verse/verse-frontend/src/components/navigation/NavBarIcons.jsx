import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Home, Search, ShoppingBag, UserCircle2 } from 'lucide-react-native'
import { ThemeTokens } from '../../theme'

export function NavBarIcons({ setActiveFilter, selectedTheme, setSelectedTheme }) {
  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const navigation = useNavigation();

  const activeRouteName = useNavigationState((state) => {
    if (!state) return 'HomeIndex';
    return state.routes[state.index].name;
  })

  const handleFilter = () => {
    setActiveFilter("all")
    navigation.navigate("HomeIndex")
  }

  const getIconStyles = (isActive, hasFill = false) => {
    const activeColor = themeColor.textPrimary;
    const inactiveColor = themeColor.textSecondary;
    if (hasFill) {
      return {
        fill: isActive ? activeColor : 'transparent',
        color: isActive ? 'transparent' : inactiveColor
      }
    }
    return {
      color: isActive ? activeColor : inactiveColor
    }
  }

  return (
    <View style={[styles.navBarContainer, { backgroundColor: themeColor.background, borderTopColor: themeColor.border }]}>

      <Pressable onPress={handleFilter} style={styles.navButton}>
        {() => {
          const isActive = activeRouteName === 'HomeIndex';
          const iconStyles = getIconStyles(isActive, true);
          return (
            <Home
              size={24}
              strokeWidth={2.5}
              color={iconStyles.color}
              fill={iconStyles.fill}
            />
          );
        }}
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Search")} style={styles.navButton}>
        {() => {
          const isActive = activeRouteName === 'Search';
          const iconStyles = getIconStyles(isActive);
          return (
            <Search
              size={24}
              strokeWidth={2.5}
              color={iconStyles.color}
            />
          );
        }}
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("Market");
        }}
        style={styles.navButton}
      >
        {() => {
          const isActive = activeRouteName === 'Market';
          const iconStyles = getIconStyles(isActive);
          return (
            <ShoppingBag
              size={24}
              strokeWidth={2.5}
              color={iconStyles.color}
            />
          );
        }}
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Profile")} style={styles.navButton}>
        {() => {
          const isActive = activeRouteName === 'Profile';
          const iconStyles = getIconStyles(isActive);
          return (
            <UserCircle2
              size={24}
              strokeWidth={2.5}
              color={iconStyles.color}
            />
          );
        }}
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingVertical: 18,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'start',
    flex: 1,
    minHeight: 44,
  },
});