import React, { useContext } from 'react';
import GlobalStyles from '../styles';
import CourseImage from '../atoms/CourseImage';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
import { IbitterContext } from '../organisms/providers/IbitterProvider';

export default function Header({ RightHeaderComponent, headerContainerStyle, drawerNavigation, username }) {
  const { state } = useContext(IbitterContext);

  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <TouchableWithoutFeedback onPress={() => drawerNavigation.openDrawer()}>
      <CourseImage
        style={styles.userIcon}
        username={username || state.user.username}
      />
      </TouchableWithoutFeedback>
      <Text style={styles.headerTitle}>@{username || state.user.username || 'Username Placeholder'}</Text>
      {RightHeaderComponent || <View style={{ width: 24, height: 24 }}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: GlobalStyles.paddingTop,
    paddingLeft: GlobalStyles.paddingLeft,
    paddingRight: GlobalStyles.paddingRight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
});
