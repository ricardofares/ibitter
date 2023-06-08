/// \brief Returns \c true if \c string has a lowercase letter.
///
/// \param string The string to be checked.
///
/// \returns True if the \c string has a lowercase letter.
//           Otherwise, false is returned.
export const hasLowercaseLetter = string => {
  for (character of string)
    if (character != character.toUpperCase())
      return true;
  return false;
};

/// \brief Returns \c true if \c string has an uppercase letter.
///
/// \param string The string to be checked.
///
/// \returns True if the \c string has an uppercase letter.
//           Otherwise, false is returned.
export const hasUppercaseLetter = string => {
  for (character of string)
    if (character != character.toLowerCase())
      return true;
  return false;
};

/// \brief Returns \c true if \c string has a symbol.
///
/// \param string The string to be checked.
///
/// \returns True if the \c string has a symbol.
///          Otherwise, false is returned.
export const hasSymbol = string => {
  return /[|\\/~^:,;?!&%$@*+]/.test(string);
};
