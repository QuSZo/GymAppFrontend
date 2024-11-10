"use client";

import styles from "@/app/errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>500</p>
      <p className={styles.statusMessage}>Something went wrong. Please try again at a later stage.</p>
      <Link href="/">
        <Button className={styles.button}>Go to Home Page</Button>
      </Link>
      <Button onClick={() => reset()} className={styles.button}>
        Reset
      </Button>
    </div>
  );
}
