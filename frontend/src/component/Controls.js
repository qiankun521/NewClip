/**
 * @file 视频播放器组件
 * @module Controls
 */
import styles from '../assets/styles/Controls.module.less';
import { CaretRightOutlined } from '@ant-design/icons';
import { PauseOutlined } from '@ant-design/icons';
import formatSeconds from '../utils/formatSeconds';
import {BiSolidVolumeFull as SoundOn} from 'react-icons/bi';
import {BiSolidVolumeMute as SoundOff} from 'react-icons/bi';
/**
 * 控制视频播放的组件
 * @param {Object} props - 组件的属性
 * @param {Object} props.videoRef - 正在播放的视频的引用
 * @param {boolean} props.isPlaying - 视频是否正在播放
 * @param {Function} props.handlePlaying - 处理视频播放/暂停的函数
 * @param {number} props.played - 视频已播放的进度
 * @param {Function} props.handlePlayed - 处理视频播放进度的函数
 * @param {number} props.playedSeconds - 视频已播放的秒数
 * @param {boolean} props.ismuted - 视频是否静音
 * @param {Function} props.handleMuted - 处理视频静音/取消静音的函数
 * @param {number} props.volume - 视频的音量
 * @param {Function} props.handleVolume - 处理视频音量的函数
 * @returns {JSX.Element} 控制视频播放的组件
 */
function Controls({ videoRef, isPlaying, handlePlaying, played,handlePlayed,playedSeconds,ismuted,handleMuted,volume,handleVolume}) {
    const totalSeconds = videoRef.current ? formatSeconds(Math.floor(videoRef.current.getDuration())) : "00:00";
    return (
        <div className={styles.controlContainer}>
            <div className={styles.topContainer}>
                <input className={styles.progress} type="range" step="any" min={0} max={1} value={played?played:0} onChange={
                    e=>{
                        handlePlayed(e.target.value);
                        videoRef.current.seekTo(e.target.value);
                    }}/>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.button} onClick={handlePlaying}>{isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}</div>
                    <div className={styles.playedTime}>{formatSeconds(Math.floor(playedSeconds))}/{totalSeconds}</div>
                </div>
                <div className={styles.rightContainer}>
                    <div>
                        <input className={styles.volume} type="range" step="any" min={0} max={1} value={volume?volume:0} onChange={
                            e=>{
                                handleVolume(e.target.value);
                            }
                        }/>
                    </div>
                    <div id="muted" className={styles.button} onClick={handleMuted}>{!ismuted?<SoundOn/>:<SoundOff/>}</div>
                </div>
            </div>


        </div>
    )
}
export default Controls;