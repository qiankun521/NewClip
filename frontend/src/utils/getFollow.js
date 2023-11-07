
/**
 * 从服务器获取用户关注列表
 * @param {string} id - 用户ID
 * @param {string} [token=""] - 用户token
 * @returns {Promise<Array>} - 包含关注列表的Promise对象
 */
async function getFollow(id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/follow/list?user_id=${id}&token=${token}`);
    const videos = await promise.json();
    return videos;
}
/**
 * 获取用户的粉丝列表
 * @param {string} id - 用户ID
 * @param {string} [token=""] - 用户token
 * @returns {Promise<Array>} - 包含粉丝信息的数组
 */
async function getFollower(id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/follower/list?user_id=${id}&token=${token}`);
    const videos = await promise.json();
    return videos;
}

export { getFollow, getFollower };