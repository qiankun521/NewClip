/**
 * @file
 * 这个文件包含了处理用户登录和注册的动作创建器
 * 用于创建Redux动作，这些动作描述了各种用户登录和注册的状态，包括请求、成功和失败
 */

/**
 * 登录请求的动作创建器
 * @returns {Object} 返回一个动作对象，其类型为"LOGIN_REQUEST"
 */
export const loginRequest = () => ({
    type: "LOGIN_REQUEST",
});

/**
 * 登录成功的动作创建器
 * @param {string} username - 用户名
 * @param {string} token - 用户的认证令牌
 * @param {boolean} success - 登录是否成功
 * @param {string} user_id - 用户的ID
 * @returns {Object} 返回一个动作对象，其类型为"LOGIN_SUCCESS"，并包含用户名、令牌、成功消息和用户ID
 */
export const loginSuccess = (username, token, success, user_id) => ({
    type: "LOGIN_SUCCESS",
    username,
    token,
    message: success,
    user_id
});

/**
 * 登录失败的动作创建器
 * @param {string} error - 错误信息
 * @returns {Object} 返回一个动作对象，其类型为"LOGIN_FAILURE"，并包含错误信息
 */
export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    message: error
});

/**
 * 注销的动作创建器
 * @returns {Object} 返回一个动作对象，其类型为"LOGOUT"
 */
export const logOut = () => ({
    type: "LOGOUT"
});

/**
 * 注册请求的动作创建器
 * @returns {Object} 返回一个动作对象，其类型为"REGISTER_REQUEST"
 */
export const registerRequest = () => ({
    type: "REGISTER_REQUEST",
});

/**
 * 注册成功的动作创建器
 * @param {boolean} success - 注册是否成功
 * @returns {Object} 返回一个动作对象，其类型为"REGISTER_SUCCESS"，并包含成功消息
 */
export const registerSuccess = (success) => ({
    type: "REGISTER_SUCCESS",
    message: success
});

/**
 * 注册失败的动作创建器
 * @param {string} error - 错误信息
 * @returns {Object} 返回一个动作对象，其类型为"REGISTER_FAILURE"，并包含错误信息
 */
export const registerFailure = (error) => ({
    type: "REGISTER_FAILURE",
    message: error
});
