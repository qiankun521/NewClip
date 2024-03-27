const initState = {
  videosArr: [],
  videosObj: {},
  nextTime: { 1: 0, 2: 0, 3: 0, 4: 0 },
  volume: 0.5,
  ismuted: true,
  chooseClass: 1,
};
const videosReducer = (state = initState, action) => {
  let newVideosOBJ = {};
  let newVideosArr = [];
  let videoId;
  switch (action.type) {
    case "CHANGE_VIDEOS":
      newVideosOBJ = { ...state.videosObj };
      videoId = state.videosArr[action.trueIndex];
      if (!action.isChild) {
        newVideosOBJ[state.videosArr[action.trueIndex]] = {
          ...newVideosOBJ[state.videosArr[action.trueIndex]],
          ...action.newState,
        };
      } else {
        newVideosOBJ[state.videosArr[action.trueIndex]] = {
          ...newVideosOBJ[state.videosArr[action.trueIndex]],
          [action.childName]: {
            ...newVideosOBJ[state.videosArr[action.trueIndex]][action.childName],
            ...action.newState,
          },
        };
      }
      return { ...state, videosObj: newVideosOBJ };
    case "UPDATE_VIDEOS":
      newVideosArr = [...state.videosArr];
      newVideosOBJ = { ...state.videosObj };
      for (const video of action.videos) {
        newVideosArr.push(video.id);
        newVideosOBJ[video.id] = video;
      }
      return { ...state, videosArr: newVideosArr, videosObj: newVideosOBJ };
    case "RESET_VIDEOS":
      newVideosArr = [];
      newVideosOBJ = {};
      for (const video of action.videos) {
        newVideosArr.push(video.id);
        newVideosOBJ[video.id] = video;
      }
      return { ...state, videosArr: newVideosArr, videosObj: newVideosOBJ };
    case "CHANGE_NEXT_TIME":
      return {
        ...state,
        nextTime: { ...state.nextTime, [state.chooseClass]: action.nextTime },
      };
    case "CHANGE_VOLUME":
      return {
        ...state,
        volume: action.volume,
      };
    case "CHANGE_MUTE":
      return {
        ...state,
        ismuted: !state.ismuted,
      };
    case "CHANGE_CHOOSE_CLASS":
      return {
        ...state,
        chooseClass: action.chooseClass,
      };
    default:
      return initState;
  }
};
export default videosReducer;
