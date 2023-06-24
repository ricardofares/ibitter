import React, { useState, useEffect, useContext } from 'react';
import GlobalConfig from '../config';
import axios from 'axios';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { IbitterContext } from '../organisms/providers/IbitterProvider';

export default function CourseImage({ username, style }) {
  const { state } = useContext(IbitterContext);

  const [course, setCourse] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        /// Fetch the user's course and the user's avatar URL using this API's endpoint.
        const fetchCourseResponse = await axios.get(`${GlobalConfig.apiUrl}/getcourse?username=${username}`);

        /// Checks if no data has been replied. Therefore, an error has occurred.
        if (fetchCourseResponse.data.length === 0) {
          console.warn(`It were not possible to fetch the course from the user with the username (${username})`);
          return;
        }

        /// Fetch the user's course and the user's avatar_url.
        const { course, avatar_url } = fetchCourseResponse.data[0];

        /// Update the current state with the information retrieved from the database.
        setCourse(course);
        setAvatarUrl(avatar_url);

        /// Set busy to `false` to indicate that the information retrieval from the database
        /// has been completed succesfully.
        setBusy(false);
      } catch (e) {
        /// Prints the error to the application's standard output.
        console.error(`fetchUserCourse at CourseImage exception`, e);

        if (e.message === 'Network Error') {
          Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
          return;
        }
      }
    };

    fetchUserCourse();

    /// This `useEffect` should have `lastUpdate` as a dependency, because once an overall
    /// update occurs, the images used through the application should be updated as well.
    /// One of the cases that this is necessary is when the user updated its avatar URL.
    /// Without this dependency informing this `useEffect` that something has happened,
    /// the avatars from the posts, messages etc. will not be updated.
  }, [state.lastUpdate]);

  /// While the information has not been yet retrieved from the database, an activity
  /// indicator will be shown to inform the user that something is being done underlying.
  /// In this case, what is being done is the information retrieval with relation to the
  /// user's course and the user's avatar URL. Once that information is retrieved, this
  /// `busy` is set to `true` and the activity indicator is not shown anymore.
  if (isBusy) {
    return <ActivityIndicator />;
  } else {
    /// Check if the user has a specified avatar URL. Therefore, load the image from
    /// that URL instead of loading a default image with relation to the user's course.
    if (avatarUrl != null && avatarUrl != '')
      return <Image
        style={[styles.userIcon, style]}
        src={avatarUrl}
      />;

    /// After here, the user's image is loaded with relation to the user's course. In this case,
    /// each course has a unique color and, therefore, based on the user's course the image with
    /// that color is taken as the user's image.

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

