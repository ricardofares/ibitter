import React, { useState } from 'react';
import IbitterStackScreen from '../../atoms/stack/IbitterStackScreen';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import GlobalStyles from '../../styles';
import { StyleSheet, View, Text } from 'react-native';

export default function CreatePost({ navigation }) {
  const [content, setContent] = useState('');

  /// \brief Updates the content whenever the content textt input changes.
  ///
  /// This function acts a middleware that validates the `content` input.
  /// and updates the content accordingly.
  ///
  /// \param text The input text obtained from the `content` text input.
  const onContentChange = text => {
    // Check if the text length is greater than 255. If so,
    // the update is ignored.
    if (text.length > 255)
      return;

    // Updates the text state with the provided input text.
    setContent(text);
  };

  return (
    <IbitterStackScreen
      navigation={navigation}
      headerTitle="Faça seu post!"
      headerSubtitle="Compartilhe sua experiência conosco!"
      headerComponent={
        <Button
          text="Postar"
          style={{
            width: '25%',
            paddingTop: 12,
            paddingBottom: 12,
            marginLeft: 'auto',
          }}
          disabled={content.length === 0 || content.length > 255}
        />
      }
    >
      <Input
        label="Conteúdo"
        settings={{
          multiline: true,
          onChangeText: onContentChange,
          value: content,
        }}
      />
      <Text style={styles.characterCountText}>{content.length}/255</Text>
      {/*
      <Button
        style={{ marginTop: 16 }}
        text="Postar"
        disabled={content.length === 0}
      />
      */}
      <Text style={styles.signUpText}>Está postagem deve estar de acordo com nossos<Text> </Text>
        <Text style={styles.signUpTextEmphasize}>Termos de Uso</Text> e nossa<Text> </Text>
        <Text style={styles.signUpTextEmphasize}>Política de Privacidade</Text>
      </Text>
    </IbitterStackScreen>
  );
}

const styles = StyleSheet.create({
  characterCountText: {
    marginTop: 8,
    color: GlobalStyles.quaternaryColor,
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 8,
  },
  signUpText: {
    marginTop: 32,
    width: '95%',
    color: GlobalStyles.quaternaryColor,
    textAlign: 'center',
  },
  signUpTextEmphasize: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
