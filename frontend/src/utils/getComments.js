async function getComments(id,token="") {
    const promise = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/douyin/comment/list/?video_id=${id}&token=${token}`);
    const videos = await promise.json();
    return videos;
    // const promise = new Promise((resolve, reject) => {
    //     resolve({
    //         "comment_list": [
    //             {
    //                 "content": "Jtqgfe.",
    //                 "create_date": "11-01",
    //                 "id": 122115432914875,
    //                 "user": {
    //                     "avatar": "",
    //                     "background_image": "",
    //                     "favorite_count": 0,
    //                     "follow_count": 0,
    //                     "follower_count": 0,
    //                     "id": 13,
    //                     "is_follow": false,
    //                     "name": "root",
    //                     "signature": "",
    //                     "total_favorited": 0,
    //                     "work_count": 23
    //                 }
    //             },
    //             {
    //                 "content": "Mlkv.",
    //                 "create_date": "11-01",
    //                 "id": 122113587421115,
    //                 "user": {
    //                     "avatar": "",
    //                     "background_image": "",
    //                     "favorite_count": 0,
    //                     "follow_count": 0,
    //                     "follower_count": 0,
    //                     "id": 13,
    //                     "is_follow": false,
    //                     "name": "root",
    //                     "signature": "",
    //                     "total_favorited": 0,
    //                     "work_count": 23
    //                 }
    //             },
    //             {
    //                 "content": "Grpp.",
    //                 "create_date": "11-01",
    //                 "id": 122111339274171,
    //                 "user": {
    //                     "avatar": "",
    //                     "background_image": "",
    //                     "favorite_count": 0,
    //                     "follow_count": 0,
    //                     "follower_count": 0,
    //                     "id": 13,
    //                     "is_follow": false,
    //                     "name": "root",
    //                     "signature": "",
    //                     "total_favorited": 0,
    //                     "work_count": 23
    //                 }
    //             },
    //             {
    //                 "content": "Tjcy.",
    //                 "create_date": "11-01",
    //                 "id": 122109409894331,
    //                 "user": {
    //                     "avatar": "",
    //                     "background_image": "",
    //                     "favorite_count": 0,
    //                     "follow_count": 0,
    //                     "follower_count": 0,
    //                     "id": 13,
    //                     "is_follow": false,
    //                     "name": "root",
    //                     "signature": "",
    //                     "total_favorited": 0,
    //                     "work_count": 23
    //                 }
    //             },
    //             {
    //                 "content": "Ckgecbswgg.",
    //                 "create_date": "11-01",
    //                 "id": 122107195301819,
    //                 "user": {
    //                     "avatar": "",
    //                     "background_image": "",
    //                     "favorite_count": 0,
    //                     "follow_count": 0,
    //                     "follower_count": 0,
    //                     "id": 13,
    //                     "is_follow": false,
    //                     "name": "root",
    //                     "signature": "",
    //                     "total_favorited": 0,
    //                     "work_count": 23
    //                 }
    //             },
    //             {
    //                 "content": "Jqmphum.",
    //                 "create_date": "11-01",
    //                 "id": 122103688863675,
    //                 "user": {
    //                     "avatar": "",
    //                     "background_image": "",
    //                     "favorite_count": 0,
    //                     "follow_count": 0,
    //                     "follower_count": 0,
    //                     "id": 13,
    //                     "is_follow": false,
    //                     "name": "root",
    //                     "signature": "",
    //                     "total_favorited": 0,
    //                     "work_count": 23
    //                 }
    //             }
    //         ],
    //         "status_code": 0,
    //         "status_msg": "加载评论列表成功"
    //     })
    // });
    // return promise;
}
export default getComments;