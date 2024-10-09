import Link from "next/link";
import styles from "./Menu.module.scss";

export function Menu() {
  return (
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <Link href="/">Trening</Link>
      </li>
      <li className={styles.menuItem}>
        <Link href="/ranking">Ranking</Link>
      </li>
    </ul>
  );
}
