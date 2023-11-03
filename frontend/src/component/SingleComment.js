import styles from '../assets/styles/SingleComment.module.css';
import {AiOutlineMessage} from 'react-icons/ai';
import {AiOutlineLike} from 'react-icons/ai';
import {AiOutlineDislike} from 'react-icons/ai';
import {BiShare} from 'react-icons/bi';
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
                        <AiOutlineMessage></AiOutlineMessage>
                        <div className={styles.littleText}>回复</div>
                    </div>
                    <div className={styles.interactiveItem}>
                        <BiShare></BiShare>
                        <div className={styles.littleText}>分享</div>
                    </div>
                    <div className={styles.interactiveItem}>
                        <AiOutlineLike></AiOutlineLike>
                        <div className={styles.littleText}>{0}</div>
                    </div>
                    <div className={styles.interactiveItem}>
                        <AiOutlineDislike></AiOutlineDislike>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleComment;