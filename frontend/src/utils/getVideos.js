export default async function getVideo(latest_time=0,token="",topic="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/feed?latest_time=${latest_time}&token=${token}&topic=${topic}`);
    const videos = await promise.json();
    return videos;
}
