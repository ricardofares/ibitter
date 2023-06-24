import React, { useState, useEffect, useContext } from 'react';
import Header from '../../../molecules/Header';
import GlobalConfig from '../../../config';
import ChatItem from './ChatItem';
import NoMessageChatList from './NoMessageChatList';
import SendMessageIcon from './SendMessageIcon';
import axios from 'axios';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function ChatList({ navigation, route }) {
  const { drawerNavigation } = route.params;
  const { state } = useContext(IbitterContext);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    axios.get(`${GlobalConfig.apiUrl}/getchats?username=${state.user.username}`)
      .then(response => {
        const { data } = response;

        /// Update the chat list with the information that has just been retrieved
        /// from the database.
        setChatList(data);
      })
      .catch(e => console.warn('fetchChatList in ChatList: ', e));
  }, []);

  return (
    <View>
      <Header
        drawerNavigation={drawerNavigation}
        headerContainerStyle={{
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#dfdfdf',
        }}
      />
      {
        chatList.length === 0 ?
          <NoMessageChatList />
          :
          <FlatList
            data={chatList}
            renderItem={({ item }) => <ChatItem navigation={navigation} chat={item} />}
          />
      }
      <SendMessageIcon navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({

});
