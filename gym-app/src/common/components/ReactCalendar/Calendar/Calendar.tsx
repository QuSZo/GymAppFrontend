import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import Dialog from "@/common/components/Dialog/Dialog";
import styles from "./Calendar.module.scss";
import { useState } from "react";
import { pl } from "date-fns/locale/pl";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ showOutsideDays = true, onDayClick, ...props }: CalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  function handleOnDayClick(date: Date, modifiers: any, event: React.MouseEvent) {
    setShowCalendar(false);
    if (onDayClick) {
      onDayClick(date, modifiers, event);
    }
  }

  return (
    <>
      <Icon classNameIcon={styles.icon} classNameSvg={styles.svg} name={"calendar"} onClick={() => setShowCalendar(true)} />
      <Dialog show={showCalendar} onClose={() => setShowCalendar(false)} classNameModal={styles.modal} classNameOverflow={styles.overflow}>
        <DayPicker
          locale={pl}
          showOutsideDays={showOutsideDays}
          weekStartsOn={1}
          styles={{
            root: {},
            day: {},
          }}
          modifiersStyles={{
            selected: {
              color: "rgb(163, 185, 214)",
              backgroundColor: "rgb(27, 42, 75)",
            },
            today: {
              color: "rgb(163, 185, 214)",
              borderRadius: "0.275rem",
              backgroundColor: "rgb(12, 19, 34)",
            },
            outside: {
              color: "rgb(53,58,64)",
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
