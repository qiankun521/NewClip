const initState = { isShowMessage: false, isShowLogin: false, isShowUpload: false }
const popoverReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_MESSAGES':
            return { ...state, isShowMessage: true }
        case 'HIDE_MESSAGES':
            return { ...state, isShowMessage: false }
        case 'SHOW_LOGIN':
            return { ...state, isShowLogin: true }
        case 'HIDE_LOGIN':
            return { ...state, isShowLogin: false }
        case 'SHOW_UPLOAD':
            return { ...state, isShowUpload: true }
        case 'HIDE_UPLOAD':
            return { ...state, isShowUpload: false }
        default:
            return state;
    }
}
export default popoverReducer;