/**
 * 从服务器获取用户个人作品列表
 * @param {string} user_id - 用户ID
 * @param {string} [token=""] - 用户登录token
 * @returns {Promise<Array>} - 包含用户个人作品的数组
 */
export default async function getPersonalWork(user_id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/publish/list?&token=${token}&user_id=${user_id}`);
    const videos = await promise.json();
    return videos;
}
