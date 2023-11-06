async function getComments(id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/comment/list/?video_id=${id}&token=${token}`);
    const videos = await promise.json();
    return videos;
}
export default getComments;