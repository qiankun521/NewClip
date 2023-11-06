async function getFriendList(user_id,token){
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/friend/list?user_id=${user_id}&token=${token}`);
    const data = await response.json();
    return data;
}
async function getMessages(token,to_user_id,pre_msg_time=0){
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/message/chat?to_user_id=${to_user_id}&token=${token}&pre_msg_time=${pre_msg_time}`);
    const data = await response.json();
    return data;
}
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