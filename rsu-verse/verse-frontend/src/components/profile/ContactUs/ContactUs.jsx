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

const COLORS = {
  void: "#0A0A0A",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#161618",
  cyan: "#00BA34",
  white: "#FFFFFF",
  white5: "rgba(255, 255, 255, 0.05)",
  white10: "rgba(255, 255, 255, 0.1)",
  white20: "rgba(255, 255, 255, 0.2)",
  white30: "rgba(255, 255, 255, 0.3)",
  white40: "rgba(255, 255, 255, 0.4)",
  white50: "rgba(255, 255, 255, 0.5)",
  white60: "rgba(255, 255, 255, 0.6)",
  white80: "rgba(255, 255, 255, 0.8)",
  white90: "rgba(255, 255, 255, 0.9)",
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
}) {
  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  useFocusEffect(
    useCallback(() => {

      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
        setSelectedTopic("")
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
      <View style={styles.successContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.void} />

        <View style={styles.successIconWrapper}>
          <CheckCircle2 size={32} color={COLORS.white} />
        </View>

        <Text style={styles.successTitle}>Message sent</Text>
        <Text style={styles.successSubtitle}>
          Thanks for reaching out. A student support representative will review
          your message and reply to your campus email shortly.
        </Text>

        <TouchableOpacity
          onPress={() => navigation?.navigate("Profile")}
          activeOpacity={0.8}
          style={styles.successButton}
        >
          <Text style={styles.successButtonText}>Back to Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.void} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.navigate("Profile")}
          style={styles.headerAction}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={COLORS.white60} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.noticeSection}>
          <AlertCircle size={18} color={COLORS.white40} style={styles.noticeIcon} />
          <View style={styles.noticeMeta}>
            <Text style={styles.noticeTitle}>Typical response time</Text>
            <Text style={styles.noticeSubtitle}>
              We are online from 8:00 AM to 6:00 PM on school days and usually respond within a couple of hours.
            </Text>
          </View>
        </View>


        <View style={styles.formContainer}>


          <View style={[styles.inputGroup, { zIndex: 50 }]}>
            <Text style={styles.inputLabel}>What do you need help with?</Text>

            <TouchableOpacity
              type="button"
              onPress={() => setIsOpen(!isOpen)}
              activeOpacity={0.8}
              style={styles.dropdownSelectorButton}
            >
              <Text style={selectedTopic ? styles.dropdownTextActive : styles.dropdownTextPlaceholder}>
                {selectedTopic ? selectedTopic.label : "Select a topic"}
              </Text>
              {isOpen ? <ChevronUp size={16} color={COLORS.white40} /> : <ChevronDown
                size={16}
                color={COLORS.white40}
              />}
            </TouchableOpacity>


            {isOpen && (
              <View style={styles.dropdownMenuOverlay}>
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
                      style={[styles.dropdownOptionRow, !isLastItem && styles.dropdownOptionBorder]}
                    >
                      <Text style={styles.dropdownOptionText}>{topic.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>


          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Your message</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue or question in detail..."
              placeholderTextColor={COLORS.white20}
              multiline={true}
              numberOfLines={5}
              keyboardAppearance="dark"
              textAlignVertical="top"
              style={styles.textareaInput}
            />
          </View>


          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Attachment (Optional)</Text>
            <TouchableOpacity
              onPress={handleNativeAttachmentPress}
              activeOpacity={0.8}
              style={styles.attachmentButtonContainer}
            >
              <Paperclip size={18} color={COLORS.white30} />
              <Text style={styles.attachmentButtonText}>
                {attachment ? attachment : "Attach a screenshot or image"}
              </Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={handleFormSubmit}
            activeOpacity={0.85}
            disabled={!selectedTopic || !message}
            style={[
              styles.submitButton,
              (!selectedTopic || !message) && styles.submitButtonDisabled,
            ]}
          >
            <Send size={15} color={COLORS.white} />
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
    backgroundColor: COLORS.void,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.void80,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  headerAction: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    letterSpacing: -0.4,
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
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
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
    fontWeight: "500",
    color: COLORS.white90,
  },
  noticeSubtitle: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.white40,
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
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white50,
    paddingHorizontal: 2,
  },
  dropdownSelectorButton: {
    width: "100%",
    backgroundColor: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTextPlaceholder: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white30,
  },
  dropdownTextActive: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
  },
  dropdownMenuOverlay: {
    position: "absolute",
    top: 84,
    left: 0,
    right: 0,
    backgroundColor: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.white10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  dropdownOptionRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.ink,
  },
  dropdownOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: COLORS.white80,
  },
  textareaInput: {
    width: "100%",
    backgroundColor: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.white5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.white,
    letterSpacing: 0.2,
    minHeight: 120,
    lineHeight: 22,
  },
  attachmentButtonContainer: {
    width: "100%",
    backgroundColor: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.white10,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  attachmentButtonText: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white40,
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
    opacity: 0.4,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    backgroundColor: COLORS.void,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  successIconWrapper: {
    padding: 16,
    backgroundColor: COLORS.white5,
    borderRadius: 99,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: -0.4,
  },
  successSubtitle: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white40,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
    marginTop: 8,
  },
  successButton: {
    marginTop: 24,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  successButtonText: {
    color: COLORS.void,
    fontSize: 14,
    fontWeight: "600",
  },
});