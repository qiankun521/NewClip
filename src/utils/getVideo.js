export default async function getSingleVideo(videoId) {
  const promise = await fetch(
    `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/feed?video_id=${videoId}`
  );
  const video = await promise.json();
  return video;
}
