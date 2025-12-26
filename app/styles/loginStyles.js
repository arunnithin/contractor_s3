import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Scale functions
const scale = (size) => (width / 375) * size; // 375 is base width
const verticalScale = (size) => (height / 812) * size; // 812 is base height
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: verticalScale(32),
    paddingHorizontal: scale(20),
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(16),
    marginBottom: verticalScale(48),
  },
  iconContainer: {
    width: scale(88),
    height: scale(88),
    borderRadius: scale(20),
    backgroundColor: '#FFF4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: '#11181C',
    marginBottom: verticalScale(10),
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#666666',
    textAlign: 'center',
    lineHeight: moderateScale(22),
    paddingHorizontal: scale(20),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: scale(24),
    marginBottom: verticalScale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  inputContainer: {
    marginBottom: verticalScale(24),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#11181C',
    marginBottom: verticalScale(10),
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: scale(10),
    padding: verticalScale(14),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(16),
    color: '#11181C',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: scale(10),
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    padding: verticalScale(14),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(16),
    color: '#11181C',
  },
  eyeIcon: {
    padding: verticalScale(14),
    paddingHorizontal: scale(16),
  },
  signInButton: {
    backgroundColor: '#FF6B35',
    borderRadius: scale(14),
    padding: verticalScale(18),
    paddingHorizontal: scale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: scale(10),
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  demoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: scale(10),
    padding: verticalScale(14),
    paddingHorizontal: scale(16),
    gap: scale(10),
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  demoText: {
    fontSize: moderateScale(14),
    color: '#666666',
    fontWeight: '500',
  },
});

export default styles;
