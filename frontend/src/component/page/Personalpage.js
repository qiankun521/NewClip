/**
 * @file 个人主页及用户主页组件
 * @module Personalpage
 */
import styles from '../../assets/styles/Personalpage.module.scss';
import { useEffect, useState } from 'react';
import getPersonalInfo from '../../utils/getPersonalInfo';
import getPersonalLike from '../../utils/getPersonalLike';
import getPersonalWork from '../../utils/getPersonalWork';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SingleVideo from '../SingleVideo';
import { Popover, message } from 'antd';
import { postFollow, postCancelFollow } from '../../utils/postFollow';
import Video from '../Video';
import { getFollow, getFollower } from '../../utils/getFollow';
import FollowPopover from '../FollowPopover';

/**
 * 个人主页及用户主页组件
 * @param {Object} handleModal - 处理登录注册模态框的函数
 * @returns {JSX.Element} 个人主页组件
 */
function Personalpage({ handleModal }) {
    /**
     * 获取url中的searchParams
     */
    const [searchParams] = useSearchParams();
    /**
     * 搜索参数用户id
     */
    const user_id = searchParams.get('user_id');
    /**
     * 用户登录id
     */
    const id = useSelector(state => state?.loginRegister?.user_id);
    /**
     * 下面将要使用的id，判断是否为用户自己的主页，如果是用户主页，使用user_id，否则使用id
     */
    const trueId = user_id ? user_id : id;
    /**
     * 用户token
     */
    const token = useSelector(state => state?.loginRegister?.token);
    /**
     * 用户信息
     */
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")) || null);
    /**
     * 用户喜欢的视频列表
     */
    const [like, setLike] = useState(null);
    /**
     * 用户作品列表
     */
    const [work, setWork] = useState(null);
    /**
     * 当前活跃的tab，0为用户主页作品栏，1为用户作品喜欢栏
     */
    const [active, setActive] = useState(0);
    /**
     * 用户是否登出
     */
    const logout = useSelector(state => state?.loginRegister?.logout);
    /**
     * 视频是否可见
     */
    const [visible, setVisible] = useState(false);
    /**
     * 视频是否正在播放
     */
    const [isPlaying, setIsPlaying] = useState(true);
    /**
     * 视频是否静音
     */
    const [ismuted, setIsmuted] = useState(true);
    /**
     * 视频音量
     */
    const [volume, setVolume] = useState(0);
    /**
     * 是否显示评论区
     */
    const [showComments, setShowComments] = useState(false);
    /**
     * 在个人主页的视频真实下标，因为作品和喜欢互斥，trueindex可以复用
     */
    const [trueIndex, setTrueIndex] = useState(0);
    /**
     * 路由导航
     */
    const navigate = useNavigate();
    const [follow, setFollow] = useState([]);
    const [follower, setFollower] = useState([]);

    /**
     * 获取个人信息，作品列表、喜欢列表
     */
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
        getFollow(trueId, token).then(res => {
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
        })
        getFollower(trueId, token).then(res => {
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
        })
    }, [trueId, token, id, logout, navigate, user_id, visible])

    /**
     * 处理关注/取消关注
     */
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

    /**
     * 处理私信
     */
    function handleMessage() {
        //TODO 私信
    }

    /**
     * 对于个人页点击视频的处理，将视频组件设置为可见，设置视频组件的所需要视频资源的真实下标
     * @param {number} trueIndex - 真实下标
     */
    function handleClick(trueIndex) {
        setTrueIndex(trueIndex);
        setVisible(true);
    }

    /**
     * 处理静音
     */
    function handleMuted() {
        if (ismuted) setVolume(0.5);
        else setVolume(0);
        setIsmuted(!ismuted);
    }

    /**
     * 处理音量
     * @param {number} state - 音量值
     */
    function handleVolume(state) {
        setVolume(parseFloat(state));
        if (parseFloat(state) === 0) setIsmuted(true);
        else setIsmuted(false);
    }

    /**
     * 修改本地个人作品数据work
     * @param {number} trueIndex - 真实下标
     * @param {Object} newState - 新状态
     * @param {boolean} isChild - 是否为状态的嵌套子元素
     * @param {string} childName - 嵌套子元素名称
     */
    function changeVideos0(trueIndex, newState, isChild = false, childName = "") {
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
    /**
     * 修改本地个人喜欢数据like
     * @param {number} trueIndex - 真实下标
     * @param {Object} newState - 新状态
     * @param {boolean} isChild - 是否为嵌套子元素
     * @param {string} childName - 嵌套子元素名称
     */
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
    /**
     * 判断修改哪个个人主页数据的函数
     * @param {number} trueIndex - 真实下标
     * @param {Object} newState - 新状态
     * @param {boolean} isChild - 是否为嵌套子元素
     * @param {string} childName - 嵌套子元素名称
     */
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
                                    <Popover content={<FollowPopover info={follow}></FollowPopover>} trigger="hover" placement='bottom'>
                                        <div>{info?.follow_count}</div>
                                    </Popover>
                                </div>
                                <div className={styles.count}>
                                    <div className={styles.title}>粉丝</div>
                                    <Popover content={<FollowPopover info={follower}></FollowPopover>} trigger="hover" placement='bottom'>
                                        <div>{info?.follower_count}</div>
                                    </Popover>
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
                        work?.map((item, index) => {
                            return (
                                <SingleVideo key={item.id} data={item} handleClick={handleClick} trueIndex={index}></SingleVideo>
                            )
                        })
                        :
                        like?.map((item, index) => {
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