/**
 * 向服务器发送点赞请求
 * @param {string} video_id - 视频ID
 * @param {string} [token=""] - 用户token
 * @returns {Promise} - 返回一个Promise对象，包含服务器返回的数据
 */
async function postLike(video_id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/favorite/action/?video_id=${video_id}&token=${token}&action_type=1`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

/**
 * 取消点赞视频
 * @param {string} video_id - 视频ID
 * @param {string} [token=""] - 用户token
 * @returns {Promise<Object>} - 包含取消点赞结果的Promise对象
 */
async function postCancelLike(video_id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/favorite/action/?video_id=${video_id}&token=${token}&action_type=2`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}
export {postLike,postCancelLike};