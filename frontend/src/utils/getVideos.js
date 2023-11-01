export default async function getVideo(latest_time=0,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/douyin/feed?latest_time=${latest_time}&token=${token}`);
    const videos = await promise.json();
    return videos;
}
