import React, { useContext } from 'react';
import CourseImage from '../../../atoms/CourseImage';
import UsernameToName from '../../../atoms/Name';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

/// \brief Transforms a date in the format 'yyyy-MM-dd'
///        in the format 'dd/MM/yyyy'.
///
/// \note When a date is retrieved from the database, it
///       is in the format 'yyyy-MM-dd'. However, to be
///       more clearer the date for the user, this date
///       is transformed into 'dd-MM-yyyy'. 
const formatDateCorrectly = date => {
  const day = date.substring(8, 10);
  const month = date.substring(5, 7);
  const year = date.substring(0, 4);
  return `${day}/${month}/${year}`;
};

export default function ChatItem({ chat }) {
  const { state } = useContext(IbitterContext);

  return (
    <TouchableOpacity>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#dfdfdf', }}>
        <View style={{ flexDirection: 'row' }}>
          <CourseImage
            username={state.user.username === chat.username_to ? chat.username_from : chat.username_to}
            style={{ width: 44, height: 44 }}
          />
          <View style={{ marginLeft: 8, flexDirection: 'column', justifyContent: 'center', }}>
            <UsernameToName
              username={state.user.username === chat.username_to ? chat.username_from : chat.username_to}
              style={{ fontWeight: 'bold' }}
            />
            <Text>@{chat.username_to}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 4, }}>
            <Text style={{ opacity: 0.5 }}>{formatDateCorrectly(chat.sent_at)}</Text>
          </View>
        </View>
      </View >
    </TouchableOpacity>
  );
}
