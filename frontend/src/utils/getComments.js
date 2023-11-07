/**
 * 从服务器获取指定视频的评论列表
 * @async
 * @function
 * @param {string} id - 视频ID
 * @param {string} [token=""] - 用户令牌
 * @returns {Promise<Array>} 包含评论对象的数组
 */
async function getComments(id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/comment/list/?video_id=${id}&token=${token}`);
    const videos = await promise.json();
    return videos;
}
export default getComments;