import React, { useState, useContext } from 'react';
import GlobalConfig from '../../../config';
import IbitterStackScreen from '../../../atoms/stack/IbitterStackScreen';
import Input from '../../../atoms/Input';
import CourseDropdownSelector from '../../../atoms/CourseDropdownSelector';
import Button from '../../../atoms/Button';
import axios from 'axios';
import { Alert } from 'react-native';
import { IbitterContext } from '../../providers/IbitterProvider';

export default function Configuration({ navigation }) {
  const { state, dispatch } = useContext(IbitterContext);

  const [name, setName] = useState(state.user.name);
  const [avatarUrl, setAvatarUrl] = useState(state.user.avatar_url || '');
  const [course, setCourse] = useState(state.user.course);

  const onNameChange = text => {
    if (text.length > 20)
      return;

    /// Update the name.
    setName(text);
  };

  const onAvatarUrlChange = text => {
    /// Update the avatar URL.
    setAvatarUrl(text);
  };

  const onUpdate = async () => {
    try {
      const response = await axios.post(`${GlobalConfig.apiUrl}/updateuser`, {
        username: state.user.username,
        name: name,
        course: course,
        avatarUrl: avatarUrl,
      });

      /// Check if the response status is 204 No Response HTTP Request. In this case,
      /// the user has been updated successfully.
      if (response.status === 204) {
        /// Inform the user that the update has been completed successfully.
        Alert.alert('Usuário Atualizado', 'A atualização foi realizada com sucesso.');

        dispatch({
          type: 'DO_USER_UPDATE',
          payload: {
            user: {
              ...state.user,
              name: name,
              course: course,
              avatar_url: avatarUrl
            }
          }
        });

        /// Peform an overall update.
        dispatch({
          type: 'DO_UPDATE',
        });
      }
    } catch (e) {
      /// Catch an unexpected error.
      console.error('unexpected error in onUpdate in Configuration: ', e);
    }
  };

  return (
    <IbitterStackScreen
      navigation={navigation}
    >
      <Input
        label="Nome"
        settings={{
          onChangeText: onNameChange,
          value: name,
        }}
      />
      <CourseDropdownSelector course={course} setCourse={setCourse} />
      <Input
        label="Avatar"
        style={{ marginTop: 12 }}
        settings={{
          onChangeText: onAvatarUrlChange,
          value: avatarUrl,
        }}
      />
      <Button
        style={{ marginTop: 12 }}
        text="Atualizar"
        onPress={onUpdate}
      />
    </IbitterStackScreen>
  );
}
