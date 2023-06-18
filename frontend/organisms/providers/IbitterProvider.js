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

	/// \brief Represents the datetime of the last timeline update.
	///
	/// This property holds the timestamp indicating the datetime of the most recent timeline update.
	/// Initially, it is set to `undefined` to signify that no update has occurred yet.
	///
	/// \remarks The value of this property gets updated whenever the timeline data is refreshed or modified.
	///				   It can be used to track the timing of updates and synchronize the application's behavior accordingly.
	lastTimelineUpdate: undefined,
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
			lastTimelineUpdate: new Date(),
		}
	},
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
