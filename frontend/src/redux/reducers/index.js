import loginRegisterReducer from "./loginRegisterReducer";
import popoverReducer from "./popoverReducer";
import videosReducer from "./videosReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  loginRegister: loginRegisterReducer,
  popover: popoverReducer,
  videos: videosReducer,
});
export default rootReducer;
