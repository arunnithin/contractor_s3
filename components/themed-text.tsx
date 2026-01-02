import { StyleSheet, Text, type TextProps, Dimensions, PixelRatio } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

// Responsive scaling for all device sizes
const { width } = Dimensions.get('window');
const baseWidth = 375;
const minScale = 0.85;
const maxScale = 1.35;
const scaleRatio = Math.min(Math.max(width / baseWidth, minScale), maxScale);
const fontScaleRatio = Math.min(PixelRatio.getFontScale(), 1.15);
const fs = (size: number) => Math.round(Math.max(size * scaleRatio * fontScaleRatio, Math.max(size * 0.85, 11)));

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: fs(16),
    lineHeight: fs(24),
  },
  defaultSemiBold: {
    fontSize: fs(16),
    lineHeight: fs(24),
    fontWeight: '600',
  },
  title: {
    fontSize: fs(32),
    fontWeight: 'bold',
    lineHeight: fs(36),
  },
  subtitle: {
    fontSize: fs(20),
    fontWeight: 'bold',
  },
  link: {
    lineHeight: fs(30),
    fontSize: fs(16),
    color: '#0a7ea4',
  },
});
