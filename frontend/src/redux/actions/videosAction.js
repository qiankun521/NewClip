export const changeVideos = (trueIndex, newState, isChild = false, childName = "") => {
  return {
    type: "CHANGE_VIDEOS",
    trueIndex,
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

export const changeMute = () => {
  return {
    type: "CHANGE_MUTE",
  };
};

export const changeChooseClass = (chooseClass) => {
  return {
    type: "CHANGE_CHOOSE_CLASS",
    chooseClass,
  };
};
