/**
 * @file 单个视频组件
 * @module SingleVideo
 */
import styles from '../assets/styles/SingleVideo.module.css';
import { AiOutlineHeart } from 'react-icons/ai';

/**
 * 单个视频组件
 * @param {Object} props - 组件属性
 * @param {Object} props.data - 视频数据
 * @param {Function} props.handleClick - 打开视频的处理函数(搜索页和个人主页)
 * @param {number} props.trueIndex - 打开的视频的真实索引
 * @returns {JSX.Element} 单个视频组件
 */
function SingleVideo({ data,handleClick,trueIndex }) {
    return (
        <div className={styles.singleVideo} onClick={()=>handleClick(trueIndex)}>
            <div className={styles.videoContainer}>
                <div className={styles.picture} style={{
                    backgroundImage: `url(${data.cover_url})`
                }}>
                    <div className={styles.heart}>
                        <div><AiOutlineHeart></AiOutlineHeart></div>
                        <div>{data.favorite_count}</div>
                    </div>
                </div>
                <div className={styles.describe}>
                    <div className={styles.topArea}>
                        <div>
                            {data.title.length > 20 ? data.title.slice(0, 15) + '...' : data.title}
                        </div>
                    </div>
                    <div className={styles.bottomArea}>
                        <div className={styles.authorName}>
                            @{data.author.name}
                        </div>
                        <div className={styles.time}>
                            {data.publish_time}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default SingleVideo;