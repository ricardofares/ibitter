import React, { useState, useEffect, useContext } from 'react';
import GlobalConfig from '../../../config';
import BackIcon from '../../../atoms/BackIcon';
import ContentArea from '../../../molecules/ContentArea';
import Button from '../../../atoms/Button';
import axios from 'axios';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const formatDateTimeCorrectly = date => {
  const day = date.substring(8, 10);
  const month = date.substring(5, 7);
  const hours = date.substring(11, 13);
  const minutes = date.substring(14, 16);
  return <Text style={{ fontSize: 12, color: 'white', opacity: 0.8, textAlign: 'right', }}>{day}/{month} &#8226; {hours}:{minutes}</Text>
};

export default function Chat({ navigation, route }) {
  const { state } = useContext(IbitterContext);
  const { from, to } = route.params;

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [lastTimeMessagesUpdate, setLastTimeMessagesUpdate] = useState(Date.now());

  useEffect(() => {
    /// Create an interval that runs a function repeatedly to fetch the messages
    /// from the chat between `from` and `to` every two seconds.
    const interval = setInterval(() => {
      const currentTime = Date.now();

      /// Update the last time the message has updated.
      setLastTimeMessagesUpdate(currentTime);

      /// Print a message to the application's standard output.
      console.log(`Messages from ${from} to ${to} are updated [${currentTime}].`);
    }, 2000);

    /// Once the component did unmount, the interval is cleared to prevent the
    /// message updatign while the user is out of the chat screen.
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    /// Catch the messages that the user sent to the recipient.
    axios.get(`${GlobalConfig.apiUrl}/getchatmessages?from=${from}&to=${to}`)
      .then(firstResponse => {
        /// Catch the messages that the recipient sent to the user.
        axios.get(`${GlobalConfig.apiUrl}/getchatmessages?from=${to}&to=${from}`)
          .then(secondResponse => {
            /// Join together the sent messages that are the messages sent from the
            /// `sender` to the `recipient` and the received messages that are the
            /// messages sent from the `recipient` to the `sender`.
            const rawMessages = [...firstResponse.data, ...secondResponse.data];

            /// Order the messages using the time when it was sent.
            rawMessages.sort((a, b) => (new Date(a.sent_at)).getTime() < (new Date(b.sent_at)).getTime() ? -1 : 1);

            /// Update all messages in the chat between the specified users
            /// that have been retrieved from the database.
            setMessages(rawMessages);
          })
          .catch(e => {
            /// Catch an unexpecteed error.
            console.error('unexpected error in useEffect in Chat.js: ', e);
          });
      })
      .catch(e => {
        /// Catch an unexpecteed error.
        console.error('unexpected error in useEffect in Chat.js: ', e);
      });
  }, [lastTimeMessagesUpdate]);

  const createMessage = () => {
    axios.post(`${GlobalConfig.apiUrl}/createmessage`, {
      from,
      to,
      content,
    })
      .then(_ => {
        /// Clear the content that has just been sent.
        setContent('');

        /// Update the instant of the last messages updation.
        setLastTimeMessagesUpdate(Date.now());
      })
      .catch(e => {
        /// Catch an unexpected error.
        console.error('unexpected error in createMessage in SendMessage: ', e);
      });
  };

  const isMessageSentByMe = message => message.username_from === state.user.username;

  const renderMessage = message =>
    <View>
      <View style={[styles.messageContainer, isMessageSentByMe(message) ? styles.rightMessageContainer : styles.leftMessageContainer]}>
        <Text style={{ fontSize: 16, color: 'white', }}>{message.message}</Text>
        {formatDateTimeCorrectly(message.sent_at)}
        {isMessageSentByMe(message) ?
          <>
            <View style={styles.rightArrow}></View>
            <View style={styles.rightArrowOverlap}></View>
          </>
          :
          <>
            <View style={styles.leftArrow}></View>
            <View style={styles.leftArrowOverlap}></View>
          </>
        }
      </View>
    </View>;

  return (
    <View>
      <View style={{
        padding: 8,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf',
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', flex: 1, }}>@{to}</Text>
        <BackIcon
          style={{ position: 'absolute', left: 0, top: 0, }}
          navigation={navigation}
        />
        <Button
          text="Enviar"
          onPress={createMessage}
          style={{
            position: 'absolute',
            width: '20%',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 5,
            bottom: 10,
            right: 20,
          }}
        />
      </View>
      <ContentArea
        style={{ marginBottom: 8 }}
        inputStyle={{ borderWidth: 8, borderBottomWidth: 0, borderColor: 'white', }}
        label="Conteúdo"
        content={content}
        setContent={setContent}
        maxLength={100}
      />
      <FlatList
        data={messages}
        style={{ height: '100%', }}
        renderItem={({ item }) => renderMessage(item)}
        contentContainerStyle={{ paddingBottom: '50%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "#0078fe",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    maxWidth: '50%',
    borderRadius: 15,
  },
  leftMessageContainer: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  rightMessageContainer: {
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10
  },
  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
  leftArrow: {
    position: 'absolute',
    backgroundColor: '#0078fe',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
  },
  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
});
