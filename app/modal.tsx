import { Link } from 'expo-router';
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Responsive scaling for all device sizes
const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 812;
const minScale = 0.85;
const maxScale = 1.35;
const scaleRatio = Math.min(Math.max(width / baseWidth, minScale), maxScale);
const verticalRatio = Math.min(Math.max(height / baseHeight, 0.78), 1.25);
const rs = (size: number) => Math.round(Math.max(size * scaleRatio, size * minScale));
const vs = (size: number) => Math.round(Math.max(size * verticalRatio, size * 0.75));

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: rs(20),
  },
  link: {
    marginTop: vs(15),
    paddingVertical: vs(15),
  },
});
