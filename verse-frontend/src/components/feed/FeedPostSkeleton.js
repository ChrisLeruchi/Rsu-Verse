import React, {useEffect} from "react";
import { View, StyleSheet } from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming} from "react-native-reanimated";

export function FeedPostSkeleton() {
  const opacity = useSharedValue(0.15);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 850 }),
        withTiming(0.15, { duration: 850 })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulse = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerLayer}>
        <View style={styles.profileRow}>
          <Animated.View style={[styles.skeletonAvatar, animatedPulse]} />
          
          <View style={styles.metaTextColumn}>
            <Animated.View style={[styles.skeletonLine, { width: '40%', height: 14, marginBottom: 8 }, animatedPulse]} />
            <Animated.View style={[styles.skeletonLine, { width: '25%', height: 10 }, animatedPulse]} />
          </View>
        </View>
      </View>

      <View style={styles.contentBodyWrapper}>
        <Animated.View style={[styles.skeletonLine, { width: '20%', height: 16, marginBottom: 4 }, animatedPulse]} />
        
        <Animated.View style={[styles.skeletonLine, { width: '92%', height: 14 }, animatedPulse]} />
        <Animated.View style={[styles.skeletonLine, { width: '95%', height: 14 }, animatedPulse]} />
        <Animated.View style={[styles.skeletonLine, { width: '55%', height: 14 }, animatedPulse]} />
      </View>

      
      <View style={styles.toolbarWrapper}>
        <View style={styles.leftActionGroup}>
          <Animated.View style={[styles.skeletonIconBox, animatedPulse]} />
          <Animated.View style={[styles.skeletonIconBox, animatedPulse]} />
          <Animated.View style={[styles.skeletonIconBox, animatedPulse]} />
          <Animated.View style={[styles.skeletonIconBox, animatedPulse]} />
        </View>
        <View style={styles.rightActionGroup}>
          <Animated.View style={[styles.skeletonIconBox, animatedPulse]} />
          <Animated.View style={[styles.skeletonIconBox, animatedPulse]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    gap: 16,
    backgroundColor: '#000000',
  },
  headerLayer: {
    paddingHorizontal: 12,
    width: '100%',
  },
  profileRow: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
  },
  skeletonAvatar: {
    width: 45,
    height: 45,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  metaTextColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  contentBodyWrapper: {
    paddingHorizontal: 12,
    gap: 8,
  },
  skeletonLine: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
  },
  toolbarWrapper: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  leftActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skeletonIconBox: {
    width: 32,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});