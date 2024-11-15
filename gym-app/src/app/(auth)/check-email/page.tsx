import { Icon } from "@/common/components/Icons/Icon/Icon";
import styles from "./page.module.scss";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.informationContainer}>
        <Icon name={"email"} classNameIcon={styles.icon} classNameSvg={styles.svg}></Icon>
        <h1 className={styles.headerText}>Sprawdź swoją skrzynkę pocztową</h1>
        <p className={styles.infoText}>Na twojej skrzynce pocztowej znajdują się dalsze instrukcje dotyczące resetu hasła.</p>
        <Link href="/">
          <Button styling={"cancel"} className={styles.button}>
            Wróć na stronę główną
          </Button>
        </Link>
        <div className={styles.bottom}>
          <p className={styles.infoText}>
            Nie otrzymałeś maila? Sprawdź inne foldery takie jak spam lub <Link href={"/forgot-password"}>spróbuj ponownie</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
