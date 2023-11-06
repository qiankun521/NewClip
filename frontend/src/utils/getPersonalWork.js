export default async function getPersonalWork(user_id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/publish/list?&token=${token}&user_id=${user_id}`);
    const videos = await promise.json();
    return videos;
}
