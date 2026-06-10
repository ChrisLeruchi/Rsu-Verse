import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';

export function Header({ 
  activeFilter, 
  setActiveFilter, 

}) {
  return (
    <View 
      style={[
        styles.headerBase,
      ]}
    >
      <Pressable 
        onPress={() => setActiveFilter("all")}
        style={styles.logoWrapper}
      >
        <Image
          source={require("../../../public/favicon.png")} 
          style={styles.logoImage}
        />
      </Pressable>

      <View style={styles.actionsContainer}>
        <Pressable
          onPress={() => setActiveFilter("notifications")}
          style={[
            styles.notificationButton,
            activeFilter === "notifications" && styles.activeTextCyan
          ]}
        >
          <Bell
            size={24}
            strokeWidth={2.5}
            color={activeFilter === "notifications" ? "#00BA34" : "rgba(255,255,255,0.6)"}
          />
          <View style={styles.badge} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  headerBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
    paddingHorizontal: 4, 
    backgroundColor: '#121212',
  },
  

  visible: {
    transform: [{ translateY: 0 }],
  },
  hidden: {
    transform: [{ translateY: -64 }],
  },

  
  unscrolled: {
    
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  

  scrolled: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)', 
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
  },


  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },

  logoImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain', 
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20, 
  },

 
  notificationButton: {
    position: 'relative',
    padding: 4, 
    paddingHorizontal: 28, 
  },
  
  activeTextCyan: {
    color: '#00BA34', 
  },

 
  badge: {
    position: 'absolute',
    top: 4, 
    right: 28, 
    width: 6, 
    height: 6,
    backgroundColor: '#F59E0B',
    borderRadius: 9999, 
  },
});