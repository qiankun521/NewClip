const initState = {
  videosArr: [],
  videosObj: {},
  nextTime: { 1: 0, 2: 0, 3: 0, 4: 0 },
  volume: 0.5,
  ismuted: true,
  chooseClass: 1,
};
const videosReducer = (state = initState, action) => {
  let newVideosOBJ;
  let newVideosArr;
  switch (action.type) {
    case "CHANGE_VIDEOS":
      newVideosOBJ = { ...state.videosObj };
      if (!action.isChild) {
        newVideosOBJ[action.videoId] = {
          ...newVideosOBJ[action.videoId],
          ...action.newState,
        };
      } else {
        newVideosOBJ[action.videoId] = {
          ...newVideosOBJ[action.videoId],
          [action.childName]: {
            ...newVideosOBJ[action.videoId][action.childName],
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
    case "UPDATE_VIDEOS_OBJ":
      newVideosOBJ = { ...state.videosObj };
      for (const video of action.videos) {
        newVideosOBJ[video.id] = video;
      }
      return { ...state, videosObj: newVideosOBJ };
    case "RESET_VIDEOS":
      newVideosArr = [];
      newVideosOBJ = { ...state.videosObj };
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
      const isZero = action.volume === 0;
      return {
        ...state,
        volume: action.volume,
        ismuted: isZero,
      };

    case "CHANGE_MUTE":
      return {
        ...state,
        ismuted: action.ismuted,
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
