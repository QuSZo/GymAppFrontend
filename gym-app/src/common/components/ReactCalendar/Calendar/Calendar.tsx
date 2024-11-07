import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import Dialog from "@/common/components/Dialog/Dialog";
import styles from "./Calendar.module.scss";
import { useState } from "react";
import { pl } from "date-fns/locale/pl";

export type CalendarProps = {
  labeledDays?: Date[];
} & React.ComponentProps<typeof DayPicker>;

function Calendar({ labeledDays, showOutsideDays = true, onDayClick, ...props }: CalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  // eslint-disable-next-line
  function handleOnDayClick(date: Date, modifiers: any, event: React.MouseEvent) {
    setShowCalendar(false);
    if (onDayClick) {
      onDayClick(date, modifiers, event);
    }
  }

  return (
    <>
      <Icon classNameIcon={styles.icon} classNameSvg={styles.svg} name={"calendar"} onClick={() => setShowCalendar(true)} />
      <Dialog
        portalRoot={"dialog"}
        show={showCalendar}
        onClose={() => setShowCalendar(false)}
        classNameModal={styles.modal}
        classNameOverflow={styles.overflow}
      >
        <DayPicker
          modifiers={{ labeledDays: labeledDays }}
          locale={pl}
          showOutsideDays={showOutsideDays}
          weekStartsOn={1}
          styles={{}}
          modifiersStyles={{
            outside: {
              color: "rgb(53,58,64)",
            },
          }}
          modifiersClassNames={{
            chevron: styles.buttonNextPrev,
            today: styles.today,
            selected: styles.selected,
            labeledDays: styles.labeledDays,
          }}
          classNames={{
            chevron: styles.buttonNextPrev,
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
