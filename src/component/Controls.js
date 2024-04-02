/**
 * @file 视频播放器组件
 * @module Controls
 */
import styles from "../assets/styles/Controls.module.scss";
import { CaretRightOutlined } from "@ant-design/icons";
import { PauseOutlined } from "@ant-design/icons";
import formatSeconds from "../utils/formatSeconds";
import { BiSolidVolumeFull as SoundOn } from "react-icons/bi";
import { BiSolidVolumeMute as SoundOff } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { changeMute, changeVolume } from "../redux/actions/videosAction";
import { Slider } from "antd";
import throttle from "../utils/throttle";
function Controls({
  videoRef, //正在播放的视频的引用
  isPlaying, //视频是否正在播放
  handlePlaying, //处理视频播放/暂停的函数
  playedSeconds, //视频已播放的秒数
  setPlayedSeconds,
  ismuted, //视频是否静音
  volume, //视频的音量
}) {
  const totalSeconds = videoRef.current
    ? formatSeconds(Math.floor(videoRef.current.getDuration()))
    : "00:00";
  const dispatch = useDispatch();
  const handleVolumeChange = (e) => {
    dispatch(changeVolume(e.target.value));
  };
  const handleVideoProgress = (e) => {
    setPlayedSeconds(e.target.value);
  };
  const throttleHandleVolumeChange = throttle(handleVolumeChange, 100);
  const throttleHandleVideoProgress = throttle(handleVideoProgress, 100);
  return (
    <div className={styles.controlContainer}>
      <div className={styles.topContainer}>
        <Slider
          className={styles.progress}
          step={0.01}
          min={0}
          max={Number(videoRef.current?.getDuration()?.toFixed(2)) || 1}
          value={Number(playedSeconds.toFixed(2)) || 0}
          onChange={handleVideoProgress}
          onChangeComplete={(e)=>videoRef.current?.seekTo(e.target.value, "seconds")}
        />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.button} onClick={handlePlaying}>
            {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
          </div>
          <div className={styles.playedTime}>
            {formatSeconds(Math.floor(playedSeconds))}/{totalSeconds}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Slider
            className={styles.volume}
            min={0}
            max={100}
            step={1}
            dots={true}
            value={volume ? volume : 0}
            onChange={throttleHandleVolumeChange}
            onChangeComplete={handleVolumeChange}
          />
          <div id="muted" className={styles.button} onClick={() => dispatch(changeMute(!ismuted))}>
            {!ismuted ? <SoundOn /> : <SoundOff />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Controls;
