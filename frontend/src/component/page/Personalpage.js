import styles from '../../assets/styles/Personalpage.module.css';
import { useEffect, useState } from 'react';
import getPersonalInfo from '../../utils/getPersonalInfo';
import getPersonalLike from '../../utils/getPersonalLike';
import getPersonalWork from '../../utils/getPersonalWork';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Personalpage() {
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get('user_id');
    const id = useSelector(state => state?.loginRegister?.user_id);
    const trueId = user_id || id;
    const token = useSelector(state => state?.loginRegister?.token);
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")) || null);
    const [active, setActive] = useState(0);//0为作品，1为喜欢
    const logout=useSelector(state=>state?.loginRegister?.logout);
    const navigate=useNavigate();
    useEffect(() => {
        if(logout)navigate('/');
        getPersonalInfo(trueId, token).then(res => {
            switch (res.status_code) {
                case 0:
                    if(trueId===id)localStorage.setItem("info", JSON.stringify(res.user));
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

    }, [trueId, token,id,logout,navigate])
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

                </div>
            </div>
        </div>
    )
}
export default Personalpage;