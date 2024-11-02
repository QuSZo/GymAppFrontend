"use client";

import styles from "./DayElement.module.scss";
import { cn } from "@/utils/className";

type DayElementProps = {
  onClick: (date: Date) => void;
  date: Date;
  selected?: boolean;
  labeled: boolean;
};

export default function DayElement(props: DayElementProps) {
  return (
    <div className={styles.main}>
      <p className={styles.mainDate}>{props.date.toLocaleDateString("pl-PL", { weekday: "short" })}</p>
      <button onClick={() => props.onClick(props.date)} className={cn(styles.mainShield, props.selected ? styles.mainShieldSelected : undefined)}>
        <div className={cn(styles.mainShieldContent, props.selected ? styles.mainShieldContentSelected : undefined)}>
          <p>{props.date.getDate()}</p>
        </div>
      </button>
      <div className={cn(styles.mainElementLabeled, !props.labeled ? styles.mainElementLabeledHidden : undefined)}></div>
    </div>
  );
}
