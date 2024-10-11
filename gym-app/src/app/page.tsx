"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker";
import { useState } from "react";

function generateDate(days: number) {
  const date = new Date(); // Tworzymy nową datę, aby nie modyfikować bieżącej daty globalnie
  date.setDate(date.getDate() + days);
  return date;
}

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const pointedDay = [
    generateDate(-3),
    generateDate(-1),
    new Date(),
    generateDate(2),
  ];

  return (
    <div className={styles.main}>
      <DayPicker
        onClick={setSelectedDate}
        date={selectedDate}
        numberOfDays={7}
        labeledDays={pointedDay}
        className={styles.dayPicker}
      />
      <p>{selectedDate.getDate()}</p>
    </div>
  );
}
