import styles from "@/app/errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function ForbiddenPage() {
  const errorCode = 403;
  const errorMessage = "Nie masz uprawnień do tego zasobu.";

  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>{errorCode}</p>
      <p className={styles.statusMessage}>{errorMessage}</p>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <Button className={styles.button}>Wróć na stronę główną</Button>
        </Link>
      </div>
    </div>
  );
}
