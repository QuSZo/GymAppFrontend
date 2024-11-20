"use client";

import Link from "next/link";
import styles from "./Menu.module.scss";
import Button from "@/common/components/Button/Button";
import { useAuthContext } from "@/common/contexts/authContext";

export function Menu() {
  const { logout, setReload } = useAuthContext();

  function handleLogOut() {
    logout();
  }

  return (
    <div className={styles.container}>
      <p className={styles.appName}>
        <Link href="/" onClick={() => setReload(true)}>
          GYMNOTES
        </Link>
      </p>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link href="/" onClick={() => setReload(true)}>
            Trening
          </Link>
        </li>
        {/*<li className={styles.menuItem}>*/}
        {/*  <Link href="/ranking">Ranking</Link>*/}
        {/*</li>*/}
        <li>
          <Button type={"button"} onClick={handleLogOut}>
            Wyloguj
          </Button>
        </li>
      </ul>
    </div>
  );
}
