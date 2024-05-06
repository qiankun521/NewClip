import api from "./request";

async function postFollow(id, token = "") {
    const data = await api.post(`/relation/action/?to_user_id=${id}&action_type=1`);
    return data;
}

async function postCancelFollow(id, token = "") {
    const data = await api.post(`/relation/action/?to_user_id=${id}&action_type=2`);
    return data;
}

export { postFollow, postCancelFollow };