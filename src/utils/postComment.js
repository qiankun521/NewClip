import api from "./request";

async function postComment(token, id, action_type, text) {
    const data = await api.post(`/comment/action/?video_id=${id}&action_type=${action_type}&comment_text=${text}`);
    return data;
}

export default postComment;