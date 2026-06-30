import React, { useMemo, } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { ChevronLeft, Bell } from "lucide-react-native";
import { useAppContext } from "../../../context/AppContext";
import { ThemeTokens } from "../../../../hooks/theme";

export function NotificationInbox({ navigation }) {
  const { selectedTheme, posts, notifications=[], setNotifications } = useAppContext();
  const isDark = selectedTheme === "dark";
  const c = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const postMap = useMemo(() => {
    return posts.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {});
  }, [posts]);




  const enrichedNotifications = useMemo(() => {
    return notifications.map((n) => {
      const linkedPost = postMap[n.postId];
      const snippet = linkedPost?.content?.text
        ? linkedPost.content.text.slice(0, 80)
        : null;
      return { ...n, snippet };
    });
  }, [notifications, postMap]);

  const unreadCount = enrichedNotifications.filter((n) => !n.isRead).length;
  const newNotifications = enrichedNotifications.filter((n) => !n.isRead);
  const earlierNotifications = enrichedNotifications.filter((n) => n.isRead);

  const handleNotificationPress = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );

    if (item.type === "reply" || item.type === "verse") {
      navigation?.navigation("Comments", { postId: item.postId })
    } else if (item.type === "marketplace") {

      navigation?.navigate("ChatRoom", { chatId: "2" });
    };
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const renderAvatar = (department) => (
    <View style={[styles.avatar, { backgroundColor: c.surfaceElevated }]}>
      <Text style={[styles.avatarText, { color: c.textSecondary }]}>
        {department || "CE"}
      </Text>
    </View>
  );

  const renderCard = ({ item }) => {
    const isUnread = !item.isRead;
    return (
      <TouchableOpacity
        onPress={() => handleNotificationPress(item.id)}
        activeOpacity={0.75}
        style={[
          styles.card,
          { borderBottomColor: c.border, backgroundColor: c.background },
          isUnread && {
            backgroundColor: "rgba(0, 186, 52, 0.15)",
          },
        ]}
      >
        <View style={styles.bellCol}>
          <View
            style={[
              styles.bellIconWrapper,
              {
                backgroundColor: isUnread
                  ? "rgba(0, 186, 52, 0.08)"
                  : c.background,
              },
            ]}
          >
            <Bell
              size={16}
              color={c.accent}
              fill={c.accent}
              strokeWidth={2}
            />
          </View>
        </View>

        <View style={styles.centerCol}>
          <View style={styles.topRow}>
            {renderAvatar(item.department)}
            <Text style={[styles.cardTitle, { color: c.textMuted }]}>
              {item.title}
            </Text>
            <Text style={[styles.dot, { color: c.border }]}>·</Text>
            <Text style={[styles.timestamp, { color: c.textMuted }]}>
              {item.timestamp}
            </Text>
          </View>
          <Text
            style={[
              styles.cardBody,
              {
                color: c.textPrimary,
                fontWeight: isUnread ? "600" : "500",
              },
            ]}
            numberOfLines={2}
          >
            {item.body}
          </Text>
        </View>

        {item.snippet ? (
          <View
            style={[
              styles.snippetCol,
              { backgroundColor: c.background, borderColor: c.border },
            ]}
          >
            <Text
              style={[styles.snippetText, { color: c.textMuted }]}
              numberOfLines={5}
            >
              {item.snippet}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderSectionLabel = (label) => (
    <View style={[styles.sectionLabel, { borderBottomColor: c.border }]}>
      <Text style={[styles.sectionLabelText, { color: c.textMuted }]}>
        {label}
      </Text>
    </View>
  );

  const sections = [
    ...(newNotifications.length > 0
      ? [{ type: "label", label: "New", id: "label_new" }, ...newNotifications]
      : []),
    ...(earlierNotifications.length > 0
      ? [
        { type: "label", label: "Earlier", id: "label_earlier" },
        ...earlierNotifications,
      ]
      : []),
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={c.background}
      />

      <View
        style={[
          styles.header,
          { backgroundColor: c.background, borderBottomColor: c.border },
        ]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={[styles.backBtn, { backgroundColor: c.surface }]}
            activeOpacity={0.7}
          >
            <ChevronLeft size={18} color={c.textPrimary} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.textPrimary }]}>
            Notifications
          </Text>
        </View>

        <View style={styles.headerMeta}>
          {unreadCount > 0 ? (
            <View
              style={[
                styles.unreadPill,
                { backgroundColor: "rgba(0, 186, 52, 0.1)" },
              ]}
            >
              <Text style={[styles.unreadPillText, { color: c.accent }]}>
                {unreadCount} unread
              </Text>
            </View>
          ) : (
            <View />
          )}
          <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
            <Text style={[styles.markReadText, { color: c.textMuted }]}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          sections.length === 0 ? styles.emptyContainer : null
        }
        ListEmptyComponent={
          <View style={styles.emptyInner}>
            <Text style={[styles.emptyText, { color: c.textMuted }]}>
              No notifications
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          if (item.type === "label") return renderSectionLabel(item.label);
          return renderCard({ item });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 14,
  },
  headerTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "700", letterSpacing: -0.5 },
  headerMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unreadPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  unreadPillText: { fontSize: 12, fontWeight: "600" },
  markReadText: { fontSize: 12, fontWeight: "500" },
  sectionLabel: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
  },
  bellCol: { paddingTop: 2, flexShrink: 0 },
  bellIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  centerCol: { flex: 1, flexDirection: "column", gap: 5, minWidth: 0 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },
  cardTitle: { fontSize: 14, fontWeight: "500" },
  dot: { fontSize: 11 },
  timestamp: { fontSize: 12 },
  cardBody: { fontSize: 14, lineHeight: 19 },
  snippetCol: {
    flexShrink: 0,
    width: 58,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    padding: 3,
  },
  snippetText: { fontSize: 8, lineHeight: 10 },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyInner: { paddingTop: 80, alignItems: "center" },
  emptyText: { fontSize: 14 },
});