"use client";

import styles from "./DayPicker.module.scss";
import DayElement from "@/common/components/DayElement";
import { cn } from "@/utils/className";
import { useDayPicker } from "@/common/components/useDayPicker";
import Button from "@/common/components/Button";

type DayPickerProps = {
  date: Date;
  onClick: (date: Date) => void;
  className?: string;
};

export default function DayPicker(props: DayPickerProps) {
  const { move, transition, datesWithSelect, prevDateRef } = useDayPicker(
    props.date,
  );

  return (
    <div className={cn(styles.main, props.className)}>
      <div className={styles.mainOptions}>
        <Button className={false ? styles.buttonHidden : ""}>Reset</Button>
        <p>{props.date.toLocaleDateString("pl-PL", { month: "long" })}</p>
        <Button>Kalendarz</Button>
      </div>
      <div className={styles.mainWrapper}>
        <div
          className={styles.mainWrapperFloating}
          style={{ translate: move, transition: transition }}
        >
          {datesWithSelect.map((dateWithSelect, index) => (
            <DayElement
              key={index}
              onClick={(date) => {
                prevDateRef.current = props.date;
                props.onClick(date);
              }}
              date={dateWithSelect.date}
              selected={dateWithSelect.selected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
