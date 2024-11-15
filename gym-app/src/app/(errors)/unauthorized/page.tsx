import styles from "@/app/errors.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function UnauthorizedPage() {
  const errorCode = 401;
  const errorMessage = "Nie jesteś zalogowany lub token wygasł.";

  return (
    <div className={styles.container}>
      <p className={styles.info}>Ooops..</p>
      <p className={styles.status}>{errorCode}</p>
      <p className={styles.statusMessage}>{errorMessage}</p>
      <div className={styles.buttonContainer}>
        <Link href="/sign-in">
          <Button className={styles.button}>Zaloguj się</Button>
        </Link>
      </div>
    </div>
  );
}
