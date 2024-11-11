"use client";

import styles from "./errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>404</p>
      <p className={styles.statusMessage}>PAGE NOT FOUND</p>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <Button className={styles.button}>Go to Home Page</Button>
        </Link>
      </div>
    </div>
  );
}
