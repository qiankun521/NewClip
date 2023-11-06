import styles from '../assets/styles/CommentArea.module.css';
import SingleComment from './SingleComment';
import { TbSend } from 'react-icons/tb';
import { useState } from 'react';
import postComment from '../utils/postComment';
import { useSelector } from 'react-redux';
import { message } from 'antd';
function CommentArea({ haveComments, comments, video, handleComments, update,handleModal }) {
    const [commentValue, setCommentValue] = useState("");
    const logout = useSelector(state => state.loginRegister.logout);
    const token = useSelector(state => state.loginRegister.token);
    function handleSendMessage() {
        if(logout)handleModal();
        else{
            postComment(token,video.id,1,commentValue).then((data)=>{
                switch(data.status_code){
                    case 0:
                        setTimeout(update,10);//延迟10ms更新评论，后端出现了同步问题返回脏数据
                        setCommentValue("");
                        message.success({
                            content:data.status_msg,
                            key:'comment',
                            duration:1,
                        })
                        break;
                    case -1:
                        message.error({
                            content: data.status_msg,
                            key: 'comment',
                            duration: 1,
                        })
                        break;
                    default:
                        message.error({
                            content: '评论失败',
                            key: 'comment',
                            duration: 1,
                        
                        })
                        break;
                }
            }).catch((err)=>{
                console.log(err);
                message.error({
                    content: '评论失败,请检查网络',
                    key: 'comment',
                    duration: 1,
                })
            })
        }
    }
    return (
        <div className={styles.commentArea} onWheel={(e) => e.stopPropagation()}>
            <div className={styles.commentTop}>
                <div className={styles.topAreaLeft}>
                    <div className={styles.commentTitle}>评论区</div>
                    <div className={styles.commentCount}>共{comments?.length}条</div>
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
                <input className={styles.sendInput} type="text" placeholder="请输入你想说的话" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                <div className={styles.sendIcon} onClick={() => {
                    handleSendMessage();
                }}><TbSend></TbSend></div>
            </div>
        </div>
    )
}
export default CommentArea;