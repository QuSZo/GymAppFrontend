"use client";

import styles from "./DayPicker.module.scss";
import DayElement from "@/common/components/DayElement";
import { cn } from "@/utils/className";
import { useMemo, useRef, useState } from "react";
import { useDayPicker } from "@/common/components/useDayPicker";

type DayPickerProps = {
  date: Date;
  onClick: (date: Date) => void;
  className?: string;
};

export default function DayPicker(props: DayPickerProps) {
  const { move, transition, dates, prevDateRef } = useDayPicker(props.date);

  return (
    <div className={cn(styles.main, props.className)}>
      <div className={styles.mainWrapper}>
        <div
          className={styles.mainWrapperFloating}
          style={{ translate: move, transition: transition }}
        >
          {dates.map((date, index) => (
            <DayElement
              onClick={(date) => {
                prevDateRef.current = props.date;
                props.onClick(date);
              }}
              key={index}
              date={date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
