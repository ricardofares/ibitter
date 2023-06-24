import React from 'react';
import GlobalStyles from '../styles';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';

export default function CourseDropdownSelector({ course, setCourse }) {
  /// \brief Updates the course whenever the course selection changes.
  ///
  /// This function acts as a middleware that validates the `course` input
  /// and updates the course accordingly.
  ///
  /// \param course The course text obtained from the course selection dropdown.
  /// \param index The course index in the course selection dropdown.
  const onCourseChange = (course, _) => {
    // Updates the course state with the provided course selection. In this case,
    // there is no course valiidation.
    setCourse(course);
  };

  return (
    <SelectDropdown
      data={[
        "Ciências Biológicas",
        "Ciência da Computação",
        "Engenharia de Alimentos",
        "Física",
        "Matemática",
        "Química",
        "Tradução",
        "Letras",
        "Pedagogia",
      ]}
      buttonStyle={styles.buttonSelectDropdown}
      buttonTextStyle={styles.buttonTextSelectDropdown}
      rowTextStyle={styles.selectDropdownText}
      dropdownStyle={styles.selectDropdown}
      defaultButtonText={course == null || course == '' ? "Curso de Graduação" : course}
      onSelect={onCourseChange}
    />
  );
}

const styles = StyleSheet.create({
  buttonSelectDropdown: {
    backgroundColor: GlobalStyles.tertiaryColor,
    flexDirection: 'row',
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
    width: '100%',
  },
  buttonTextSelectDropdown: {
    color: '#5b606b',
    fontSize: 14,
    textAlign: 'left',
  },
  selectDropdown: {
    backgroundColor: GlobalStyles.tertiaryColor,
    borderRadius: 10,
  },
  selectDropdownText: {
    color: '#5b606b',
  }
});
