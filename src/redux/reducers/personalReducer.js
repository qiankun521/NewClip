const initState = { info: {}, friendList: {}, messages: {}, chattingFriendId: 0 };
const personalReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_INFO":
      return {
        ...state,
        info: action.info,
      };
    case "CHANGE_FRIEND_LIST":
      return {
        ...state,
        friendList: action.friendList,
      };
    case "CHANGE_MESSAGES":
      return {
        ...state,
        messages: { ...state.messages, [action.id]: action.messages },
      };
    case "CHANGE_CHATTING_FRIEND_ID":
      return {
        ...state,
        chattingFriendId: action.id,
      };
    default:
      return initState;
  }
};
export default personalReducer;
