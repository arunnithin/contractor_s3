import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const baseHeight = 812;

// Support screens as small as 320px (iPhone SE, older Android)
const minScale = 0.85;
const maxScale = 1.35;

// Responsive scaling with min/max limits for all screen sizes
const scale = Math.min(Math.max(width / baseWidth, minScale), maxScale);
const verticalScale = Math.min(Math.max(height / baseHeight, 0.78), 1.25);
const fontScale = Math.min(PixelRatio.getFontScale(), 1.15);

// Horizontal scaling with limits
const responsiveSize = (size) => Math.round(Math.max(size * scale, size * minScale));
// Vertical scaling with limits
const responsiveVertical = (size) => Math.round(Math.max(size * verticalScale, size * 0.75));
// Font scaling - ensures minimum readable size (11px minimum)
const responsiveFont = (size) => Math.round(Math.max(size * scale * fontScale, Math.max(size * 0.85, 11)));
// Moderate scaling (less aggressive)
const moderateScale = (size, factor = 0.5) => Math.round(size + (responsiveSize(size) - size) * factor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: responsiveVertical(8),
    paddingBottom: responsiveVertical(18),
    paddingHorizontal: responsiveSize(8),
    backgroundColor: '#f6f3f3ff',
  },
  backButton: {
    marginRight: responsiveSize(12),
    padding: responsiveSize(6),
  },
  headerText: {
    flex: 1,
  },
  taskId: {
    fontSize: Math.max(responsiveFont(18), 16),
    fontWeight: '700',
    color: '#11181C',
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  headerSubtitle: {
    fontSize: Math.max(responsiveFont(12), 11),
    color: '#070707ff',
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    paddingHorizontal: responsiveSize(14),
    paddingTop: responsiveVertical(12),
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(16),
    marginBottom: responsiveVertical(18),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveVertical(20),
    flexWrap: 'wrap',
    gap: responsiveSize(8),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveVertical(6),
    borderRadius: responsiveSize(14),
    gap: responsiveSize(5),
  },
  statusDot: {
    width: responsiveSize(7),
    height: responsiveSize(7),
    borderRadius: responsiveSize(3.5),
  },
  statusText: {
    fontSize: Math.max(responsiveFont(11), 10),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveVertical(6),
    borderRadius: responsiveSize(14),
    gap: responsiveSize(5),
  },
  priorityText: {
    fontSize: Math.max(responsiveFont(11), 10),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  section: {
    paddingTop: responsiveVertical(16),
    paddingBottom: responsiveVertical(8),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveVertical(8),
    gap: responsiveSize(10),
  },
  iconCircle: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(18),
    backgroundColor: '#FFF4F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: Math.max(responsiveFont(12), 11),
    fontWeight: '600',
    color: '#11181C',
    letterSpacing: 0.2,
    flexShrink: 1,
    flex: 1,
  },
  sectionValue: {
    fontSize: Math.max(responsiveFont(14), 12),
    fontWeight: '700',
    color: '#11181C',
    marginTop: responsiveVertical(4),
    marginLeft: responsiveSize(46),
    letterSpacing: -0.3,
    lineHeight: Math.max(responsiveFont(18), 16),
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  sectionSubValue: {
    fontSize: Math.max(responsiveFont(11), 10),
    color: '#666666',
    marginLeft: responsiveSize(46),
    marginTop: responsiveVertical(2),
    lineHeight: Math.max(responsiveFont(16), 14),
    flexWrap: 'wrap',
  },
  mapsButton: {
    backgroundColor: '#297dfbff',
    borderRadius: responsiveSize(12),
    padding: responsiveVertical(12),
    paddingHorizontal: responsiveSize(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveVertical(12),
    gap: responsiveSize(8),
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    minHeight: responsiveVertical(44),
  },
  startWorkButton: {
    backgroundColor: '#fbe14bff',
    borderRadius: responsiveSize(12),
    padding: responsiveVertical(12),
    paddingHorizontal: responsiveSize(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveVertical(18),
    gap: responsiveSize(8),
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    minHeight: responsiveVertical(44),
  },
  buttonText1: {
    color: '#fff',
    fontSize: Math.max(responsiveFont(14), 12),
    fontWeight: '600',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
  buttonText2: {
    color: '#000',
    fontSize: Math.max(responsiveFont(14), 12),
    fontWeight: '600',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
  underline1: {
    height: 1,
    backgroundColor: '#E8E8E8',
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  proofGrid: {
    flexDirection: 'row',
    gap: responsiveSize(10),
    marginLeft: responsiveSize(46),
    marginTop: responsiveVertical(8),
    paddingBottom: responsiveVertical(8),
    flexWrap: 'wrap',
  },
  proofItem: {
    flex: 1,
    minWidth: responsiveSize(80),
  },
  proofLabel: {
    fontSize: Math.max(responsiveFont(11), 10),
    color: '#666666',
    marginBottom: responsiveVertical(5),
    fontWeight: '600',
  },
  proofImage: {
    width: '100%',
    aspectRatio: 1,
    minHeight: responsiveVertical(80),
    maxHeight: responsiveVertical(130),
    borderRadius: responsiveSize(10),
    backgroundColor: '#EEE',
  },
  // Loading and Error states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(16),
  },
  loadingText: {
    marginTop: responsiveVertical(14),
    fontSize: Math.max(responsiveFont(14), 12),
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveSize(16),
  },
  errorText: {
    marginTop: responsiveVertical(14),
    fontSize: Math.max(responsiveFont(15), 13),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  backLinkText: {
    marginTop: responsiveVertical(14),
    fontSize: Math.max(responsiveFont(14), 12),
    color: '#FF6B35',
    fontWeight: '600',
  },
  // Damage Report styles
  damageRow: {
    flexDirection: 'row',
    gap: responsiveSize(12),
    marginTop: responsiveVertical(8),
    marginLeft: responsiveSize(46),
  },
  damageBoxPothole: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFE5E5',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
  },
  damageBoxPatchy: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#E5F0FF',
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
  },
  damageCount: {
    fontSize: Math.max(responsiveFont(20), 18),
    fontWeight: 'bold',
    color: '#EF4444',
  },
  damageLabel: {
    fontSize: Math.max(responsiveFont(11), 10),
    color: '#666',
    marginTop: responsiveVertical(2),
  },
});

export default styles;
