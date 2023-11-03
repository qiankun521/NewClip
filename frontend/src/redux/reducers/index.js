import loginRegisterReducer from "./loginRegisterReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    loginRegister: loginRegisterReducer,
});
export default rootReducer;