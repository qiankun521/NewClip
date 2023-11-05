import { Link } from 'react-router-dom';
import styles from '../assets/styles/Header.module.css';
import { FiUpload } from 'react-icons/fi';
import { Modal, Form, Input, Button, message, Popover } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { BiShare, BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineMessage, AiOutlineMore } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { login, register } from '../utils/loginRegister';
import { useNavigate } from 'react-router-dom';
import getPersonalInfo from '../utils/getPersonalInfo';
import PersonalPopover from './PersonalPopover';
import { loginFailure, loginRequest, loginSuccess, logOut, registerFailure, registerRequest, registerSuccess } from '../redux/actions/loginRegisterAction';
function Header({ visible, handleModal,setChooseClass,chooseClass }) {
    const [choose, setChoose] = useState([true, false]);//登录注册选择
    const [search, setSearch] = useState('');//搜索框内容
    const [info, setInfo] = useState(localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : null);//先从本地缓存获取个人信息
    const logout = useSelector(state => state?.loginRegister?.logout);
    const loginWaiting = useSelector(state => state?.loginRegister?.loginWaiting);
    const registerWaiting = useSelector(state => state?.loginRegister?.registerWaiting);
    const [visiblePopover, setVisiblePopover] = useState(false);
    const id = useSelector(state => state?.loginRegister?.user_id);
    const token = useSelector(state => state?.loginRegister?.token);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        getPersonalInfo(id, token).then(res => {
            switch (res.status_code) {
                case 0:
                    localStorage.setItem("info", JSON.stringify(res.user));
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
    }, [id, token, visiblePopover])//每次modal可见的时候都重新获取个人信息
    function onFinishLogin(values) {
        dispatch(loginRequest());
        message.loading({
            content: '登录中...',
            key: 'loginWaiting',
            duration: 0
        })
        login(values.username, values.password).then((res) => {
            message.destroy();
            switch (res.status_code) {
                case 0:
                    message.success({
                        content: res.status_msg,
                        key: 'loginSuccess',
                        duration: 2
                    })
                    dispatch(loginSuccess(values.username, res.token, res.status_msg, res.user_id));
                    localStorage.setItem("token", res.token);
                    handleModal();
                    break;
                case -1:
                    message.error({
                        content: res.status_msg,
                        key: 'loginFailure',
                        duration: 2
                    })
                    dispatch(loginFailure(res.status_msg));
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            message.destroy();
            message.error("登录失败，请检查网络连接");
            console.log(err);
            dispatch(loginFailure(err));
        })
    }
    function onFinishRegister(values) {
        dispatch(registerRequest());
        message.loading({
            content: '注册中...',
            key: 'registerWaiting',
            duration: 0
        })
        register(values.username, values.password).then((res) => {
            message.destroy();
            switch (res.status_code) {
                case 0:
                    message.success({
                        content: res.status_msg,
                        key: 'registerSuccess',
                        duration: 2
                    })
                    dispatch(registerSuccess(res.status_msg));
                    break;
                case -1:
                    message.error({
                        content: res.status_msg,
                        key: 'registerFailure',
                        duration: 2
                    })
                    dispatch(registerFailure(res.status_msg));
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            message.destroy();
            message.error("注册失败，请检查网络连接");
            console.log(err);
            dispatch(registerFailure(err));
        })
    }
    function onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }
    function handleLogout() {
        dispatch(logOut());
    }
    function handleSearch() {
        if (search !== "") {
            navigate('/search?keyword=' + search);
            setSearch('');
        }
    }
    function handleKeydown(e) {
        if (e.key === "Enter") {
            handleSearch();
        }
    }
    function handleFileChange(e) {//TODO 上传视频

    }
    function handleMessage() {//TODO 私信
    }
    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <div className={styles.brand}>
                        <Link className={styles.link} to="https://github.com/chenxi393/NewClip">NewClip</Link>
                    </div>
                    <nav className={styles.navlinks}>
                        <Link className={`${styles.link} ${chooseClass === 0 && styles.choose}`} to="/" onClick={()=>setChooseClass(0)}>首页</Link>
                        <div className={`${styles.link} ${chooseClass === 1 && styles.choose}`} onClick={()=>setChooseClass(1)}>体育</div>
                        <div className={`${styles.link} ${chooseClass === 2 && styles.choose}`} onClick={()=>setChooseClass(2)}>游戏</div>
                        <div className={`${styles.link} ${chooseClass === 3 && styles.choose}`} onClick={()=>setChooseClass(3)}>音乐</div>
                    </nav>
                    <div className={styles.searchInput}>
                        <input type="text" placeholder="请输入搜索关键词" value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyDown={handleKeydown} />
                        <div className={styles.searchIcon} onClick={handleSearch}>
                            <BiSearchAlt2></BiSearchAlt2>
                        </div>
                    </div>
                    <div className={styles.personalbar}>
                        <div className={styles.upload} onClick={() => {
                            if (logout) {
                                message.error("请先登录");
                                handleModal();
                                return;
                            }
                            fileInputRef.current.click();
                        }}>
                            <div><FiUpload></FiUpload></div>
                            <div className={styles.uploadText}>上传</div>
                        </div>
                        <div className={styles.message}>
                            <div><AiOutlineMessage></AiOutlineMessage></div>
                            <div className={styles.messageText}>私信</div>
                        </div>
                        <div className={styles.more}>
                            <div><AiOutlineMore></AiOutlineMore></div>
                            <div className={styles.moreText}>更多</div>
                        </div>
                    </div>
                    <div className={styles.person}>
                        {logout ?
                            <div className={styles.personal}>
                                <div className={styles.login} onClick={handleModal}>登录</div>
                            </div> :
                            (info &&
                                <Popover classname={styles.popover} content={<PersonalPopover info={info} handleLogout={handleLogout} />}
                                    placement="bottomRight" trigger="hover" onVisibleChange={() => setVisiblePopover(!visiblePopover)}>
                                    <div className={styles.avatar} style={{
                                        backgroundImage: `url(${info.avatar})`,
                                        backgroundSize: 'cover',
                                    }} onClick={() => { navigate('/personal') }}>
                                    </div>
                                </Popover>
                            )
                        }
                    </div>

                </div>
                <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    capture="environment"
                />{/* 隐藏的文件上传input */}
            </div>
            <Modal
                open={visible}
                onCancel={handleModal}
                maskClosable={false}
                footer={null}
                className={styles.modal}
            >
                <div className={styles.modalContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.modalTitle}>登录后畅享更多精彩</div>
                        <div>
                            <div className={styles.modalTitleSmall}>
                                <div className={styles.icon}><BiShare /></div>一键分享视频给好友
                            </div>
                            <div className={styles.modalTitleSmall}>
                                <div className={styles.icon}><AiOutlineHeart /></div>点赞评论随心发
                            </div>
                        </div>

                    </div>
                    <div className={styles.choose}>
                        <div className={`${styles.chooseItem} ${choose[0] && styles.choosed}`} onClick={() => {
                            setChoose([true, false]);
                        }}>登录</div>
                        <div className={`${styles.chooseItem} ${choose[1] && styles.choosed}`} onClick={() => {
                            setChoose([false, true]);
                        }}>注册</div>
                    </div>
                    {choose[0] &&
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
                            }}
                        >
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            >
                                <Input className={styles.input} />
                            </Form.Item>

                            <Form.Item
                                label="用户密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户密码!',
                                    },
                                ]}
                            >
                                <Input.Password className={styles.input} />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Button type='primary' htmlType='submit' disabled={loginWaiting}>登录</Button>
                            </Form.Item>
                        </Form>}
                    {
                        choose[1] &&
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
                            }}
                        >
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                    {
                                        max: 32,
                                        message: '用户名长度不能超过32位'
                                    }
                                ]}
                            >
                                <Input className={styles.input} />
                            </Form.Item>

                            <Form.Item
                                label="用户密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户密码!',
                                    },
                                    {
                                        min: 6,
                                        message: '密码长度不能小于6位'
                                    }
                                ]}
                            >
                                <Input.Password className={styles.input} />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Button htmlType='submit' disabled={registerWaiting}>注册</Button>
                            </Form.Item>
                        </Form>
                    }
                </div>
            </Modal>
        </header>
    )
}

export default Header;