import { combineReducers } from "redux";

import dataReducer from "./dataReducer";
const reducer = combineReducers({ data: dataReducer });

export default reducer;
