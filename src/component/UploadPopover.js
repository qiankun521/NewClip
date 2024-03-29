/**
 * @file 上传弹出框组件
 * @module UploadPopover
 */
import styles from "../assets/styles/UploadPopover.module.scss";
import { Upload, message, Button } from "antd";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Input } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";
import { hideUpload } from "../redux/actions/popoverAction";
import { useDispatch } from "react-redux";

function UploadPopover() {
  const dispatch = useDispatch(); //派发函数
  const { TextArea } = Input; //输入框组件实例
  const [title, setTitle] = useState("默认标题"); //视频标题
  const [topic, setTopic] = useState("其它"); //视频分类
  const [fileList, setFileList] = useState([]); //上传的文件列表
  const token = useSelector((state) => state?.loginRegister?.token); //用户 token
  const props = {
    name: "data", //发到后端的文件参数名
    beforeUpload: (file) => {
      //上传前的校验函数
      console.log(file.type);
      const isMp4 = file.type === "audio/mp4" || "video/mp4";
      if (!isMp4) {
        message.error("您只能上传MP4格式的文件!");
      } else {
        setFileList([file]);
      }
      return isMp4;
    },
    data: {
      //发送到后端的额外数据
      token: token,
      title: title,
      topic: topic,
    },
    action: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}/publish/action/`, //后端的文件上传接口 URL
    onChange(info) {
      //上传状态改变时的回调函数
      message.loading({
        content: "上传中...",
        key: "upload",
        duration: 0,
      });
      if (info.file.status === "done") {
        message.destroy();
        message.success(`文件上传成功`);
        setFileList([]);
        dispatch(hideUpload());
      } else if (info.file.status === "error") {
        message.destroy();
        message.error(`文件上传失败`);
        setFileList([]);
      }
    },
    fileList, //上传的文件列表
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.title}>
        <TextArea
          showCount
          maxLength={30}
          style={{
            height: 120,
            resize: "none",
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
          <input
            type="radio"
            name="classify"
            value="体育"
            onChange={(e) => setTopic(e.target.value)}
          />
          体育
          <input
            type="radio"
            name="classify"
            value="游戏"
            onChange={(e) => setTopic(e.target.value)}
          />
          游戏
          <input
            type="radio"
            name="classify"
            value="音乐"
            onChange={(e) => setTopic(e.target.value)}
          />
          音乐
          <input
            type="radio"
            name="classify"
            value="音乐"
            onChange={(e) => setTopic(e.target.value)}
          />
          其它
        </div>
      </div>
      <div className={styles.uploadButton}>
        <Upload {...props} showUploadList={false}>
          <Button icon={<UploadOutlined />}>点击直接上传视频</Button>
        </Upload>
      </div>
      <AiFillCloseCircle
        className={styles.close}
        onClick={() => dispatch(hideUpload())}></AiFillCloseCircle>
    </div>
  );
}
export default UploadPopover;
