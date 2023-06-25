import React, { useState, useContext } from 'react';
import GlobalConfig from '../../../config';
import IbitterStackScreen from '../../../atoms/stack/IbitterStackScreen';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import ContentArea from '../../../molecules/ContentArea';
import axios from 'axios';
import { IbitterContext } from '../../providers/IbitterProvider';
import { Alert } from 'react-native';

export default function SendMessage({ navigation }) {
  const { state } = useContext(IbitterContext);
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  /// \brief Updates the recipient whenever the name text input changes.
  /// This function acts as a middleware that validates the `recipient` input.
  /// and updates the recipient accordingly.
  ///
  /// \param text The input text obtained from the `recipient`text input component.
  const onRecipientChange = text => {
    /// Checks if the recipient's username length is greater than 20.
    /// If so, then the recipient's username is not updated.
    if (text.length > 20)
      return;

    /// Updates the recipient state with the provided input text. In this case,
    /// there is no name validation.
    setRecipient(text);
  };

  const createMessage = () => {
    /// Check if the recipient of the message is the user itself.
    if (recipient === state.user.username) {
      Alert.alert('Mensagem Inválida', 'Você não pode enviar uma mensagem para si mesmo.');
      return;
    }

    axios.post(`${GlobalConfig.apiUrl}/createmessage`, {
      from: state.user.username,
      to: recipient,
      content,
    })
      .then(_ => {
        /// Send an alert to the user informing that the operation of sending a
        /// message to the specified recipient has been completed successfully.
        Alert.alert('Mensagem Enviada', 'Sua mensagem foi enviada com sucesso');

        /// Make the user to go back to the chat list.
        navigation.pop();
      })
      .catch(e => {
        /// Check if the recipient informed by the user does not exists, then, the message
        /// cannot be sent. Therefore, an alert is sent to the user informing what went wrong.
        if (e.response && e.response.data && e.response.data.constraint === 'chats_username_to_foreign') {
          Alert.alert('Mensagem Inválida', `Não existe o usuário (${recipient})`);
          return;
        }

        /// Catch an unexpected error.
        console.error('unexpected error in createMessage in SendMessage: ', e);
      });
  };

  return (
    <IbitterStackScreen navigation={navigation}>
      <Input
        label="Recipiente"
        style={{ marginBottom: 12, }}
        textStyle={{ width: '22%', }}
        settings={{
          onChangeText: onRecipientChange,
          value: recipient,
        }}
      />
      <ContentArea
        label="Conteúdo"
        content={content}
        setContent={setContent}
        maxLength={100}
      />
      <Button
        text="Enviar"
        onPress={createMessage}
      />
    </IbitterStackScreen>
  );
}
