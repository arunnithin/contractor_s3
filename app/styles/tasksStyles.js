import { StyleSheet } from 'react-native';

// Styles converted from tasks.css for React Native compatibility
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    top:15,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#11181C',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  welcomeText: {
    fontSize: 16,
    bottom:2,
    color: '#666666',
    fontWeight: '400',
  },
  logoutButton: {
    padding: 10,
    top:7,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
    gap: 8,
    top:8,
  },
  filterIcon: {
    marginRight: 4,
  },
  filterScroll: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
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
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  taskCount: {
    top:6.5,
    fontSize: 14,
    color: '#999999',
    paddingHorizontal: 20,
    marginBottom: 16,
    fontWeight: '400',
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    // flexDirection:"column"
  },
  taskHeader: {
    marginBottom: 16,
  },
  taskId: {
    bottom:20,
    fontSize: 25,
    fontWeight: '700',
    color: '#11181C',
    letterSpacing: -0.3,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  taskText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },

badge1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    width:100,
    height:35,
    left:210,
    top:15,
    gap: 6,
  },
  badgeText1: {
    fontSize: 12.5,
    fontWeight: '600',
    left:1,
    letterSpacing: 0.2,
  },
  statusDot1: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    left:1,
  },

  viewDetails: {
    fontSize: 15,
    color: '#11181C',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  underline:{
    top:2,
    // paddingBottom:5,
    left:15,
    backgroundColor:"black",
    width:'353',
    height:0.3,
    alignItems:'center',
  },
  underline1:{
    top:1,
    // paddingBottom:5,
    left:15,
    backgroundColor:"black",
    width:'353',
    height:0.3,
    alignItems:'center',
  }
});

export default styles;
