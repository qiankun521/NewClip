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
  trueIndex, //当前视频在视频列表中的真实索引
}) {
  const videoRef = useRef(null);
  const [played, setPlayed] = useState(0); //播放进度
  const playedSeconds = useRef(0);
  const [haveComments, setHaveComments] = useState(false); //是否获取到评论
  const [comments, setComments] = useState([]); //评论
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);
  const videosArr = useSelector((state) => state?.videos?.videosArr);
  //TODO 视频未加载完成时使用封面cover
  function handleProgress(state) {
    //处理视频播放进度的函数
    setPlayed(state.played);
    playedSeconds.current = state.playedSeconds;
  }
  function handlePlayed(state) {
    //处理视频播放进度的函数
    setPlayed(state);
  }
  function get() {
    //获取评论的函数，也用于发布评论后刷新评论区
    getComments(videosArr[trueIndex]).then((res) => {
      switch (res.status_code) {
        case 0:
          setHaveComments(true);
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
    get(); // eslint-disable-next-line
  }, [haveComments, trueIndex]);

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
            volume={volume}
            width="100%"
            height="100%"
            loop={true}
            progressInterval={500}
            onProgress={handleProgress}></ReactPlayer>
          <Describe name={video?.author?.name || "未知"} title={video?.title || "未知"}></Describe>
        </div>
        <Sidebar changeVideos={changeVideos} trueIndex={trueIndex} video={video}></Sidebar>
        <div className={styles.controlContainer}>
          <Controls
            videoRef={videoRef}
            isPlaying={isPlaying}
            played={played}
            playedSeconds={playedSeconds.current}
            ismuted={ismuted}
            volume={volume}
            handlePlaying={handlePlaying}
            handlePlayed={handlePlayed}
            handleMuted={handleMuted}
            handleVolume={handleVolume}></Controls>
        </div>
      </div>
      {isShowComments && (
        <CommentArea
          trueIndex={trueIndex}
          changeVideos={changeVideos}
          update={get}
          video={video}
          comments={comments}></CommentArea>
      )}
    </div>
  );
}

export default Video;
