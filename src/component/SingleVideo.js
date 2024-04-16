import styles from "../assets/styles/SingleVideo.module.scss";
import { AiOutlineHeart } from "react-icons/ai";

function SingleVideo({ video, handleFullScreen }) {
  return (
    <div className={styles.singleVideo} onClick={() => handleFullScreen(video?.id)}>
      <div className={styles.videoContainer}>
        <div
          className={styles.picture}
          style={{
            backgroundImage: `url(${video?.cover_url})`,
          }}>
          <div className={styles.heart}>
            <div>
              <AiOutlineHeart></AiOutlineHeart>
            </div>
            <div>{video?.favorite_count}</div>
          </div>
        </div>
        <div className={styles.describe}>
          <div className={styles.topArea}>
            <div>
              {video?.title?.length > 20 ? video?.title?.slice(0, 15) + "..." : video?.title}
            </div>
          </div>
          <div className={styles.bottomArea}>
            <div className={styles.authorName}>@{video?.author?.name}</div>
            <div className={styles.time}>{video?.publish_time}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleVideo;
