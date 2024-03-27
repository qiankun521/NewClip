/**
 * 获取好友列表
 * @async
 * @function
 * @param {string} user_id - 用户ID
 * @param {string} token - 用户token
 * @returns {Promise<Object>} 包含好友列表的对象
 */
async function getFriendList(user_id,token){
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/friend/list?user_id=${user_id}&token=${token}`);
    const data = await response.json();
    return data;
}
/**
 * 从服务器获取聊天消息
 * @async
 * @function
 * @param {string} token - 用户登录凭证
 * @param {string} to_user_id - 聊天的用户ID
 * @param {number} [pre_msg_time=0] - 获取此时间戳之前的消息，默认为0
 * @returns {Promise} 包含聊天消息的Promise对象
 */
async function getMessages(token,to_user_id,pre_msg_time=0){
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/message/chat?to_user_id=${to_user_id}&token=${token}&pre_msg_time=${pre_msg_time}`);
    const data = await response.json();
    return data;
}
/**
 * 发送消息
 * @async
 * @function sendMessage
 * @param {string} token - 用户令牌
 * @param {string} to_user_id - 接收消息的用户ID
 * @param {string} content - 消息内容
 * @param {number} [action_type=1] - 操作类型，默认为1
 * @returns {Promise<Object>} 包含响应数据的Promise对象
 */
async function sendMessage(token,to_user_id,content,action_type=1){
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/message/action?to_user_id=${to_user_id}&token=${token}&content=${content}&action_type=${action_type}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}
export {getFriendList,getMessages,sendMessage};