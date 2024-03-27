/**
 * 从服务器获取用户喜欢的视频列表
 * @param {string} user_id - 用户ID
 * @param {string} [token=""] - 用户令牌
 * @returns {Promise<Array>} 包含用户喜欢的视频的数组
 */
export default async function getPersonalLike(user_id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/favorite/list?&token=${token}&user_id=${user_id}`);
    const videos = await promise.json();
    return videos;
}