import React, { useContext } from 'react';
import GlobalStyles from '../styles';
import CourseImage from '../atoms/CourseImage';
import { StyleSheet, View, Text } from 'react-native';
import { IbitterContext } from '../organisms/providers/IbitterProvider';

export default function Header({ RightHeaderComponent, headerContainerStyle }) {
  const { state } = useContext(IbitterContext);

  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <CourseImage
        style={styles.userIcon}
        username={state.user.username}
      />
      <Text style={styles.headerTitle}>@{state.user.username || 'Username Placeholder'}</Text>
      {RightHeaderComponent || <View style={{ width: 24, height: 24 }}></View>}

    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
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
