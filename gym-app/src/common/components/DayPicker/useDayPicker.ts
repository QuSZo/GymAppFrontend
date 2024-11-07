import { useMemo, useRef, useState } from "react";
import { isSameDay } from "@/utils/isSameDay";
import { dateOnly } from "@/utils/dateOnly";

type DayElementProps = {
  date: Date;
  selected: boolean;
  labeled: boolean;
};

const TRANSITION_STYLE = "translate .5s ease-in-out";

function generateDayElementProps(currentDate: Date, numberOfDays: number, labeledDays?: Date[]): DayElementProps[] {
  const currentDateTemp = new Date(currentDate);
  const firstDay = dateOnly(new Date(currentDateTemp.setDate(currentDateTemp.getDate() - Math.floor(numberOfDays / 2) * 2)));
  const lastDay = dateOnly(new Date(currentDateTemp.setDate(currentDateTemp.getDate() + Math.floor(numberOfDays / 2) * 2 * 2)));

  const dates: DayElementProps[] = [];
  while (firstDay <= lastDay) {
    dates.push({
      date: new Date(firstDay),
      selected: firstDay.getTime() == currentDate.getTime(),
      labeled: labeledDays && labeledDays.length > 0 ? labeledDays.some((date) => isSameDay(date, firstDay)) : false,
    });
    firstDay.setDate(firstDay.getDate() + 1);
  }

  return dates;
}

function getFirstDisplayingDateIndex(dates: Date[]): number {
  return Math.floor(dates.length / 2) / 2;
}

function translateValue(currentDate: Date, prevDate: Date, dates: Date[]): number {
  const dayElementWidth = 60;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  if (prevDate < dates[getFirstDisplayingDateIndex(dates)]) {
    prevDate = dates[getFirstDisplayingDateIndex(dates)];
  }
  if (prevDate > dates[dates.length - 1 - getFirstDisplayingDateIndex(dates)]) {
    prevDate = dates[dates.length - 1 - getFirstDisplayingDateIndex(dates)];
  }
  const daysDifference = (currentDate.getTime() - prevDate.getTime()) / millisecondsInDay;
  return daysDifference * dayElementWidth;
}

export function useDayPicker(currentDate: Date, numberOfDays: number, labeledDays?: Date[]) {
  const prevDateRef = useRef(currentDate);
  const [move, setMove] = useState("0");
  const [transition, setTransition] = useState("none");

  const dayElementProps = generateDayElementProps(currentDate, numberOfDays, labeledDays);

  useMemo(() => {
    setMove(
      `${translateValue(
        currentDate,
        prevDateRef.current,
        dayElementProps.map((date) => date.date),
      )}px 0`,
    );
    setTransition("none");
    setTimeout(() => {
      setMove("0");
      setTransition(TRANSITION_STYLE);
    }, 1);
  }, [currentDate]);

  return {
    move,
    transition,
    dayElementProps,
    prevDateRef,
  };
}
