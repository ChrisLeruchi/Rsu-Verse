import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";
import { PostCard } from "../../assets/Postcard"; 
import { FeedFilter } from "./FeedFilter";

export function Feed({ 
  posts, 
  activeFilter, 
  setActiveFilter, 
  handleUpvote, 
  handleDownvotes, 
  handleRepost, 
  handleSave, 
  onPlusClick, 
  getVerseIcon, 
  handleShare,
  navigation
}) {


  return (
    <View style={styles.feedLayoutWrapper}>
     
      <FeedFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />


      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        
 
      
        
        ListEmptyComponent={
          <View style={styles.emptyFeedStateBox}>
            <Text style={styles.emptyHeadingText}>
              No posts in this Verse yet.
            </Text>
            <Text style={styles.emptySubheadingText}>
              Be the first to start the conversation.
            </Text>
          </View>
        }
        
       
        renderItem={({ item }) => (
          <PostCard
            post={item}
            handleUpvote={handleUpvote}
            handleDownvotes={handleDownvotes}
            handleRepost={handleRepost}
            handleShare={handleShare}
            handleSave={handleSave}
            getVerseIcon={getVerseIcon}
            navigation={navigation}
          />
        )}
      />

  
      <Pressable 
        onPress={() => {
          onPlusClick?.();
        }}
        style={styles.floatingActionButton}
      >
        <Plus 
          size={24} 
          strokeWidth={2.5} 
          color="#FFFFFF" 
        />
        <Text style={styles.fabLabelText}>Post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
 
  feedLayoutWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 448, 
    alignSelf: "center", 
    backgroundColor: "#121212", 
    position: "relative",
  },

  listContainer: {
    paddingBottom: 112, 
  },


  emptyFeedStateBox: {
    paddingVertical: 64, 
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },


  emptyHeadingText: {
    fontSize: 12, 
    fontWeight: "600", 
    color: "rgba(255, 255, 255, 0.4)", 
    letterSpacing: 0.5, 
    textAlign: "center",
  },

 
  emptySubheadingText: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.2)", 
    textAlign: "center",
  },


  floatingActionButton: {
    position: "absolute",
    bottom: 88, 
    right: 20,  
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, 
    backgroundColor: "#00BA34",
    padding: 12,
    borderRadius: 9999, 
    
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },


  fabLabelText: {
    color: "#FFFFFF",
    fontSize: 18, 
    fontWeight: "600", 
    letterSpacing: 0.5, 
  }
});