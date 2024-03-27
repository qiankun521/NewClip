/**
 * 向服务器发送评论请求
 * @async
 * @function
 * @param {string} token - 用户的身份令牌
 * @param {string} id - 视频的ID
 * @param {string} action_type - 评论的类型(1：发送，2：删除)
 * @param {string} text - 评论的内容
 * @returns {Promise<Object>} 包含评论信息的对象
 */
async function postComment(token,id,action_type,text) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/comment/action/?video_id=${id}&token=${token}&action_type=${action_type}&comment_text=${text}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export default postComment;