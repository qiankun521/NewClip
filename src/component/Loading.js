import styles from "../assets/styles/Loading.module.scss";
function Loading({size}) {
  if(size === undefined) size = 1;
  return (
    <div class={styles.loading} style={{
      transform: `scale(${size})`
    }}>
      <div class={`${styles.ball} ${styles.first}`}></div>
      <div class={`${styles.ball} ${styles.second}`}></div>
    </div>
  );
}
export default Loading;