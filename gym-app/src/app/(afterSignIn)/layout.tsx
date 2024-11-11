"use client";

import styles from "./layout.module.scss";
import { Menu } from "@/common/components/Menu/Menu";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <div className={styles.main}>{children}</div>
    </>
  );
}
