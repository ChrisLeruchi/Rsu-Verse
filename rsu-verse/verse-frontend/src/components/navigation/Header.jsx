import React, { useState, useRef, useEffect } from 'react';
import { View, Pressable, Image, StyleSheet, Modal, Text, Dimensions, Animated } from 'react-native';
import { Bell, Bookmark, CircleQuestionMark, Settings, ShoppingBag, Moon, Mail, Sun, NotebookText, User2, Plus } from 'lucide-react-native';
import { useNavigation, } from '@react-navigation/native'
import { ThemeTokens } from '../../theme';


const { width: screen_width } = Dimensions.get('window');
const sideBar_width = screen_width * 0.8

export function Header({
  activeFilter,
  setActiveFilter,
  selectedTheme,
  setSelectedTheme
}) {
  const navigation = useNavigation();

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const toggleThemeSwitch = () => {
    setSelectedTheme(isDark ? 'light' : 'dark')
  }

  const slideAnim = useRef(new Animated.Value(0)).current;

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    if (isSideMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: sideBar_width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSideMenuOpen]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      setIsSideMenuOpen(false)
    })
  }

  return (
    <View
      style={[
        styles.headerBase, { backgroundColor: themeColor.background }
      ]}
    >
      <Pressable
        onPress={() => setActiveFilter("all")}
        style={styles.logoWrapper}
      >
        <Image
          source={require("../../../public/VerseLogo2.png")}
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
            color={activeFilter === "notifications" ? themeColor.accent : themeColor.textSecondary}
          />
          <View style={[styles.badge, { backgroundColor: themeColor.warning }]} />
        </Pressable>
        <Pressable
          onPress={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          <View style={[styles.avatarPlaceholder, {backgroundColor: themeColor.surface}]} />
        </Pressable>
      </View>
      <Modal
        visible={isSideMenuOpen}
        transparent={true}
        animationType='none'
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            onPress={handleClose}
            activeOpacity={1}
            style={styles.backdropPressable}
          />
          <Animated.View
            style={[
              styles.sidebarContainer,
              {
                transform: [{ translateX: slideAnim }],
                backgroundColor: themeColor.background,
                borderRightColor: themeColor.border
              }
            ]}
          >
            <Pressable
              style={styles.sdMenuProfile}
              onPress={() => {
                handleClose();
                navigation.navigate('ProfileScreen');
              }}
            >
              <View style={[styles.smAvatarPlaceholder, { backgroundColor: themeColor.surface }]} />
              <View style={styles.names}>
                <View>
                  <Text style={[styles.priText, { color: themeColor.textPrimary }]}>
                    Computer Engr
                  </Text>
                  <Text style={[styles.secText, { color: themeColor.textMuted }]}>
                    13th disciple 📿
                  </Text>
                </View>

                <View style={styles.stats}>
                  <Text style={[styles.metricsNum, { color: themeColor.textPrimary }]}>
                    1648
                  </Text>
                  <Text style={[styles.secText, { color: themeColor.textMuted }]}>
                    Upvotes
                  </Text>
                </View>
              </View>
            </Pressable>

            <View style={[styles.utility, { borderBottomColor: themeColor.border }]}>
              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('Profile');
                }}
              >
                <User2 size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>Profile</Text>
              </Pressable>

              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('Bookmarks');
                }}
              >
                <Bookmark size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>Bookmarks</Text>
              </Pressable>

              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('Market');
                }}
              >
                <ShoppingBag size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>MarketPlace</Text>
              </Pressable>

              {/* APPEARANCE TOGGLE COMPONENT */}
              <Pressable style={styles.sdMenuBtn} onPress={toggleThemeSwitch}>
                <View style={styles.theme}>
                  {isDark ? (
                    <Moon size={20} strokeWidth={2} color={themeColor.textPrimary} />
                  ) : (
                    <Sun size={20} strokeWidth={2} color={themeColor.textPrimary} />
                  )}
                  <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>
                    Appearance
                  </Text>
                </View>
                <View>
                  <Text style={[styles.themeText, { color: themeColor.textMuted }]}>
                    ({selectedTheme})
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('CreatePost');
                }}
              >
                <Plus size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>Create</Text>
              </Pressable>
            </View>

            <View style={styles.settings}>
              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('Settings');
                }}
              >
                <Settings size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>Settings</Text>
              </Pressable>

              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('HelpCenter');
                }}
              >
                <CircleQuestionMark size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>Help center</Text>
              </Pressable>

              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('AboutVerse');
                }}
              >
                <NotebookText size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>About Verse</Text>
              </Pressable>

              <Pressable
                style={styles.sdMenuBtn}
                onPress={() => {
                  handleClose();
                  navigation.navigate('ContactUs');
                }}
              >
                <Mail size={20} strokeWidth={2} color={themeColor.textPrimary} />
                <Text style={[styles.sidebarText, { color: themeColor.textPrimary }]}>Contact us</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>
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
    backgroundColor: '#000000',
  },

  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#1F2633",
  },
  smAvatarPlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1F2633",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: 'row',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: screen_width,
    width: sideBar_width,
    backgroundColor: "#000000",
    paddingTop: 50,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'column',
    gap: 30
  },
  utility: {
    flexDirection: 'column',
    gap: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 30
  },
  settings: {
    flexDirection: 'column',
    gap: 30,
  },
  sidebarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 600
  },
  sdMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20
  },
  sdMenuProfile: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    gap: 5
  },
  priText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 16
  },
  metricsNum: {
    color: '#FFFFFF',
    fontSize: 14
  },
  secText: {
    color: "rgba(255, 255, 255, 0.4)"
  },
  theme: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  themeText: {
    color: "rgba(255, 255, 255, 0.4)",
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
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginLeft: -20
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16
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