import { combineReducers } from "redux";

import dataReducer from "./dataReducer";
import authReducer from "./authReducer";
const reducer = combineReducers({ data: dataReducer, auth: authReducer });

export default reducer;
