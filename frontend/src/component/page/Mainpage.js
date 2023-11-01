import Video from "../Video";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from "react";
import getVideo from "../../utils/getVideos";
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from '../../assets/styles/Mainpage.module.css';
function Mainpage() {
    const videos = JSON.parse(localStorage.getItem('videos'));
    const realPrevIndex = useRef(0);
    const swiperRef = useRef(null);
    const trueIndex = useRef(0);
    const [swiper, setSwiper] = useState([videos[0], videos[1], videos[2]]);
    const [isPlaying, setIsPlaying] = useState([true, false, false]);//是否播放，仅当前视频自动播放
    const [canSLide, setCanSlide] = useState([false, true]);//是否可以滑动,0:上滑,1:下滑
    useEffect(() => {
        function handleKeydown(e) {
            if (e.key === "ArrowDown") {
                if (trueIndex.current !== videos.length - 1) swiperRef.current.slideNext();
            }
            else if (e.key === "ArrowUp") {
                if (trueIndex.current !== 0) swiperRef.current.slidePrev();
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [videos, trueIndex])
    useEffect(()=>{
        if(trueIndex.current>=videos.length/2){
            //TODO 从后端获取新数据
        }
    })
    function handleSlideChange(swiper) {
        if(swiper.realIndex === realPrevIndex.current) return;
        switch (swiper.realIndex) {
            case 0:
                if (realPrevIndex.current === 2 && trueIndex.current !== 0 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current + 1;
                }
                else if (realPrevIndex.current === 1 && trueIndex.current !== 0 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current - 1;
                }
                setIsPlaying([true, false, false]);
                setSwiper([videos[trueIndex.current], videos[trueIndex.current + 1], videos[trueIndex.current - 1]]);
                break;
            case 1:
                if (realPrevIndex.current === 0 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current + 1;
                }
                else if (realPrevIndex.current === 2 && trueIndex.current !== 0) {
                    trueIndex.current = trueIndex.current - 1;
                }
                setIsPlaying([false, true, false]);
                setSwiper([videos[trueIndex.current - 1], videos[trueIndex.current], videos[trueIndex.current + 1]]);
                break;
            case 2:
                if (realPrevIndex.current === 1 && trueIndex.current !== videos.length - 1) {
                    trueIndex.current = trueIndex.current + 1;
                }
                else if (realPrevIndex.current === 0 && trueIndex.current !== 0) {
                    trueIndex.current = trueIndex.current - 1;
                }
                setIsPlaying([false, false, true]);
                setSwiper([videos[trueIndex.current + 1], videos[trueIndex.current - 1], videos[trueIndex.current]]);
                break;
            default:
                break;
        }
        if (trueIndex.current !== 0) setCanSlide([true, true]);
        if (trueIndex.current === videos.length - 1) setCanSlide([true, false]);
        realPrevIndex.current = swiper.realIndex;
    }
    function handlePlaying(){

        switch(swiperRef.current.realIndex){
            case 0:
                setIsPlaying([!isPlaying[0],false,false]);
                break;
            case 1:
                setIsPlaying([false,!isPlaying[1],false]);
                break;
            case 2:
                setIsPlaying([false,false,!isPlaying[2]]);
                break;
            default:
                break;
        }
    }
    return (
        <div className={styles.mainpage}>
            <Swiper
                slidesPerView={1}
                direction="vertical"
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => swiperRef.current = swiper}
                style={{
                    height: "90vh"
                }}
                allowSlidePrev={canSLide[0]}
                allowSlideNext={canSLide[1]}
                loop>
                {swiper[0] && <SwiperSlide key="0">
                    <Video url={swiper[0].url} isPlaying={isPlaying[0]} handlePlaying={handlePlaying}></Video>
                </SwiperSlide>}
                {swiper[1] && <SwiperSlide key="1">
                    <Video url={swiper[1].url} isPlaying={isPlaying[1]} handlePlaying={handlePlaying}></Video>
                </SwiperSlide>}
                {swiper[2] && <SwiperSlide key="2">
                    <Video url={swiper[2].url} isPlaying={isPlaying[2]} handlePlaying={handlePlaying}></Video>
                </SwiperSlide>}
            </Swiper>
        </div>
    )
}

export default Mainpage;