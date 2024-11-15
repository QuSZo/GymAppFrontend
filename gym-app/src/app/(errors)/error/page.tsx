import styles from "@/app/errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function ErrorPage() {
  const statusCode = 500;
  const errorMessage = "Coś poszło nie tak. Spróbuj ponownie później.";

  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>{statusCode}</p>
      <p className={styles.statusMessage}>{errorMessage}</p>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <Button className={styles.button}>Wróć na stronę główną</Button>
        </Link>
      </div>
    </div>
  );
}
