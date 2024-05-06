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
import { changeVideos } from "../redux/actions/videosAction";

function Sidebar({ video }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useSelector((state) => state?.loginRegister?.logout);
  const token = useSelector((state) => state?.loginRegister?.token);
  const id = useSelector((state) => state?.loginRegister?.user_id);
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);

  function handleLike(e) {
    if (logout) {
      dispatch(showLogin());
      return;
    }
    video?.is_favorite
      ? postCancelLike(video?.id, token)
        .then(() => {
          dispatch(
            changeVideos(video?.id, {
              favorite_count: video?.is_favorite
                ? parseInt(video.favorite_count - 1)
                : parseInt(video.favorite_count + 1),
              is_favorite: !video.is_favorite,
            })
          )
        })
      : postLike(video?.id, token)
        .then((res) => {
          dispatch(
            changeVideos(video?.id, {
              favorite_count: video?.is_favorite
                ? parseInt(video.favorite_count - 1)
                : parseInt(video.favorite_count + 1),
              is_favorite: !video.is_favorite,
            })
          );
        })
  }

  function handleFollow(e) {
    e.stopPropagation();
    if (logout) {
      dispatch(showLogin());
      return;
    }
    video?.author?.is_follow
      ? postCancelFollow(video.author.id, token)
        .then((res) => {
          dispatch(
            changeVideos(
              video?.id,
              {
                follower_count: video?.author?.is_follow
                  ? parseInt(video?.author?.follower_count - 1)
                  : parseInt(video?.author?.follower_count + 1),
                is_follow: !video?.author?.is_follow,
              },
              true,
              "author"
            )
          );
        })
      : postFollow(video.author.id, token)
        .then(() => {
          dispatch(changeVideos(video?.id,
            {
              follower_count: video?.author?.is_follow
                ? parseInt(video?.author?.follower_count - 1)
                : parseInt(video?.author?.follower_count + 1),
              is_follow: !video?.author?.is_follow,
            }, true, "author"
          ));
        })
  }

  function handleComments() {
    !isShowComments ? dispatch(showComments()) : dispatch(hideComments());
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
          onClick={() => navigate(`/personal/?user_id=${video?.author?.id}`)}>
          {id !== video?.author?.id && (
            <div
              className={video?.author?.is_follow ? styles.followed : styles.follow}
              onClick={handleFollow}>
              {video?.author?.is_follow ? "√" : "+"}
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
