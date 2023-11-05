import styles from '../../assets/styles/Personalpage.module.css';
import { useEffect, useState } from 'react';
import getPersonalInfo from '../../utils/getPersonalInfo';
import getPersonalLike from '../../utils/getPersonalLike';
import getPersonalWork from '../../utils/getPersonalWork';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SingleVideo from '../SingleVideo';
import { message } from 'antd';
import { postFollow, postCancelFollow } from '../../utils/postFollow';
import Video from '../Video';
function Personalpage({ handleModal }) {
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get('user_id');
    const id = useSelector(state => state?.loginRegister?.user_id);
    const trueId = user_id ? user_id : id;
    const token = useSelector(state => state?.loginRegister?.token);
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")) || null);
    const [like, setLike] = useState(null);
    const [work, setWork] = useState(null);
    const [active, setActive] = useState(0);//0为作品，1为喜欢
    const logout = useSelector(state => state?.loginRegister?.logout);
    const [visible, setVisible] = useState(false);//视频是否可见
    const [isPlaying, setIsPlaying] = useState(true);//是否播放
    const [ismuted, setIsmuted] = useState(true);//设置是否静音
    const [volume, setVolume] = useState(0);//设置音量，全局通用
    const [showComments, setShowComments] = useState(false);//是否显示评论区
    const [trueIndex, setTrueIndex] = useState(0);//在个人主页的视频真实下标，因为作品和喜欢互斥，trueindex可以复用
    const navigate = useNavigate();
    useEffect(() => {
        if (logout && user_id === null) {
            navigate('/');
            return;
        }
        getPersonalInfo(trueId, token).then(res => {
            switch (res.status_code) {
                case 0:
                    if (trueId === id) localStorage.setItem("info", JSON.stringify(res.user));
                    setInfo(res.user);
                    break;
                case -1:
                    console.log(res.status_msg);
                    break;
                default:
                    break;
            }
        }).catch(err => {
            console.log(err);
        })
        getPersonalLike(trueId, token).then(res => {
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
        }).catch(err => {
            console.log(err);
        })
        getPersonalWork(trueId, token).then(res => {
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
        }).catch(err => {
            console.log(err);
        })
    }, [trueId, token, id, logout, navigate, user_id, visible])
    function handleFollow() {
        if (logout) handleModal();
        else {
            if (info?.is_follow) postCancelFollow(info?.id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        setInfo({ ...info, is_follow: !info.is_follow })
                        break;
                    case -1:
                        console.log(res.status_msg);
                        message.error({
                            content: res.status_msg,
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                    default:
                        message.error({
                            content: '取消关注失败',
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                }
            }).catch(err => {
                message.error({
                    content: '取消关注失败,请检查网络',
                    key: 'follow',
                    duration: 1,
                });
                console.log(err);
            })
            else postFollow(info?.id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        setInfo({ ...info, is_follow: !info.is_follow })
                        break;
                    case -1:
                        message.error({
                            content: res.status_msg,
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                    default:
                        message.error({
                            content: '关注失败',
                            key: 'follow',
                            duration: 1,
                        });
                        break;
                }
            }).catch(err => {
                message.error({
                    content: '取消关注失败,请检查网络',
                    key: 'follow',
                    duration: 1,
                });
                console.log(err);
            })
        }
    }
    function handleMessage() {
        //TODO 私信
    }
    function handleClick(data, trueIndex) {//复制点开视频的处理
        setTrueIndex(trueIndex);
        console.log(trueIndex);
        setVisible(true);
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
    function changeVideos0(trueIndex, newState, isChild = false, childName = "") {//修改本地个人作品数据work
        if (!isChild) {
            const newVideos = work.map((item, index) => {
                return index === trueIndex ? { ...item, ...newState } : item
            });
            setWork(newVideos);
        } else {
            const newVideos = work.map((item, index) => {
                return index === trueIndex ? { ...item, [childName]: { ...item[childName], ...newState } } : item
            })
            setWork(newVideos);
        }
    }
    function changeVideos1(trueIndex, newState, isChild = false, childName = "") {//修改本地个人喜欢数据like
        if (!isChild) {
            const newVideos = like.map((item, index) => {
                return index === trueIndex ? { ...item, ...newState } : item
            });
            setLike(newVideos);
        } else {
            const newVideos = like.map((item, index) => {
                return index === trueIndex ? { ...item, [childName]: { ...item[childName], ...newState } } : item
            })
            setLike(newVideos);
        }
    }
    function changeVideos(trueIndex, newState, isChild = false, childName = "") {//修改本地数据
        if (active === 0) changeVideos0(trueIndex, newState, isChild, childName);
        else changeVideos1(trueIndex, newState, isChild, childName);
    }
    return (
        <div className={styles.personal}>
            <div className={styles.personalPage}>
                <div className={styles.personalInfo}>
                    <div className={styles.personalLeft}>
                        <div className={styles.avatarContainer}>
                            <div className={styles.avatar} style={{
                                backgroundImage: `url(${info?.avatar})`,
                                backgroundSize: 'cover',
                            }}></div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>
                                {info?.name}
                            </div>
                            <div className={styles.countContainer}>
                                <div className={styles.count}>
                                    <div className={styles.title}>关注</div>
                                    <div>{info?.follow_count}</div>
                                </div>
                                <div className={styles.count}>
                                    <div className={styles.title}>粉丝</div>
                                    <div>{info?.follower_count}</div>
                                </div>
                                <div className={styles.count}>
                                    <div className={styles.title}>获赞</div>
                                    <div>{info?.total_favorited}</div>
                                </div>
                            </div>
                            <div className={styles.sign}>
                                个性签名：{info?.signature}
                            </div>
                        </div>
                    </div>
                    <div className={styles.personalRight}>
                        {trueId == id || user_id === null ?
                            <div className={styles.buttonContainer}>
                                <div className={styles.button}>编辑资料</div>
                            </div>
                            :
                            <div className={styles.buttonContainer}>
                                <div className={`${styles.button} ${!info?.is_follow && styles.notfollow}`} onClick={handleFollow}>
                                    {info?.is_follow ? "取消关注" : "关注"}
                                </div>
                                <div className={styles.button} onClick={handleMessage}>
                                    私信
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.classify}>
                    <div className={`${styles.classifyTitle} ${active === 0 && styles.classifyTitleActive}`} onClick={() => {
                        setActive(0);
                    }}>作品</div>
                    <div className={`${styles.classifyTitle} ${active === 1 && styles.classifyTitleActive}`} onClick={() => {
                        setActive(1);
                    }}>喜欢</div>
                </div>
                <div className={styles.videoContainer}>
                    {active === 0 ?
                        work?.map((item,index) => {
                            return (
                                <SingleVideo key={item.id} data={item} handleClick={handleClick} trueIndex={index}></SingleVideo>
                            )
                        })
                        :
                        like?.map((item,index) => {
                            return (
                                <SingleVideo key={item.id} data={item} handleClick={handleClick} trueIndex={index}></SingleVideo>
                            )
                        })
                    }
                </div>
            </div>
            {(visible && like && work) &&
                <div className={styles.video}>
                    <Video video={active === 0 ? work[trueIndex] : like[trueIndex]} isPlaying={isPlaying} handlePlaying={() => setIsPlaying(!isPlaying)} changeVideos={changeVideos}
                        ismuted={ismuted} handleMuted={handleMuted} volume={volume} handleVolume={handleVolume} trueIndex={trueIndex}
                        showComments={showComments} handleComments={() => setShowComments(!showComments)} handleModal={handleModal}
                    ></Video>
                </div>
            }
            {visible &&
                <div className={styles.closeVideo} onClick={() => {
                    setVisible(false);
                }}>✖
                </div>}
        </div>
    )
}
export default Personalpage;