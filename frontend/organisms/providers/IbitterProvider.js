import React, { createContext, useReducer } from 'react';

/// \brief Represents the default state of the `IbitterContext`.
///
/// This object defines the initial state of the `IbitterContext` and its properties.
const defaultState = {
	/// \brief Indicates whether the user has successfully logged in.
	///
	/// This flag is initially set to `false` and changes to `true` upon successful login.
	isLoggedIn: false,

	/// \brief Contains the information of the logged-in user fetched from the database.
	///
	/// This property is initially set to `undefined` and gets updated with the user information
	/// once it is retrieved from the database during the login process.
	user: undefined,

	/// \brief Contains all loaded posts from the database.
	posts: undefined,

    /// \brief Contains the choosen user username for the User window.
    choosenUser: undefined,

	/// \brief Represents the datetime of the last timeline update.
	///
	/// This property holds the timestamp indicating the datetime of the most recent timeline update.
	/// Initially, it is set to `undefined` to signify that no update has occurred yet.
	///
	/// \remarks The value of this property gets updated whenever the timeline data is refreshed or modified.
	///				   It can be used to track the timing of updates and synchronize the application's behavior accordingly.
	lastTimelineUpdate: undefined,

	lastUpdate: undefined,
};

const actions = {
	'DO_LOGIN': (state, payload) => {
		return {
			...state,
			isLoggedIn: true,
			user: payload.user
		};
	},
	'DO_TIMELINE_UPDATE': (state, payload) => {
		console.log('timeline update');
		return {
			...state,
			lastTimelineUpdate: Date.now(),
		}
	},
	'DO_UPDATE': (state, payload) => {
		return {
			...state,
			lastUpdate: Date.now()
		}
	},
	'DO_USER_UPDATE': (state, payload) => {
		return {
			...state,
			user: payload.user
		};
	},
	/// Dispatch an action to update the posts in the application state.
	///
	/// This function dispatches an action to update the application state with the newly loaded posts.
	/// The action has a type of 'UPDATE_POSTS' and a payload containing the updated posts array.
	/// By calling the `display` function with the dispatched action, the application state is updated
	/// to include the additional posts.
	///
	/// \details The action type 'UPDATE_POSTS' is typically handled by a reducer function that updates
	/// the state with the new posts. The payload contains the updated posts array, which is a combination
	/// of the existing posts and the newly loaded posts. By using the spread operator, the function ensures
	/// that the existing posts remain unchanged while appending the new posts.
	///
	/// Example usage:
	/// ```
	/// display({
	///   type: 'UPDATE_POSTS',
	///   payload: {
	///     posts: [...posts, ...loadedPosts],
	///   },
	/// });
	/// ```
	'UPDATE_POSTS': (state, payload) => {
		console.log(`Posts have been updated, now we have ${payload.posts.length} posts`);
		return {
			...state,
			posts: payload.posts
		}
	},
};

/// \brief The `IbitterContext` represents the context object used for sharing data within the Ibitter
///	   application. It utilizes the `createContext` function from React to create a new context instance.
///
/// \param defaultState The default state object representing the initial values of the context.
/// \param The context object that can be accessed and consumed by components.
export const IbitterContext = createContext(defaultState);

export default function IbitterProvider({ children }) {
	const reducer = (state, action) => {
		const { type, payload } = action;
		const fn = actions[type];
		return fn ? fn(state, payload) : state;
	};

	const [state, dispatch] = useReducer(reducer, defaultState);

	return (
		<IbitterContext.Provider value={{ state, dispatch }}>
			{children}
		</IbitterContext.Provider>
	);
}
