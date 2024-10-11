"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker/DayPicker";
import { useState } from "react";
import { exercise } from "@/api/exercise";
import { workout } from "@/api/workout";
import { exerciseSet } from "@/api/exerciseSet";
import Exercise from "@/common/components/Exercise/Exercise";

function generateDate(days: number) {
  const date = new Date(); // Tworzymy nową datę, aby nie modyfikować bieżącej daty globalnie
  date.setDate(date.getDate() + days);
  return date;
}

function generateWorkout(): workout {
  const exerciseSet1: exerciseSet = {
    setNumber: 1,
    quantity: 100,
    reps: 12,
  };

  const exerciseSet2: exerciseSet = {
    setNumber: 1,
    quantity: 120,
    reps: 8,
  };

  const exercise: exercise = {
    exerciseTypeName: "Ławka prosta",
    exerciseSets: [exerciseSet1, exerciseSet2],
  };
  const workout: workout = {
    date: new Date(),
    exercises: [exercise],
  };

  return workout;
}

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const pointedDay = [
    generateDate(-3),
    generateDate(-1),
    new Date(),
    generateDate(2),
  ];
  const workout = generateWorkout();

  return (
    <div className={styles.main}>
      <DayPicker
        onClick={setSelectedDate}
        date={selectedDate}
        numberOfDays={7}
        labeledDays={pointedDay}
        className={styles.dayPicker}
      />
      {workout.exercises.map((exercise, index) => (
        <Exercise key={index} exercise={exercise} />
      ))}
    </div>
  );
}
