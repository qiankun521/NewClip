import Video from "../Video";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from '../../assets/styles/Mainpage.module.css';
function Mainpage({ videos }) {
    const haveVideo = videos.length === 0 ? false : true;
    const realPrevIndex = useRef(0);
    const swiperRef = useRef(null);
    const trueIndex = useRef(0);
    const [swiper, setSwiper] = useState([videos[0], videos[1], videos[2]]);
    const [isPlaying, setIsPlaying] = useState([true, false, false]);//自动播放，仅当前视频自动播放
    useEffect(() => {
        if (haveVideo) {
            setSwiper([videos[0], videos[1] || null, videos[2] || null]);
        }// eslint-disable-next-line
    }, [haveVideo]);
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
    function handleSlideChange(swiper) {
        console.log("--------------------")

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
        console.log("trueIndex", trueIndex.current);
        console.log("swiper.realIndex", swiper.realIndex);
        console.log("swiper.realPrevIndex.current", realPrevIndex.current);
        realPrevIndex.current = swiper.realIndex;
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
                loop>
                {haveVideo ?
                    <>
                        {swiper[0] && <SwiperSlide key="0">
                            <Video url={swiper[0].url} isPlaying={isPlaying[0]}></Video>
                        </SwiperSlide>}
                        {swiper[1] && <SwiperSlide key="1">
                            <Video url={swiper[1].url} isPlaying={isPlaying[1]}></Video>
                        </SwiperSlide>}
                        {swiper[2] && <SwiperSlide key="2">
                            <Video url={swiper[2].url} isPlaying={isPlaying[2]}></Video>
                        </SwiperSlide>}
                    </> : null
                }
            </Swiper>
        </div>
    )
}

export default Mainpage;