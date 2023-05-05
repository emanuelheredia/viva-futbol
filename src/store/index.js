import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducers";
import thunk from "redux-thunk";

export const store = configureStore({
	reducer,
	options: compose(
		applyMiddleware(thunk),
		typeof window === "object" &&
			typeof window._REDUX_DEVTOOLS_EXTENSION_ !== "undefined"
			? window._REDUX_DEVTOOLS_EXTENSION_()
			: (f) => f,
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	),
});
