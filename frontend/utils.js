import axios from 'axios';
import moment from 'moment';
import GlobalConfig from './config';
import { Alert } from 'react-native';

///
/// \brief API Utils
///

/// \brief Handles the user's like action on a post.
///
/// \param {string} username - The username of the user performing the like action.
/// \param {string} postId - The ID of the post being liked.
/// \param {boolean} flag - A flag indicating whether to add or remove the like.
/// \param {function} dispatch - A function to dispatch the timeline update action.
/// \returns {Promise<void>} - A promise that resolves when the like action is handled.
export const handleUserLike = async (username, postId, flag, dispatch) => {
  try {
    // Send a POST request to the server to add or remove a like based on the flag
    const response = await axios.post(`${GlobalConfig.apiUrl}/${flag ? 'addlike' : 'removelike'}`, {
      username,
      postId,
    });

    // If the server responds with a 204 status (No Content),
    // dispatch a timeline update action to refresh the UI
    if (response.status === 204) {
      dispatch({
        type: 'DO_TIMELINE_UPDATE',
      });
    }
  } catch (e) {
    // If an error occurs during the request, check if the backend is offline.
    // If it is offline, show an alert to the user informing them of the issue.
    if (e.message === 'Network Error') {
      Alert.alert('Servidor Off-line', 'Parece que nossos servidores estão off-line, tente novamente mais tarde!');
      return;
    }
  }
};

///
/// \brief Moment Utils
///

export const timeDiff = (before, after) => {
  const momentBefore = moment(before);
  const momentAfter = moment(after);

  const seconds = momentAfter.diff(momentBefore, 'seconds');
  const minutes = Number.parseInt(seconds / 60);
  const hours = Number.parseInt(seconds / 3600);
  const days = Number.parseInt(seconds / 86400);

  if (days > 0)
    return `${days}d`;
  else if (hours > 0)
    return `${hours}h`;
  else if (minutes > 0)
    return `${minutes}m`;
  else
    return `${seconds}s`;
};

///
/// \brief String Utils
///

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

export const countNewLines = string => {
  let newLineCount = 0;
  for (const character of string)
    if (character == '\n')
      newLineCount++;
  return newLineCount;
};
