import styles from '../assets/styles/MessagePopover.module.css';
import { useEffect, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import { getFriendList, getMessages, sendMessage } from '../utils/getMessage';
import { BsSendFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import transfromTime from '../utils/transformTime';
function MessagePopover({handleMessage}) {
    const token = useSelector(state => state?.loginRegister?.token);
    const user_id = useSelector(state => state?.loginRegister?.user_id);
    const [messages, setMessages] = useState(localStorage.getItem('messages')?JSON.parse(localStorage.getItem('messages')):{});//消息列表
    const [list, setList] = useState(localStorage.getItem('friend_list')?JSON.parse(localStorage.getItem('friend_list')):[]);//好友列表
    const [friendIndex, setFriendIndex] = useState(0);//当前聊天好友的索引
    const info = localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : undefined;
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }// 开始进入消息列表时，显示最新的消息
    },[])
    useEffect(() => {
        const intervalId = setInterval(() => {
            getFriendList(user_id, token).then(res => {
                switch (res.status_code) {
                    case 0:
                        setList(res.user_list);
                        localStorage.setItem('friend_list', JSON.stringify(res.user_list));
                        break;
                    case -1:
                        console.log(res.status_msg);
                        break;
                    default:
                        break;
                }
            })

        }, 1000);
        return () => clearInterval(intervalId);//轮询刷新好友列表
    }, [])
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (list.length > 0) {
                for (let i = 0; i < list.length; i++) {
                    getMessages(token, list[i].id).then(res => {
                        switch (res.status_code) {
                            case 0:
                                //setMessages({ ...messages, [list[i].id]: res.message_list });
                                setMessages(prevMessages => ({//使用循环的时候直接更新可能会依赖同一个旧状态，会使界面一直重复渲染，使用函数式更新可以避免这个问题
                                    ...prevMessages,
                                    [list[i].id]: res.message_list
                                }));
                                break;
                            case -1:
                                console.log(res.status_msg);
                                break;
                            default:
                                break;
                        }
                    })
                }
            }
            return () => clearInterval(intervalId);//轮询刷新消息列表，依赖于好友列表
        }, 1000);
    },[])
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);    
    function handleSendMessage() {
        sendMessage(token, list[friendIndex].id, inputValue).then(res => {
            switch (res.status_code) {
                case 0:
                    setInputValue("");
                    if (scrollRef.current) {
                        setTimeout(() => {
                            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                        },800);//延迟800ms滚动，否则无法做到滚动到最新消息，因为消息列表还没有更新
                    }//TODO 找到更好的解决办法
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
    return (
        <div className={styles.messageContainer} onWheel={(e) => e.stopPropagation()}>
            <div className={styles.left}>
                {list.map((item, index) => {
                    return (
                        <div key={item.id} className={`${styles.person} ${index === friendIndex && styles.selected}`}
                            onClick={() => setFriendIndex(index)}>
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
                                <div className={styles.lastMessage}>
                                    {item?.message?.length > 7 ? item?.message?.slice(0, 7) + '...' : item?.message}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.right} ref={scrollRef}>
                    <div className={styles.messageArea}>
                        {messages && messages[list[friendIndex]?.id]?.map((item, index) => {
                            return (
                                <div key={index} className={styles.message}>
                                    <div className={styles.time}>
                                        {transfromTime(item?.create_time)}
                                    </div>
                                    {user_id !== item?.from_user_id ?
                                        <div className={styles.single}>
                                            <div className={styles.avatarSmall} style={{
                                                backgroundImage: `url(${list && list[friendIndex]?.avatar})`,
                                                backgroundSize: 'cover',
                                            }}></div>
                                            <div className={styles.content}>
                                                {item?.content}
                                            </div>
                                        </div> :
                                        <div className={styles.singleReverse}>
                                            <div className={styles.content}>
                                                {item?.content}
                                            </div>
                                            <div className={styles.avatarSmall} style={{
                                                backgroundImage: `url(${info?.avatar})`,
                                                backgroundSize: 'cover',
                                            }}></div>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                        <div style={{ width: "100%", height: "50px" }}></div>
                    </div>
                </div>
                <input className={styles.input} placeholder="输入消息和好友聊天" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key==='Enter'){
                        handleSendMessage();
                    }
                }}>
                </input>
                <BsSendFill className={styles.icon} onClick={handleSendMessage}></BsSendFill>
                <AiFillCloseCircle className={styles.close} onClick={()=>handleMessage()}></AiFillCloseCircle>
            </div>
            
        </div>
    );
}
export default MessagePopover;