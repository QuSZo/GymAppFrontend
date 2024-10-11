"use client";

import styles from "./DayPicker.module.scss";
import DayElement from "@/common/components/DayPicker/DayElement/DayElement";
import { cn } from "@/utils/className";
import { useDayPicker } from "@/common/components/DayPicker/useDayPicker";
import Button from "@/common/components/Button/Button";

type DayPickerProps = {
  date: Date;
  onClick: (date: Date) => void;
  numberOfDays: number;
  labeledDays?: Date[];
  className?: string;
};

export default function DayPicker(props: DayPickerProps) {
  const { move, transition, dayElementProps, prevDateRef } = useDayPicker(
    props.date,
    props.numberOfDays,
    props.labeledDays,
  );

  function daySelected(dateSelected: Date): void {
    prevDateRef.current = props.date;
    props.onClick(dateSelected);
  }

  return (
    <div className={cn(styles.main, props.className)}>
      <div className={styles.mainOptions}>
        <div className={styles.mainOptionsLeft}>
          <Button
            onClick={() => daySelected(new Date())}
            className={false ? styles.buttonHidden : ""}
          >
            Reset
          </Button>
        </div>
        <div className={styles.mainOptionsCenter}>
          <p>{props.date.toLocaleDateString("pl-PL", { month: "long" })}</p>
        </div>
        <div className={styles.mainOptionsRight}>
          <Button>Kalendarz</Button>
        </div>
      </div>
      <div className={styles.mainWrapper}>
        <div
          className={styles.mainWrapperFloating}
          style={{ translate: move, transition: transition }}
        >
          {dayElementProps.map((dayElementProps, index) => (
            <DayElement
              key={index}
              onClick={daySelected}
              date={dayElementProps.date}
              selected={dayElementProps.selected}
              labeled={dayElementProps.labeled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
