import { useRef, useCallback, } from "react";
import { Animated, View, SafeAreaView, StyleSheet} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HeaderLayout } from "../header/HeaderLayout";
import { Feed } from "../../feed/Feed";
import { PostDetail } from "../../../assets/post/PostDetail";

import { Settings } from "../sideMenu/Settings";
import { BookMarks } from "../sideMenu/BookMarks";
import { PrivacySafety } from "../../profile/privacy/PrivacySafety";
import { HelpCenter } from "../../profile/HelpCenter/HelpCenter";
import { AboutVerse } from "../../profile/AboutVerse/AboutVerse";
import { ContactUs } from "../../profile/ContactUs/ContactUs";
import { PasswordSecurity } from "../../profile/Password_Security/Security/PasswordSecurity";
import { ManageProfile } from "../../profile/Manage-Profile/ManageProfile";
import { Notification } from "../../profile/Notification/Notification";
import { ProfilePage } from "../../profile/ProfilePage";


import { useEngagement } from "../../../../hooks/useEngagement";
import { useAppContext } from "../../../context/AppContext";
import { ThemeTokens } from "../../../../hooks/theme";
import { verses } from "../../../../constants/verse";


const Stack = createNativeStackNavigator();

export function HomeStackNavigator() {
  const {
    posts,
    setPosts,
    filteredPosts,
    activeFilter,
    setActiveFilter,
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
  } = useAppContext();

  const { handleUpvote, handleDownvotes, handleRepost, handleSave, handleShare, handleCommentDownvote, handleCommentUpvote, handleReplyDownvote, handleReplyUpvote } = useEngagement()

  const { getVerseIcon } = verses();

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
        cardStyle: { backgroundColor: themeColor.background },
        contentStyle: { backgroundColor: themeColor.background },
      }}
    >
      <Stack.Screen name='HomeFeed'>
        {(props) => (
          <View style={styles.appContainer}>
            <Animated.View style={[
              styles.floatingHeader,
              { transform: [{ translateY }], backgroundColor: themeColor.background }
            ]}>
              <SafeAreaView edges={['top', 'left', 'right']}
                style={{ backgroundColor: themeColor.background }}
              >
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
            setSelectedTheme={setSelectedTheme}
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


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});