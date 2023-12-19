/**
 * @file 分享弹窗组件
 * @module SharePopover
 */
import styles from '../assets/styles/SharePopover.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import { AiOutlineLink } from 'react-icons/ai';
import { message, Space, QRCode, Popover } from 'antd';
import { sendMessage } from '../utils/getMessage';
/**
 * 分享弹窗组件
 * @param {Object} props - 组件属性
 * @param {Object} props.video - 视频对象，包含当前播放的视频信息
 * @returns {JSX.Element} 分享弹窗组件
 */
function SharePopover({ video }) {
    const logout = useSelector(state => state?.loginRegister?.logout);
    const token = useSelector(state => state?.loginRegister?.token);
    const friend_list = localStorage.getItem('friend_list') ? JSON.parse(localStorage.getItem('friend_list')) : [];
    const [friendIndex, setFriendIndex] = useState(0);
    const inputValue = "我正在看@" + video?.author.name + "的视频《" + video?.title + "》，快来一起看吧！";
    const copyToClipboard = async () => {
        
        try {
            await navigator.clipboard.writeText(window.location.href);
            message.success("网址已复制到剪切板");
        } catch (err) {
            console.log(err);
            message.error('复制失败');
        }
    }
    /**
     * 处理分享操作
     * @function
     * @param {string} token - 用户令牌
     * @param {string} friendId - 好友ID
     * @param {string} inputValue - 分享内容
     * @returns {Promise} - 返回一个Promise对象，resolve时返回一个对象，包含status_code和status_msg两个属性；reject时返回错误信息
     */
    function handleShare() {
        sendMessage(token, friend_list[friendIndex].id, inputValue).then(res => {
            switch (res.status_code) {
                case 0:
                    message.success({
                        content: "分享成功！",
                        key: 'share',
                        duration: 1,
                    })
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
    }
    function Qrcode() {
        return (
            <Space direction="vertical" align="center">
                <QRCode value={window.location.href} color='white'/>
            </Space>
        )
    }
    return (
        <div className={styles.sharePopover} onWheel={(e)=>e.stopPropagation()}>
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
                        <Popover content={<Qrcode></Qrcode>}>
                            <div>
                                <AiOutlineQrcode ></AiOutlineQrcode>
                            </div>
                        </Popover>
                    </div>
                    <div className={styles.copy}>
                        <div>
                            <AiOutlineLink onClick={copyToClipboard}></AiOutlineLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default SharePopover;