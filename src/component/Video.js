/**
 * @file 视频组件
 * @module Video
 */
import styles from "../assets/styles/Video.module.scss";
import ReactPlayer from "react-player";
import Controls from "./Controls";
import Describe from "./Describe";
import Sidebar from "./Sidebar";
import CommentArea from "./CommentArea";
import getComments from "../utils/getComments";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Video({
  isPlaying, //是否正在播放
  handlePlaying, //处理播放状态的函数
  video, //当前视频
}) {
  const videoRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [comments, setComments] = useState([]); //评论
  const ismuted = useSelector((state) => state?.videos?.ismuted);
  const volume = useSelector((state) => state?.videos?.volume);
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);
  //TODO 视频未加载完成时使用封面cover
  function handleProgress(state) {
    setPlayedSeconds(state.playedSeconds);
  }
  function refreshComments() {
    //获取评论的函数，也用于发布评论后刷新评论区
    getComments(video?.id).then((res) => {
      switch (res.status_code) {
        case 0:
          setComments(res.comment_list);
          break;
        case -1:
          console.log(res.status_msg);
          break;
        default:
          break;
      }
    });
  }

  useEffect(() => {
    refreshComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

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
            onProgress={handleProgress}></ReactPlayer>
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
      {isShowComments && (
        <CommentArea
          refreshComments={refreshComments}
          comments={comments}
          video={video}></CommentArea>
      )}
    </div>
  );
}

export default Video;
