import api from "./request";

export default async function getSingleVideo(videoId) {
  const video = await api.get(`/feed?video_id=${videoId}`);
  return video;
}
