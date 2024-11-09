"use client";

import Link from "next/link";
import styles from "./Menu.module.scss";
import Button from "@/common/components/Button/Button";
import { useAuthContext } from "@/common/contexts/authContext";

export function Menu() {
  const { logout } = useAuthContext();

  function handleLogOut() {
    logout();
  }

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
        <li>
          <Button type={"button"} onClick={handleLogOut}>
            Wyloguj
          </Button>
        </li>
      </ul>
    </div>
  );
}
