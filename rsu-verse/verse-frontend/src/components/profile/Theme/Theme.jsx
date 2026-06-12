import React, { useRef, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ArrowLeft, Check } from "lucide-react-native";

const COLORS = {
  void: "#0A0A0A",
  void80: "rgba(10, 10, 10, 0.8)",
  ink: "#161618",
  white: "#FFFFFF",
  white5: "rgba(255, 255, 255, 0.05)",
  white30: "rgba(255, 255, 255, 0.3)",
  white40: "rgba(255, 255, 255, 0.4)",
  white60: "rgba(255, 255, 255, 0.6)",
};

export function Theme({ selectedTheme, setSelectedTheme, Themes, navigation }) {
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

        <Text style={styles.headerTitle}>Theme</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionGap}>
          <Text style={styles.sectionHeading}>Appearance</Text>

          <View style={styles.cardContainer}>
            {Themes.map((mode, index) => {
              const isSelected = selectedTheme === mode.theme;
              const isLastItem = index === Themes.length - 1;

              return (
                <TouchableOpacity
                  key={mode.id}
                  onPress={() => setSelectedTheme(mode.theme)}
                  activeOpacity={0.8}
                  style={[
                    styles.rowItem,
                    !isLastItem && styles.rowBorder,
                  ]}
                >
                  <View style={styles.rowLeft}>
                    <View style={styles.iconWrapper}>
                      {mode.icon}
                    </View>


                    <View style={styles.textContent}>
                      <Text style={styles.themeName}>
                        {mode.theme}
                      </Text>
                    </View>
                  </View>


                  {isSelected && (
                    <Check
                      size={18}
                      color={COLORS.white}
                      strokeWidth={2.5}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 112,
  },
  sectionGap: {
    gap: 12,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white30,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 4,
  },
  cardContainer: {
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.white5,
    overflow: "hidden",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    minHeight: 56,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white5,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    flex: 1,
    flexDirection: "col",
  },
  themeName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.white,
  },
  emptySubText: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.white,
    marginTop: 2,
  },
  checkIcon: {
    marginLeft: 12,
  },
});