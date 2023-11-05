import styles from '../assets/styles/Video.module.css';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import Describe from './Describe';
import Sidebar from './Sidebar';
import CommentArea from './CommentArea';
import getComments from '../utils/getComments';
import { useEffect, useRef, useState } from 'react';
function Video({ video, isPlaying, handlePlaying, ismuted, handleMuted, volume, handleVolume, showComments, handleComments, handleModal, trueIndex, changeVideos }) {
    const [played, setPlayed] = useState(0);//播放进度
    const [haveComments, setHaveComments] = useState(false);//是否获取到评论
    const [comments, setComments] = useState([]);//评论
    //TODO 视频未加载完成时使用封面cover
    const playedSeconds = useRef(0);
    const videoRef = useRef(null);
    function handleProgress(state) {
        setPlayed(state.played);
        playedSeconds.current = state.playedSeconds;
    }
    function handlePlayed(state) {
        setPlayed(state);
    }
    function get() {
        getComments(video.id).then(res => {
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
        })
    }
    useEffect(()=>{
        get();// eslint-disable-next-line
    },[haveComments])
    
    return (
        <div className={styles.outside}>
            <img src={video.cover_url} alt="background" />{/*背景模糊图*/}
            <div className={styles.videoContainer}>
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
                        progressInterval={500}
                        onProgress={handleProgress}
                    ></ReactPlayer>
                    <Describe name={video.author.name} title={video.title}></Describe>
                </div>
                <Sidebar changeVideos={changeVideos} trueIndex={trueIndex} handleModal={handleModal} video={video} showComments={showComments} handleComments={handleComments}></Sidebar>
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
            {showComments && <CommentArea handleModal={handleModal} update={get} video={video} haveComments={haveComments} comments={comments} handleComments={handleComments}></CommentArea>}
        </div>
    )
}

export default Video;