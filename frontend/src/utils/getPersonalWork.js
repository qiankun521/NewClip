export default async function getPersonalWork(token="",user_id="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/douyin/publish/list?&token=${token}&user_id=${user_id}`);
    const videos = await promise.json();
    return videos;
}
