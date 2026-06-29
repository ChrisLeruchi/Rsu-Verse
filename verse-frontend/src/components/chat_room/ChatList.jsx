import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Search, MessageSquare, CheckCheck, Edit } from "lucide-react-native";
import { useAppContext } from "../../context/AppContext";
import { ThemeTokens } from "../../../hooks/theme";



export function ChatList({ navigation }) {
  const { selectedTheme, mockChat, setMockChat } = useAppContext();
  const isDark = selectedTheme === "dark";
  const c = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const chats = mockChat.chats

  const handleChatPress = (item) => {
  setMockChat((prev) => ({
    ...prev,
    chats: prev.chats.map((chat) =>
      chat.id === item.id ? { ...chat, unreadCount: 0 } : chat
    ),
  }));
  
  navigation?.navigate("ChatRoom", { chatId: item.id });
  };

  const totalUnread = chats.reduce((sum, c) => sum + c.unreadCount, 0);

  const renderItem = ({ item }) => {
    const isUnread = item.unreadCount > 0;
    

    return (
      <TouchableOpacity
        style={[styles.row, { borderBottomColor: c.border }]}
        activeOpacity={0.7}
        onPress={() => handleChatPress(item)}
      >
        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, { backgroundColor: c.surfaceElevated }]}>
            <Text style={[styles.avatarInitials, { color: c.textSecondary }]}>
              {item.initials}
            </Text>
          </View>
          {item.isOnline && (
            <View style={[styles.onlineDot, { borderColor: c.background }]} />
          )}
        </View>

        <View style={styles.info}>
          <View style={styles.infoTop}>
            <Text
              style={[
                styles.name,
                { color: c.textPrimary },
                isUnread && { fontWeight: "700" },
              ]}
              numberOfLines={1}
            >
              {item.department}
            </Text>
            <Text style={[styles.time, { color: isUnread ? c.accent : c.textMuted }]}>
              {item.timeStamp}
            </Text>
          </View>
          <View style={styles.infoBottom}>
            <Text
              style={[
                styles.preview,
                { color: isUnread ? c.textSecondary : c.textMuted },
                isUnread && { fontWeight: "500" },
              ]}
              numberOfLines={1}
            >
              {item.messages?.[0]?.text || item.lastMessage || "No messages yet"}
            </Text>
            {isUnread ? (
              <View style={[styles.badge, { backgroundColor: c.accent }]}>
                <Text style={styles.badgeText}>{item.unreadCount}</Text>
              </View>
            ) : (
              <CheckCheck size={14} color={c.textMuted} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={c.background}
      />

      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <View>
          <Text style={[styles.headerTitle, { color: c.textPrimary }]}>Messages</Text>
          {totalUnread > 0 && (
            <Text style={[styles.headerSub, { color: c.accent }]}>
              {totalUnread} unread
            </Text>
          )}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.headerBtn, { backgroundColor: c.surface }]}
            activeOpacity={0.7}
          >
            <Search size={18} color={c.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerBtn, { backgroundColor: c.surface }]}
            activeOpacity={0.7}
          >
            <Edit size={18} color={c.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={chats.length === 0 && styles.emptyWrap}
        ListEmptyComponent={
          <View style={styles.emptyInner}>
            <MessageSquare size={40} color={c.border} />
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              No conversations yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", letterSpacing: -0.5 },
  headerSub: { fontSize: 12, fontWeight: "500", marginTop: 2 },
  headerActions: { flexDirection: "row", gap: 8 },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { fontSize: 15, fontWeight: "700" },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "rgba(0, 186, 52, 1)",
    borderWidth: 2,
  },
  info: { flex: 1, gap: 4 },
  infoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { flex: 1, fontSize: 16, fontWeight: "600", marginRight: 8 },
  time: { fontSize: 11 },
  infoBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preview: { flex: 1, fontSize: 14, marginRight: 12 },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 10, fontWeight: "700", color: "#fff" },
  emptyWrap: { flex: 1 },
  emptyInner: { alignItems: "center", justifyContent: "center", paddingTop: 100, gap: 12 },
  emptyText: { fontSize: 14 },
});