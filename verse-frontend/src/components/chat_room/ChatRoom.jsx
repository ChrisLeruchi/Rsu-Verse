import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { ChevronLeft, Send, Paperclip, Smile, MoreVertical } from "lucide-react-native";
import { useAppContext } from "../../context/AppContext";
import { ThemeTokens } from "../../../hooks/theme";


export function ChatRoom({ route, navigation }) {
  const { selectedTheme, mockChat, setMockChat } = useAppContext();
  const isDark = selectedTheme === "dark";
  const c = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const chatId = route?.params?.chatId ?? "1";
  const activeChat = mockChat.chats.find((ch) => ch.id === chatId) ?? mockChat.chats[0];
  const chatMessages = activeChat.messages ?? [];
  

  const [text, setText] = useState("");
  const flatListRef = useRef(null);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: "me",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setText("");
    setMockChat((prev) => ({
      ...prev,
      chats: prev.chats.map((chat) =>
        chat.id === chatId
          ? {
            ...chat,
            lastMessage: text.trim(),
            timeStamp: "Now",
            messages: [newMsg, ...chat.messages]
          }
          : chat
      )
    }));

  }, [text, chatId, setMockChat]);

  const renderBubble = ({ item, index }) => {
    const isMe = item.senderId === "me";
    const prevItem = chatMessages[index + 1];
    const isFirstInGroup = !prevItem || prevItem.senderId !== item.senderId;

    return (
      <View style={[styles.bubbleRow, isMe ? styles.rowMe : styles.rowOther]}>
        {!isMe && isFirstInGroup && (
          <View style={[styles.bubbleAvatar, { backgroundColor: c.surfaceElevated }]}>
            <Text style={[styles.bubbleAvatarText, { color: c.textSecondary }]}>
              {activeChat.initials}
            </Text>
          </View>
        )}
        {!isMe && !isFirstInGroup && <View style={styles.bubbleAvatarSpacer} />}

        <View
          style={[
            styles.bubble,
            isMe
              ? [styles.bubbleMe, { backgroundColor: c.accent }]
              : [styles.bubbleOther, { backgroundColor: c.surfaceElevated, borderColor: c.border }],
            isMe && !isFirstInGroup && styles.bubbleMeGrouped,
            !isMe && !isFirstInGroup && styles.bubbleOtherGrouped,
          ]}
        >
          <Text
            style={[
              styles.bubbleText,
              { color: isMe ? "#ffffff" : c.textPrimary },
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.bubbleTime,
              { color: isMe ? "rgba(255,255,255,0.55)" : c.textMuted },
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={c.background}
      />

      <View style={[styles.header, { borderBottomColor: c.border, backgroundColor: c.background }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <ChevronLeft size={20} color={c.textPrimary} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={[styles.headerAvatar, { backgroundColor: c.surfaceElevated }]}>
          <Text style={[styles.headerAvatarText, { color: c.textSecondary }]}>
            {activeChat.initials}
          </Text>
          {activeChat.isOnline && (
            <View style={[styles.headerOnlineDot, { borderColor: c.surfaceElevated }]} />
          )}
        </View>

        <View style={styles.headerMeta}>
          <Text style={[styles.headerName, { color: c.textPrimary }]}>
            {activeChat.department}
          </Text>
          {activeChat.isOnline && (
            <Text style={[styles.headerStatus, { color: c.accent }]}>Active now</Text>
          )}
        </View>

        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
          <MoreVertical size={20} color={c.textSecondary} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={chatMessages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={renderBubble}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              No messages yet. Start the conversation.
            </Text>
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={[styles.inputBar, { backgroundColor: c.background, borderTopColor: c.border }]}>
          <TouchableOpacity style={styles.inputAction} activeOpacity={0.7}>
            <Paperclip size={20} color={c.textMuted} />
          </TouchableOpacity>

          <View style={[styles.inputWrap, { backgroundColor: c.surface, borderColor: c.border }]}>
            <TextInput
              style={[styles.input, { color: c.textPrimary }]}
              placeholder="Message..."
              placeholderTextColor={c.textMuted}
              value={text}
              onChangeText={setText}
              multiline
              returnKeyType="default"
            />
            <TouchableOpacity style={styles.inputAction} activeOpacity={0.7}>
              <Smile size={20} color={c.textMuted} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendBtn,
              {
                backgroundColor: text.trim().length > 0 ? c.accent : c.surface,
              },
            ]}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            <Send
              size={16}
              color={text.trim().length > 0 ? "#ffffff" : c.textMuted}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 10,
  },
  backBtn: { padding: 4 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerAvatarText: { fontSize: 12, fontWeight: "700" },
  headerOnlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 186, 52, 1)",
    borderWidth: 1.5,
  },
  headerMeta: { flex: 1, gap: 1 },
  headerName: { fontSize: 14, fontWeight: "600" },
  headerStatus: { fontSize: 11 },
  moreBtn: { padding: 4 },
  messageList: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 6,
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 2,
  },
  rowMe: { justifyContent: "flex-end" },
  rowOther: { justifyContent: "flex-start" },
  bubbleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bubbleAvatarText: { fontSize: 9, fontWeight: "700" },
  bubbleAvatarSpacer: { width: 28 },
  bubble: {
    maxWidth: "72%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 3,
  },
  bubbleMe: {
    borderBottomRightRadius: 4,
    borderWidth: 0,
  },
  bubbleOther: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  bubbleMeGrouped: { borderBottomRightRadius: 18, marginTop: 2 },
  bubbleOtherGrouped: { borderBottomLeftRadius: 18, marginTop: 2 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTime: { fontSize: 10, alignSelf: "flex-end" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  inputAction: { padding: 4 },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    paddingHorizontal: 14,
    borderWidth: 1,
    minHeight: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: Platform.OS === "ios" ? 8 : 4,
    maxHeight: 100,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWrap: {
    transform: [{ scaleY: -1 }],
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: { fontSize: 13, textAlign: "center" },
});