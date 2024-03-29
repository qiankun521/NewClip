/**
 * @file 个人主页及用户主页组件
 * @module Personalpage
 */
import styles from "../../assets/styles/Personalpage.module.scss";
import { useEffect, useState } from "react";
import getPersonalInfo from "../../utils/getPersonalInfo";
import getPersonalLike from "../../utils/getPersonalLike";
import getPersonalWork from "../../utils/getPersonalWork";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import SingleVideo from "../SingleVideo";
import { Popover, message } from "antd";
import { postFollow, postCancelFollow } from "../../utils/postFollow";
import Video from "../Video";
import { getFollow, getFollower } from "../../utils/getFollow";
import FollowPopover from "../FollowPopover";
import { showLogin, showMessages } from "../../redux/actions/popoverAction";
import { changeChattingFriendId, changeInfo } from "../../redux/actions/personalAction";
function Personalpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams(); //获取searchParams
  const user_id = searchParams.get("user_id"); //获取url中的user_id
  const id = useSelector((state) => state?.loginRegister?.user_id); //用户登录id
  const trueId = user_id ? user_id : id; //用户id
  const token = useSelector((state) => state?.loginRegister?.token); //用户token
  const logout = useSelector((state) => state?.loginRegister?.logout); //用户是否登出
  const selfInfo = useSelector((state) => state?.loginRegister?.info); //用户信息
  const videosObj = useSelector((state) => state?.videos?.videosObj);
  const friendList = useSelector((state) => state?.personal?.friendList);
  const [videoId, setVideoId] = useState(1);
  const [info, setInfo] = useState(trueId === id ? selfInfo : null); //用户信息
  const [like, setLike] = useState(null); //用户喜欢的视频列表
  const [work, setWork] = useState(null); //用户作品列表
  const [active, setActive] = useState(0); //当前活跃的tab，0为用户主页作品栏，1为用户作品喜欢栏
  const [visible, setVisible] = useState(false); //视频是否可见
  const [isPlaying, setIsPlaying] = useState(true); //视频是否正在播放
  const [follow, setFollow] = useState([]);
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    if (logout && !trueId) {
      navigate("/");
      return;
    }
    getPersonalInfo(trueId, token)
      .then((res) => {
        switch (res.status_code) {
          case 0:
            if (trueId === id) dispatch(changeInfo(res.user));
            setInfo(res.user);
            break;
          case -1:
            console.log(res.status_msg);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getPersonalLike(trueId, token)
      .then((res) => {
        switch (res.status_code) {
          case 0:
            setLike(res.video_list);
            break;
          case -1:
            console.log(res.status_msg);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getPersonalWork(trueId, token)
      .then((res) => {
        switch (res.status_code) {
          case 0:
            setWork(res.video_list);
            break;
          case -1:
            console.log(res.status_msg);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getFollow(trueId, token).then((res) => {
      switch (res.status_code) {
        case 0:
          setFollow(res.user_list);
          break;
        case -1:
          console.log(res.status_msg);
          break;
        default:
          break;
      }
    });
    getFollower(trueId, token).then((res) => {
      switch (res.status_code) {
        case 0:
          setFollower(res.user_list);
          break;
        case -1:
          console.log(res.status_msg);
          break;
        default:
          break;
      }
    });
  }, [trueId, token, id, logout, navigate, user_id, visible, dispatch]);

  function handleFollow() {
    if (logout) {
      message.error("请先登录", 1);
      dispatch(showLogin());
      return;
    }
    info?.is_follow
      ? postCancelFollow(info?.id, token)
      : postFollow(info?.id, token)
          .then((res) => {
            switch (res.status_code) {
              case 0:
                setInfo({ ...info, is_follow: !info.is_follow });
                break;
              case -1:
                message.error(res.status_msg, 1);
                break;
              default:
                message.error("操作失败", 1);
                break;
            }
          })
          .catch((err) => {
            message.error("操作失败,请检查网络", 1);
            console.log(err);
          });
  }

  function handleMessage() {
    if (logout) {
      message.error("请先登录", 1);
      dispatch(showLogin());
      return;
    } else if (!friendList(trueId)) {
      message.error("对方不是您的好友，请互相关注后使用私信功能", 1);
      return;
    }
    dispatch(changeChattingFriendId(trueId));
    dispatch(showMessages());
  }

  function handleFullScreen(videoId) {
    setVideoId(videoId);
    setVisible(true);
  }

  return (
    <div className={styles.personal}>
      <div className={styles.personalPage}>
        <div className={styles.personalInfo}>
          <div className={styles.personalLeft}>
            <div className={styles.avatarContainer}>
              <div
                className={styles.avatar}
                style={{
                  backgroundImage: `url(${info?.avatar})`,
                  backgroundSize: "cover",
                }}></div>
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{info?.name}</div>
              <div className={styles.countContainer}>
                <div className={styles.count}>
                  <div className={styles.title}>关注</div>
                  <Popover
                    content={<FollowPopover info={follow}></FollowPopover>}
                    trigger="hover"
                    placement="bottom">
                    <div>{info?.follow_count}</div>
                  </Popover>
                </div>
                <div className={styles.count}>
                  <div className={styles.title}>粉丝</div>
                  <Popover
                    content={<FollowPopover info={follower}></FollowPopover>}
                    trigger="hover"
                    placement="bottom">
                    <div>{info?.follower_count}</div>
                  </Popover>
                </div>
                <div className={styles.count}>
                  <div className={styles.title}>获赞</div>
                  <div>{info?.total_favorited}</div>
                </div>
              </div>
              <div className={styles.sign}>个性签名：{info?.signature}</div>
            </div>
          </div>
          <div className={styles.personalRight}>
            {trueId === id || user_id === null ? (
              <div className={styles.buttonContainer}>
                <div className={styles.button}>编辑资料</div>
              </div>
            ) : (
              <div className={styles.buttonContainer}>
                <div
                  className={`${styles.button} ${!info?.is_follow && styles.notfollow}`}
                  onClick={handleFollow}>
                  {info?.is_follow ? "取消关注" : "关注"}
                </div>
                <div className={styles.button} onClick={handleMessage}>
                  私信
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.classify}>
          <div
            className={`${styles.classifyTitle} ${active === 0 && styles.classifyTitleActive}`}
            onClick={() => setActive(0)}>
            作品
          </div>
          <div
            className={`${styles.classifyTitle} ${active === 1 && styles.classifyTitleActive}`}
            onClick={() => setActive(1)}>
            喜欢
          </div>
        </div>
        <div className={styles.videoContainer}>
          {active === 0
            ? work?.map((item) => {
                return (
                  <SingleVideo
                    key={item.id}
                    video={item}
                    handleFullScreen={handleFullScreen}></SingleVideo>
                );
              })
            : like?.map((item) => {
                return (
                  <SingleVideo
                    key={item.id}
                    video={item}
                    handleFullScreen={handleFullScreen}></SingleVideo>
                );
              })}
        </div>
      </div>
      {visible && (
        <div className={styles.video}>
          <Video
            video={videosObj[videoId]}
            isPlaying={isPlaying}
            handlePlaying={() => setIsPlaying(!isPlaying)}></Video>
        </div>
      )}
      {visible && (
        <div className={styles.closeVideo} onClick={() => setVisible(false)}>
          ✖
        </div>
      )}
    </div>
  );
}
export default Personalpage;
