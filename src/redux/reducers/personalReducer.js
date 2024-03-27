const initState = { info: {}, friendList: [], messages: {} };
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
    default:
      return initState;
  }
};
export default personalReducer;
