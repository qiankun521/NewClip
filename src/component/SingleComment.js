/**
 * @file 单个评论组件
 * @module SingleComment
 */
import styles from '../assets/styles/SingleComment.module.scss';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaRegHeart } from "react-icons/fa";
function SingleComment({ comment }) {
    return (
        <div className={styles.singleContainer}>
            <div className={styles.avatarContainer}>
                <div className={styles.avatar} style={{
                    backgroundImage: `url(${comment.user.avatar})`,
                    backgroundSize: 'cover',
                }}>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.name}>{comment.user.name}</div>
                <div className={styles.text}>{comment.content}</div>
                <div className={styles.time}>{comment.create_date}</div>
                <div className={styles.interactive}>
                    <div className={styles.interactiveItem}>
                        <FaRegHeart></FaRegHeart>
                        <div className={styles.littleText}>赞</div>
                    </div>
                    <div className={styles.interactiveItem}>
                        <AiOutlineMessage></AiOutlineMessage>
                        <div className={styles.littleText}>回复</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleComment;