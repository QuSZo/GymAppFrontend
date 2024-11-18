import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Dialog from "@/common/components/Dialog/Dialog";
import styles from "./Calendar.module.scss";
import { pl } from "date-fns/locale/pl";

export type CalendarProps = {
  showCalendar: boolean;
  onClose: () => void;
  labeledDays?: Date[];
} & React.ComponentProps<typeof DayPicker>;

function Calendar({ labeledDays, showOutsideDays = true, onDayClick, ...props }: CalendarProps) {
  // eslint-disable-next-line
  function handleOnDayClick(date: Date, modifiers: any, event: React.MouseEvent) {
    props.onClose();
    if (onDayClick) {
      onDayClick(date, modifiers, event);
    }
  }

  return (
    <>
      <Dialog
        portalRoot={"dialog"}
        show={props.showCalendar}
        onClose={() => props.onClose()}
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
