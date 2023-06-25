import React, { useState, useEffect, useContext } from 'react';
import Header from '../../../molecules/Header';
import GlobalConfig from '../../../config';
import ChatItem from './ChatItem';
import NoMessageChatList from './NoMessageChatList';
import SendMessageIcon from './SendMessageIcon';
import axios from 'axios';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

export default function ChatList({ navigation, route }) {
  const { drawerNavigation } = route.params;
  const { state } = useContext(IbitterContext);

  const [chatList, setChatList] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${GlobalConfig.apiUrl}/getchats?username=${state.user.username}`)
        .then(response => {
          const { data } = response;

          const map = {};
          const updatedData = [];

          /// @Workaround: Prevent chat duplicates.
          for (const chat of data) {
            /// Prevent chat duplicates.
            if (map[chat.username_from] === chat.username_to || map[chat.username_to] === chat.username_from)
              continue;

            /// Update the map to match chat duplicates.
            map[chat.username_from] = chat.username_to;

            /// Push only the non-duplicates chat.
            updatedData.push(chat);
          }

          /// Update the chat list with the information that has just been retrieved
          /// from the database.
          setChatList(updatedData);
          setBusy(false);

          console.log(`Chat list of the user ${state.user.username} has been updated, now has ${updatedData.length} open chats [${Date.now()}].`);
        })
        .catch(e => {
          /// Catch an unexpected error.
          console.error('unexpected error in fetchChatList in ChatList: ', e);
        });
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  return (
    <View>
      <Header
        navigation={navigation}
        drawerNavigation={drawerNavigation}
        headerContainerStyle={{
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#dfdfdf',
        }}
      />
      {isBusy ? <ActivityIndicator size="large" style={{ paddingTop: '50%', }} /> :
        <>
          {
            chatList.length === 0 ?
              <NoMessageChatList />
              :
              <FlatList
                data={chatList}
                renderItem={({ item }) => <ChatItem navigation={navigation} chat={item} />}
              />
          }
        </>
      }
      <SendMessageIcon navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({

});
