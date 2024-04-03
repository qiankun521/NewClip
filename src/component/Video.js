import styles from "../assets/styles/Video.module.scss";
import ReactPlayer from "react-player";
import Controls from "./Controls";
import Describe from "./Describe";
import Sidebar from "./Sidebar";
import CommentArea from "./CommentArea";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeAnalysis } from "../redux/actions/videosAction";

function Video({
  isPlaying, //是否正在播放
  handlePlaying, //处理播放状态的函数
  video, //当前视频
}) {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const ismuted = useSelector((state) => state?.videos?.ismuted);
  const volume = useSelector((state) => state?.videos?.volume);
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);
  const completeTimes = useRef(0);
  const watchedSeconds = useRef(0);
  const totalSeconds = useRef(0);
  const flag = useRef(false);
  //TODO 视频未加载完成时使用封面cover
  function handleProgress(state) {
    setPlayedSeconds(state.playedSeconds);
    watchedSeconds.current = state.playedSeconds;
    if (!flag.current && totalSeconds.current > 0 && state.playedSeconds < 2) {
      flag.current = true;
    }
    if (flag.current && totalSeconds.current > 0 && Math.abs(totalSeconds.current - state.playedSeconds) < 1) {
      completeTimes.current += 1;
      flag.current = false;
    }
  }
  useEffect(() => {
    if (!isPlaying) return;
    flag.current = false;
    completeTimes.current = 0;
    watchedSeconds.current = 0;
    totalSeconds.current = 0;
    const id = setInterval(() => {
      dispatch(
        changeAnalysis(
          video?.id,
          completeTimes.current,
          watchedSeconds.current,
          totalSeconds.current,
          video?.is_favorite
        )
      );
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video, dispatch, isPlaying]);

  return (
    <div className={styles.outside}>
      <img src={video?.cover_url} alt="background" />
      <div className={styles.videoContainer}>
        <div className={styles.playerContainer}>
          <ReactPlayer
            ref={videoRef}
            className={styles.video}
            url={video?.play_url}
            playing={isPlaying}
            muted={ismuted}
            volume={volume / 100}
            width="100%"
            height="100%"
            loop={true}
            progressInterval={500}
            onProgress={handleProgress}
            onDuration={(duration) => (totalSeconds.current = duration)}></ReactPlayer>
          <Describe name={video?.author?.name || "未知"} title={video?.title || "未知"}></Describe>
        </div>
        <Sidebar video={video}></Sidebar>
        <div className={styles.controlContainer}>
          <Controls
            videoRef={videoRef}
            isPlaying={isPlaying}
            handlePlaying={handlePlaying}
            playedSeconds={playedSeconds}
            setPlayedSeconds={setPlayedSeconds}
            ismuted={ismuted}
            volume={volume}></Controls>
        </div>
      </div>
      {isShowComments && <CommentArea video={video}></CommentArea>}
    </div>
  );
}

export default Video;
