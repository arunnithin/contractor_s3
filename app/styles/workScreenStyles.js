import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 375; // base width
const verticalScale = height / 812; // base height

const rs = (size) => Math.round(size * scale); // horizontal scaling
const vs = (size) => Math.round(size * verticalScale); // vertical scaling

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: rs(20),
  },

  screenTitle: {
    fontSize: rs(28),
    fontWeight: '700',
    marginBottom: vs(10),
    color: '#11181C',
  },

  taskId: {
    fontSize: rs(16),
    marginBottom: vs(5),
    color: '#666',
  },

  statusText: {
    fontSize: rs(16),
    marginBottom: vs(20),
    color: '#FF6B35',
    fontWeight: '600',
  },

  photoSection: {
    marginBottom: vs(24),
    alignItems: 'center',
  },

  photoLabel: {
    fontSize: rs(16),
    marginBottom: vs(10),
    color: '#11181C',
    fontWeight: '500',
  },

  photoButton: {
    width: rs(180),
    height: rs(180),
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
  },

  finishButton: {
    paddingVertical: vs(16),
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vs(20),
  },

  finishButtonText: {
    fontSize: rs(16),
    fontWeight: '600',
  },
});

export default styles;
