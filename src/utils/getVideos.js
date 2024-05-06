import api from "./request";

export default async function getVideo(latest_time = 0, token = "", topic = "") {
  const videos = await api.get(`/feed?latest_time=${latest_time}&topic=${topic}`);
  return videos;
}
