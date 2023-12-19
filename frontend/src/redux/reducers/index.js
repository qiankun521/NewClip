import loginRegisterReducer from "./loginRegisterReducer";
import popoverReducer from "./popoverReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    loginRegister: loginRegisterReducer,
    popover: popoverReducer
});
export default rootReducer;