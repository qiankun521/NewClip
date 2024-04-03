import styles from "../assets/styles/Loading.module.scss";
function Loading() {
  return (
    <div class={styles.loading}>
      <div class={`${styles.ball} ${styles.first}`}></div>
      <div class={`${styles.ball} ${styles.second}`}></div>
    </div>
  );
}
export default Loading;