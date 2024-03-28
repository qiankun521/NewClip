/**
 * 从服务器获取视频列表
 * @async
 * @function
 * @param {number} [latest_time=0] - 最新视频的时间戳
 * @param {string} [token=""] - 用户的身份认证token
 * @param {string} [topic=""] - 视频的主题
 * @returns {Promise<Array>} 包含视频信息的数组
 * @throws {Error} 如果请求失败，将抛出错误
 */
export default async function getVideo(latest_time = 0, token = "", topic = "") {
  const promise = await fetch(
    `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/feed?latest_time=${latest_time}&token=${token}&topic=${topic}`
  );
  const videos = await promise.json();
  return videos;
}
