import api from "./request";

async function getSearchItem(keyword, token="") {
  const data = await api.get(`/search/video?keyword=${keyword}`);
  return data;
}
export default getSearchItem;