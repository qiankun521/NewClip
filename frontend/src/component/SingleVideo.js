import styles from '../assets/styles/SingleVideo.module.css';
import { AiOutlineHeart } from 'react-icons/ai';

function SingleVideo({ data }) {
    return (
        <div className={styles.singleVideo}>
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
                            {data.title.length > 20 ? data.title.slice(0, 20) + '...' : data.title}
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