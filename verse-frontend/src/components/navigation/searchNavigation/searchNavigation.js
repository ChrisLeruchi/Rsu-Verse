import { useAppContext } from "../../../context/AppContext";

import { SearchPage } from "../../search/SearchPage";
import { SearchFeed } from "../../search/SearchFeed";
import { PostDetail } from "../../../assets/post/PostDetail";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEngagement } from "../../../../hooks/useEngagement";
import { ThemeTokens } from "../../../../hooks/theme";
import { verses } from "../../../../constants/verse";

const Stack = createNativeStackNavigator();

export function SearchStackNavigator() {
  const {
    setActiveFilter,
    recents,
    setRecents,
    search,
    setSearch,
    matchingPosts,
    posts,
    setPosts,
    selectedTheme,
    setSelectedTheme,
  } = useAppContext();

  const {handleUpvote, handleDownvotes, handleRepost, handleSave, handleShare, handleCommentDownvote, handleCommentUpvote, handleReplyDownvote, handleReplyUpvote} = useEngagement()

  const {getVerseIcon} = verses()

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
            handleShare={handleShare}
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