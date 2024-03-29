import styles from "../assets/styles/SharePopover.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineQrcode } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { message, Space, QRCode, Popover } from "antd";
import { sendMessage } from "../utils/getMessage";

function SharePopover({ video }) {
  const logout = useSelector((state) => state?.loginRegister?.logout);
  const token = useSelector((state) => state?.loginRegister?.token);
  const friendList = useSelector((state) => state?.personal?.friendList);
  const [friendIndex, setFriendIndex] = useState(0);
  const inputValue =
    "我正在看@" + video?.author.name + "的视频《" + video?.title + "》，快来一起看吧！";
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("网址已复制到剪切板");
    } catch (err) {
      message.error("复制失败");
    }
  };
  function handleShare() {
    sendMessage(token, friendList[friendIndex].id, inputValue)
      .then((res) => {
        switch (res.status_code) {
          case 0:
            message.success("分享成功！", 1);
            break;
          case -1:
            console.log(res.status_msg);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function Qrcode() {
    return (
      <Space direction="vertical" align="center">
        <QRCode value={window.location.href} color="white" />
      </Space>
    );
  }
  return (
    <div className={styles.sharePopover} onWheel={(e) => e.stopPropagation()}>
      {!logout && friendList && (
        <div className={styles.top}>
          {friendList.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`${styles.person} ${index === friendIndex && styles.selected}`}
                onMouseEnter={() => setFriendIndex(index)}>
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
                  <div className={styles.shareButton}>
                    <button onClick={handleShare}>分享</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.label}>更多分享方式</div>
        <div className={styles.shareWays}>
          <div className={styles.qrcode}>
            <Popover content={<Qrcode></Qrcode>}>
              <div>
                <AiOutlineQrcode></AiOutlineQrcode>
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
  );
}
export default SharePopover;
