import styles from "@/app/(auth)/reset-password-confirmation/page.module.scss";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import Link from "next/link";
import Button from "@/common/components/Button/Button";

export default function Page() {
  return (
    <div className={styles.container}>
      <Icon name={"check"} classNameIcon={styles.icon} classNameSvg={styles.svg}></Icon>
      <h1 className={styles.headerText}>Udało się zarejestrować</h1>
      <Link href="/sign-in">
        <Button>Zaloguj się</Button>
      </Link>
    </div>
  );
}
