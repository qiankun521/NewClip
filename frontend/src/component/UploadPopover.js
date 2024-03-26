/**
 * @file 上传弹出框组件
 * @module UploadPopover
 */
import styles from '../assets/styles/UploadPopover.module.scss';
import { Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Input } from 'antd';
import { AiFillCloseCircle } from 'react-icons/ai';
/**
 * 上传弹出框组件
 * @param {Object} props - 组件属性
 * @param {Function} props.handleUpload - 上传成功后的回调函数(关闭上传窗口)
 * @returns {JSX.Element} - 返回上传弹出框组件的 JSX 元素
 */
function UploadPopover({ handleUpload }) {
    /**
    * 输入视频标题的输入框组件实例
    * @type {React.Element}
    */
    const { TextArea } = Input;

    /**
     * 视频标题
     * @type {Array}
     */
    const [title, setTitle] = useState("默认标题");

    /**
     * 视频分类
     * @type {Array}
     */
    const [topic, setTopic] = useState("其它");

    /**
     * 上传的文件列表
     * @type {Array}
     */
    const [fileList, setFileList] = useState([]);

    /**
     * 用户 token
     * @type {string}
     */
    const token = useSelector(state => state?.loginRegister?.token);

    /**
     * 上传组件的属性
     * @type {Object}
     * @property {string} name - 发到后端的文件参数名
     * @property {Function} beforeUpload - 上传前的校验函数
     * @property {Object} data - 发送到后端的额外数据
     * @property {string} action - 后端的文件上传接口 URL
     * @property {Object} headers - 请求头
     * @property {Function} onChange - 上传状态改变时的回调函数
     * @property {Object[]} fileList - 上传的文件列表
     */
    const props = {
        name: 'data',
        beforeUpload: file => {
            console.log(file.type);
            const isMp4 = file.type === 'audio/mp4' || 'video/mp4';
            if (!isMp4) {
                message.error('您只能上传MP4格式的文件!');
            }
            else {
                setFileList([file])
            }
            return isMp4;
        },
        data: {
            token: token,
            title: title,
            topic: topic,
        },
        action: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/publish/action/`,
        onChange(info) {
            message.loading({
                content: '上传中...',
                key: 'upload',
                duration: 0,
            })
            if (info.file.status === 'done') {
                message.destroy();
                message.success(`文件上传成功`);
                setFileList([])
                handleUpload();
            } else if (info.file.status === 'error') {
                message.destroy();
                message.error(`文件上传失败`);
                setFileList([])
            }
        },
        fileList,
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
                    placeholder="请输入视频标题，不超过30字，不超过30MB，只能上传MP4格式的文件"
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
                <Upload {...props} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>点击直接上传视频</Button>
                </Upload>
            </div>
            <AiFillCloseCircle className={styles.close} onClick={() => handleUpload()}></AiFillCloseCircle>
        </div>
    )
}
export default UploadPopover;