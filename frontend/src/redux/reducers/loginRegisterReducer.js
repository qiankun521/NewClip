/**
 * @file
 * 这个文件包含了处理用户登录和注册的 reducer 函数
 */
const initState = {
  logout: true,
  username: "",
  token: "",
  user_id: "",
  error: "",
  loginWaiting: false,
  registerWaiting: false,
};
const loginRegisterReducer = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "LOGIN_REQUEST":
      newState = { ...state, logout: true, loginWaiting: true };
      break;
    case "LOGIN_SUCCESS":
      newState = {
        ...state,
        logout: false,
        username: action.username,
        token: action.token,
        message: action.success,
        loginWaiting: false,
        user_id: action.user_id,
      };
      break;
    case "LOGIN_FAILURE":
      newState = {
        ...state,
        logout: true,
        message: action.error,
        loginWaiting: false,
      };
      break;
    case "LOGOUT":
      newState = initState;
      break;
    case "REGISTER_REQUEST":
      newState = { ...state, registerWaiting: true };
      break;
    case "REGISTER_SUCCESS":
      newState = { ...state, message: action.success, registerWaiting: false };
      break;
    case "REGISTER_FAILURE":
      newState = { ...state, message: action.error, registerWaiting: false };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export default loginRegisterReducer;
