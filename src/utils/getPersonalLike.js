import api from "./request";

export default async function getPersonalLike(user_id,token="") {
    const videos = await api.get(`/favorite/list?&user_id=${user_id}`);
    return videos;
}