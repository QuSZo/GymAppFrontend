import { useMemo, useRef, useState } from "react";

type DateWithSelect = {
  date: Date;
  selected: boolean;
};

const TRANSITION_STYLE = "translate 0.5s ease-in-out";

function generateDatesWithSelect(currentDate: Date): DateWithSelect[] {
  const currentDateTemp = new Date(currentDate);
  const firstDay = new Date(
    currentDateTemp.setDate(currentDateTemp.getDate() - 6),
  );
  const lastDay = new Date(
    currentDateTemp.setDate(currentDateTemp.getDate() + 12),
  );

  const dates: DateWithSelect[] = [];
  while (firstDay <= lastDay) {
    dates.push({
      date: new Date(firstDay),
      selected: firstDay.getTime() == currentDate.getTime(),
    });
    firstDay.setDate(firstDay.getDate() + 1);
  }

  return dates;
}

function translateValue(currentDate: Date, prevDate: Date): number {
  const dayElementWidth = 60;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference =
    (currentDate.getTime() - prevDate.getTime()) / millisecondsInDay;
  return daysDifference * dayElementWidth;
}

export function useDayPicker(currentDate: Date) {
  const prevDateRef = useRef(currentDate);
  const [move, setMove] = useState("0");
  const [transition, setTransition] = useState("none");

  const datesWithSelect = generateDatesWithSelect(currentDate);

  useMemo(() => {
    setMove(`${translateValue(currentDate, prevDateRef.current)}px 0`);
    setTransition("none");
    setTimeout(() => {
      setMove("0");
      setTransition(TRANSITION_STYLE);
    }, 1);
  }, [currentDate]);

  return {
    move,
    transition,
    datesWithSelect,
    prevDateRef,
  };
}
