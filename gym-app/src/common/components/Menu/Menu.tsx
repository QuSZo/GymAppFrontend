import Link from "next/link";
import styles from "./Menu.module.scss";

export function Menu() {
  return (
    <div className={styles.container}>
      <p className={styles.appName}>
        <Link href="/">GYMAPP</Link>
      </p>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link href="/">Trening</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/ranking">Ranking</Link>
        </li>
      </ul>
    </div>
  );
}
