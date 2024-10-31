import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '/Login-RN3/Login/components/ThemedView';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerBackgroundColor: { light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
