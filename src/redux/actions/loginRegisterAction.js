/**
 * @file
 * 这个文件包含了处理用户登录和注册的动作创建器
 * 用于创建Redux动作，这些动作描述了各种用户登录和注册的状态，包括请求、成功和失败
 */

export const loginRequest = () => ({
    type: "LOGIN_REQUEST",
});

export const loginSuccess = (username, token, success, user_id) => ({
    type: "LOGIN_SUCCESS",
    username,
    token,
    message: success,
    user_id,
});

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    message: error,
});

export const logOut = () => ({
    type: "LOGOUT",
});

export const registerRequest = () => ({
    type: "REGISTER_REQUEST",
});

export const registerSuccess = (success) => ({
    type: "REGISTER_SUCCESS",
    message: success,
});

export const registerFailure = (error) => ({
    type: "REGISTER_FAILURE",
    message: error,
});
