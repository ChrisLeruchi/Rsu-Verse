import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Home, Search, ShoppingBag, UserCircle2 } from 'lucide-react-native'

export function NavBarIcons({ setActiveFilter }) {
  const navigation  = useNavigation();

  const activeRouteName = useNavigationState((state) => {
    if(!state) return 'HomeIndex';
    return state.routes[state.index].name;
  })
  const handleFilter = () => {
    setActiveFilter("all")
    navigation.navigate("HomeIndex")
  }

  const getIconStyles = (isActive, hasFill = false) => {
    const activeColor = '#FFFFFF';
    const inactiveColor = 'rgba(255, 255, 255, 0.4)';
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
    <View style={styles.navBarContainer}>
      
    
      <Pressable onPress={handleFilter} style={styles.navButton}>
        {() => {
          const isActive = activeRouteName === 'HomeIndex';
          const styles = getIconStyles(isActive, true);
          return (
            <Home
              size={24}
              strokeWidth={2.5}
              color={styles.color}
              fill={styles.fill}
            />
          );
        }}
      </Pressable>

  
      <Pressable onPress={() => navigation.navigate("Search")} style={styles.navButton}>
        {() => {
          const isActive = activeRouteName === 'Search';
          const styles = getIconStyles(isActive);
          return (
            <Search
              size={24}
              strokeWidth={2.5}
              color={styles.color}
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
          const styles = getIconStyles(isActive);
          return (
            <ShoppingBag
              size={24}
              strokeWidth={2.5}
              color={styles.color}
            />
          );
        }}
      </Pressable>

    
      <Pressable onPress={() => navigation.navigate("Profile")} style={styles.navButton}>
        {() => {
          const isActive = activeRouteName === 'Profile';
          const styles = getIconStyles(isActive);
          return (
            <UserCircle2
              size={24}
              strokeWidth={2.5}
              color={styles.color}
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
    backgroundColor: '#000000', 
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)', 
    paddingVertical: 18, 
 
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'start',
    flex: 1, 
    minHeight: 44, 
  },
});