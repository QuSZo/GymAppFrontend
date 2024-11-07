import styles from "./errors.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>404</p>
      <p className={styles.statusMessage}>PAGE NOT FOUND</p>
    </div>
  );
}
