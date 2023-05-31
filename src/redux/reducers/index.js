import { combineReducers } from "redux";

import dataReducer from "./dataReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
const reducer = combineReducers({
	data: dataReducer,
	auth: authReducer,
	users: usersReducer,
});

export default reducer;
