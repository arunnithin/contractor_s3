import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 375; // base width for scaling
const verticalScale = height / 812; // base height for scaling

const rs = (size) => Math.round(size * scale); // horizontal scaling
const vs = (size) => Math.round(size * verticalScale); // vertical scaling

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
    paddingHorizontal: rs(20),
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: rs(32),
    fontWeight: '700',
    color: '#11181C',
    marginBottom: vs(6),
    letterSpacing: -0.5,
  },

  welcomeText: {
    fontSize: rs(16),
    bottom: vs(2),
    color: '#666666',
    fontWeight: '400',
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
    fontSize: rs(15),
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
    fontSize: rs(14),
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
    fontSize: rs(22),
    fontWeight: '700',
    color: '#11181C',
    letterSpacing: -0.3,
  },

  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(10),
    gap: rs(10),
  },

  taskText: {
    fontSize: rs(15),
    color: '#666666',
    lineHeight: vs(20),
    flexShrink: 1,
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
    fontSize: rs(12),
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  statusDot: {
    width: rs(7),
    height: rs(7),
    borderRadius: rs(3.5),
  },

  badge1: {
    position: 'absolute',
    right: rs(15),
    top: vs(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rs(10),
    paddingVertical: vs(6),
    borderRadius: rs(16),
    height: vs(32),
    gap: rs(6),
  },

  badgeText1: {
    fontSize: rs(12.5),
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  statusDot1: {
    width: rs(7),
    height: rs(7),
    borderRadius: rs(3.5),
  },

  viewDetails: {
    fontSize: rs(15),
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
    fontSize: rs(14),
    fontWeight: '600',
  },

  rejectButton: {
    backgroundColor: '#FDE8E8',
    paddingHorizontal: rs(14),
    paddingVertical: vs(7),
    borderRadius: rs(10),
  },

  rejectText: {
    color: '#C62828',
    fontSize: rs(14),
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
    fontSize: rs(20),
    fontWeight: '700',
    color: '#11181C',
    marginBottom: vs(6),
  },

  modalSubtitle: {
    fontSize: rs(14),
    color: '#666666',
    marginBottom: vs(14),
    lineHeight: vs(20),
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: rs(12),
    padding: vs(14),
    minHeight: vs(90),
    fontSize: rs(15),
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
    fontSize: rs(15),
    color: '#1752f6ff',
    fontWeight: '600',
  },

  modalRejectText: {
    fontSize: rs(15),
    fontWeight: '700',
    color: '#C62828',
  },

  modalRejectDisabled: {
    color: '#BDBDBD',
  },

  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: vs(12),
    marginHorizontal: rs(16),
    borderRadius: rs(12),
    backgroundColor: '#f0f0f0',
    paddingVertical: vs(6),
  },

  filterTab: {
    paddingVertical: vs(6),
    paddingHorizontal: rs(16),
    borderRadius: rs(12),
  },

  activeFilterTab: {
    backgroundColor: '#FF6B35',
  },

  filterTabText: {
    fontSize: rs(14),
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },

  activeFilterTabText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;
