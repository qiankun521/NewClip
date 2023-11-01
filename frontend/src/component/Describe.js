import styles from '../assets/styles/Describe.module.css';
function Describe({name,title}) {
    return (
        <div className={styles.describeContainer}>
            <div className={styles.describe}>
                <div className={styles.name}>@{name}</div>
                <div className={styles.title}>{title.length<20?title:title.substring(0,20)+'.......'}</div>
            </div>
        </div>
    )
}
export default Describe;