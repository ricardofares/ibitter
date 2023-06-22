import React from 'react';
import GlobalStyles from '../config';
import Input from '../atoms/Input';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { countNewLines } from '../utils';

export default function ContentArea({ label, content, setContent, maxLength }) {
  /// \brief Updates the content whenever the content textt input changes.
  ///
  /// This function acts a middleware that validates the `content` input.
  /// and updates the content accordingly.
  ///
  /// \param text The input text obtained from the `content` text input.
  const onContentChange = text => {
    // Check if the text length is greater than 255. If so,
    // the update is ignored.
    if (text.length > maxLength)
      return;

    if (countNewLines(text) > 5)
      return;

    // Updates the text state with the provided input text.
    setContent(text);
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
    >
      <Input
        label={label}
        settings={{
          multiline: true,
          maxHeight: 200,
          onChangeText: onContentChange,
          value: content,
        }}
      />
      <Text style={styles.characterCountText}>{content.length}/{maxLength}</Text>
    </ScrollView>
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
});
