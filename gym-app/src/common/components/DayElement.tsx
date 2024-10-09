"use client";

import styles from "./DayElement.module.scss";

type DayElementProps = {
  onClick: (date: Date) => void;
  date: Date;
};

export default function DayElement(props: DayElementProps) {
  return (
    <div className={styles.main}>
      <p>{props.date.toLocaleDateString("pl-PL", { weekday: "short" })}</p>
      <button
        onClick={() => props.onClick(props.date)}
        className={styles.mainShield}
      >
        <div className={styles.mainShieldContent}>
          <p>{props.date.getDate()}</p>
        </div>
      </button>
    </div>
  );
}
