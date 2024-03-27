/**
 * 发送关注请求
 * @param {string} id - 被关注用户的ID
 * @param {string} [token=""] - 用户的token
 * @returns {Promise<Object>} - 包含关注请求结果的Promise对象
 */
async function postFollow(id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/action/?to_user_id=${id}&token=${token}&action_type=1`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

/**
 * 发送取消关注请求
 * @param {string} id - 用户ID
 * @param {string} [token=""] - 用户令牌
 * @returns {Promise<Object>} - 包含响应数据的Promise对象
 */
async function postCancelFollow(id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/action/?to_user_id=${id}&token=${token}&action_type=2`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export {postFollow,postCancelFollow};