import styles from '../assets/styles/Sidebar.module.css';
import { HeartFilled } from '@ant-design/icons';
import { BiSolidCommentDots } from 'react-icons/bi';
import { BiSolidShare } from 'react-icons/bi';
function Sidebar({ video }) {
    function handleLike(){
        console.log("like");
    }
    function handleComment(){
        console.log("comment");
    }
    function handleShare(){
        console.log("share");
    }
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <div className={styles.avatar} style={{
                    backgroundImage: `url(${video.author.avatar})`,
                    backgroundSize: 'cover',
                }}>
                    <div className={video.is_follow?styles.followed:styles.follow}>{video.is_follow?"√":"+"}</div>
                </div>
                <div className={styles.like}>
                    <div><HeartFilled className={`${video.is_favotite && styles.liked} ${styles.icon}`} onClick={handleLike}/></div>
                    <div className={styles.number}>{video.favorite_count}</div>
                </div>
                <div className={styles.comment}>
                    <div><BiSolidCommentDots className={styles.icon} onClick={handleComment}/></div>
                    <div className={styles.number}>{video.comment_count}</div>
                </div>
                <div className={styles.share}>
                    <div><BiSolidShare className={styles.icon} onClick={handleShare}/></div>
                    <div className={styles.number}>{video.share_count}</div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;