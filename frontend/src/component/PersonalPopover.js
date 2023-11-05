import styles from '../assets/styles/PersonalPopover.module.css';
import { BsPersonHeart,BsPersonHearts } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillVideoCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router';
function PersonalPopover({ info,handleLogout }) {
    const navigate = useNavigate();
    function handlePersonal(){
        navigate('/personal');
    }
    return (
        <div className={styles.PersonalPopover}>
            <div className={styles.name}>
               {info.name}
            </div>
            <div className={styles.info} onClick={handlePersonal}>
                <div className={styles.follow}>
                    <div ><BsPersonHeart className={styles.icon} style={{
                        color:"rgb(85, 190, 255)"
                    }}></BsPersonHeart></div>
                    <div>我的粉丝</div>
                    <div>{info.follower_count}</div>
                </div>
                <div className={styles.followed}>
                    <div><BsPersonHearts className={styles.icon} style={{
                        color:"rgb(255, 251, 5)"
                    
                    }}></BsPersonHearts></div>
                    <div>我的关注</div>
                    <div>{info.follow_count}</div>
                </div>
                <div className={styles.like}>
                    <div><AiFillHeart className={styles.icon} style={{
                        color:"rgb(255, 5, 5)"
                    
                    }}></AiFillHeart></div>
                    <div>我的喜欢</div>
                    <div>{info.favorite_count}</div>
                </div>
                <div className={styles.self}>
                    <div><AiFillVideoCamera className={styles.icon} style={{
                        color:"rgb(0, 255, 187)"
                    }}></AiFillVideoCamera></div>
                    <div>我的视频</div>
                    <div>{info.work_count}</div>
                </div>
            </div>
            <div className={styles.option}>
                <div>我的好友</div>
                <div onClick={handleLogout}>退出登录</div>
            </div>
        </div>
    )
}
export default PersonalPopover;