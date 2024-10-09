import { useMemo, useRef, useState } from "react";

function generateDates(currentDate: Date): Date[] {
  const currentDateTemp = new Date(currentDate);
  const firstDay = new Date(
    currentDateTemp.setDate(currentDateTemp.getDate() - 6),
  );
  const lastDay = new Date(
    currentDateTemp.setDate(currentDateTemp.getDate() + 12),
  );

  const dates: Date[] = [];
  while (firstDay <= lastDay) {
    dates.push(new Date(firstDay));
    firstDay.setDate(firstDay.getDate() + 1);
  }

  return dates;
}

function translateValue(currentDate: Date, prevDate: Date) {
  const dayElementWidth = 60;
  const fromMillisecondsToDaysMultiplier = 1000 * 60 * 60 * 24;
  return (
    ((currentDate - prevDate) / fromMillisecondsToDaysMultiplier) *
    dayElementWidth
  );
}

export function useDayPicker(currentDate: Date) {
  const prevDateRef = useRef(currentDate);
  const [move, setMove] = useState("0px 0");
  const [transition, setTransition] = useState("none");

  const dates = generateDates(currentDate);

  useMemo(() => {
    setMove(
      `${((currentDate - prevDateRef.current) / (1000 * 60 * 60 * 24)) * 60}px 0`,
    );
    setTransition("none");
    setTimeout(() => {
      setMove("0px 0");
      setTransition("translate 0.5s ease-in-out");
    }, 1);
  }, [currentDate]);

  return {
    move,
    transition,
    dates,
    prevDateRef,
  };
}
