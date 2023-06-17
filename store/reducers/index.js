import { combineReducers } from "redux";
import steamReducer from "./steam.reducer";

const rootReducer = combineReducers({
  steam: steamReducer,
});

export default rootReducer;
