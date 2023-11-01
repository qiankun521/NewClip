import styles from '../assets/styles/Describe.module.css';
function Describe() {
    return (
        <div className={styles.describeContainer}>
            <div className={styles.describe}>
                <div className={styles.title}>@这是很长的标题</div>
                <div className={styles.content}>这是描述</div>
            </div>
        </div>
    )
}
export default Describe;