async function postLike(video_id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/favorite/action/?video_id=${video_id}&token=${token}&action_type=1`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function postCancelLike(video_id, token = "") {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/favorite/action/?video_id=${video_id}&token=${token}&action_type=2`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}
export {postLike,postCancelLike};