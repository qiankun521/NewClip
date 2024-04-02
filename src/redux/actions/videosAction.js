export const changeVideos = (
  videoId,
  newState,
  isChild = false,
  childName = ""
) => {
  return {
    type: "CHANGE_VIDEOS",
    videoId,
    newState,
    isChild,
    childName,
  };
};

export const updateVideos = (videos) => {
  return {
    type: "UPDATE_VIDEOS",
    videos,
  };
};
export const updateVideosObj = (videos) => { 
  return {
    type: "UPDATE_VIDEOS_OBJ",
    videos,
  };
}
export const resetVideos = (videos) => {
  return {
    type: "RESET_VIDEOS",
    videos,
  };
};

export const changeNextTime = (nextTime) => {
  return {
    type: "CHANGE_NEXT_TIME",
    nextTime,
  };
};

export const changeVolume = (volume) => {
  return {
    type: "CHANGE_VOLUME",
    volume,
  };
};

export const changeMute = (ismuted) => {
  return {
    type: "CHANGE_MUTE",
    ismuted,
  };
};

export const changeChooseClass = (chooseClass) => {
  return {
    type: "CHANGE_CHOOSE_CLASS",
    chooseClass,
  };
};
