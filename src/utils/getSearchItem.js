/**
 * 从服务器获取包含指定关键字的视频列表
 * @async
 * @function
 * @param {string} keyword - 搜索关键字
 * @param {string} [token=""] - 用户令牌
 * @returns {Promise<Array>} 包含指定关键字的视频列表
 */
async function getSearchItem(keyword, token="") {
  const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/search/video?keyword=${keyword}&token=${token}`);
  const data = await response.json();
  return data;
}
export default getSearchItem;