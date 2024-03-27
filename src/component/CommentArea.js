/**
 * @file 评论区组件
 * @module CommentArea
 */
import styles from "../assets/styles/CommentArea.module.scss";
import SingleComment from "./SingleComment";
import { TbSend } from "react-icons/tb";
import { useState } from "react";
import postComment from "../utils/postComment";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { hideComments, showComments, showLogin } from "../redux/actions/popoverAction";

function CommentArea({ haveComments, comments, video, update, trueIndex, changeVideos }) {
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState(""); // 评论输入框的值
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);
  const logout = useSelector((state) => state?.loginRegister?.logout); // 是否已注销
  const token = useSelector((state) => state?.loginRegister?.token); // 用户 token

  function handleSendMessage() {
    if (logout) dispatch(showLogin()); // 如果已注销，打开登录/注册模态框
    else {
      message.loading("发送中...", 0); // 显示加载中提示
      postComment(token, video.id, 1, commentValue)
        .then((data) => {
          message.destroy();
          switch (data.status_code) {
            case 0:
              setTimeout(update, 10); // 延迟 10ms 更新评论，后端出现了同步问题返回脏数据
              setCommentValue(""); // 清空评论输入框的值
              message.success(data.status_msg);
              changeVideos(trueIndex, {
                comment_count: parseInt(video.comment_count + 1),
              });
              break;
            case -1:
              message.error(data.status_msg);
              break;
            default:
              message.error("评论失败");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("评论失败,请检查网络");
        });
    }
  }
  function handleComments() {
    !isShowComments ? dispatch(showComments()) : dispatch(hideComments());
  }

  return (
    <div className={styles.commentArea} onWheel={(e) => e.stopPropagation()}>
      <section className={styles.commentTop}>
        <div className={styles.topAreaLeft}>
          <div className={styles.commentTitle}>评论区</div>
          <div className={styles.commentCount}>共{comments?.length || 0}条</div>
        </div>
        <div className={styles.topAreaRight}>
          <div className={styles.close} onClick={handleComments}>
            ╳
          </div>
        </div>
      </section>

      <section className={styles.commentList}>
        {haveComments &&
          comments.map((comment) => {
            return <SingleComment key={comment?.id} comment={comment} />;
          })}
        <div className={styles.empty}>评论到底了~</div>
      </section>

      <section className={styles.sendArea}>
        <input
          className={styles.sendInput}
          type="text"
          placeholder="请输入你想说的话"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <div className={styles.sendIcon} onClick={handleSendMessage}>
          <TbSend></TbSend>
        </div>
      </section>
    </div>
  );
}
export default CommentArea;
