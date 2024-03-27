import loginRegisterReducer from "./loginRegisterReducer";
import popoverReducer from "./popoverReducer";
import videosReducer from "./videosReducer";
import personalReducer from "./personalReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  loginRegister: loginRegisterReducer,
  popover: popoverReducer,
  videos: videosReducer,
  personal: personalReducer,
});
export default rootReducer;
