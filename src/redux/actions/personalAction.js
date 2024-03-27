export const changeInfo = (info) => {
  return {
    type: "CHANGE_INFO",
    info,
  };
};
export const changeFriendList = (friendList) => {
  return {
    type: "CHANGE_FRIEND_LIST",
    friendList,
  };
};
export const changeMessages = (id, messages) => {
  return {
    type: "CHANGE_MESSAGES",
    id,
    messages,
  };
};
