/**
 * @file 视频描述组件
 * @module Describe
 */
import styles from '../assets/styles/Describe.module.scss';

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