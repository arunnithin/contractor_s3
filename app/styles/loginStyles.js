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

// Scale functions with limits
const scale = (size) => Math.round(Math.max(size * scaleRatio, size * minScale));
const verticalScale = (size) => Math.round(Math.max(size * verticalRatio, size * 0.75));
const moderateScale = (size, factor = 0.5) => Math.round(size + (scale(size) - size) * factor);
// Font scaling - ensures minimum readable size (11px minimum)
const fontScale = (size) => Math.round(Math.max(size * scaleRatio * fontScaleRatio, Math.max(size * 0.85, 11)));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(16),
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(12),
    marginBottom: verticalScale(32),
  },
  iconContainer: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    backgroundColor: '#FFF4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(18),
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: Math.max(fontScale(24), 20),
    fontWeight: '700',
    color: '#11181C',
    marginBottom: verticalScale(8),
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.max(fontScale(13), 11),
    color: '#666666',
    textAlign: 'center',
    lineHeight: Math.max(fontScale(18), 16),
    paddingHorizontal: scale(12),
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(18),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  inputContainer: {
    marginBottom: verticalScale(18),
  },
  label: {
    fontSize: Math.max(fontScale(13), 11),
    fontWeight: '600',
    color: '#11181C',
    marginBottom: verticalScale(8),
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: scale(8),
    padding: verticalScale(12),
    paddingHorizontal: scale(14),
    fontSize: Math.max(fontScale(14), 13),
    color: '#11181C',
    backgroundColor: '#FFFFFF',
    minHeight: verticalScale(44),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: scale(8),
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    padding: verticalScale(12),
    paddingHorizontal: scale(14),
    fontSize: Math.max(fontScale(14), 13),
    color: '#11181C',
    minHeight: verticalScale(44),
  },
  eyeIcon: {
    padding: verticalScale(12),
    paddingHorizontal: scale(14),
  },
  signInButton: {
    backgroundColor: '#FF6B35',
    borderRadius: scale(12),
    padding: verticalScale(14),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
    minHeight: verticalScale(48),
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: scale(8),
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: Math.max(fontScale(16), 14),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: scale(8),
    padding: verticalScale(10),
    marginTop: verticalScale(10),
    gap: scale(6),
  },
  errorText: {
    color: '#EF4444',
    fontSize: Math.max(fontScale(12), 11),
    flex: 1,
    flexWrap: 'wrap',
  },
  demoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: scale(8),
    padding: verticalScale(12),
    paddingHorizontal: scale(14),
    gap: scale(8),
    borderWidth: 1,
    borderColor: '#EEEEEE',
    flexWrap: 'wrap',
  },
  demoText: {
    fontSize: Math.max(fontScale(12), 11),
    color: '#666666',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;
