import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Send,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react-native";
import { ThemeTokens } from "../../../../hooks/theme";

const COLORS = {
  void: "#000000",
  cyan: "#17CB49",
  white: "#FFFFFF",
};

export function ContactUs({
  isOpen,
  setIsOpen,
  selectedTopic,
  setSelectedTopic,
  message,
  setMessage,
  isSubmitted,
  attachment,
  setAttachment,
  topics,
  handleSubmit,
  navigation,
  selectedTheme,
}) {
  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
        setSelectedTopic("");
      };
    }, [])
  );

  const handleNativeAttachmentPress = () => {
    if (attachment) {
      setAttachment(null);
    } else {
      setAttachment("screenshot_mockup.png");
    }
  };

  const handleFormSubmit = () => {
    if (selectedTopic && message) {
      handleSubmit?.();
    }
  };

  if (isSubmitted) {
    return (
      <View style={[styles.successContainer, { backgroundColor: themeColor.background }]}>
        <StatusBar 
          barStyle={isDark ? "light-content" : "dark-content"} 
          backgroundColor={themeColor.background} 
        />

        <View style={[styles.successIconWrapper, { backgroundColor: themeColor.surface }]}>
          <CheckCircle2 size={32} color={COLORS.cyan} />
        </View>

        <Text style={[styles.successTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Message sent</Text>
        <Text style={[styles.successSubtitle, { color: themeColor.textMuted }]}>
          Thanks for reaching out. A student support representative will review
          your message and reply to your campus email shortly.
        </Text>

        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          activeOpacity={0.8}
          style={[styles.successButton, { backgroundColor: isDark ? COLORS.white : themeColor.textPrimary }]}
        >
          <Text style={[styles.successButtonText, { color: isDark ? COLORS.void : themeColor.background }]}>
            Back to Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColor.background }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={themeColor.background} 
      />

      {/* Header Layout */}
      <View style={[styles.header, { backgroundColor: themeColor.background }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={isDark ? COLORS.white : themeColor.textPrimary} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Contact Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Support Context Callout */}
        <View style={[styles.noticeSection, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
          <AlertCircle size={18} color={themeColor.textMuted} style={styles.noticeIcon} />
          <View style={styles.noticeMeta}>
            <Text style={[styles.noticeTitle, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>Typical response time</Text>
            <Text style={[styles.noticeSubtitle, { color: themeColor.textMuted }]}>
              We are online from 8:00 AM to 6:00 PM on school days and usually respond within a couple of hours.
            </Text>
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          
          {/* Dropdown Input Group */}
          <View style={[styles.inputGroup, { zIndex: 50 }]}>
            <Text style={[styles.inputLabel, { color: themeColor.textMuted }]}>What do you need help with?</Text>

            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              activeOpacity={0.8}
              style={[styles.dropdownSelectorButton, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}
            >
              <Text style={selectedTopic ? [styles.dropdownTextActive, { color: isDark ? COLORS.white : themeColor.textPrimary }] : [styles.dropdownTextPlaceholder, { color: themeColor.textMuted }]}>
                {selectedTopic ? selectedTopic.label : "Select a topic"}
              </Text>
              {isOpen ? <ChevronUp size={16} color={themeColor.textMuted} /> : <ChevronDown size={16} color={themeColor.textMuted} />}
            </TouchableOpacity>

            {isOpen && (
              <View style={[styles.dropdownMenuOverlay, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}>
                {topics.map((topic, idx) => {
                  const isLastItem = idx === topics.length - 1;
                  return (
                    <TouchableOpacity
                      key={topic.id}
                      onPress={() => {
                        setSelectedTopic(topic);
                        setIsOpen(false);
                      }}
                      activeOpacity={0.7}
                      style={[
                        styles.dropdownOptionRow, 
                        { backgroundColor: themeColor.surface },
                        !isLastItem && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColor.border }
                      ]}
                    >
                      <Text style={[styles.dropdownOptionText, { color: isDark ? COLORS.white : themeColor.textPrimary }]}>
                        {topic.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Text Area Input Group */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColor.textMuted }]}>Your message</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue or question in detail..."
              placeholderTextColor={themeColor.textMuted}
              multiline={true}
              numberOfLines={5}
              keyboardAppearance={isDark ? "dark" : "light"}
              textAlignVertical="top"
              style={[styles.textareaInput, { backgroundColor: themeColor.surface, borderColor: themeColor.border, color: isDark ? COLORS.white : themeColor.textPrimary }]}
            />
          </View>

          {/* File Attachment Input Group */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: themeColor.textMuted }]}>Attachment (Optional)</Text>
            <TouchableOpacity
              onPress={handleNativeAttachmentPress}
              activeOpacity={0.8}
              style={[styles.attachmentButtonContainer, { backgroundColor: themeColor.surface, borderColor: themeColor.border }]}
            >
              <Paperclip size={18} color={themeColor.textMuted} />
              <Text style={[styles.attachmentButtonText, { color: themeColor.textMuted }]}>
                {attachment ? attachment : "Attach a screenshot or image"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Action Button */}
          <TouchableOpacity
            onPress={handleFormSubmit}
            activeOpacity={0.85}
            disabled={!selectedTopic || !message}
            style={[
              styles.submitButton,
              (!selectedTopic || !message) && styles.submitButtonDisabled,
            ]}
          >
            <Send size={14} color={COLORS.white} />
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
    paddingVertical: 16,
  },
  headerAction: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  headerSpacer: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 112,
  },
  noticeSection: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 24,
  },
  noticeIcon: {
    marginTop: 2,
  },
  noticeMeta: {
    flex: 1,
    gap: 2,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  noticeSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20,
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    position: "relative",
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 2,
  },
  dropdownSelectorButton: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTextPlaceholder: {
    fontSize: 14,
    fontWeight: "400",
  },
  dropdownTextActive: {
    fontSize: 14,
    fontWeight: "500",
  },
  dropdownMenuOverlay: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 999,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  dropdownOptionRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownOptionText: {
    fontSize: 14,
    fontWeight: "400",
  },
  textareaInput: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.2,
    minHeight: 120,
    lineHeight: 22,
  },
  attachmentButtonContainer: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  attachmentButtonText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  submitButton: {
    width: "100%",
    backgroundColor: COLORS.cyan,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.3,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  successIconWrapper: {
    padding: 16,
    borderRadius: 99,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  successSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
    marginTop: 8,
  },
  successButton: {
    marginTop: 24,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  successButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});