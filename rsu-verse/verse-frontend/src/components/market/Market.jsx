
import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ShoppingBag, Search, Tag, ArrowUpRight } from "lucide-react-native";
import { View, Text, TextInput, Pressable, Image, ScrollView, Linking, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Market({ posts = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const marketItems = posts.filter(post => {
    if (post.verse !== "market") return false;

    const matchesSearch = post.content?.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.marketPlace?.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" ||
      post.marketPlace?.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleMakeOffer = async (item) => {
    const sellerPhone = "2347032848480";
    const textMessage = `Hello, I saw your listing for "${item.content?.text?.substring(0, 30)}..." on RSU Verse. Is it still available?`;
    const url = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(textMessage)}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("WhatsApp is not installed on this device");
      }
    } catch (error) {
      Alert.alert("Error", "Could not complete the action");
    }
  };

  const scrollViewRef = useRef(null);
  const [localInput, setLocalInput] = useState("");

  useFocusEffect(
    useCallback(() => {

      return () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        setLocalInput("");
      };
    }, [])
  );

  return (
    <View style={styles.screenWrapper}>


      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaHeader}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Shop</Text>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <View style={styles.controlsWrapper}>
          <View style={styles.searchBarContainer}>
            <Search size={18} color="rgba(255, 255, 255, 0.3)" style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              placeholder="Search gadgets, books, bedspaces..."
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              style={styles.textInput}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            contentContainerStyle={styles.categorySlider}
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
              const isSelected = selectedCategory === cat.id;

              return (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.categoryButton,
                    isSelected ? styles.categoryButtonActive : styles.categoryButtonInactive
                  ]}
                >
                  <Text style={[
                    styles.categoryText,
                    isSelected ? styles.categoryTextActive : styles.categoryTextInactive
                  ]}>
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View 
        style={styles.gridMatrix}
        >
          {marketItems.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <View style={styles.cardContainer}>
                <View style={styles.cardTopSection}>
                  <View style={styles.imageBox}>
                    {item.content?.images && item.content.images.length > 0 ? (
                      <Image
                        source={{ uri: item.content.images[0] }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Tag size={16} color="rgba(255, 255, 255, 0.1)" />
                      </View>
                    )}

                    <View style={styles.conditionBadge}>
                      <Text style={styles.conditionText}>
                        {item.marketPlace?.condition}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.titleContainer}>
                    <Text numberOfLines={2} style={styles.productTitle}>
                      {item.content?.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooterPanel}>
                  <Text style={styles.priceText}>
                    ₦{item.marketPlace?.price?.toLocaleString()}
                  </Text>

                  <Pressable
                    onPress={() => handleMakeOffer(item)}
                    style={({ pressed }) => [
                      styles.ctaButton,
                      {
                        transform: [{ scale: pressed ? 0.96 : 1 }],
                        opacity: pressed ? 0.9 : 1
                      }
                    ]}
                  >
                    <ShoppingBag size={16} color="#FFFFFF" />
                    <Text style={styles.ctaButtonText}>Buy Now</Text>
                    <ArrowUpRight size={16} color="#FFFFFF" strokeWidth={2.5} />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#121212",
  },
  safeAreaHeader: {
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)",
  },
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#121212',
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00BA34",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 16,
    gap: 16,
  },
  controlsWrapper: {
    gap: 12,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingBottom: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    paddingVertical: 10,
    flex: 1,
  },
  categorySlider: {
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryButtonActive: {
    borderColor: "rgba(0, 186, 52, 0.3)",
    backgroundColor: "rgba(0, 186, 52, 0.1)",
  },
  categoryButtonInactive: {
    borderColor: "transparent",
    backgroundColor: "#1A1A1A",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#00BA34",
  },
  categoryTextInactive: {
    color: "rgba(255, 255, 255, 0.6)",
  },
  gridMatrix: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  cardWrapper: {
    width: "50%",
    padding: 6,
  },
  cardContainer: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 8,
  },
  cardTopSection: {
    gap: 8,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#121212",
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justify: "center",
  },
  conditionBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(18, 18, 18, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  conditionText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
  },
  titleContainer: {
    paddingHorizontal: 2,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 18,
    minHeight: 36,
  },
  cardFooterPanel: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    gap: 8,
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  ctaButton: {
    width: "100%",
    backgroundColor: "#00BA34",
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});