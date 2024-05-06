import api from "./request";

async function getComments(id,token="") {
    const videos = await api.get(`/comment/list/?video_id=${id}`);
    return videos;
}
export default getComments;