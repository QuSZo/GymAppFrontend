"use client";

import styles from "./errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>404</p>
      <p className={styles.statusMessage}>Nie znaleziono strony</p>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <Button className={styles.button}>Wróć na stronę główną</Button>
        </Link>
      </div>
    </div>
  );
}
