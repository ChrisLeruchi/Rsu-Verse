import React, { useState } from 'react';
import {StyleSheet, StatusBar, Share, Alert, View, } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HeaderLayout } from './src/components/navigation/HeaderLayout';
import { Feed } from './src/components/feed/Feed';
import { MessagesSquare, Flame, Music, Landmark, HeartHandshake, ShoppingBag, Sun, Moon } from 'lucide-react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Crypto from 'expo-crypto';
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
import { Theme } from './src/components/profile/Theme/Theme';
import { PrivacySafety } from './src/components/profile/privacy/PrivacySafety';
import { AboutVerse } from './src/components/profile/AboutVerse/AboutVerse';
import { HelpCenter } from './src/components/profile/HelpCenter/HelpCenter';
import { ContactUs } from './src/components/profile/ContactUs/ContactUs';

import { AppProvider, useAppContext } from './src/context/AppContext';
import { ThemeTokens } from './src/theme/index';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: ThemeTokens.colors.dark.background,
  },
};

const minsAgo = (m) => new Date(Date.now() - m * 60 * 1000).toISOString();
const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d) => new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();




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
    handleShare
  } = useAppContext();

  const handlePlusClick = (navigation) => {
    setActiveFilter("plus");
    if (navigation) navigation.navigate("CreatePost");
  }
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
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaHeader}>
              <HeaderLayout
                activeFilter={activeFilter === "all" ? "home" : activeFilter}
                setActiveFilter={(tab) => {
                  if (tab === "home") setActiveFilter("all");
                  else setActiveFilter(tab);
                }}
              />
            </SafeAreaView>

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
            />
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
    handleUpvote
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
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


function MarketPlace() {
  const { posts } = useAppContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MarketPlace'>
        {(props) => (
          <Market
            {...props}
            posts={posts}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}



function PostCreation() {
  const { setPosts, setActiveFilter } = useAppContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='CreatePage'>
        {(props) => (
          <CreatePost
            {...props}
            setPosts={setPosts}
            setActiveFilter={setActiveFilter}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}



function ProfileManagement() {
  const {
    isSellerActive,
    setIsSellerActive,
    selectedTheme,
    setSelectedTheme,
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
    handleSubmit,
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
    bio,
    setBio,
    displayName,
    setDisplayName,
    username,
    setUsername
  } = useAppContext();

  const currentYear = new Date().getFullYear();

  const topics = [
    { id: "marketplace", label: "Marketplace & Orders" },
    { id: "account", label: "Account & Verification" },
    { id: "privacy", label: "Privacy & Reporting" },
    { id: "technical", label: "App Bugs & Feedback" }
  ];

  const Themes = [
    { id: Crypto.randomUUID(), theme: "Light", icon: <Sun size={16} color="white" /> },
    { id: Crypto.randomUUID(), theme: "Dark", icon: <Moon size={16} color="white" /> }
  ];
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
          />
        )}
      </Stack.Screen>


      <Stack.Screen name="Theme_Management">
        {(props) => (
          <Theme
            {...props}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            Themes={Themes}
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
          />
        )}
      </Stack.Screen>


      <Stack.Screen name="About_Verse">
        {(props) => <AboutVerse {...props} currentYear={currentYear} />}
      </Stack.Screen>


      <Stack.Screen name="Help_Center">
        {(props) => (
          <HelpCenter
            {...props}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </Stack.Screen>


      <Stack.Screen name="Contact_Us">
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
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function BottomTabNavigatorComponent() {
  const { activeTab, setActiveTab, setActiveFilter } = useAppContext();

  const handlePlusClick = (navigation) => {
    setActiveFilter("plus");
    if (navigation) navigation.navigate("CreatePost");
  };

  return (
    <Tab.Navigator
      tabBar={(props) => {
        const { routes, index } = props.state;
        const nestedRouteName = getFocusedRouteNameFromRoute(routes[index]);

        if (nestedRouteName === 'Comments' ||
          nestedRouteName === 'CreatePost' ||
          nestedRouteName === 'Contact_Us' ||
          nestedRouteName === 'Help_Center' ||
          nestedRouteName === 'Privacy_Management' ||
          nestedRouteName === 'Theme_Management' ||
          nestedRouteName === 'Notification' ||
          nestedRouteName === 'Manage_Security' ||
          nestedRouteName === 'Manage_Profile'
        ) {
          return null;
        }

        return (
          <NavBar
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setActiveFilter={setActiveFilter}
            handlePlusClick={() => handlePlusClick(props.navigation)}
          />
        );
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeIndex" component={HomeStackNavigator} />
      <Tab.Screen name='CreatePost' component={PostCreation} />
      <Tab.Screen name='Search' component={SearchStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileManagement} />
      <Tab.Screen name="Market" component={MarketPlace} />
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
    backgroundColor: '#000000',
    gap:60
  },
  viewLayoutWrapper: {
    flex: 1,
  },
  safeAreaHeader: {
    zIndex: 100,
    backgroundColor: '#000000',
  }
});


