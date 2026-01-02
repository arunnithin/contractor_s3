import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(6),
  },
  content: {
    marginTop: vs(6),
    marginLeft: rs(24),
  },
});
