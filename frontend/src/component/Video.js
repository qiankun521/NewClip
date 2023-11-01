import styles from '../assets/styles/Video.module.css';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import Describe from './Describe';
import { useRef, useState } from 'react';
function Video({ url, isPlaying, handlePlaying }) {
    const [played, setPlayed] = useState(0);//播放进度
    const [ismuted, setIsmuted] = useState(true);//是否静音
    const [volume, setVolume] = useState(0.5);//设置音量
    const playedSeconds = useRef(0);
    const videoRef = useRef(null);
    function handleProgress(state) {
        setPlayed(state.played);
        playedSeconds.current = state.playedSeconds;
    }
    function handlePlayed(state){
        setPlayed(state);
    }
    function handleMuted(){
        setIsmuted(!ismuted);
    }
    function handleVolume(state){
        setVolume(state);
    }
    return (
        <div className={styles.videoContainer}>
            <div className={styles.playerContainer}>
                <ReactPlayer
                    ref={videoRef}
                    className={styles.video}
                    url={url}
                    playing={isPlaying}
                    muted={ismuted}
                    volume={volume}
                    width='100%'
                    height='100%'
                    loop={true}
                    progressInterval={1000}
                    onProgress={handleProgress}
                ></ReactPlayer>
                <Describe></Describe>
            </div>
            
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
                    handleVolume={handleVolume}>
                </Controls>
            </div>
        </div>
    )
}

export default Video;