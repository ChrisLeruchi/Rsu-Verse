import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ShoppingBag,
  MessagesSquare,
  Image as ImageIcon,
  ShieldAlert,
  X,
  Flame,
  Landmark,
  Music,
  HeartHandshake,
  ChevronDown,
  Check
} from "lucide-react-native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  StyleSheet,
  DeviceEventEmitter,
} from "react-native";
import * as Crypto from 'expo-crypto';
import * as ImagePicker from "expo-image-picker";
import { ThemeTokens } from "../../../hooks/theme";

export function CreatePost({ setPosts, setActiveFilter, selectedTheme }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const isDark = selectedTheme === 'dark';
  const themeColor = isDark ? ThemeTokens.colors.dark : ThemeTokens.colors.light;

  const [verse, setVerse] = useState("gist");
  const [text, setText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Used");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("general");

  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  
  useEffect(() => {
    if (verse !== "market") {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      Keyboard.dismiss();
    }
  }, [verse]);

  const handlePickImage = async () => {
    if (images.length >= 4) {
      Alert.alert("Maximum of 4 images allowed per post.");
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission needed to access camera roll.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 4 - images.length,
      base64: true,
    });

    if (!result.canceled) {
      const base64Strings = result.assets.map(
        (asset) => `data:image/jpeg;base64,${asset.base64}`
      );
      setImages((prevImages) => [...prevImages, ...base64Strings].slice(0, 4));
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleBroadcast = () => {
    if (verse === "gist" && !text.trim() && images.length === 0) return;
    if (verse === "market" && (!text.trim() || !price)) return;

    setIsSubmitting(true);

    let themeConfig = {
      bg: "bg-Cyan/10",
      text: "text-Cyan",
      glow: "glow-Cyan",
      border: "border-Cyan/20"
    };

    if (verse === "market") {
      themeConfig = {
        bg: "bg-cyan/10",
        text: "text-cyan",
        glow: "glow-cyan",
        border: "border-cyan/20"
      };
    } else if (["music", "politics", "relationship"].includes(verse)) {
      themeConfig = {
        bg: "bg-cyan/10",
        text: "text-cyan",
        glow: "glow-cyan",
        border: "border-cyan/20"
      };
    }

    const displayName = isAnonymous && verse !== "market" ? "Engineering" : "Christopher Igwe Leruchi";
    const displayHandle = "Comp Eng";

    const newTransmission = {
      id: `rsu-verse-${Crypto.randomUUID()}`,
      verse,
      author: {
        anonymous: verse === "market" ? false : isAnonymous,
        name: displayName,
        department: displayHandle,
        faculty: displayName,
        Department: "Comp Eng",
        Level: "500",
        rating: 4.7,
        totalSales: verse === "market" ? 14 : ""
      },
      content: {
        text: text,
        images: images,
        tags: verse === "market" ? [category.toLowerCase()] : [verse.toUpperCase()]
      },
      meta: {
        createdAt: new Date().toISOString(),
        location: "RSU",
        edited: false
      },
      engagement: {
        upvotes: 0,
        downvotes: 0,
        comments: [],
        shares: 0,
        saves: 0,
        reposts: 0
      },
      userInteraction: {
        voteStatus: null,
        reposts: false,
        saved: false
      },
      theme: themeConfig,
      ...(verse === "market" && {
        marketPlace: {
          price: Number(price) || 0,
          condition: condition,
          description: text,
          category: category
        }
      })
    };

    setPosts((prevPosts) => [newTransmission, ...prevPosts]);

    setText("");
    setPrice("");
    setCondition("Used");
    setImages([]);
    setCategory("general");
    setIsOpen(false);
    setVerse("gist");
    setIsSubmitting(false);

    DeviceEventEmitter.emit("verse_reset_feed_scroll");

    if (verse === "market") {
      navigation.navigate("Market");
    } else {
      setActiveFilter("all");
      navigation.navigate("HomeIndex");
    }
  };

  const handleCancel = () => {
    navigation.navigate("HomeIndex");
    setActiveFilter('all');
    setText("")
    setPrice("");
    setVerse("gist");
    setImages([]);
    setPrice("");
    setCondition("Used");
    setCategory("general");
    setIsOpen(false);
  }

  const textWhiteColor = themeColor.textPrimary; 
  const textMutedColor = themeColor.textMuted;
  const textInactiveColor = textMutedColor;
  const iconInactiveColor = textMutedColor;
  
  const cyanPrimary = "#00BA34";
  const rosePrimary = "#F59E0B";
  const activeBrandColor = verse === "confession" ? rosePrimary : cyanPrimary;

  const channels = [
    { id: "gist", label: "Gist", icon: <MessagesSquare size={14} color={verse === "gist" ? textWhiteColor : iconInactiveColor} /> },
    { id: "market", label: "Market", icon: <ShoppingBag size={14} color={verse === "market" ? textWhiteColor : iconInactiveColor} /> },
    { id: "confession", label: "Confession", icon: <Flame size={14} color={verse === "confession" ? textWhiteColor : iconInactiveColor} /> },
    { id: "music", label: "Music", icon: <Music size={14} color={verse === "music" ? textWhiteColor : iconInactiveColor} /> },
    { id: "politics", label: "Politics", icon: <Landmark size={14} color={verse === "politics" ? textWhiteColor : iconInactiveColor} /> },
    { id: "relationship", label: "Relationship", icon: <HeartHandshake size={14} color={verse === "relationship" ? textWhiteColor : iconInactiveColor} /> },
  ];

  const isShareDisabled = verse === "market"
    ? (isSubmitting || !text.trim() || !price || images.length === 0)
    : (!text.trim() && images.length === 0);

  return (
    <View style={[styles.screenWrapper, { backgroundColor: themeColor.background }]}>
      <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safeHeader, { backgroundColor: themeColor.background }]}>
        <View style={[styles.headerRow, { borderBottomColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }]}>
          <Pressable
            onPress={handleCancel}
            disabled={isSubmitting}
            style={styles.backBtn}
          >
            <Text style={[styles.cancelText, { color: themeColor.textPrimary }]}>Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleBroadcast}
            disabled={isShareDisabled}
            style={[
              styles.shareBtn,
              verse === "confession" ? styles.bgRose ? styles.bgRose : styles.bgCyan : styles.bgCyan,
              { backgroundColor: activeBrandColor },
              isShareDisabled && styles.disabledBtn
            ]}
          >
            <Text style={[styles.shareBtnText, { color: '#FFFFFF' }]}>
              {isSubmitting ? "Posting" : "Post"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 40 }
          ]}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={verse === "market" ? "handled" : "always"}
        >

          <View style={[styles.sectionContainer, { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.channelsScroll}
              keyboardShouldPersistTaps="always"
            >
              {channels.map((channel) => {
                const isSelected = verse === channel.id;
                return (
                  <Pressable
                    key={channel.id}
                    onPress={() => setVerse(channel.id)}
                    style={[
                      styles.channelButton,
                      { borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" },
                      isSelected ? (channel.id === "confession" ? styles.bgRoseTab : styles.bgCyanTab) : styles.inactiveChannel
                    ]}
                  >
                    {channel.icon}
                    <Text style={[
                      styles.channelButtonText, 
                      isSelected ? { color: themeColor.textPrimary } : { color: textInactiveColor }
                    ]}>
                      {channel.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>


          <View style={styles.composeFlowContainer}>
            <View style={styles.avatarColumn}>
              <View style={[styles.avatarMock, { backgroundColor: isDark ? "#262626" : "#E5E5E5" }]} />
            </View>

            <View style={styles.editorColumn}>
              <TextInput
                ref={inputRef}
                value={text}
                maxLength={500}
                onChangeText={setText}
                multiline
                placeholder={verse === "market" ? "What are you selling? Describe it here..." : "What's happening?..."}
                placeholderTextColor={textMutedColor}
                style={[styles.textAreaInput, { color: themeColor.textPrimary }]}
                textAlignVertical="top"
              />

              {images.length > 0 && (
                <View style={styles.imagesGrid}>
                  {images.map((url, index) => (
                    <View key={index} style={[
                      styles.imagePreviewWrapper,
                      images.length === 1 ? styles.singleImageWidth : styles.multiImageWidth,
                      { backgroundColor: isDark ? "#161616" : "#F5F5F5" }
                    ]}>
                      <Image source={{ uri: url }} style={styles.previewImage} />
                      <Pressable
                        onPress={() => handleRemoveImage(index)}
                        style={styles.removeImageBadge}
                      >
                        <X size={14} color="#FFFFFF" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}


            </View>
          </View>

          {/* Optional Sub-spec Blocks Formats */}
          {verse === "market" && (
            <View style={styles.specSectionWrapper}>
              <View style={[styles.editorToolbar, { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }]}>
                <Pressable onPress={handlePickImage} style={styles.mediaPickerBtn}>
                  <ImageIcon size={20} color={verse === "confession" ? "#F59E0B" : "#00BA34"} />
                </Pressable>

                <View style={styles.metaCounters}>
                  <Text style={[styles.counterText, { color: textMutedColor }, text.length >= 480 && styles.counterAlert]}>
                    {text.length}/500
                  </Text>
                  {images.length > 0 && (
                    <>
                      <Text style={[styles.counterDot, { color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }]}>•</Text>
                      <Text style={[styles.counterText, { color: textMutedColor }]}>{images.length}/4</Text>
                    </>
                  )}
                </View>
              </View>
              <View style={[styles.specCard, { backgroundColor: themeColor.surface, borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }]}>
                <Text style={[styles.specTitle, { color: cyanPrimary }]}>Item Specifications</Text>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: textMutedColor }]}>PRICE (₦)</Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={price}
                    onChangeText={(val) => {
                      if (val === "" || Number(val) >= 0) setPrice(val);
                    }}
                    placeholder="Set your price"
                    placeholderTextColor={textMutedColor}
                    style={[styles.numericInput, { color: themeColor.textPrimary, backgroundColor: themeColor.background, borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" }]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: textMutedColor }]}>CONDITION</Text>
                  <View style={[styles.segmentedControl, { backgroundColor: themeColor.background, borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" }]}>
                    {["Brand New", "Used", "Fixable"].map((cond) => {
                      const isSelected = condition === cond;
                      return (
                        <Pressable
                          key={cond}
                          disabled={isSubmitting}
                          onPress={() => setCondition(cond)}
                          style={[styles.segmentButton, isSelected && [styles.activeSegment, { backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }]]}
                        >
                          <Text style={[styles.segmentText, isSelected ? { color: themeColor.textPrimary } : { color: textInactiveColor }]}>
                            {cond === "Fixable" ? "Needs Repair" : cond}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: textMutedColor }]}>CATEGORY</Text>
                  <View style={styles.dropdownContainer}>
                    <Pressable
                      onPress={() => setIsOpen(!isOpen)}
                      style={[styles.dropdownTrigger, { backgroundColor: themeColor.background, borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" }, isOpen && styles.dropdownTriggerActive]}
                    >
                      <Text style={[styles.triggerText, category ? { color: themeColor.textPrimary } : { color: textMutedColor }]}>
                        {[
                          { id: "all", label: "All" },
                          { id: "gadgets", label: "Gadgets" },
                          { id: "books", label: "Books & PQs" },
                          { id: "fashion", label: "Fashion" },
                          { id: "hostels", label: "Hostels" },
                          { id: "appliances", label: "Appliances" },
                          { id: "services", label: "Services" },
                          { id: "food", label: "Provisions" }
                        ].find(c => c.id === category)?.label || "Select Category"}
                      </Text>
                      <ChevronDown size={16} color={textMutedColor} />
                    </Pressable>

                    {isOpen && (
                      <View style={[styles.dropdownMenuPlate, { backgroundColor: isDark ? "#161616" : "#F5F5F5", borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }]}>
                        <ScrollView
                          nestedScrollEnabled={true}
                          style={styles.dropdownScroll}
                          showsVerticalScrollIndicator={true}
                          keyboardShouldPersistTaps="handled"
                        >
                          {[
                            { id: "all", label: "All" },
                            { id: "gadgets", label: "Gadgets" },
                            { id: "books", label: "Books & PQs" },
                            { id: "fashion", label: "Fashion" },
                            { id: "hostels", label: "Hostels" },
                            { id: "appliances", label: "Appliances" },
                            { id: "services", label: "Services" },
                            { id: "food", label: "Provisions" }
                          ].map((cat) => {
                            const isSelected = category === cat.id;
                            return (
                              <Pressable
                                key={cat.id}
                                disabled={isSubmitting}
                                onPress={() => {
                                  setCategory(cat.id);
                                  setIsOpen(false);
                                }}
                                style={({ pressed }) => [
                                  styles.dropdownItem,
                                  isSelected && [styles.dropdownItemActive, { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }],
                                  pressed && { backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }
                                ]}
                              >
                                <Text style={[styles.itemText, isSelected ? styles.textCyan : { color: themeColor.textPrimary }]}>
                                  {cat.label}
                                </Text>
                                {isSelected && <Check size={14} color="#00BA34" strokeWidth={3} />}
                              </Pressable>
                            );
                          })}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

          {verse !== "market" && (
            <View style={styles.specSectionWrapper}>
              <View style={[styles.anonymousBanner, { backgroundColor: themeColor.background }]}>
                <View style={styles.anonBannerLeft}>
                  <ShieldAlert size={18} color={textMutedColor} />
                  <View style={styles.anonMetadata}>
                    <Text style={[styles.anonTitleText, { color: themeColor.textPrimary }]}>Post Anonymously</Text>
                    <Text style={[styles.anonDescText, { color: textMutedColor }]} numberOfLines={1}>
                      {isAnonymous ? 'Only your faculty will be visible' : 'Both your faculty and department will be visible'}
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => setIsAnonymous(!isAnonymous)}
                  style={[
                    styles.switchTrack,
                    isAnonymous
                      ? (verse === "confession" ? styles.switchTrackRose : styles.switchTrackCyan)
                      : styles.switchTrackOff
                  ]}
                >
                  <View style={[styles.switchThumb, isAnonymous ? styles.thumbRight : styles.thumbLeft]} />
                </Pressable>
              </View>
              <View style={[styles.editorToolbar, { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }]}>
                <Pressable onPress={handlePickImage} style={styles.mediaPickerBtn}>
                  <ImageIcon size={20} color={verse === "confession" ? "#F59E0B" : "#00BA34"} />
                </Pressable>

                <View style={styles.metaCounters}>
                  <Text style={[styles.counterText, { color: textMutedColor }, text.length >= 480 && styles.counterAlert]}>
                    {text.length}/500
                  </Text>
                  {images.length > 0 && (
                    <>
                      <Text style={[styles.counterDot, { color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }]}>•</Text>
                      <Text style={[styles.counterText, { color: textMutedColor }]}>{images.length}/4</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeHeader: {
    backgroundColor: '#000000',
  },
  headerRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backBtn: {
    paddingVertical: 4,
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  shareBtn: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgCyan: { backgroundColor: "#00BA34" },
  bgRose: { backgroundColor: "#F59E0B" },
  disabledBtn: { opacity: 0.5 },
  shareBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  scrollContent: {
    gap: 6,
  },
  sectionContainer: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.1)",
  },
  channelsScroll: {
    paddingHorizontal: 16,
    gap: 6,
  },
  channelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  inactiveChannel: {
    backgroundColor: "transparent",
  },
  bgCyanTab: {
    backgroundColor: "rgba(0, 186, 52, 0.2)",
    borderColor: "#00BA34",
  },
  bgRoseTab: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    borderColor: "#F59E0B",
  },
  channelButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  textWhite: { color: "#FFFFFF" },
  textCyan: { color: "#00BA34" },
  textInactive: { color: "rgba(255,255,255,0.5)" },

  composeFlowContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
  },
  avatarColumn: {
    marginRight: 12,
  },
  avatarMock: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#262626",
  },
  editorColumn: {
    flex: 1,
  },
  textAreaInput: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    height: 160,
    paddingTop: 4,
  },
  imagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  imagePreviewWrapper: {
    aspectRatio: 16 / 10,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#161616",
  },
  singleImageWidth: {
    width: "100%",
  },
  multiImageWidth: {
    width: "48%",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeImageBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editorToolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.1)",
  },
  mediaPickerBtn: {
    padding: 4,
  },
  metaCounters: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  counterText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  counterAlert: {
    color: "#F59E0B",
    fontWeight: "600",
  },
  counterDot: {
    fontSize: 10,
    color: "rgba(255,255,255,0.2)",
  },

  specSectionWrapper: {
    marginTop: 8,
  },
  specCard: {
    backgroundColor: "#0A0A0A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
    gap: 16,
  },
  specTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00BA34",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.4)",
  },
  numericInput: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    backgroundColor: "#000000",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#000000",
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
  },
  dropdownContainer: {
    position: "relative",
    zIndex: 100,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 46,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    backgroundColor: "#000000",
    paddingHorizontal: 12,
  },
  dropdownTriggerActive: {
    borderColor: "#00BA34",
  },
  triggerText: {
    fontSize: 14,
  },
  textMuted: {
    color: "rgba(255,255,255,0.4)",
  },
  dropdownMenuPlate: {
    position: "absolute",
    bottom: 52,
    left: 0,
    right: 0,
    maxHeight: 180,
    backgroundColor: "#161616",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
    zIndex: 999,
    elevation: 5,
  },
  dropdownScroll: {
    paddingVertical: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  dropdownItemActive: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  itemText: {
    fontSize: 14,
  },
  anonymousBanner: {
    backgroundColor: "#000000",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  anonBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  anonMetadata: {
    flex: 1,
  },
  anonTitleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  anonDescText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    marginTop: 1,
  },
  switchTrack: {
    width: 46,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  switchTrackOff: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  switchTrackCyan: {
    backgroundColor: "#00BA34",
  },
  switchTrackRose: {
    backgroundColor: "#F59E0B",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  thumbLeft: {
    alignSelf: "flex-start",
  },
  thumbRight: {
    alignSelf: "flex-end",
  },
});