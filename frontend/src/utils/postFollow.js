async function postFollow(id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/action/?to_user_id=${id}&token=${token}&action_type=1`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function postCancelFollow(id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/relation/action/?to_user_id=${id}&token=${token}&action_type=2`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export {postFollow,postCancelFollow};