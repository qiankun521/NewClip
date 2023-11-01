import styles from '../assets/styles/Controls.module.css';
import { CaretRightOutlined } from '@ant-design/icons';
import { PauseOutlined } from '@ant-design/icons';
import formatSeconds from '../utils/formatSeconds';
import {BiSolidVolumeFull as SoundOn} from 'react-icons/bi';
import {BiSolidVolumeMute as SoundOff} from 'react-icons/bi';
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