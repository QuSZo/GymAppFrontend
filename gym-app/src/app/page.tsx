"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker";
import { useState } from "react";

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={styles.main}>
      <DayPicker
        onClick={setSelectedDate}
        date={selectedDate}
        className={styles.dayPicker}
      />
      <p>{selectedDate.getDate()}</p>
    </div>
  );
}
