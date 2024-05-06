import api from "./request";

export default async function getPersonalWork(user_id,token="") {
    const videos = await api.get(`/publish/list?&user_id=${user_id}`);
    return videos;
}
