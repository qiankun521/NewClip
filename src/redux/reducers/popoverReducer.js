const initState = {
  isShowMessage: false,
  isShowLogin: false,
  isShowUpload: false,
  isShowComments: false,
  isShowPersonal: false,
};
const popoverReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_MESSAGES":
      return { ...state, isShowMessage: true };
    case "HIDE_MESSAGES":
      return { ...state, isShowMessage: false };
    case "SHOW_LOGIN":
      return { ...state, isShowLogin: true };
    case "HIDE_LOGIN":
      return { ...state, isShowLogin: false };
    case "SHOW_UPLOAD":
      return { ...state, isShowUpload: true };
    case "HIDE_UPLOAD":
      return { ...state, isShowUpload: false };
    case "SHOW_COMMENTS":
      return { ...state, isShowComments: true };
    case "HIDE_COMMENTS":
      return { ...state, isShowComments: false };
    case "SHOW_PERSONAL":
      return { ...state, isShowPersonal: true };
    case "HIDE_PERSONAL":
      return { ...state, isShowPersonal: false };
    case "HIDE_ALL":
      return { ...initState };
    default:
      return state;
  }
};

export default popoverReducer;
