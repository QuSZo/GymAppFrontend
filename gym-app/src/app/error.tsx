"use client";

import styles from "@/app/errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function error() {
  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>500</p>
      <p className={styles.statusMessage}>Something went wrong. Please try again at a later stage.</p>
      <Link href="/">
        <Button className={styles.button}>Go to Home Page</Button>
      </Link>
    </div>
  );
}
