/**
 * 登录函数
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object>} - 包含用户信息的对象
 */
async function login(username, password) {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/user/login?username=${username}&password=${password}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await promise.json();
    return data;
}
/**
 * 注册用户
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object>} - 包含注册结果的 Promise 对象
 */
async function register(username, password) {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/user/register?username=${username}&password=${password}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await promise.json();
    return data;
}
export { login, register };