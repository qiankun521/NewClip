async function getPersonalInfo(user_id, token="") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/douyin/user?user_id=${user_id}&token=${token}`);
    const data = await response.json();
    return data;
  }
  export default getPersonalInfo;