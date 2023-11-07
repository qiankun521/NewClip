/**
 * @file 视频描述组件
 * @module Describe
 */
import styles from '../assets/styles/Describe.module.css';
/**
 * @description 视频描述组件，用于展示用户名称和视频标题
 * @param {Object} props - 组件属性
 * @param {string} props.name - 用户名
 * @param {string} props.title - 标题
 * @returns {JSX.Element} 描述组件
 */
function Describe({ name, title }) {
    return (
        <div className={styles.describeContainer}>
            <div className={styles.describe}>
                <div className={styles.name}>@{name}</div>
                <div className={styles.title}>{title && `${title?.length < 20 ? title : title.substring(0, 20)+"......"}`}</div>
            </div>
        </div>
    )
}
export default Describe;