import api from "./request";

async function getPersonalInfo(user_id, token = "") {
  const data = await api.get(`/user?user_id=${user_id}`);
  return data;
}
export default getPersonalInfo;