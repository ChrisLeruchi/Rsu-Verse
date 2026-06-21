import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { ArrowLeft, Search, MessageSquare, CheckCheck } from "lucide-react-native";
import * as Crypto from 'expo-crypto';
import { ThemeTokens } from "../../theme";

const COLORS = {
  void: "#000000",
  textMuted: "#1A1A1A",
  cyan: "#17CB49",
  white: "#FFFFFF",
  white5: "rgba(255, 255, 255, 0.05)",
  white10: "rgba(255, 255, 255, 0.1)",
  white30: "rgba(255, 255, 255, 0.3)",
  white40: "rgba(255, 255, 255, 0.4)",
  white60: "rgba(255, 255, 255, 0.6)",
  white90: "rgba(255, 255, 255, 0.9)",
};

const MOCK_CHATS = [
  {
    id: '1',
    department: 'Computer',
    faculty: 'Engineering',
    lastMessage: 'Did you hear what that lecturer did?',
    timeStamp: "2m",
    unreadCount: 1,
    isOnline: true
  },
  {
    id: '2',
    department: 'Management',
    faculty: 'Sciences',
    lastMessage: 'Sent an attachment: Marketplace Item',
    timeStamp: "1h",
    unreadCount: 0,
    isOnline: false
  },
];

export function ChatList({ navigation, selectedTheme = 'dark' }) {
  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatRow}
      activeOpacity={0.7}
      onPress={() => navigation?.navigate("ChatRoom", { roomId: item.id, user: item })}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarPlaceholder, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
          <Text style={[styles.avatarText, { color: themeColor.textPrimary }]}>
            {item.department.charAt(0)}
          </Text>
        </View>
        {item.isOnline && <View style={[styles.onlineStatusDot, { borderColor: themeColor.background }]} />}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeaderRow}>
          <Text style={[styles.profileName, { color: themeColor.textPrimary }]} numberOfLines={1}>
            {item.faculty}
          </Text>
          <Text style={[styles.timeStamp, { color: themeColor.textMuted }]}>
            {item.timeStamp}
          </Text>
        </View>

        <View style={styles.chatMessageRow}>
          <Text style={[styles.lastMessageText, { color: themeColor.textSecondary }]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCountText}>
                {item.unreadCount}
              </Text>
            </View>
          ) : (
            <CheckCheck size={14} color={themeColor.textMuted} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={themeColor.background} 
      />

      <View style={[styles.header, { borderBottomColor: themeColor.border }]}>
        <TouchableOpacity style={styles.headerAction} onPress={() => navigation?.goBack()}>
          <ArrowLeft size={20} color={themeColor.textSecondary} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColor.textPrimary }]}>Messages</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Search size={20} color={themeColor.textSecondary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={[styles.listDivider, { backgroundColor: themeColor.border }]} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MessageSquare size={40} color={themeColor.border} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyText, { color: themeColor.textMuted }]}>No conversations yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerAction: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingVertical: 8,
  },
  listDivider: {
    height: 1,
    marginLeft: 76,
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
  },
  onlineStatusDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.cyan,
    borderWidth: 2,
  },
  chatInfo: {
    flex: 1,
    gap: 4,
  },
  chatHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileName: {
    flex: 1,
    marginRight: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  timeStamp: {
    fontSize: 11,
  },
  chatMessageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessageText: {
    flex: 1,
    marginRight: 16,
    fontSize: 13,
  },
  unreadBadge: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: COLORS.cyan,
  },
  unreadCountText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.white,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 14,
  },
});