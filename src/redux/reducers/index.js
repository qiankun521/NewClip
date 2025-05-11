import loginRegisterReducer from "./loginRegisterReducer";
import popoverReducer from "./popoverReducer";
import videosReducer from "./videosReducer";
import personalReducer from "./personalReducer";
import chatSlice from "./chatSlice"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  loginRegister: loginRegisterReducer,
  popover: popoverReducer,
  videos: videosReducer,
  personal: personalReducer,
  aichat: chatSlice,
});
export default rootReducer;
