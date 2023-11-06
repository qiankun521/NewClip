async function getSearchItem(keyword, token="") {
  const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/search/video?keyword=${keyword}&token=${token}`);
  const data = await response.json();
  return data;
}
export default getSearchItem;