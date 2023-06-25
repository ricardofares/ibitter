import React, { useState, useEffect } from 'react';
import GlobalConfig from '../config';
import axios from 'axios';
import { StyleSheet, View, Text } from 'react-native';

export default function UsernameToName({ username, style }) {
  const [name, setName] = useState('Name Placeholder');

  useEffect(() => {
    axios.get(`${GlobalConfig.apiUrl}/getname?username=${username}`)
      .then(response => {
        const { data } = response;
        setName(data[0].name);
      })
      .catch(e => console.log(e));
  }, []);

  return <Text style={style}>{name}</Text>;
}
