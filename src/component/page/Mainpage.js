/**
 * @file Mainpage.js是一个React组件，用于渲染主页。它包含了三个视频swiper，可以通过滑动或按键来切换视频swiper，通过更改swiper实际加载的视频达到改变视频的效果。同时，它还提供了音量控制、静音、评论区等功能。
 * @module Mainpage
 */
import Video from "../Video";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../../assets/styles/Mainpage.module.scss";
import { useSelector } from "react-redux";
import debounce from "../../utils/debounce";
function Mainpage({ updateVideos }) {
  const realPrevIndex = useRef(0); // 上一次播放视频的swiper的真正index
  const swiperRef = useRef(null); // 用于获取swiper的ref
  const trueIndex = useRef(0); // 用于获取当前swiper的真正index
  const videosArr = useSelector((state) => state?.videos?.videosArr);
  const videosObj = useSelector((state) => state?.videos?.videosObj);
  const [swiper, setSwiper] = useState(videosArr ? [0, 1, 2] : []); //用于设置三个swiper的实际加载的视频
  const [isPlaying, setIsPlaying] = useState([true, false, false]); //用于设置是否播放，仅当前视频自动播放
  const [canSLide, setCanSlide] = useState([false, true]); //用于设置是否可以滑动，适用于第一个和最后一个视频,0:上滑,1:下滑
  useEffect(() => {
    if (!swiperRef.current) return;
    function handleWheel(e) {
      if (e.deltaY > 0) {
        if (trueIndex.current !== videosArr.length - 1) swiperRef.current.slideNext();
      } else if (e.deltaY < 0) {
        if (trueIndex.current !== 0) swiperRef.current.slidePrev();
      }
    }

    function handleKeydown(e) {
      if (e.key === "ArrowDown") {
        if (trueIndex.current !== videosArr.length - 1) swiperRef.current.slideNext();
      } else if (e.key === "ArrowUp") {
        if (trueIndex.current !== 0) swiperRef.current.slidePrev();
      } else if (e.key === " ") {
        handlePlaying();
      }
    }
    const debouncedHandleWheel = debounce(handleWheel, 100);
    const debouncedHandleKeydown = debounce(handleKeydown, 100);

    window.addEventListener("keydown", debouncedHandleKeydown);
    window.addEventListener("wheel", debouncedHandleWheel);
    return () => {
      window.removeEventListener("keydown", debouncedHandleKeydown);
      window.removeEventListener("wheel", debouncedHandleWheel);
    };
  }, [swiperRef.current]); // eslint-disable-line

  // swiper滑动事件处理函数，判断是上滑还是下滑，更新swiper的实际加载的视频
  function handleSlideChange(swiper) {
    if (videosArr.length !== 0 && trueIndex.current >= videosArr.length / 2) {
      updateVideos();
    }
    if (videosArr.length === 0 || swiper.realIndex === realPrevIndex.current) return;
    switch (swiper.realIndex) {
      case 0:
        if (trueIndex.current === 0) {
          setSwiper([trueIndex.current, trueIndex.current + 1, trueIndex.current + 1]);
          break;
        } else if (
          realPrevIndex.current === 2 &&
          trueIndex.current !== 0 &&
          trueIndex.current !== videosArr.length - 1
        ) {
          trueIndex.current = trueIndex.current + 1;
        } else if (realPrevIndex.current === 1 && trueIndex.current !== 0) {
          trueIndex.current = trueIndex.current - 1;
        }
        setIsPlaying([true, false, false]);
        setSwiper([trueIndex.current, trueIndex.current + 1, trueIndex.current - 1]);
        break;
      case 1:
        if (realPrevIndex.current === 0 && trueIndex.current !== videosArr.length - 1) {
          trueIndex.current = trueIndex.current + 1;
        } else if (realPrevIndex.current === 2 && trueIndex.current !== 0) {
          trueIndex.current = trueIndex.current - 1;
        }
        setIsPlaying([false, true, false]);
        setSwiper([trueIndex.current - 1, trueIndex.current, trueIndex.current + 1]);
        break;
      case 2:
        if (realPrevIndex.current === 1 && trueIndex.current !== videosArr.length - 1) {
          trueIndex.current = trueIndex.current + 1;
        } else if (realPrevIndex.current === 0 && trueIndex.current !== 0) {
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
    if (trueIndex.current === videosArr.length - 1) setCanSlide([true, false]);
    realPrevIndex.current = swiper.realIndex;
  }

  //控制视频播放的函数
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

  return (
    <div className={styles.mainpage}>
      <Swiper
        slidesPerView={1}
        direction="vertical"
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{ height: "100%" }}
        allowSlidePrev={canSLide[0]}
        allowSlideNext={canSLide[1]}
        loop>
        {videosArr[swiper[0]] && (
          <SwiperSlide key="0">
            <Video
              video={videosObj[videosArr[swiper[0]]]}
              isPlaying={isPlaying[0]}
              handlePlaying={handlePlaying}></Video>
          </SwiperSlide>
        )}
        {videosArr[swiper[1]] && (
          <SwiperSlide key="1">
            <Video
              video={videosObj[videosArr[swiper[1]]]}
              isPlaying={isPlaying[1]}
              handlePlaying={handlePlaying}></Video>
          </SwiperSlide>
        )}
        {videosArr[swiper[2]] && (
          <SwiperSlide key="2">
            <Video
              video={videosObj[videosArr[swiper[2]]]}
              isPlaying={isPlaying[2]}
              handlePlaying={handlePlaying}></Video>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default Mainpage;
