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
const fontScale = Math.min(PixelRatio.getFontScale(), 1.15); // Cap system font scaling

// Horizontal scaling with limits
const rs = (size) => Math.round(Math.max(size * scale, size * minScale));
// Vertical scaling with limits  
const vs = (size) => Math.round(Math.max(size * verticalScale, size * 0.75));
// Font scaling - ensures minimum readable size (11px minimum)
const fs = (size) => Math.round(Math.max(size * scale * fontScale, Math.max(size * 0.85, 11)));
// Moderate scaling (less aggressive, good for paddings)
const ms = (size, factor = 0.5) => Math.round(size + (rs(size) - size) * factor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    top: vs(15),
    paddingTop: vs(16),
    paddingBottom: vs(20),
    paddingHorizontal: rs(16),
    paddingRight: rs(56),
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: fs(28),
    fontWeight: '700',
    color: '#11181C',
    marginBottom: vs(4),
    letterSpacing: -0.5,
    flexShrink: 1,
  },

  welcomeText: {
    fontSize: fs(14),
    bottom: vs(2),
    color: '#666666',
    fontWeight: '400',
    flexShrink: 1,
    flexWrap: 'wrap',
  },

  logoutButton: {
    padding: rs(10),
    top: vs(7),
    position: 'absolute',
    right: rs(16),
    borderRadius: rs(8),
    backgroundColor: '#f0f0f0',
  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(20),
    marginBottom: vs(14),
    gap: rs(8),
    top: vs(8),
  },

  filterScroll: {
    flex: 1,
  },

  filterButton: {
    paddingHorizontal: rs(20),
    paddingVertical: vs(10),
    borderRadius: rs(20),
    marginRight: rs(8),
  },

  filterButtonActive: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  filterText: {
    fontSize: fs(15),
    color: '#666666',
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  taskCount: {
    top: vs(6.5),
    fontSize: fs(14),
    color: '#999999',
    paddingHorizontal: rs(20),
    marginBottom: vs(16),
    fontWeight: '400',
  },

  tasksList: {
    flex: 1,
    paddingHorizontal: rs(20),
    paddingBottom: vs(20),
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(16),
    padding: rs(16),
    marginBottom: vs(16),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  taskHeader: {
    marginBottom: vs(12),
  },

  taskId: {
    fontSize: fs(18),
    fontWeight: '700',
    color: '#11181C',
    letterSpacing: -0.3,
    marginRight: rs(80),
    flexShrink: 1,
  },

  taskDetails: {
    fontSize: fs(14),
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: vs(20),
  },

  taskInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vs(8),
    gap: rs(8),
    flexWrap: 'wrap',
  },

  taskText: {
    fontSize: fs(13),
    color: '#666666',
    lineHeight: fs(18),
    flexShrink: 1,
    flex: 1,
    minWidth: rs(80),
  },

  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(16),
    paddingTop: vs(16),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  proofRow: {
    flexDirection: 'row',
    gap: rs(12),
    marginTop: vs(6),
    marginBottom: vs(6),
  },
  proofItem: {
    flex: 1,
  },
  proofLabel: {
    fontSize: fs(12),
    color: '#666666',
    marginBottom: vs(6),
    fontWeight: '600',
  },
  proofThumb: {
    width: '100%',
    aspectRatio: 1.2,
    minHeight: vs(70),
    maxHeight: vs(120),
    borderRadius: rs(12),
    backgroundColor: '#EEE',
  },

  badges: {
    flexDirection: 'row',
    gap: rs(10),
    flexWrap: 'wrap',
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(10),
    paddingVertical: vs(6),
    borderRadius: rs(16),
    gap: rs(6),
  },

  badgeText: {
    fontSize: fs(11),
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  statusDot: {
    width: rs(6),
    height: rs(6),
    borderRadius: rs(3),
  },

  badge1: {
    position: 'absolute',
    right: rs(12),
    top: vs(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(8),
    paddingVertical: vs(5),
    borderRadius: rs(12),
    maxWidth: '45%',
    gap: rs(8),
  },

  badgeText1: {
    fontSize: fs(11),
    fontWeight: '600',
    letterSpacing: 0.2,
    flexShrink: 1,
  },

  statusDot1: {
    width: rs(6),
    height: rs(6),
    borderRadius: rs(3),
  },

  viewDetails: {
    fontSize: fs(13),
    color: '#11181C',
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: rs(10),
  },

  acceptButton: {
    backgroundColor: '#E6F4EA',
    paddingHorizontal: rs(14),
    paddingVertical: vs(7),
    borderRadius: rs(10),
  },

  acceptText: {
    color: '#1E7D32',
    fontSize: fs(12),
    fontWeight: '600',
  },

  rejectButton: {
    backgroundColor: '#FDE8E8',
    paddingHorizontal: rs(12),
    paddingVertical: vs(6),
    borderRadius: rs(8),
  },

  rejectText: {
    color: '#C62828',
    fontSize: fs(12),
    fontWeight: '600',
  },

  underline: {
    top: vs(2),
    left: rs(15),
    backgroundColor: '#000',
    width: '90%',
    height: vs(0.3),
  },

  underline1: {
    top: vs(1),
    left: rs(15),
    backgroundColor: '#000',
    width: '90%',
    height: vs(0.3),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: rs(18),
    padding: rs(20),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  modalTitle: {
    fontSize: fs(20),
    fontWeight: '700',
    color: '#11181C',
    marginBottom: vs(6),
  },

  modalSubtitle: {
    fontSize: fs(14),
    color: '#666666',
    marginBottom: vs(14),
    lineHeight: fs(20),
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: rs(12),
    padding: ms(14),
    minHeight: vs(90),
    fontSize: fs(15),
    color: '#11181C',
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: vs(18),
    gap: rs(16),
  },

  modalCancelText: {
    fontSize: fs(15),
    color: '#1752f6ff',
    fontWeight: '600',
  },

  modalRejectText: {
    fontSize: fs(15),
    fontWeight: '700',
    color: '#C62828',
  },

  modalRejectDisabled: {
    color: '#BDBDBD',
  },

  filterTabsScroll: {
    marginVertical: vs(12),
    marginHorizontal: rs(14),
    maxHeight: vs(52),
  },

  filterTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: rs(12),
    backgroundColor: '#f0f0f0',
    paddingVertical: vs(5),
    paddingHorizontal: rs(5),
    gap: rs(4),
  },

  filterTab: {
    paddingVertical: vs(10),
    paddingHorizontal: rs(16),
    borderRadius: rs(10),
    minWidth: rs(70),
  },

  activeFilterTab: {
    backgroundColor: '#FF6B35',
  },

  filterTabText: {
    fontSize: fs(14),
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
  },

  activeFilterTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Loading and Empty states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(60),
  },

  loadingText: {
    marginTop: vs(12),
    fontSize: fs(16),
    color: '#666',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vs(80),
    paddingHorizontal: rs(20),
  },

  emptyText: {
    marginTop: vs(16),
    fontSize: fs(18),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  emptySubText: {
    marginTop: vs(8),
    fontSize: fs(14),
    color: '#999',
    textAlign: 'center',
  },
});

export default styles;
