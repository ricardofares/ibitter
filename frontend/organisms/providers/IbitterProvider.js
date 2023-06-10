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
};

const actions = {
	'DO_LOGIN': (state, payload) => {
		return {
			...state,
			isLoggedIn: true,
			user: payload.user
		};
	}
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
