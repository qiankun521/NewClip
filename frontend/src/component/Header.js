/**
 * @file Header组件，包含导航栏，搜索框，上传，私信，登录按钮或个人信息头像
 * @module Header
 */
import { Link } from "react-router-dom";
import styles from "../assets/styles/Header.module.scss";
import { FiUpload } from "react-icons/fi";
import { Modal, Form, Input, Button, message, Popover } from "antd";
import { useEffect, useState } from "react";
import { BiShare, BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineMessage, AiOutlineMore } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { login, register } from "../utils/loginRegister";
import { useNavigate } from "react-router-dom";
import getPersonalInfo from "../utils/getPersonalInfo";
import PersonalPopover from "./PersonalPopover";
import MessagePopover from "./MessagePopover";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "../redux/actions/loginRegisterAction";
import { getFriendList, getMessages } from "../utils/getMessage";
import UploadPopover from "./UploadPopover";
import {
  hideLogin,
  hidePersonal,
  showLogin,
  showMessages,
  showPersonal,
  showUpload,
} from "../redux/actions/popoverAction";
import { changeInfo, changeMessages } from "../redux/actions/personalAction";
import { changeChooseClass } from "../redux/actions/videosAction";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(""); //搜索框的值
  const [choose, setChoose] = useState([true, false]); //登录注册选择
  const id = useSelector((state) => state?.loginRegister?.user_id);
  const token = useSelector((state) => state?.loginRegister?.token);
  const info = useSelector((state) => state?.personal?.info);
  const friendList = useSelector((state) => state?.personal?.friendList);
  const logout = useSelector((state) => state?.loginRegister?.logout);
  const loginWaiting = useSelector((state) => state?.loginRegister?.loginWaiting);
  const registerWaiting = useSelector((state) => state?.loginRegister?.registerWaiting);
  const isShowLogin = useSelector((state) => state?.popover?.isShowLogin);
  const isShowMessage = useSelector((state) => state?.popover?.isShowMessage);
  const isShowUpload = useSelector((state) => state?.popover?.isShowUpload);
  const isShowPersonal = useSelector((state) => state?.popover?.isShowPersonal);
  const chooseClass = useSelector((state) => state?.videos?.chooseClass);
  useEffect(() => {
    getPersonalInfo(id, token)
      .then((res) => {
        switch (res.status_code) {
          case 0:
            dispatch(changeInfo(res.user));
            break;
          case -1:
            message.error(res.status_msg);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    for (const item of friendList) {
      getMessages(token, item.id).then((res) => {
        switch (res.status_code) {
          case 0:
            dispatch(changeMessages(item.id, res.message_list));
            break;
          case -1:
            console.log(res.status_msg);
            break;
          default:
            break;
        }
      });
    }
  }, [id, token, isShowPersonal, isShowMessage, friendList]);

  function onFinishLogin(values) {
    dispatch(loginRequest());
    message.loading("登录中...", 0);
    login(values.username, values.password)
      .then((res) => {
        message.destroy();
        switch (res.status_code) {
          case 0:
            message.success(res.status_msg);
            dispatch(loginSuccess(values.username, res.token, res.status_msg, res.user_id));
            getFriendList(res.user_id, res.token).then((res) => {
              switch (res.status_code) {
                case 0:
                  localStorage.setItem("friend_list", JSON.stringify(res.user_list));
                  break;
                case -1:
                  console.log(res.status_msg);
                  break;
                default:
                  break;
              }
            });
            dispatch(hideLogin());
            break;
          case -1:
            message.error(res.status_msg, 2);
            dispatch(loginFailure(res?.status_msg));
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        message.destroy();
        message.error("登录失败，请检查网络连接");
        dispatch(loginFailure(err));
      });
  }

  function onFinishRegister(values) {
    dispatch(registerRequest());
    message.loading("注册中...", 0);
    register(values.username, values.password)
      .then((res) => {
        message.destroy();
        switch (res.status_code) {
          case 0:
            message.success(res.status_msg);
            dispatch(registerSuccess(res.status_msg));
            break;
          case -1:
            message.error(res.status_msg);
            dispatch(registerFailure(res.status_msg));
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        message.destroy();
        message.error("注册失败，请检查网络连接");
        dispatch(registerFailure(err));
      });
  }
  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  function handleSearch() {
    if (search !== "") {
      if (search.length < 2) {
        message.warning("请至少输入两个字！");
        return;
      }
      navigate("/search?keyword=" + search);
      setSearch("");
    }
  }
  function handleKeydown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  function handleFileChange() {
    if (logout) {
      message.error("请先登录");
      dispatch(showLogin());
    } else dispatch(showUpload()); //控制开启关闭上传popover
  }
  function handleMessage() {
    if (logout) {
      message.error("请先登录");
      dispatch(showLogin());
    } else dispatch(showMessages()); //控制开启关闭私信popover
  }
  function handlePersonal() {
    isShowPersonal ? dispatch(hidePersonal()) : dispatch(showPersonal()); //控制开启关闭个人信息popover
  }
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.brand}>
            <Link className={styles.link} to="https://github.com/qiankun521/NewClip">
              NewClip
            </Link>
          </div>
          <nav className={styles.navlinks}>
            <Link
              className={`${styles.link} ${chooseClass === 1 && styles.choose}`}
              to="/"
              onClick={() => dispatch(changeChooseClass(1))}>
              首页
            </Link>
            <Link
              className={`${styles.link} ${chooseClass === 2 && styles.choose}`}
              to="/"
              onClick={() => dispatch(changeChooseClass(2))}>
              体育
            </Link>
            <Link
              className={`${styles.link} ${chooseClass === 3 && styles.choose}`}
              to="/"
              onClick={() => dispatch(changeChooseClass(3))}>
              游戏
            </Link>
            <Link
              className={`${styles.link} ${chooseClass === 4 && styles.choose}`}
              to="/"
              onClick={() => dispatch(changeChooseClass(4))}>
              音乐
            </Link>
          </nav>
          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="请输入搜索关键词"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={handleKeydown}
            />
            <div className={styles.searchIcon} onClick={handleSearch}>
              <BiSearchAlt2></BiSearchAlt2>
            </div>
          </div>
          <div className={styles.personalbar}>
            <Popover
              open={isShowUpload}
              onClick={() => handleFileChange()}
              content={<UploadPopover></UploadPopover>}>
              <div className={styles.upload}>
                <div>
                  <FiUpload></FiUpload>
                </div>
                <div className={styles.uploadText}>上传</div>
              </div>
            </Popover>
            <Popover
              content={<MessagePopover handleMessage={handleMessage}></MessagePopover>}
              open={isShowMessage}
              onClick={() => handleMessage()}>
              <div className={styles.message}>
                <div>
                  <AiOutlineMessage></AiOutlineMessage>
                </div>
                <div className={styles.messageText}>私信</div>
              </div>
            </Popover>
            <div className={styles.more}>
              <div>
                <AiOutlineMore></AiOutlineMore>
              </div>
              <div className={styles.moreText}>更多</div>
            </div>
          </div>
          <div className={styles.person}>
            {logout ? (
              <div className={styles.personal}>
                <div className={styles.login} onClick={() => dispatch(showLogin())}>
                  登录
                </div>
              </div>
            ) : (
              info && (
                <Popover
                  content={<PersonalPopover info={info} />}
                  placement="bottomRight"
                  trigger="click"
                  open={isShowPersonal}
                  onOpenChange={handlePersonal}>
                  <div
                    className={styles.avatar}
                    style={{
                      backgroundImage: `url(${info.avatar})`,
                      backgroundSize: "cover",
                    }}
                    onClick={() => navigate("/personal")}></div>
                </Popover>
              )
            )}
          </div>
        </div>
      </div>
      <Modal
        open={isShowLogin}
        onCancel={() => dispatch(hideLogin())}
        footer={null}
        className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.modalTitle}>登录后畅享更多精彩</div>
            <div>
              <div className={styles.modalTitleSmall}>
                <div className={styles.icon}>
                  <BiShare />
                </div>
                一键分享视频给好友
              </div>
              <div className={styles.modalTitleSmall}>
                <div className={styles.icon}>
                  <AiOutlineHeart />
                </div>
                点赞评论随心发
              </div>
            </div>
          </div>
          <div className={styles.choose}>
            <div
              className={`${styles.chooseItem} ${choose[0] && styles.choosed}`}
              onClick={() => {
                setChoose([true, false]);
              }}>
              登录
            </div>
            <div
              className={`${styles.chooseItem} ${choose[1] && styles.choosed}`}
              onClick={() => {
                setChoose([false, true]);
              }}>
              注册
            </div>
          </div>
          {choose[0] && (
            <Form
              name="complex-form"
              onFinish={onFinishLogin}
              onFinishFailed={onFinishFailed}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}>
              <Form.Item
                label={<span style={{ color: "#C9C9CA" }}>用户名</span>}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}>
                <Input className={styles.input} />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#C9C9CA" }}>用户密码</span>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入用户密码!",
                  },
                ]}>
                <Input.Password className={styles.input} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
                style={{
                  width: "100%",
                }}>
                <Button type="primary" htmlType="submit" disabled={loginWaiting}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          )}
          {choose[1] && (
            <Form
              name="complex-form"
              onFinish={onFinishRegister}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}>
              <Form.Item
                label={<span style={{ color: "#C9C9CA" }}>用户名</span>}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                  {
                    max: 32,
                    message: "用户名长度不能超过32位",
                  },
                ]}>
                <Input className={styles.input} />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#C9C9CA" }}>用户密码</span>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入用户密码!",
                  },
                  {
                    min: 6,
                    message: "密码长度不能小于6位",
                  },
                ]}>
                <Input.Password className={styles.input} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
                style={{
                  width: "100%",
                }}>
                <Button htmlType="submit" disabled={registerWaiting}>
                  注册
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Modal>
    </header>
  );
}

export default Header;
