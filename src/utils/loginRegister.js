import api from "./request";

async function login(username, password) {
    const data = await api.post(`/user/login?username=${username}&password=${password}`)
    return data;
}

async function register(username, password) {
    const data = await api.post(`/user/register?username=${username}&password=${password}`)
    return data;
}
export { login, register };