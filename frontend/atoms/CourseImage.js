import React, { useState, useEffect } from 'react';
import GlobalConfig from '../config';
import axios from 'axios';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function CourseImage({ username, style }) {
  const [course, setCourse] = useState('');
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        const fetchCourseResponse = await axios.get(`${GlobalConfig.apiUrl}/getcourse?username=${username}`);

        if (fetchCourseResponse.data.length === 0) {
          console.warn(`It were not possible to fetch the course from the user with the username (${username})`);
          return;
        }

        const { course } = fetchCourseResponse.data[0];

        setCourse(course);
        setBusy(false);
      } catch (e) {
        console.warn(`fetchUserCourse at CourseImage exception`, e);
        if (e.message === 'Network Error') {
          Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
          return;
        }
      }
    };

    fetchUserCourse();
  }, []);

  if (isBusy) {
    return <ActivityIndicator />;
  } else {
    if (course === 'Ciências Biológicas') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/biological_science_color.png')}
      />;
    }

    if (course === 'Ciência da Computação') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/computer_science_color.png')}
      />;
    }

    if (course === 'Engenharia de Alimentos') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/food_engineering_color.png')}
      />;
    }

    if (course === 'Física') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/physics_color.png')}
      />;
    }

    if (course === 'Matemática') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/mathematics_color.png')}
      />;
    }

    if (course === 'Química') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/chemistry_color.png')}
      />;
    }

    if (course === 'Tradução') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/translate_color.png')}
      />;
    }

    if (course === 'Letras') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/languages_color.png')}
      />;
    }

    if (course === 'Pedagogia') {
      return <Image
        style={[styles.userIcon, style]}
        source={require('../assets/images/courses-colors/pedagogy_color.png')}
      />;
    }
  }
}

const styles = StyleSheet.create({
  userIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
});

