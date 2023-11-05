import Video from "../Video";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from '../../assets/styles/Mainpage.module.css';
function Mainpage({handleModal,videos,changeVideos,updateVideos}) {
    const realPrevIndex = useRef(0);
    const swiperRef = useRef(null);
    const trueIndex = useRef(0);
    const [swiper, setSwiper] = useState(videos ? [0, 1, 2] : []);//设置三个swiper的实际加载的视频
    const [isPlaying, setIsPlaying] = useState([true, false, false]);//是否播放，仅当前视频自动播放
    const [ismuted, setIsmuted] = useState(true);//设置是否静音，状态提升全局通用
    const [canSLide, setCanSlide] = useState([false, true]);//是否可以滑动,0:上滑,1:下滑
    const [volume, setVolume] = useState(0);//设置音量，全局通用
    const [showComments, setShowComments] = useState(false);//是否显示评论区，全局通用
    useEffect(() => {
        function debounce(fn, delay) {//防抖动
            let timer = null;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                    timer = null;
                }, delay);
            }
        }
        function handleWheel(e) {//滚轮下滑视频
            if (e.deltaY > 0) {
                if (trueIndex.current !== videos.length - 1) swiperRef.current.slideNext();
            }
            else if (e.deltaY < 0) {
                if (trueIndex.current !== 0) swiperRef.current.slidePrev();
            }
        }
        const debouncedHandleWheel = debounce(handleWheel, 100);//延迟100毫秒，避免抖动
        function handleKeydown(e) {
            if (e.key === "ArrowDown") {
                if (trueIndex.current !== videos.length - 1) swiperRef.current.slideNext();
            }
            else if (e.key === "ArrowUp") {
                if (trueIndex.current !== 0) swiperRef.current.slidePrev();
            }
            else if (e.key === " ") {
                handlePlaying();
            }
        }
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('wheel', debouncedHandleWheel);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('wheel', debouncedHandleWheel);
        }// eslint-disable-next-line
    }, [videos, trueIndex])
    function handleSlideChange(swiper) {
        if (videos && (trueIndex.current >= videos.length / 2)) {//每次滑动后调用updateVideos检查是否需要更新视频
            updateVideos();
        }
        if (videos === null || swiper.realIndex === realPrevIndex.current) return;//使用realIndex来获取当前swiper的真正index，避免swiper设置loop后activeIndex不对的问题
        switch (swiper.realIndex) {
            case 0:
                if (trueIndex.current === 0) {
                    setSwiper([trueIndex.current, trueIndex.current + 1, trueIndex.current + 1]);
                    break;
                }
                else if (realPrevIndex.current === 2 && trueIndex.current !== 0 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current + 1;
                }
                else if (realPrevIndex.current === 1 && trueIndex.current !== 0) {
                    trueIndex.current = trueIndex.current - 1;
                }
                setIsPlaying([true, false, false]);
                setSwiper([trueIndex.current, trueIndex.current + 1, trueIndex.current - 1]);
                break;
            case 1:
                if (realPrevIndex.current === 0 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current + 1;
                }
                else if (realPrevIndex.current === 2 && trueIndex.current !== 0) {
                    trueIndex.current = trueIndex.current - 1;
                }
                setIsPlaying([false, true, false]);
                setSwiper([trueIndex.current - 1, trueIndex.current,trueIndex.current + 1]);
                break;
            case 2:
                if (realPrevIndex.current === 1 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current + 1;
                }
                else if (realPrevIndex.current === 0 && trueIndex.current !== 0) {
                    trueIndex.current = trueIndex.current - 1;
                }
                setIsPlaying([false, false, true]);
                setSwiper([trueIndex.current + 1, trueIndex.current - 1, trueIndex.current]);
                break;
            default:
                break;
        }
        if (trueIndex.current === 0) setCanSlide([false, true]);
        if (trueIndex.current !== 0) setCanSlide([true, true]);
        if (trueIndex.current === videos.length - 1) setCanSlide([true, false]);
        realPrevIndex.current = swiper.realIndex;
    }
    function handlePlaying() {
        switch (swiperRef.current.realIndex) {
            case 0:
                setIsPlaying([!isPlaying[0], false, false]);
                break;
            case 1:
                setIsPlaying([false, !isPlaying[1], false]);
                break;
            case 2:
                setIsPlaying([false, false, !isPlaying[2]]);  
                break;
            default:
                
                break;
        }
    }
    function handleMuted() {
        if (ismuted) setVolume(0.5);
        else setVolume(0);
        setIsmuted(!ismuted);
    }
    function handleVolume(state) {
        setVolume(parseFloat(state));
        if (parseFloat(state) === 0) setIsmuted(true);
        else setIsmuted(false);
    }
    function handleComments() {
        setShowComments(!showComments);
    }
    return (
        <div className={styles.mainpage}>
            <Swiper
                slidesPerView={1}
                direction="vertical"
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => swiperRef.current = swiper}
                style={{
                    height: "100%"
                }}
                allowSlidePrev={canSLide[0]}
                allowSlideNext={canSLide[1]}
                loop>
                {videos[swiper[0]] && <SwiperSlide key="0">
                    <Video video={videos[swiper[0]]} changeVideos={changeVideos} trueIndex={trueIndex.current} handleModal={handleModal} isPlaying={isPlaying[0]} handlePlaying={handlePlaying} ismuted={ismuted} handleMuted={handleMuted} volume={volume} handleVolume={handleVolume} showComments={showComments} handleComments={handleComments}></Video>
                </SwiperSlide>}
                {videos[swiper[1]] && <SwiperSlide key="1">
                    <Video video={videos[swiper[1]]} changeVideos={changeVideos} trueIndex={trueIndex.current} handleModal={handleModal} isPlaying={isPlaying[1]} handlePlaying={handlePlaying} ismuted={ismuted} handleMuted={handleMuted} volume={volume} handleVolume={handleVolume} showComments={showComments} handleComments={handleComments}></Video>
                </SwiperSlide>}
                {videos[swiper[2]] && <SwiperSlide key="2">
                    <Video video={videos[swiper[2]]} changeVideos={changeVideos} trueIndex={trueIndex.current} handleModal={handleModal} isPlaying={isPlaying[2]} handlePlaying={handlePlaying} ismuted={ismuted} handleMuted={handleMuted} volume={volume} handleVolume={handleVolume} showComments={showComments} handleComments={handleComments}></Video>
                </SwiperSlide>}
            </Swiper>
        </div>
    )
}

export default Mainpage;