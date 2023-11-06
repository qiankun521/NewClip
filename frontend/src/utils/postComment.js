async function postComment(token,id,action_type,text) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/comment/action/?video_id=${id}&token=${token}&action_type=${action_type}&comment_text=${text}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export default postComment;