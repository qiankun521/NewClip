/**
 * 获取用户个人信息
 * @async
 * @function
 * @param {string} user_id - 用户ID
 * @param {string} [token=""] - 用户token
 * @returns {Promise<Object>} 包含用户个人信息的对象
 */
async function getPersonalInfo(user_id, token = "") {
  const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/user?user_id=${user_id}&token=${token}`);
  const data = await response.json();
  return data;
}
export default getPersonalInfo;