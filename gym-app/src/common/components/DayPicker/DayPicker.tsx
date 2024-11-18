"use client";

import styles from "./DayPicker.module.scss";
import DayElement from "@/common/components/DayPicker/DayElement/DayElement";
import { cn } from "@/utils/className";
import { useDayPicker } from "@/common/components/DayPicker/useDayPicker";
import Button from "@/common/components/Button/Button";
import Calendar from "@/common/components/ReactCalendar/Calendar/Calendar";
import { dateOnly } from "@/utils/dateOnly";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import * as React from "react";
import { useState } from "react";

type DayPickerProps = {
  date: Date;
  onClick: (date: Date) => void;
  numberOfDays: number;
  labeledDays?: Date[];
  className?: string;
};

export default function DayPicker(props: DayPickerProps) {
  const { move, transition, dayElementProps, prevDateRef } = useDayPicker(props.date, props.numberOfDays, props.labeledDays);
  const [showCalendar, setShowCalendar] = useState(false);

  function daySelected(dateSelected: Date): void {
    prevDateRef.current = props.date;
    props.onClick(dateSelected);
  }

  return (
    <>
      <div className={cn(styles.main, props.className)}>
        <div className={styles.mainOptions}>
          <div className={styles.mainOptionsLeft}>
            <Button onClick={() => daySelected(dateOnly(new Date()))} className={styles.button}>
              Dzisiaj
            </Button>
          </div>
          <div className={styles.mainOptionsCenter}>
            <p>
              {props.date.toLocaleDateString("pl-PL", { month: "long" })}
              {` ${props.date.getFullYear()}`}
            </p>
          </div>
          <div className={styles.mainOptionsRight}>
            <Icon classNameIcon={styles.icon} classNameSvg={styles.svg} name={"calendar"} onClick={() => setShowCalendar(true)} />
          </div>
        </div>
        <div className={styles.mainWrapper}>
          <div className={styles.mainWrapperFloating} style={{ translate: move, transition: transition }}>
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
      <Calendar
        showCalendar={showCalendar}
        onClose={() => setShowCalendar(false)}
        labeledDays={props.labeledDays}
        mode={"single"}
        onDayClick={(date: Date) => {
          daySelected(date);
        }}
        selected={props.date}
        defaultMonth={props.date}
      ></Calendar>
    </>
  );
}
