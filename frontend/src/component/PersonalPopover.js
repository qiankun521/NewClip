/**
 * @file 个人弹出框组件
 * @module PersonalPopover
 */
import styles from '../assets/styles/PersonalPopover.module.scss';
import { BsPersonHeart,BsPersonHearts } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillVideoCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router';
/**
 * 个人弹出框组件
 * @param {Object} info - 个人信息对象，包括name、follower_count、follow_count、favorite_count、work_count等属性
 * @param {Function} handleLogout - 退出登录回调函数
 * @returns {JSX.Element} - 返回个人弹出框组件的JSX元素
 */
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