import Link from "next/link";
import Button from "@/common/components/Button/Button";
import styles from "./page.module.scss";
import { Icon } from "@/common/components/Icons/Icon/Icon";

export default function Page() {
  return (
    <div className={styles.container}>
      <Icon name={"check"} classNameIcon={styles.icon} classNameSvg={styles.svg}></Icon>
      <h1 className={styles.headerText}>Udało się zresetować hasło</h1>
      <Link href="/">
        <Button>Wróć na stronę główną</Button>
      </Link>
    </div>
  );
}
