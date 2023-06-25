import React, { useContext } from 'react';
import CourseImage from '../../../atoms/CourseImage';
import UsernameToName from '../../../atoms/Name';
import { IbitterContext } from '../../providers/IbitterProvider';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

/// \brief Transforms a date from the format 'yyyy-MM-dd' to the format 'dd/MM/yyyy'.
///
/// \note When a date is retrieved from the database, it is typically in the format 
///       'yyyy-MM-dd'. However, to provide a clearer representation of the date to 
///       the user, this function transforms the date into the format 'dd/MM/yyyy'.
///
/// \details This function extracts the day, month, and year components from the input 
///          date string and rearranges them to form the desired format. The day is 
///          extracted by selecting the substring from index 8 to 10, the month from 
///          index 5 to 7, and the year from index 0 to 4. The formatted date string 
///          is then constructed by concatenating the day, month, and year with '/' 
///          as separators.
/// \param date The date string in the format 'yyyy-MM-dd' to be formatted.
///
/// \returns The formatted date string in the format 'dd/MM/yyyy'.
const formatDateCorrectly = date => {
  const day = date.substring(8, 10);
  const month = date.substring(5, 7);
  const year = date.substring(0, 4);
  return `${day}/${month}/${year}`;
};

export default function ChatItem({ navigation, chat }) {
  const { state } = useContext(IbitterContext);

  const getFrom = () => state.user.username === chat.username_from ? chat.username_from : chat.username_to;
  const getTo = () => state.user.username === chat.username_to ? chat.username_from : chat.username_to;

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Chat',
        { from: getFrom(), to: getTo() })}
    >
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#dfdfdf', }}>
        <View style={{ flexDirection: 'row' }}>
          <CourseImage
            username={getTo()}
            style={{ width: 44, height: 44 }}
          />
          <View style={{ marginLeft: 8, flexDirection: 'column', justifyContent: 'center', }}>
            <UsernameToName
              username={getTo()}
              style={{ fontWeight: 'bold' }}
            />
            <Text>@{getTo()}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 4, }}>
            <Text style={{ opacity: 0.5 }}>{formatDateCorrectly(chat.sent_at)}</Text>
          </View>
        </View>
      </View >
    </TouchableOpacity>
  );
}
