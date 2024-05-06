import api from "./request";

async function getFriendList(user_id,token){
    const data = await api.get(`/relation/friend/list?user_id=${user_id}`);
    return data;
}

async function getMessages(token,to_user_id,pre_msg_time=0){
    const data = await api.get(`/message/chat?to_user_id=${to_user_id}&pre_msg_time=${pre_msg_time}`);
    return data;
}

async function sendMessage(token,to_user_id,content,action_type=1){
    const data = await api.post(`/message/action?to_user_id=${to_user_id}&content=${content}&action_type=${action_type}`);
    return data;
}
export {getFriendList,getMessages,sendMessage};