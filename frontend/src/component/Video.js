import styles from '../assets/styles/Video.module.css';
import ReactPlayer from 'react-player';
import { useState} from 'react';
function Video({url,isPlaying}) {
    return (
        <div className={styles.videoContainer}>
            <ReactPlayer
                className={styles.video}
                url={url}
                playing={isPlaying}
                muted={true}
                width='100%'
                height='100%'
                loop={false}
                controls={false}
            ></ReactPlayer>
        </div>
    )
}

export default Video;