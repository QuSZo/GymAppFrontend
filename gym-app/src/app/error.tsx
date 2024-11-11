"use client";

import styles from "@/app/errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";
import { AuthRequiredError } from "@/common/lib/exceptions";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  let errorCode = 500;
  let errorMessage = "Something went wrong. Please try again at a later stage.";

  if (error instanceof AuthRequiredError) {
    errorCode = 401; // Kod błędu dla braku autoryzacji
    errorMessage = error.message;
  }
  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>{errorCode}</p>
      <p className={styles.statusMessage}>{errorMessage}</p>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <Button className={styles.button}>Go to Home Page</Button>
        </Link>
        <Button onClick={() => reset()} className={styles.button}>
          Try again
        </Button>
      </div>
    </div>
  );
}
