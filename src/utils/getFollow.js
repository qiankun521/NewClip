import api from "./request";

async function getFollow(id, token = "") {
    const videos = await api.get(`/relation/follow/list?user_id=${id}`);
    return videos;
}

async function getFollower(id, token = "") {
    const videos = await api.get(`/relation/follower/list?user_id=${id}`);
    return videos;
}

export { getFollow, getFollower };