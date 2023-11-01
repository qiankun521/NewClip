import styles from '../assets/styles/Video.module.css';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import Describe from './Describe';
import Sidebar from './Sidebar';
import { useRef, useState } from 'react';
function Video({ video, isPlaying, handlePlaying ,ismuted,handleMuted,volume,handleVolume}) {
    const [played, setPlayed] = useState(0);//播放进度
    const playedSeconds = useRef(0);
    const videoRef = useRef(null);
    function handleProgress(state) {
        setPlayed(state.played);
        playedSeconds.current = state.playedSeconds;
    }
    function handlePlayed(state){
        setPlayed(state);
    }
    return (
        <div className={styles.videoContainer}>
            <img src={video.cover_url} alt="background" />{/*背景模糊图*/}
            <div className={styles.playerContainer}>
                <ReactPlayer
                    ref={videoRef}
                    className={styles.video}
                    url={video.play_url}
                    playing={isPlaying}
                    muted={ismuted}
                    volume={volume}
                    width='100%'
                    height='100%'
                    loop={true}
                    progressInterval={1000}
                    onProgress={handleProgress}
                ></ReactPlayer>
                <Describe name={video.author.name} title={video.title}></Describe>
            </div>
            <Sidebar video={video}></Sidebar>
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