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

/**
 * 视频组件
 * @param {Object} props - 组件属性
 * @param {Object} props.video - 视频对象
 * @param {boolean} props.isPlaying - 是否正在播放
 * @param {Function} props.handlePlaying - 处理播放状态的函数
 * @param {boolean} props.ismuted - 是否静音
 * @param {Function} props.handleMuted - 处理静音状态的函数
 * @param {number} props.volume - 音量大小
 * @param {Function} props.handleVolume - 处理音量大小的函数
 * @param {number} props.trueIndex - 当前视频在视频列表中的真实索引
 * @param {Function} props.changeVideos - 处理本地视频列表数据的函数
 * @returns {JSX.Element} 视频组件
 */
function Video({
  video,
  isPlaying,
  handlePlaying,
  ismuted,
  handleMuted,
  volume,
  handleVolume,
  trueIndex,
  changeVideos,
}) {
  const [played, setPlayed] = useState(0); //播放进度
  const [haveComments, setHaveComments] = useState(false); //是否获取到评论
  const [comments, setComments] = useState([]); //评论
  const isShowComments = useSelector((state) => state?.popover?.isShowComments);
  //TODO 视频未加载完成时使用封面cover
  const playedSeconds = useRef(0);
  const videoRef = useRef(null);

  /**
   * 处理视频播放进度的函数
   * @param {Object} state - 播放状态对象
   * @param {number} state.played - 播放进度
   * @param {number} state.playedSeconds - 播放秒数
   */
  function handleProgress(state) {
    setPlayed(state.played);
    playedSeconds.current = state.playedSeconds;
  }

  /**
   * 处理视频播放进度的函数
   * @param {number} state - 播放进度
   */
  function handlePlayed(state) {
    setPlayed(state);
  }

  /**
   * 获取评论的函数，也用于发布评论后刷新评论区
   */
  function get() {
    getComments(video?.id).then((res) => {
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
  }, [haveComments, video]);

  return (
    <div className={styles.outside}>
      <img src={video?.cover_url} alt="background" />
      {/*背景模糊图*/}
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
            onProgress={handleProgress}
          ></ReactPlayer>
          <Describe name={video?.author?.name} title={video?.title}></Describe>
        </div>
        <Sidebar
          changeVideos={changeVideos}
          trueIndex={trueIndex}
          video={video}
        ></Sidebar>
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
            handleVolume={handleVolume}
          ></Controls>
        </div>
      </div>
      {isShowComments && (
        <CommentArea
          trueIndex={trueIndex}
          changeVideos={changeVideos}
          update={get}
          video={video}
          comments={comments}
        ></CommentArea>
      )}
    </div>
  );
}

export default Video;
