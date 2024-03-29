/**
 * @file 消息弹窗组件
 * @module MessagePopover
 */
import styles from "../assets/styles/MessagePopover.module.scss";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getFriendList, getMessages, sendMessage } from "../utils/getMessage";
import { BsSendFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import transfromTime from "../utils/transformTime";
import { useDispatch } from "react-redux";
import { changeMessages, changeFriendList } from "../redux/actions/personalAction";
import { message } from "antd";
function MessagePopover({ handleMessage }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.loginRegister?.token); //获取登录状态
  const user_id = useSelector((state) => state?.loginRegister?.user_id); //获取用户id
  const messages = useSelector((state) => state?.personal?.messages);
  const friendList = useSelector((state) => state?.personal?.friendList);
  const info = useSelector((state) => state?.personal?.info);
  const [friendIndex, setFriendIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);
  const messageEndRef = useRef(null);

  function handleSendMessage() {
    sendMessage(token, friendList[friendIndex].id, inputValue)
      .then((res) => {
        switch (res.status_code) {
          case 0:
            setInputValue("");
            break;
          case -1:
            message.error(res.status_msg);
            break;
          default:
            message.error("未知错误");
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [friendIndex]);

  useEffect(() => {
    if (scrollRef.current && messageEndRef.current) {
      const isNearBottom =
        scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
        scrollRef.current.scrollHeight - 50;
      if (isNearBottom) messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.[friendList?.[friendIndex]?.id]]);

  useEffect(() => {
    if (!token || !user_id) return;
    const intervalId = setInterval(() => {
      getFriendList(user_id, token).then((res) => {
        switch (res.status_code) {
          case 0:
            dispatch(changeFriendList(res.user_list));
            break;
          case -1:
            message.error(res.status_msg);
            break;
          default:
            break;
        }
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [token, user_id]);

  useEffect(() => {
    if (!token || !user_id) return;
    const intervalId = setInterval(() => {
      for (const item of friendList) {
        getMessages(token, item.id).then((res) => {
          switch (res.status_code) {
            case 0:
              dispatch(changeMessages(item.id, res.message_list));
              break;
            case -1:
              message.error(res.status_msg);
              break;
            default:
              break;
          }
        });
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [friendList, token]);

  return (
    <div className={styles.messageContainer} onWheel={(e) => e.stopPropagation()}>
      <div className={styles.left}>
        {friendList.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`${styles.person} ${index === friendIndex && styles.selected}`}
              onClick={() => setFriendIndex(index)}>
              <div>
                <div
                  className={styles.avatar}
                  style={{
                    backgroundImage: `url(${item?.avatar})`,
                    backgroundSize: "cover",
                  }}></div>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{item?.name}</div>
                <div className={styles.lastMessage}>
                  {item?.message?.length > 7 ? item?.message?.slice(0, 7) + "..." : item?.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.right} ref={scrollRef}>
          <div className={styles.messageArea}>
            {messages &&
              messages[friendList[friendIndex]?.id]?.map((item, index) => {
                return (
                  <div key={index} className={styles.message}>
                    <div className={styles.time}>{transfromTime(item?.create_time)}</div>
                    {user_id !== item?.from_user_id ? (
                      <div className={styles.single}>
                        <div
                          className={styles.avatarSmall}
                          style={{
                            backgroundImage: `url(${
                              friendList && friendList[friendIndex]?.avatar
                            })`,
                            backgroundSize: "cover",
                          }}></div>
                        <div className={styles.content}>{item?.content}</div>
                      </div>
                    ) : (
                      <div className={styles.singleReverse}>
                        <div className={styles.content}>{item?.content}</div>
                        <div
                          className={styles.avatarSmall}
                          style={{
                            backgroundImage: `url(${info?.avatar})`,
                            backgroundSize: "cover",
                          }}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            <div ref={messageEndRef} style={{ width: "100%", height: "50px" }}></div>
          </div>
        </div>
        <input
          className={styles.input}
          placeholder="输入消息和好友聊天"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}></input>
        <BsSendFill className={styles.icon} onClick={handleSendMessage}></BsSendFill>
        <AiFillCloseCircle className={styles.close} onClick={handleMessage}></AiFillCloseCircle>
      </div>
    </div>
  );
}
export default MessagePopover;
