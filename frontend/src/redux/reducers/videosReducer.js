const initState = { videos: [], next_time: {}, volume: 0.5, ismuted: true };
const videosReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_VIDEOS":
      if (!action.isChild) {
        const newVideos = state?.videos?.map((item, index) => {
          return index === action?.trueIndex ? { ...item, ...newVideos } : item;
        });
        return { ...state, videos: newVideos };
      } else {
        const newVideos = state.videos.map((item, index) => {
          return index === action.trueIndex
            ? {
              ...item,
              [action.childName]: { ...item[action.childName], ...newVideos },
            }
            : item;
        });
        return { ...state, videos: newVideos };
      }
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
    default:
      return initState;
  }
};
export default videosReducer;
