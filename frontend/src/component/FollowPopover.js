/**
 * @file 用于展示关注以及粉丝列表的组件
 * @module FollowPopover
 */
import styles from '../assets/styles/FollowPopover.module.css';
import { useNavigate } from 'react-router';
/**
 * FollowPopover组件
 * @param {Object} props - 组件属性
 * @param {Array} props.info - 关注或者粉丝列表信息
 * @returns {JSX.Element} FollowPopover组件的React元素
 */
function FollowPopover({ info }) {
    const navigate = useNavigate();
    return (
        <div className={styles.FollowPopover}>
            {
                info&&info.map((item,index)=>{
                    return (
                        <div key={item.id} className={styles.person} onClick={()=>{
                            navigate(`/personal?user_id=${item.id}`);
                        }}>
                            <div>
                                <div className={styles.avatar} style={{
                                    backgroundImage: `url(${item?.avatar})`,
                                    backgroundSize: 'cover',
                                }}></div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.name}>
                                    {item?.name}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default FollowPopover;