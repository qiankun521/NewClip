import styles from '../assets/styles/Sidebar.module.css';
import { HeartFilled } from '@ant-design/icons';
import { BiSolidCommentDots } from 'react-icons/bi';
import { BiSolidShare } from 'react-icons/bi';
import { useSelector } from 'react-redux';
function Sidebar({ video, handleComments, handleModal, trueIndex }) {
    function handleLike() {
        if (logout) handleModal();
        else {
            const tmp = video;
            tmp.is_favorite = !tmp.is_favorite;
            const videos=JSON.parse(localStorage.getItem('videos'));
            videos[trueIndex.current]=tmp;
            localStorage.setItem('videos',JSON.stringify(videos));//FIXME 点赞后滑动视频，点赞状态消失
        }
    }
    function handleShare() {
        console.log("share");
    }
    const logout = useSelector(state => state?.loginRegister?.logout);
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <div className={styles.avatar} style={{
                    backgroundImage: `url(${video.author.avatar})`,
                    backgroundSize: 'cover',
                }}>
                    <div className={video.is_follow ? styles.followed : styles.follow}>{video.is_follow ? "√" : "+"}</div>
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