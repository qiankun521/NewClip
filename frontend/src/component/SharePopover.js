import styles from '../assets/styles/SharePopover.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import { AiOutlineLink } from 'react-icons/ai';
import { message } from 'antd';
function SharePopover() {
    const logout = useSelector(state => state?.loginRegister?.logout);
    const token = useSelector(state => state?.loginRegister?.token);
    const friend_list = localStorage.getItem('friend_list') ? JSON.parse(localStorage.getItem('friend_list')) : [];
    const [friendIndex, setFriendIndex] = useState(0);
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            message.success("网址已复制到剪切板")
        } catch (err) {
            message.error('复制失败', err);
        }
    }
    function handleShare(){
        
    }
    return (
        <div className={styles.sharePopover}>
            {!logout && friend_list &&
                <div className={styles.top}>
                    {friend_list.map((item, index) => {
                        return (
                            <div key={item.id} className={`${styles.person} ${index === friendIndex && styles.selected}`}
                                onMouseEnter={() => setFriendIndex(index)}>
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
                                    <div className={styles.shareButton}>
                                        <button onClick={handleShare}>分享</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            <div className={styles.bottom}>
                <div className={styles.label}>更多分享方式</div>
                <div className={styles.shareWays}>
                    <div className={styles.qrcode}>
                        <AiOutlineQrcode ></AiOutlineQrcode>
                    </div>
                    <div className={styles.copy}>
                        <AiOutlineLink onClick={copyToClipboard}></AiOutlineLink>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default SharePopover;