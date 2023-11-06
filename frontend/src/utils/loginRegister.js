async function login(username, password) {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/user/login?username=${username}&password=${password}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await promise.json();
    return data;
}
async function register(username, password) {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/user/register?username=${username}&password=${password}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await promise.json();
    return data;
}
export { login, register };