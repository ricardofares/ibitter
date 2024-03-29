import React, { useState, useEffect, useContext } from 'react';
import TimelineStack from './TimelineStack';
import CourseImage from '../../atoms/CourseImage';
import GlobalConfig from '../../config';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { IbitterContext } from '../providers/IbitterProvider';

const Drawer = createDrawerNavigator();

const CustomTimelineDrawerContent = ({ navigation }) => {
  const { state } = useContext(IbitterContext);
  const [followingInfo, setFollowingInfo] = useState({ followingCount: 0, followerCount: 0 });

  useEffect(() => {
    const loadFollowersInfo = async () => {
      try {
        const followingInfoResponse = await axios.get(`${GlobalConfig.apiUrl}/followersInfo?username=${state.user.username}`);

        /// Update the following info.
        setFollowingInfo(followingInfoResponse.data);
      } catch (e) {
        /// Catch unexpected error.
        console.error(e);
      }
    };

    const interval = setInterval(() => {
      loadFollowersInfo();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ padding: 32 }}>
      <View style={styles.headerContainer}>
        <CourseImage
          username={state.user.username}
          style={{ width: 48, height: 48, marginBottom: 8, }}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{state.user.name}</Text>
        <Text style={{ marginTop: 2, fontSize: 16, opacity: 0.5 }}>@{state.user.username}</Text>
        <View style={{ marginTop: 16, flexDirection: 'row', }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', opacity: 0.75 }}>{followingInfo.followingCount} </Text>
            <Text style={{ opacity: 0.5 }}>Seguindo</Text>
          </View>
          <View style={{ marginLeft: 16, flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', opacity: 0.75 }}>{followingInfo.followerCount} </Text>
            <Text style={{ opacity: 0.5 }}>Seguidores</Text>
          </View>
        </View>
        <View style={styles.list}>
          <TouchableWithoutFeedback
            onPress={() => navigation.jumpTo('TimelineStack', { screen: 'Timeline' })}
          >
            <View style={styles.listItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/home.png')}
              />
              <Text style={styles.iconLabel}>Página Inicial</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('User', { choosenUser: state.user.username })}
          >
            <View style={styles.listItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/profile.png')}
              />
              <Text style={styles.iconLabel}>Perfil</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.jumpTo('TimelineStack', { screen: 'ChatList' })}
          >
            <View style={styles.listItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/envelope.png')}
              />
              <Text style={styles.iconLabel}>Mensagens</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.jumpTo('TimelineStack', { screen: 'Configuration' })}
          >
            <View style={styles.listItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/configuration.png')}
              />
              <Text style={styles.iconLabel}>Configurações</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default function TimelineDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="TimelineStack"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
        }
      }}
      drawerContent={props => <CustomTimelineDrawerContent {...props} />}
    >
      <Drawer.Screen name="TimelineStack" component={TimelineStack} />
    </Drawer.Navigator >
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 48,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLabel: {
    marginLeft: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
