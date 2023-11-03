import styles from '../assets/styles/CommentArea.module.css';
import SingleComment from './SingleComment';
import {TbSend} from 'react-icons/tb';
function CommentArea({ haveComments, comments, video,handleComments }) {
    return (
        <div className={styles.commentArea} onWheel={(e)=>e.stopPropagation()}>
            <div className={styles.commentTop}>
                <div className={styles.topAreaLeft}>
                    <div className={styles.commentTitle}>评论区</div>
                    <div className={styles.commentCount}>共{video.comment_count}条</div>
                </div>
                <div className={styles.topAreaRight}>
                    <div className={styles.close} onClick={handleComments}>╳</div>
                </div>
            </div>
            <div className={styles.commentList}>
                {haveComments && comments.map((comment) => {
                    return (
                        <SingleComment key={comment.id} comment={comment} />
                    )
                })}
                <div className={styles.empty}>评论到底了~</div>
            </div>
            <div className={styles.sendArea}>
                    <input className={styles.sendInput} type="text" placeholder="请输入你想说的话" />
                    <div className={styles.sendIcon}><TbSend></TbSend></div>
            </div>
        </div>
    )
}
export default CommentArea;