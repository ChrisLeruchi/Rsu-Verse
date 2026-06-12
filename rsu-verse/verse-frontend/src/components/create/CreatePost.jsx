import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { 
  ShoppingBag, 
  MessagesSquare, 
  ArrowLeft, 
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
  StyleSheet 
} from "react-native";
import * as Crypto from 'expo-crypto';
import * as ImagePicker from "expo-image-picker";

export function CreatePost({ setPosts, setActiveFilter }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [verse, setVerse] = useState("gist");
  const [text, setText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Used");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("general");

  const [isOpen, setIsOpen] = useState(false);

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
    } else if (["market", "music", "politics", "relationship"].includes(verse)) {
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
      time: "Just Now",
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

    // Clear form states after post submission
    setText("");
    setPrice("");
    setCondition("Used");
    setImages([]);
    setCategory("general");
    setIsOpen(false);
    setVerse("gist");
    setIsSubmitting(false);

    if (verse === "market") {
      navigation.navigate("Market");
    } else {
      setActiveFilter("all");
      navigation.navigate("HomeIndex");
    }
  };

  const channels = [
    { id: "gist", label: "Gist", icon: <MessagesSquare size={16} color={verse === "gist" ? "#00BA34" : "rgba(255,255,255,0.4)"} />, activeStyle: styles.activeCyan },
    { id: "market", label: "Market", icon: <ShoppingBag size={16} color={verse === "market" ? "#00BA34" : "rgba(255,255,255,0.4)"} />, activeStyle: styles.activeCyan },
    { id: "confession", label: "Confession", icon: <Flame size={16} color={verse === "confession" ? "#F59E0B" : "rgba(255,255,255,0.4)"} />, activeStyle: styles.activeRose },
    { id: "music", label: "Music", icon: <Music size={16} color={verse === "music" ? "#00BA34" : "rgba(255,255,255,0.4)"} />, activeStyle: styles.activeCyan },
    { id: "politics", label: "Politics", icon: <Landmark size={16} color={verse === "politics" ? "#00BA34" : "rgba(255,255,255,0.4)"} />, activeStyle: styles.activeCyan },
    { id: "relationship", label: "Relationship", icon: <HeartHandshake size={16} color={verse === "relationship" ? "#00BA34" : "rgba(255,255,255,0.4)"} />, activeStyle: styles.activeCyan },
  ];

  const isShareDisabled = verse === "market"
    ? (isSubmitting || !text.trim() || !price || images.length === 0)
    : (!text.trim() && images.length === 0);

  return (
    <View style={styles.screenWrapper}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeHeader}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => {
              setActiveFilter("all");
              navigation.navigate("HomeIndex");
            }}
            disabled={isSubmitting}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>New Post</Text>
          <Pressable
            onPress={handleBroadcast}
            disabled={isShareDisabled}
            style={[
              styles.shareBtn,
              verse === "confession" ? styles.bgRose : styles.bgCyan, isShareDisabled && styles.disabledBtn
            ]}
          >
            <Text style={styles.shareBtnText}>
              {isSubmitting ? "Posting..." : "Post"}
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileBar}>
            <View style={styles.avatarMock} />
            <Text style={styles.profileName}>
              {isAnonymous && verse !== "market" ? "Comp Eng" : "Christopher Igwe"}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Select Verse</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.channelsScroll}
            >
              {channels.map((channel) => (
                <Pressable
                  key={channel.id}
                  onPress={() => setVerse(channel.id)}
                  style={[
                    styles.channelButton,
                    verse === channel.id ? channel.activeStyle : styles.inactiveChannel
                  ]}
                >
                  {channel.icon}
                  <Text
                    style={[
                      styles.channelButtonText,
                      verse === channel.id ? (channel.id === "confession" ? styles.textRose : styles.textCyan) : styles.textInactive
                    ]}
                  >
                    {channel.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.paddingWrapper}>
            <View style={styles.editorCard}>
              <TextInput
                value={text}
                maxLength={500}
                onChangeText={setText}
                multiline
                placeholder={verse === "market" ? "Describe what you want to sell..." : "What's on your mind?..."}
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                style={styles.textAreaInput}
                textAlignVertical="top"
              />

              {images.length > 0 && (
                <View style={styles.imagesGrid}>
                  {images.map((url, index) => (
                    <View key={index} style={styles.imagePreviewWrapper}>
                      <Image source={{ uri: url }} style={styles.previewImage} />
                      <Pressable
                        onPress={() => handleRemoveImage(index)}
                        style={styles.removeImageBadge}
                      >
                        <X size={12} color="rgba(255,255,255,0.8)" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.editorToolbar}>
                <Pressable onPress={handlePickImage} style={styles.mediaPickerBtn}>
                  <ImageIcon size={20} color={verse === "confession" ? "#F59E0B" : "#00BA34"} />
                  <Text style={styles.mediaPickerBtnText}>Media</Text>
                </Pressable>

                <View style={styles.metaCounters}>
                  <Text style={[styles.counterText, text.length >= 480 && styles.counterAlert]}>
                    {text.length}/500
                  </Text>
                  {images.length > 0 && (
                    <>
                      <Text style={styles.counterDot}>•</Text>
                      <Text style={styles.counterText}>{images.length} attached</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>

          {verse === "market" && (
            <View style={styles.paddingWrapper}>
              <View style={styles.specCard}>
                <Text style={styles.specTitle}>ITEM SPEC</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>PRICE (₦)</Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={price}
                    onChangeText={(val) => {
                      if (val === "" || Number(val) >= 0) setPrice(val);
                    }}
                    placeholder="e.g 10000"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    style={styles.numericInput}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CONDITION</Text>
                  <View style={styles.segmentedControl}>
                    {["Brand New", "Used", "Fixable"].map((cond) => (
                      <Pressable
                        key={cond}
                        disabled={isSubmitting}
                        onPress={() => setCondition(cond)}
                        style={[
                          styles.segmentButton,
                          condition === cond ? styles.activeSegment : styles.inactiveSegment
                        ]}
                      >
                        <Text
                          style={[
                            styles.segmentText,
                            condition === cond ? styles.textCyan : styles.textInactive
                          ]}
                        >
                          {cond === "Fixable" ? "Needs Repair" : cond}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CATEGORY</Text>
                  <View style={styles.dropdownContainer}>
                    <Pressable
                      onPress={() => setIsOpen(!isOpen)}
                      style={[styles.dropdownTrigger, isOpen && styles.dropdownTriggerActive]}
                    >
                      <Text style={[styles.triggerText, category ? styles.textWhite : styles.textMuted]}>
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
                      <View style={[styles.chevronWrapper, isOpen && styles.chevronRotated]}>
                        <ChevronDown size={18} color={isOpen ? "#00BA34" : "rgba(255,255,255,0.4)"} />
                      </View>
                    </Pressable>

                    {isOpen && (
                      <View style={styles.dropdownMenuPlate}>
                        <ScrollView 
                          nestedScrollEnabled={true} 
                          style={styles.dropdownScroll}
                          showsVerticalScrollIndicator={true}
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
                                  isSelected && styles.dropdownItemActive,
                                  pressed && { backgroundColor: "rgba(255,255,255,0.02)" }
                                ]}
                              >
                                <Text style={[styles.itemText, isSelected ? styles.textCyan : styles.textInactive]}>
                                  {cat.label}
                                </Text>
                                {isSelected && (
                                  <View style={styles.checkIndicator}>
                                    <Check size={14} color="#00BA34" strokeWidth={3} />
                                  </View>
                                )}
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
            <View style={styles.paddingWrapper}>
              <View style={styles.anonymousBanner}>
                <View style={styles.anonBannerLeft}>
                  <View style={styles.alertIconFrame}>
                    <ShieldAlert size={18} color="rgba(255,255,255,0.4)" />
                  </View>
                  <View style={styles.anonMetadata}>
                    <Text style={styles.anonTitleText}>Post Anonymously</Text>
                    <Text style={styles.anonDescText} numberOfLines={1}>
                      Your department will be displayed
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
    backgroundColor: "#0D0F14",
  },
  safeHeader: {
    backgroundColor: "#0D0F14",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  headerRow: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center"
  },
  shareBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledBtn: { opacity: 0.3 },
  shareBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  scrollContent: {
    gap: 4,
  },
  profileBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  avatarMock: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1E2533",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sectionContainer: {
    gap: 12,
    paddingVertical: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    paddingHorizontal: 16,
  },
  channelsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  channelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  inactiveChannel: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  activeCyan: {
    backgroundColor: "rgba(0, 186, 52, 0.08)",
    borderColor: "rgba(0, 186, 52, 0.2)",
  },
  activeRose: {
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  channelButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  textCyan: { color: "#00BA34" },
  textRose: { color: "#F59E0B" },
  textInactive: { color: "rgba(255,255,255,0.4)" },
  paddingWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  editorCard: {
    backgroundColor: "#131722",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    minHeight: 220,
  },
  textAreaInput: {
    flex: 1,
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
  },
  imagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  imagePreviewWrapper: {
    width: "48%",
    aspectRatio: 16 / 10,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#0D0F14",
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
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 4,
    borderRadius: 12,
  },
  editorToolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    paddingTop: 12,
    marginTop: "auto",
  },
  mediaPickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mediaPickerBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
  },
  metaCounters: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  counterText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
  },
  counterAlert: {
    color: "#F59E0B",
    fontWeight: "600",
  },
  counterDot: {
    fontSize: 10,
    color: "rgba(255,255,255,0.15)",
  },
  specCard: {
    backgroundColor: "#131722",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    padding: 16,
    gap: 16,
  },
  specTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00BA34",
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.3)",
  },
  numericInput: {
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    backgroundColor: "#0D0F14",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#0D0F14",
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
  },
  activeSegment: {
    backgroundColor: "rgba(0,186,52,0.08)",
    borderColor: "rgba(0,186,52,0.15)",
  },
  inactiveSegment: {
    backgroundColor: "transparent",
    borderColor: "transparent",
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
    height: 52,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    backgroundColor: "#0D0F14",
    paddingHorizontal: 12,
  },
  dropdownTriggerActive: {
    borderColor: "#00BA34",
    backgroundColor: "rgba(0, 186, 52, 0.02)",
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  textWhite: {
    color: "#FFFFFF",
  },
  textMuted: {
    color: "rgba(255,255,255,0.25)",
  },
  chevronWrapper: {
    transform: [{ rotate: "0deg" }],
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownMenuPlate: {
    position: "absolute",
    bottom: 58,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: "#171C28",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    zIndex: 100,
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
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  dropdownItemActive: {
    backgroundColor: "rgba(0, 186, 52, 0.04)",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
  },
  checkIndicator: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  anonymousBanner: {
    backgroundColor: "#131722",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
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
  alertIconFrame: {
    padding: 8,
    backgroundColor: "#0D0F14",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
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
    color: "rgba(255,255,255,0.3)",
    marginTop: 2,
  },
  switchTrack: {
    width: 40,
    height: 20,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  switchTrackOff: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  switchTrackCyan: {
    backgroundColor: "#00BA34",
  },
  switchTrackRose: {
    backgroundColor: "#F59E0B",
  },
  switchThumb: {
    width: 18,
    height: 18,
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