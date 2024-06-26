import styles from "../assets/styles/Controls.module.scss";
import { CaretRightOutlined } from "@ant-design/icons";
import { PauseOutlined } from "@ant-design/icons";
import formatSeconds from "../utils/formatSeconds";
import { BiSolidVolumeFull as SoundOn } from "react-icons/bi";
import { BiSolidVolumeMute as SoundOff } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { changeMute, changeSpeed, changeVolume } from "../redux/actions/videosAction";
import { Slider, Popover } from "antd";
import throttle from "../utils/throttle";
import { useState, useEffect } from "react";
function Controls({
  videoRef, //正在播放的视频的引用
  isPlaying, //视频是否正在播放
  handlePlaying, //处理视频播放/暂停的函数
  playedSeconds, //视频已播放的秒数
  ismuted, //视频是否静音
  volume, //视频的音量
  speed, //视频的播放速度
}) {
  const totalSeconds = videoRef.current
    ? formatSeconds(Math.floor(videoRef.current.getDuration()))
    : "00:00";
  const [localPlaySeconds, setLocalPlaySeconds] = useState(
    playedSeconds?.toFixed(2)
  );
  const dispatch = useDispatch();
  const handleVolumeChange = (value) => {
    dispatch(changeVolume(value));
  };
  const handleVideoProgress = (value) => {
    setLocalPlaySeconds(value);
    videoRef.current?.seekTo(value, "seconds");
  };
  const throttleHandleVolumeChange = throttle(handleVolumeChange, 10);
  const throttleHandleVideoProgress = throttle(handleVideoProgress, 10);
  useEffect(() => {
    setLocalPlaySeconds(Number(playedSeconds.toFixed(2)));
  }, [playedSeconds]);
  return (
    <div className={styles.controlContainer}>
      <div className={styles.topContainer}>
        <Slider
          className={styles.progress}
          step={0.01}
          min={0}
          max={Number(videoRef.current?.getDuration()?.toFixed(2)) || 1}
          value={localPlaySeconds || 0}
          onChange={throttleHandleVideoProgress}
          onChangeComplete={handleVideoProgress}
          tooltip={{
            autoAdjustOverflow: true,
            formatter: (value) => formatSeconds(Math.floor(value)),
          }}
        />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.button} onClick={handlePlaying}>
            {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
          </div>
          <div className={styles.playedTime}>
            {formatSeconds(Math.floor(localPlaySeconds))}/{totalSeconds}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Popover
            content={
              <div className={styles.speedPopover}>
                <div className={speed === "2" ? styles.select : undefined} onClick={() => dispatch(changeSpeed("2"))}>2X</div>
                <div className={speed === "1.5" ? styles.select : undefined} onClick={() => dispatch(changeSpeed("1.5"))}>1.5X</div>
                <div className={speed === "1" ? styles.select : undefined} onClick={() => dispatch(changeSpeed("1"))}>1X</div>
                <div className={speed === "0.75" ? styles.select : undefined} onClick={() => dispatch(changeSpeed("0.75"))}>0.75X</div>
                <div className={speed === "0.5" ? styles.select : undefined} onClick={() => dispatch(changeSpeed("0.5"))}>0.5X</div>
              </div>
            }
            color="#33343f"
            arrow={false}>
            <div className={styles.speed}>倍速</div>
          </Popover>
          <Popover
            content={
              <div className={styles.volumePopover}>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={volume ? volume : 0}
                  onChange={throttleHandleVolumeChange}
                  onChangeComplete={handleVolumeChange}
                  placement="left"
                  vertical={true}
                />
              </div>
            }
            color="#33343f"
            arrow={false}>
            <div
              id="muted"
              className={styles.button}
              onClick={() => dispatch(changeMute(!ismuted))}
            >
              {!ismuted ? <SoundOn /> : <SoundOff />}
            </div>
          </Popover>

        </div>
      </div>
    </div>
  );
}
export default Controls;
