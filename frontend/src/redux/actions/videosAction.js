export const changeVideos = (
  trueIndex,
  newState,
  isChild = false,
  childName = ""
) => {
  return {
    type: "CHANGE_VIDEOS",
    trueIndex,
    newState,
    isChild,
    childName,
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
