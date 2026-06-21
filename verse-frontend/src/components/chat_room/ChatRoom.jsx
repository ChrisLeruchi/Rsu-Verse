import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { ChevronLeft, Send, Image, Smile, MoreVertical } from "lucide-react-native";

const MOCK_MESSAGES = [
  { id: "m3", senderId: "other", text: "Yeah! Let's meet at the campus library tech desk.", time: "4:16 PM" },
  { id: "m2", senderId: "me", text: "Awesome! Are you free to drop it off around noon tomorrow?", time: "4:15 PM" },
  { id: "m1", senderId: "other", text: "Hey Alex! I found the engineering manual you were looking for.", time: "4:12 PM" },
];


const MOCK_CHATS = [
  {
    id: '1',
    department: 'Computer',
    faculty: 'Engineering',
    lastMessage: 'Did you hear what that lecturer did?',
    timeStamp: "2m",
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: "m3", senderId: "other", text: "Yeah! Let's meet at the campus library tech desk.", time: "4:16 PM" },
      { id: "m2", senderId: "me", text: "Awesome! Are you free to drop it off around noon tomorrow?", time: "4:15 PM" },
      { id: "m1", senderId: "other", text: "Hey Alex! I found the engineering manual you were looking for.", time: "4:12 PM" },
    ]
  },
  {
    id: '2',
    department: 'Management',
    faculty: 'Sciences',
    lastMessage: 'Sent an attachment: Marketplace Item',
    timeStamp: "1h",
    unreadCount: 0,
    isOnline: false,
    messages: []
  },
]

const COLORS = {
  void: "#000000",
  ink: "#1A1A1A",
  cyan: "#17CB49",
  white: "#FFFFFF",
  white5: "rgba(255, 255, 255, 0.05)",
  white10: "rgba(255, 255, 255, 0.1)",
  white30: "rgba(255, 255, 255, 0.3)",
  white40: "rgba(255, 255, 255, 0.4)",
  white60: "rgba(255, 255, 255, 0.6)",
  white90: "rgba(255, 255, 255, 0.9)",
};

export function ChatRoom({ route, navigation }) {
  const chatId = route?.params?.chatId || route?.params?.roomId || "1";

  const activeChat = MOCK_CHATS.find((item) => item.id === chatId) || MOCK_CHATS[0];

  const [messages, setMessages] = useState(activeChat.messages || []);
  const [text, setText] = useState("");
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: "me",
      text: text.trim(),
      time: "Just now"
    };

    setMessages([newMessage, ...messages]);
    setText("");
  };

  const renderMessageBubble = ({ item }) => {
    const isMe = item.senderId === "me";
    return (
      <View style={[styles.messageRow, isMe ? styles.rowMe : styles.rowOther]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={[styles.bubbleText, isMe ? styles.textMe : styles.textOther]}>
            {item.text}
          </Text>
          <Text style={styles.bubbleTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <ChevronLeft size={20} color={COLORS.white60} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{activeChat.faculty}</Text>
          <Text style={styles.headerSubtitle}>{activeChat.isOnline ? "Active now" : ""}</Text>
        </View>
        <TouchableOpacity>
          <MoreVertical size={20} color={COLORS.white60} />
        </TouchableOpacity>
      </View>


      <FlatList
        ref={flatListRef}
        data={messages}
        inverted={true}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageBubble}
        contentContainerStyle={styles.messageListContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages here yet. Start the conversation!</Text>
          </View>
        }
      />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image size={22} color={COLORS.white40} />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Message..."
              placeholderTextColor={COLORS.white30}
              value={text}
              onChangeText={setText}
              multiline={true}
            />
            <TouchableOpacity style={styles.innerInputIcon}>
              <Smile size={20} color={COLORS.white40} />
            </TouchableOpacity>
          </View>

          {text.trim().length > 0 && (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
              <Send size={16} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.void },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  headerCenter: { alignItems: "center", flexDirection: "row", gap: 10 },
  headerTitle: { fontSize: 14, fontWeight: "600", color: COLORS.white90 },
  headerSubtitle: { fontSize: 11, color: COLORS.cyan, marginTop: 1 },
  messageListContainer: { paddingHorizontal: 14, paddingVertical: 16, gap: 14 },
  messageRow: { flexDirection: "row", width: "100%" },
  rowMe: { justifyContent: "flex-end" },
  rowOther: { justifyContent: "flex-start" },
  bubble: { maxWidth: "75%", borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10, gap: 4 },
  bubbleMe: { backgroundColor: COLORS.cyan, borderBottomRightRadius: 2 },
  bubbleOther: { backgroundColor: COLORS.ink, borderBottomLeftRadius: 2, borderWidth: 1, borderColor: COLORS.white5 },
  bubbleText: { fontSize: 14, lineHeight: 19 },
  textMe: { color: COLORS.white, fontWeight: "400" },
  textOther: { color: COLORS.white90 },
  bubbleTime: { fontSize: 10, color: "rgba(255,255,255,0.4)", alignSelf: "flex-end", marginTop: 2 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.void,
    borderTopWidth: 1,
    borderTopColor: COLORS.white5,
    gap: 8,
  },
  iconButton: { padding: 4 },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.ink,
    borderRadius: 22,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.white5,
  },
  textInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    paddingVertical: Platform.OS === "ios" ? 8 : 4,
    maxHeight: 80,
  },
  innerInputIcon: { padding: 4 },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
  
  emptyContainer: { transform: [{ scaleY: -1 }], alignItems: "center", padding: 32 },
  emptyText: { color: COLORS.white30, fontSize: 13, textAlign: "center" },
});
