import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import Dialog from "@/common/components/Dialog/Dialog";
import styles from "./Calendar.module.scss";
import { useState } from "react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ showOutsideDays = true, onDayClick, ...props }: CalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  function handleOnDayClick(date: Date, modifiers: any, event: React.MouseEvent) {
    setShowCalendar(false);
    console.log(showCalendar);
    if (onDayClick) {
      onDayClick(date, modifiers, event);
    }
  }

  return (
    <>
      <Icon name={"add"} onClick={() => setShowCalendar(true)} />
      <Dialog show={showCalendar} onClose={() => setShowCalendar(false)} classNameModal={styles.modal} classNameOverflow={styles.overflow}>
        <DayPicker
          showOutsideDays={showOutsideDays}
          weekStartsOn={1}
          styles={{
            root: {
              background: "hsl(32, 43, 62)",
              color: "hsl(233, 237, 245)",
            },
            day: {
              backgroundColor: "rgb(32, 43, 62)",
            },
          }}
          modifiersStyles={{
            selected: {
              backgroundColor: "rgb(100, 100, 150)",
              color: "rgb(100, 100, 150)",
              borderRadius: "0.275rem",
            },
            today: {
              color: "rgb(100,100,100)",
            },
          }}
          onDayClick={handleOnDayClick}
          {...props}
        />
      </Dialog>
    </>
  );
}
Calendar.displayName = "Calendar";

export default Calendar;
