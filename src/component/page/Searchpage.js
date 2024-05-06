/**
 * @file 搜索页面组件
 * @module Searchpage
 */
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../assets/styles/Searchpage.module.scss";
import getSearchItem from "../../utils/getSearchItem";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import SingleVideo from "../SingleVideo";
import Video from "../Video";
import { updateVideosObj } from "../../redux/actions/videosAction";

function Searchpage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const token = useSelector((state) => state?.loginRegister?.token);
  const [visible, setVisible] = useState(false); //视频是否可见
  const [videos, setVideos] = useState([]);
  const videosObj = useSelector((state) => state?.videos?.videosObj);
  const [isPlaying, setIsPlaying] = useState(true); //是否播放
  const [videoId, setVideoId] = useState(1); //点开的视频的id

  useEffect(() => {
    message.loading("搜索中...", 0);
    getSearchItem(keyword, token)
      .then((res) => {
        setVideos(res.video_list);
        dispatch(updateVideosObj(res.video_list));
        message.destroy();
      })
  }, [dispatch, keyword, token]);

  function handleFullScreen(videoId) {
    setVisible(true);
    setVideoId(videoId);
  }

  return (
    <div className={styles.Searchpage}>
      {videos.length !== 0 ? (
        <div className={styles.search}>
          {videos.map((item) => {
            return (
              <SingleVideo
                key={item.id}
                video={item}
                handleFullScreen={handleFullScreen}></SingleVideo>
            );
          })}
        </div>
      ) : (
        <div
          className={styles.nothing}
          style={{
            backgroundImage: `url(https://cdn.jsdelivr.net/gh/qiankun521/qiankun521@main/no-results.png)`,
          }}></div>
      )}
      {visible && (
        <div className={styles.video}>
          <Video
            video={videosObj[videoId]}
            isPlaying={isPlaying}
            handlePlaying={() => setIsPlaying(!isPlaying)}></Video>
        </div>
      )}
      {visible && (
        <div
          className={styles.closeVideo}
          onClick={() => {
            setVisible(false);
          }}>
          ✖
        </div>
      )}
    </div>
  );
}
export default Searchpage;
