import React, { useState, useEffect, useContext } from 'react';
import Header from '../../../molecules/Header';
import GlobalConfig from '../../../config';
import { IbitterContext } from '../../providers/IbitterProvider';
import axios from 'axios';
import { StyleSheet, View, Text } from 'react-native';

export default function ChatList() {
  const { state } = useContext(IbitterContext);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get(`${GlobalConfig.apiUrl}/getchats?username=${state.user.username}`);
        const { data } = response;

        /// Update the chat list based on the information retrieved from the database.
        setChatList(data);
      } catch (e) {
        console.warn('fetchChatList in ChatList: ', e);
      }
    };

    fetchChatList();
  }, []);

  return (
    <View>
      <Header
        headerContainerStyle={{
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#dfdfdf',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
});
