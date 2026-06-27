import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from "react-native";
import { ChevronLeft, MessageSquare, Flame, Store, Megaphone, Bell } from "lucide-react-native";
import { useAppContext } from "../../../context/AppContext";
import { ThemeTokens } from "../../../../hooks/theme";

const mockNotifications = [
  {
    id: "ntf_1",
    type: "reply",
    title: "Post from",
    body: "Computer Engineering",
    department: "CE",
    timestamp: '2m',
    isRead: false
  },
  {
    id: "ntf_3",
    type: "marketplace",
    title: "Offer on MacBook Pro",
    body: "Emeka Didi",
    department: "MS",
    timestamp: "5h",
    isRead: true,
  },
  {
    id: "ntf_4",
    type: "verse",
    title: "Post from",
    body: "Law",
    department: "LW",
    timestamp: "1d",
    isRead: true,
  },
]

export function NotificationInbox({ navigation }) {
  const { selectedTheme } = useAppContext();

  const [notifications, setNotifications] = useState(mockNotifications);
  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light

  const handleNotificationPress = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getNotificationIcon = (department) => {
    return (
      <View style={[styles.avatarPlaceholder, { backgroundColor: themeColor.surfaceElevated }]}>
        <Text style={[styles.avatarText, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }]}>
          {department || "CE"}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={themeColor.background}
      />

      <View style={[styles.header, { backgroundColor: themeColor.background, borderBottomColor: themeColor.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.headerAction}
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color={isDark ? "#FFFFFF" : themeColor.textPrimary} strokeWidth={2.5} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary, paddingHorizontal: 0 }]}>
              Notifications
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: themeColor.textMuted }]}>Your notification stream is clear.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleNotificationPress(item.id)}
            activeOpacity={0.85}
            style={[
              styles.notificationCard,
              !item.isRead ? ({ borderLeftWidth: 3.5, backgroundColor: "rgba(0, 186, 52, 0.2)", borderBottomColor: themeColor.border }) : ({ borderLeftWidth: 3.5, backgroundColor: themeColor.background, borderBottomColor: themeColor.border })
            ]}
          >
            <View style={styles.card}>
              <View style={styles.notificationIcon}>
                <Bell size={22} color="rgba(0, 186, 52, 1)" fill="rgba(0, 186, 52, 1)" strokeWidth={3} />
              </View>
              
              <View style={styles.cardRightContent}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.cardHeaderLeft}>
                    <View style={[styles.iconWrapper]}>
                      {getNotificationIcon(item.department)}
                    </View>
                    <View style={styles.title}>
                      <Text style={[styles.cardTitle, { color: isDark ? "#FFFFFF" : themeColor.textPrimary }, !item.isRead && styles.unreadTitleText]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.timestamp, { color: themeColor.textMuted }]}>&bull;{item.timestamp}</Text>
                    </View>
                  </View>
                </View>

                <Text style={[styles.cardBody, { color: themeColor.textPrimary }]} numberOfLines={2}>
                  {item.body}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "column",
    gap: 12,
  },
  headerAction: {
    padding: 4
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.3
  },
  unreadBadgeText: {
    fontSize: 11,
    color: "#17CB49",
    fontWeight: "600",
    marginTop: 1,
  },
  markReadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(23, 203, 73, 0.08)",
    borderRadius: 20,
  },
  markReadText: {
    fontSize: 12,
    color: "#17CB49",
    fontWeight: "600",
  },
  scrollContent: {
    gap: 1,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1F2633",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10
  },
  notificationIcon: {
    paddingTop: 6,
  },
  cardRightContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'flex-start'
  },
  notificationCard: {
    padding: 14,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: 'center',
    gap: 5
  },
  cardHeaderLeft: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },
  iconWrapper: {
  },
  title: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 5
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  unreadTitleText: {
    fontWeight: "700",
  },
  timestamp: {
    fontSize: 12,
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  }
});