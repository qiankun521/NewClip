/**
 * @file 侧边栏组件
 * @module Sidebar
 */
import styles from "../assets/styles/Sidebar.module.scss";
import { HeartFilled } from "@ant-design/icons";
import { BiSolidCommentDots } from "react-icons/bi";
import { BiSolidShare } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { postLike, postCancelLike } from "../utils/postLike";
import { postFollow, postCancelFollow } from "../utils/postFollow";
import { Popover, message } from "antd";
import { useNavigate } from "react-router";
import SharePopover from "./SharePopover";
import { hideComments, showComments, showLogin } from "../redux/actions/popoverAction";
/**
 * 侧边栏组件
 * @param {Object} props - 组件属性
 * @param {Object} props.video - 当前播放的视频信息
 * @param {number} props.trueIndex - 视频在列表中的真实索引
 * @param {Function} props.changeVideos - 改变本地视频信息的函数
 * @returns {JSX.Element} 侧边栏组件
 */
function Sidebar({ video, trueIndex, changeVideos }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useSelector((state) => state?.loginRegister?.logout);
  const token = useSelector((state) => state?.loginRegister?.token);
  const id = useSelector((state) => state?.loginRegister?.user_id);
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);
  /**
   * 处理点赞事件
   * @function
   * @memberof module:Sidebar
   * @returns {void}
   */
  function handleLike() {
    e.stopPropagation();
    if (logout) dispatch(showLogin());
    else {
      if (video?.is_favorite)
        postCancelLike(video?.id, token)
          .then((res) => {
            switch (res.status_code) {
              case 0:
                // changeVideos(trueIndex, 'favorite_count', parseInt(video.favorite_count - 1))
                // changeVideos(trueIndex, "is_favorite", !video.is_favorite);
                // react中设置状态为异步，连续设置状态时，会出现问题
                changeVideos(trueIndex, {
                  favorite_count: parseInt(video.favorite_count - 1),
                  is_favorite: !video.is_favorite,
                });
                break;
              case -1:
                message.error(res.status_msg, 1);
                break;
              default:
                message.error("取消点赞失败", 1);
                break;
            }
          })
          .catch((err) => {
            message.error("取消点赞失败,请检查网络", 1);
            console.log(err);
          });
      else
        postLike(video?.id, token)
          .then((res) => {
            switch (res.status_code) {
              case 0:
                changeVideos(trueIndex, {
                  favorite_count: parseInt(video.favorite_count + 1),
                  is_favorite: !video.is_favorite,
                });
                break;
              case -1:
                console.log(res.status_msg);
                message.error({
                  content: res.status_msg,
                  key: "like",
                  duration: 1,
                });
                break;
              default:
                message.error({
                  content: "点赞失败",
                  key: "like",
                  duration: 1,
                });
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  function handleFollow(e) {
    e.stopPropagation();
    if (logout) dispatch(showLogin());
    else {
      if (video.author.is_follow)
        postCancelFollow(video.author.id, token)
          .then((res) => {
            switch (res.status_code) {
              case 0:
                changeVideos(
                  trueIndex,
                  {
                    follower_count: parseInt(video.author.follower_count - 1),
                    is_follow: !video.author.is_follow,
                  },
                  true,
                  "author"
                );
                break;
              case -1:
                console.log(res.status_msg);
                message.error(res.status_msg, 1);
                break;
              default:
                message.error("取消关注失败", 1);
                break;
            }
          })
          .catch((err) => {
            message.error("取消关注失败,请检查网络", 1);
            console.log(err);
          });
      else
        postFollow(video.author.id, token)
          .then((res) => {
            switch (res.status_code) {
              case 0:
                changeVideos(
                  trueIndex,
                  {
                    follower_count: parseInt(video.author.follower_count + 1),
                    is_follow: !video.author.is_follow,
                  },
                  true,
                  "author"
                );
                break;
              case -1:
                message.error(res.status_msg, 1);
                break;
              default:
                message.error("关注失败", 1);
                break;
            }
          })
          .catch((err) => {
            message.error("取消关注失败,请检查网络", 1);
            console.log(err);
          });
    }
  }

  function handleUserpage() {
    navigate(`/personal/?user_id=${video?.author?.id}`);
  }

  function handleComments() {
    if (!isShowComments) dispatch(showComments());
    else dispatch(hideComments());
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <div
          className={styles.avatar}
          style={{
            backgroundImage: `url(${video?.author?.avatar})`,
            backgroundSize: "cover",
          }}
          onClick={handleUserpage}>
          {id !== video?.author?.id && (
            <div
              className={video?.author?.is_follow ? styles.followed : styles.follow}
              onClick={(e) => handleFollow(e)}>
              {video?.author?.is_follow ? "✔" : "+"}
            </div>
          )}
        </div>
        <div className={styles.like}>
          <div>
            <HeartFilled
              className={`${video?.is_favorite && styles.liked} ${styles.icon}`}
              onClick={handleLike}
            />
          </div>
          <div className={styles.number}>{video?.favorite_count}</div>
        </div>
        <div className={styles.comment}>
          <div>
            <BiSolidCommentDots className={styles.icon} onClick={handleComments} />
          </div>
          <div className={styles.number}>{video?.comment_count}</div>
        </div>
        <Popover
          content={<SharePopover video={video}></SharePopover>}
          trigger="hover"
          placement="right">
          <div className={styles.share}>
            <div>
              <BiSolidShare className={styles.icon} />
            </div>
            <div className={styles.number}>{video?.share_count}</div>
          </div>
        </Popover>
      </div>
    </div>
  );
}
export default Sidebar;
