import React, { useRef, useCallback } from 'react';
import { StyleSheet, StatusBar, View, Animated, Platform, UIManager } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderLayout } from './src/components/navigation/HeaderLayout';
import { Feed } from './src/components/feed/Feed';
import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, ShoppingBag, } from 'lucide-react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavBar } from './src/components/navigation/NavBar';
import { Market } from './src/components/market/Market';
import { PostDetail } from './src/assets/PostDetail';
import { CreatePost } from './src/components/create/CreatePost';
import { SearchPage } from './src/components/search/SearchPage';
import { SearchFeed } from './src/components/search/SearchFeed';
import { ProfilePage } from './src/components/profile/ProfilePage';
import { ManageProfile } from './src/components/profile/Manage-Profile/ManageProfile';
import { PasswordSecurity } from './src/components/profile/Password_Security/Security/PasswordSecurity';
import { Notification } from './src/components/profile/Notification/Notification';
import { PrivacySafety } from './src/components/profile/privacy/PrivacySafety';
import { AboutVerse } from './src/components/profile/AboutVerse/AboutVerse';
import { HelpCenter } from './src/components/profile/HelpCenter/HelpCenter';
import { ContactUs } from './src/components/profile/ContactUs/ContactUs';

import { AppProvider, useAppContext } from './src/context/AppContext';
import { ThemeTokens } from './src/theme/index';
import { BookMarks } from './src/components/navigation/sideMenu/BookMarks';
import { Settings } from './src/components/navigation/sideMenu/Settings';
import { ChatList } from './src/components/chat_room/ChatList';
import { ChatRoom } from './src/components/chat_room/ChatRoom';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: ThemeTokens.colors.dark.background,
  },
};

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

function HomeStackNavigator() {
  const {
    posts,
    setPosts,
    filteredPosts,
    activeFilter,
    setActiveFilter,
    handleUpvote,
    handleDownvotes,
    handleRepost,
    handleSave,
    handleShare,
    selectedTheme,
    setSelectedTheme,
    searchQuery,
    setSearchQuery,
    isOpen,
    setIsOpen,
    selectedTopic,
    setSelectedTopic,
    message,
    setMessage,
    attachment,
    setAttachment,
    topics,
    handleSubmit,
    currentYear,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    twoFactorActive,
    setTwoFactorActive,
    biometricsActive,
    setBiometricsActive,
    anonymousDefault,
    setAnonymousDefault,
    hideDetails,
    setHideDetails,
    allowDirectMessages,
    setAllowDirectMessages,
    pushMaster,
    setPushMaster,
    emailDigest,
    setEmailDigest,
    socialAlerts,
    setSocialAlerts,
    confessionAlerts,
    setConfessionAlerts,
    marketAlerts,
    setMarketAlerts,
    verseAlerts,
    setVerseAlerts,
    isSellerActive,
    setIsSellerActive,
    bio,
    setBio,
    displayName,
    setDisplayName,
    username,
    setUsername,
    handleCommentDownvote,
    handleCommentUpvote,
    handleReplyUpvote,
    handleReplyDownvote,
  } = useAppContext();

  const handlePlusClick = (navigation) => {
    setActiveFilter("plus");
    if (navigation) navigation.navigate("CreatePost");
  };

  const isDark = selectedTheme === 'dark';

  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = 64;
  const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + insets.top;

  const translateY = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const paddingAnim = useRef(null);
  if (paddingAnim.current === null) {
    paddingAnim.current = new Animated.Value(TOTAL_HEADER_HEIGHT);
  }

  const handleScrollUp = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }),
      Animated.spring(paddingAnim.current, {
        toValue: TOTAL_HEADER_HEIGHT,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }),
    ]).start(() => { isAnimating.current = false; });
  }, [translateY, TOTAL_HEADER_HEIGHT]);

  const handleScrollDown = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: -TOTAL_HEADER_HEIGHT,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }),
      Animated.spring(paddingAnim.current, {
        toValue: HEADER_HEIGHT,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }),
    ]).start(() => { isAnimating.current = false; });
  }, [translateY, TOTAL_HEADER_HEIGHT, HEADER_HEIGHT]);

  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 80,
        cardStyle: { backgroundColor: ThemeTokens.colors.dark.background },
        contentStyle: { backgroundColor: ThemeTokens.colors.dark.background },
      }}
    >
      <Stack.Screen name='HomeFeed'>
        {(props) => (
          <View style={styles.appContainer}>
            <Animated.View style={[
              styles.floatingHeader,
              { transform: [{ translateY }], backgroundColor: themeColor.background }
            ]}>
              <SafeAreaView edges={['top', 'left', 'right']}>
                <HeaderLayout
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  activeFilter={activeFilter === "all" ? "home" : activeFilter}
                  setActiveFilter={(tab) => {
                    if (tab === "home") setActiveFilter("all");
                    else setActiveFilter(tab);
                  }}
                />
              </SafeAreaView>
            </Animated.View>

            <Animated.View style={{ flex: 1, paddingTop: paddingAnim.current }}>
              <Feed
                {...props}
                posts={filteredPosts}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                handleUpvote={handleUpvote}
                handleDownvotes={handleDownvotes}
                handleRepost={handleRepost}
                handleSave={handleSave}
                handleShare={handleShare}
                onPlusClick={() => handlePlusClick(props.navigation)}
                getVerseIcon={getVerseIcon}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                onScrollUp={handleScrollUp}
                onScrollDown={handleScrollDown}
                TOTAL_HEADER_HEIGHT={TOTAL_HEADER_HEIGHT}
              />
            </Animated.View>
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name='Comments'>
        {(props) => (
          <PostDetail
            {...props}
            postId={props.route.params?.postId}
            posts={posts}
            setPosts={setPosts}
            handleSave={handleSave}
            handleRepost={handleRepost}
            handleDownvotes={handleDownvotes}
            handleUpvote={handleUpvote}
            getVerseIcon={getVerseIcon}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
            handleCommentUpvote={handleCommentUpvote}
            handleCommentDownvote={handleCommentDownvote}
            handleReplyUpvote={handleReplyUpvote}
            handleReplyDownvote={handleReplyDownvote}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Settings">
        {(props) => <Settings
          {...props}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />}
      </Stack.Screen>

      <Stack.Screen name="Bookmarks">
        {(props) => <BookMarks
          {...props}
          posts={posts}
          handleUpvote={handleUpvote}
          handleDownvotes={handleDownvotes}
          handleRepost={handleRepost}
          handleShare={handleShare}
          handleSave={handleSave}
          getVerseIcon={getVerseIcon}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />}
      </Stack.Screen>

      <Stack.Screen name="HelpCenter">
        {(props) => (
          <HelpCenter
            {...props}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTheme={selectedTheme}
            setSelectedTheme={selectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AboutVerse">
        {(props) => <AboutVerse {...props} currentYear={currentYear}
          selectedTheme={selectedTheme}
          setSelectedTheme={selectedTheme}
        />}
      </Stack.Screen>

      <Stack.Screen name="ContactUs">
        {(props) => (
          <ContactUs
            {...props}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            message={message}
            setMessage={setMessage}
            attachment={attachment}
            setAttachment={setAttachment}
            topics={topics}
            handleSubmit={handleSubmit}
            selectedTheme={selectedTheme}
            setSelectedTheme={selectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Manage_Security">
        {(props) => (
          <PasswordSecurity
            {...props}
            showCurrentPassword={showCurrentPassword}
            setShowCurrentPassword={setShowCurrentPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            twoFactorActive={twoFactorActive}
            setTwoFactorActive={setTwoFactorActive}
            biometricsActive={biometricsActive}
            setBiometricsActive={setBiometricsActive}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Privacy_Management">
        {(props) => (
          <PrivacySafety
            {...props}
            anonymousDefault={anonymousDefault}
            setAnonymousDefault={setAnonymousDefault}
            hideDetails={hideDetails}
            setHideDetails={setHideDetails}
            allowDirectMessages={allowDirectMessages}
            setAllowDirectMessages={setAllowDirectMessages}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Notification">
        {(props) => (
          <Notification
            {...props}
            pushMaster={pushMaster}
            setPushMaster={setPushMaster}
            emailDigest={emailDigest}
            setEmailDigest={setEmailDigest}
            setSocialAlerts={setSocialAlerts}
            socialAlerts={socialAlerts}
            marketAlerts={marketAlerts}
            setMarketAlerts={setMarketAlerts}
            verseAlerts={verseAlerts}
            setVerseAlerts={setVerseAlerts}
            setConfessionAlerts={setConfessionAlerts}
            confessionAlerts={confessionAlerts}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Profile">
        {(props) => <ProfilePage
          {...props}
          selectedTheme={selectedTheme}
          bio={bio}
          setBio={setBio}
          displayName={displayName}
          setDisplayName={setDisplayName}
        />}
      </Stack.Screen>

      <Stack.Screen name="Manage_Profile">
        {(props) => (
          <ManageProfile
            {...props}
            isSellerActive={isSellerActive}
            setIsSellerActive={setIsSellerActive}
            bio={bio}
            setBio={setBio}
            displayName={displayName}
            setDisplayName={setDisplayName}
            username={username}
            setUsername={setUsername}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function SearchStackNavigator() {
  const {
    setActiveFilter,
    recents,
    setRecents,
    search,
    setSearch,
    matchingPosts,
    posts,
    setPosts,
    handleSave,
    handleRepost,
    handleDownvotes,
    handleUpvote,
    selectedTheme,
    setSelectedTheme,
    handleCommentDownvote,
    handleCommentUpvote,
    handleReplyUpvote,
    handleReplyDownvote
  } = useAppContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 80,
        cardStyle: { backgroundColor: ThemeTokens.colors.dark.background },
        contentStyle: { backgroundColor: ThemeTokens.colors.dark.background },
      }}
    >
      <Stack.Screen name='SearchPage'>
        {(props) => (
          <SearchPage
            {...props}
            setActiveFilter={setActiveFilter}
            recents={recents}
            setRecents={setRecents}
            search={search}
            setSearch={setSearch}
            matchingPosts={matchingPosts}
            getVerseIcon={getVerseIcon}
            posts={posts}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name='Search_feed'>
        {(props) => (
          <SearchFeed
            {...props}
            posts={posts}
            handleSave={handleSave}
            handleRepost={handleRepost}
            handleDownvotes={handleDownvotes}
            handleUpvote={handleUpvote}
            getVerseIcon={getVerseIcon}
            matchingPosts={matchingPosts}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name='Comments'>
        {(props) => (
          <PostDetail
            {...props}
            postId={props.route.params?.postId}
            posts={posts}
            setPosts={setPosts}
            handleSave={handleSave}
            handleRepost={handleRepost}
            handleDownvotes={handleDownvotes}
            handleUpvote={handleUpvote}
            getVerseIcon={getVerseIcon}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            handleCommentUpvote={handleCommentUpvote}
            handleCommentDownvote={handleCommentDownvote}
            handleReplyUpvote={handleReplyUpvote}
            handleReplyDownvote={handleReplyDownvote}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MarketPlace() {
  const { posts, selectedTheme, setSelectedTheme } = useAppContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MarketPlace'>
        {(props) => (
          <Market
            {...props}
            posts={posts}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function PostCreation() {
  const { setPosts, setActiveFilter, selectedTheme, setSelectedTheme } = useAppContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='CreatePage'>
        {(props) => (
          <CreatePost
            {...props}
            setPosts={setPosts}
            setActiveFilter={setActiveFilter}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function Chat() {
  const { selectedTheme, setSelectedTheme } = useAppContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 80,
        cardStyle: { backgroundColor: ThemeTokens.colors.dark.background },
        contentStyle: { backgroundColor: ThemeTokens.colors.dark.background },
      }}
    >
      <Stack.Screen name='ChatList'>
        {(props) => (
          <ChatList
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name='ChatRoom'>
        {(props) => (
          <ChatRoom
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function BottomTabNavigatorComponent() {
  const { activeTab, setActiveTab, setActiveFilter, selectedTheme, setSelectedTheme } = useAppContext();

  const handlePlusClick = (navigation) => {
    setActiveFilter("plus");
    if (navigation) navigation.navigate("CreatePost");
  };

  return (
    <Tab.Navigator
      tabBar={(props) => {
        const { routes, index } = props.state;
        const topLevelRouteName = routes[index].name;
        const nestedRouteName = getFocusedRouteNameFromRoute(routes[index]);

        if (nestedRouteName === 'Comments' ||
          topLevelRouteName === 'CreatePost' ||
          nestedRouteName === 'Contact_Us' ||
          nestedRouteName === 'Help_Center' ||
          nestedRouteName === 'HelpCenter' ||
          nestedRouteName === 'Privacy_Management' ||
          nestedRouteName === 'Theme_Management' ||
          nestedRouteName === 'Notification' ||
          nestedRouteName === 'Manage_Security' ||
          nestedRouteName === 'Manage_Profile' ||
          nestedRouteName === 'AboutVerse' ||
          nestedRouteName === 'About_Verse' ||
          nestedRouteName === 'ContactUs' ||
          nestedRouteName === 'Contact_Us' ||
          nestedRouteName === 'Settings' ||
          nestedRouteName === 'ChatRoom'
        ) {
          return null;
        }

        return (
          <NavBar
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setActiveFilter={setActiveFilter}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            handlePlusClick={() => handlePlusClick(props.navigation)}
          />
        );
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeIndex" component={HomeStackNavigator} />
      <Tab.Screen name='CreatePost' component={PostCreation} />
      <Tab.Screen name='Search' component={SearchStackNavigator} />
      <Tab.Screen name="Market" component={MarketPlace} />
      <Tab.Screen name="ChatList" component={Chat} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AppProvider>
        <NavigationContainer theme={CustomDarkTheme}>
          <View style={styles.appContainer}>
            <StatusBar barStyle="light-content" backgroundColor={ThemeTokens.colors.dark.background} />
            <BottomTabNavigatorComponent />
          </View>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  viewLayoutWrapper: {
    flex: 1,
  },
  safeAreaHeader: {
    zIndex: 100,
    backgroundColor: '#000000',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});