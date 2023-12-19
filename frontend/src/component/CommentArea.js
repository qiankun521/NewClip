/**
 * @file 评论区组件
 * @module CommentArea
 */
import styles from '../assets/styles/CommentArea.module.css';
import SingleComment from './SingleComment';
import { TbSend } from 'react-icons/tb';
import { useState } from 'react';
import postComment from '../utils/postComment';
import { useSelector } from 'react-redux';
import { message } from 'antd';

/**
 * 评论区组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.haveComments - 是否获取到评论
 * @param {Array} props.comments - 评论列表
 * @param {Object} props.video - 视频信息
 * @param {Function} props.handleComments - 关闭评论区的回调函数
 * @param {Function} props.update - 更新评论列表的回调函数
 * @param {Function} props.handleModal - 打开登录/注册模态框的回调函数
 * @returns {JSX.Element} - 评论区组件
 */
function CommentArea({ haveComments, comments, video, handleComments, update, handleModal,trueIndex,changeVideos }) {
    const [commentValue, setCommentValue] = useState(""); // 评论输入框的值
    const logout = useSelector(state => state.loginRegister.logout); // 是否已注销
    const token = useSelector(state => state.loginRegister.token); // 用户 token
    /**
     * 发送评论的回调函数
     */
    function handleSendMessage() {
        if (logout) handleModal(); // 如果已注销，打开登录/注册模态框
        else {
            message.loading({
                content: '发送中...',
                key: 'comment',
                duration: 0
            }); // 显示加载中提示
            postComment(token, video.id, 1, commentValue).then((data) => {
                message.destroy();
                switch (data.status_code) {
                    case 0:
                        setTimeout(update, 10); // 延迟 10ms 更新评论，后端出现了同步问题返回脏数据
                        setCommentValue(""); // 清空评论输入框的值
                        message.success({
                            content: data.status_msg,
                            key: 'comment',
                            duration: 1,
                        })
                        changeVideos(trueIndex,{
                            comment_count:parseInt(video.comment_count+1)
                        });
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
            }).catch((err) => {
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