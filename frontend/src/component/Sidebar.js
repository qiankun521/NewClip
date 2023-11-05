import styles from '../assets/styles/Sidebar.module.css';
import { HeartFilled } from '@ant-design/icons';
import { BiSolidCommentDots } from 'react-icons/bi';
import { BiSolidShare } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { postLike, postCancelLike } from '../utils/postLike';
import { postFollow, postCancelFollow } from '../utils/postFollow';
import { message } from 'antd';
function Sidebar({ video, handleComments, handleModal, trueIndex, changeVideos }) {
    const logout = useSelector(state => state?.loginRegister?.logout);
    const token = useSelector(state => state?.loginRegister?.token);
    const id=useSelector(state=>state?.loginRegister?.user_id);
    function handleLike() {
        if (logout) handleModal();
        else {
            if (video.is_favorite) postCancelLike(video.id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        // changeVideos(trueIndex, 'favorite_count', parseInt(video.favorite_count - 1))
                        // changeVideos(trueIndex, "is_favorite", !video.is_favorite);
                        // react中设置状态为异步，连续设置状态时，会出现问题
                        changeVideos(trueIndex, {
                            favorite_count: parseInt(video.favorite_count - 1),
                            is_favorite: !video.is_favorite
                        })
                        break;
                    case -1:
                        message.error({
                            content: res.status_msg,
                            key: 'like',
                            duration: 1,
                        });
                        break;
                    default:
                        message.error({
                            content: '取消点赞失败',
                            key: 'like',
                            duration: 1,
                        });
                        break;
                }
            }).catch(err => {
                message.error({
                    content: '取消点赞失败,请检查网络',
                    key: 'like',
                    duration: 1,
                });
                console.log(err);
            })
            else postLike(video.id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        // changeVideos(trueIndex, 'favorite_count', parseInt(video.favorite_count + 1))
                        // changeVideos(trueIndex, "is_favorite", !video.is_favorite);
                        changeVideos(trueIndex, {
                            favorite_count: parseInt(video.favorite_count + 1),
                            is_favorite: !video.is_favorite
                        })
                        break;
                    case -1:
                        console.log(res.status_msg);
                        message.error({
                            content: res.status_msg,
                            key: 'like',
                            duration: 1,
                        });
                        break;
                    default:
                        message.error({
                            content: '点赞失败',
                            key: 'like',
                            duration: 1,
                        });
                        break;
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    function handleFollow() {
        if (logout) handleModal();
        else {
            if (video.author.is_follow) postCancelFollow(video.author.id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        changeVideos(trueIndex, {
                            follower_count: parseInt(video.author.follower_count - 1),
                            is_follow: !video.author.is_follow
                        }, true, "author")
                        break;
                    case -1:
                        console.log(res.status_msg);
                        message.error({
                            content: res.status_msg,
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                    default:
                        message.error({
                            content: '取消关注失败',
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                }
            }).catch(err => {
                message.error({
                    content: '取消关注失败,请检查网络',
                    key: 'follow',
                    duration: 1,
                });
                console.log(err);
            })
            else postFollow(video.author.id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        changeVideos(trueIndex, {
                            follower_count: parseInt(video.author.follower_count + 1),
                            is_follow: !video.author.is_follow
                        }, true, "author")
                        break;
                    case -1:
                        message.error({
                            content: res.status_msg,
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                    default:
                        message.error({
                            content: '关注失败',
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                }
            }).catch(err => {
                message.error({
                    content: '取消关注失败,请检查网络',
                    key: 'follow',
                    duration: 1,
                });
                console.log(err);
            })
        }
    }
    function handleShare() {
        console.log("share");//TODO 分享
    }
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <div className={styles.avatar} style={{
                    backgroundImage: `url(${video.author.avatar})`,
                    backgroundSize: 'cover',
                }}>
                    {id!==video.author.id&&
                        <div className={video.author.is_follow ? styles.followed : styles.follow} onClick={handleFollow}>{video.author.is_follow ? "✔" : "+"}</div>
                    }
                </div>
                <div className={styles.like}>
                    <div><HeartFilled className={`${video.is_favorite && styles.liked} ${styles.icon}`} onClick={handleLike} /></div>
                    <div className={styles.number}>{video.favorite_count}</div>
                </div>
                <div className={styles.comment}>
                    <div><BiSolidCommentDots className={styles.icon} onClick={handleComments} /></div>
                    <div className={styles.number}>{video.comment_count}</div>
                </div>
                <div className={styles.share}>
                    <div><BiSolidShare className={styles.icon} onClick={handleShare} /></div>
                    <div className={styles.number}>{video.share_count}</div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;