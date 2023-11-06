import styles from '../assets/styles/UploadPopover.module.css';
import { Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Input } from 'antd';
import { AiFillCloseCircle } from 'react-icons/ai';
function UploadPopover({ handleUpload }) {
    const { TextArea } = Input;
    const [title, setTitle] = useState("默认标题");//视频标题
    const [topic, setTopic] = useState("其它");//视频分类
    const token = useSelector(state => state?.loginRegister?.token);
    const props = {
        name: 'data', // 发到后端的文件参数名
        data: {
            token: token,
            title: title,
            topic: topic,
        },
        action: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/publish/action/`, // 后端接口 URL
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`文件上传成功`);
                handleUpload();
            } else if (info.file.status === 'error') {
                message.error(`文件上传失败`);
            }
        },
    };
    return (
        <div className={styles.uploadContainer}>

            <div className={styles.title}>
                <TextArea
                    showCount
                    maxLength={30}
                    style={{
                        height: 120,
                        resize: 'none',
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="请输入视频标题，不超过30字"
                />
            </div>
            <div className={styles.classify}>
                <div className={styles.classifyTitle}>
                    <span>选择分类：</span>
                </div>
                <div className={styles.classifyContent}>
                    <input type="radio" name="classify" value="体育" onChange={(e) => setTopic(e.target.value)} />体育
                    <input type="radio" name="classify" value="游戏" onChange={(e) => setTopic(e.target.value)} />游戏
                    <input type="radio" name="classify" value="音乐" onChange={(e) => setTopic(e.target.value)} />音乐
                    <input type="radio" name="classify" value="音乐" onChange={(e) => setTopic(e.target.value)} />其它
                </div>
            </div>
            <div className={styles.uploadButton}>
                <Upload {...props} style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>
                    <Button icon={<UploadOutlined />}>点击直接上传视频</Button>
                </Upload>
            </div>
            <AiFillCloseCircle className={styles.close} onClick={() => handleUpload()}></AiFillCloseCircle>
        </div>
    )
}
export default UploadPopover;