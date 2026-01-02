import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 812;

// Support screens as small as 320px (iPhone SE, older Android)
const minScale = 0.85;
const maxScale = 1.35;

// Responsive scaling with min/max limits for all screen sizes
const scaleRatio = Math.min(Math.max(width / baseWidth, minScale), maxScale);
const verticalRatio = Math.min(Math.max(height / baseHeight, 0.78), 1.25);
const fontScaleRatio = Math.min(PixelRatio.getFontScale(), 1.15);

// Horizontal scaling with limits
const rs = (size) => Math.round(Math.max(size * scaleRatio, size * minScale));
// Vertical scaling with limits
const vs = (size) => Math.round(Math.max(size * verticalRatio, size * 0.75));
// Font scaling - ensures minimum readable size (11px minimum)
const fs = (size) => Math.round(Math.max(size * scaleRatio * fontScaleRatio, Math.max(size * 0.85, 11)));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: rs(20),
  },

  screenTitle: {
    fontSize: fs(24),
    fontWeight: '700',
    marginBottom: vs(10),
    color: '#11181C',
    flexWrap: 'wrap',
  },

  taskId: {
    fontSize: fs(14),
    marginBottom: vs(5),
    color: '#666',
    flexWrap: 'wrap',
  },

  statusText: {
    fontSize: fs(14),
    marginBottom: vs(20),
    color: '#FF6B35',
    fontWeight: '600',
  },

  photoSection: {
    marginBottom: vs(24),
    alignItems: 'center',
    width: '100%',
  },

  photoLabel: {
    fontSize: fs(14),
    marginBottom: vs(10),
    color: '#11181C',
    fontWeight: '500',
    textAlign: 'center',
  },

  photoButton: {
    width: '48%',
    maxWidth: rs(180),
    aspectRatio: 1,
    borderRadius: rs(16),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: rs(16),
    resizeMode: 'cover',
  },

  // Two photo section side by side
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: rs(16),
    marginBottom: vs(24),
  },

  photoColumn: {
    flex: 1,
    alignItems: 'center',
  },

  finishButton: {
    paddingVertical: vs(16),
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vs(20),
    minHeight: vs(52),
  },

  finishButtonText: {
    fontSize: fs(16),
    fontWeight: '600',
  },
});

export default styles;
