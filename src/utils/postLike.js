import api from "./request";

async function postLike(video_id, token = "") {
    const data = await api.post(`/favorite/action/?video_id=${video_id}&action_type=1`);
    return data;
}

async function postCancelLike(video_id, token = "") {
    const data = await api.post(`/favorite/action/?video_id=${video_id}&action_type=2`);
    return data;
}
export { postLike, postCancelLike };