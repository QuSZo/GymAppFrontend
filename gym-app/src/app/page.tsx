"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker/DayPicker";
import { useEffect, useState } from "react";
import { getWorkout, getWorkouts, workout } from "@/api/workout";
import Exercise from "@/common/components/Exercise/Exercise";
import CircleIconButton from "@/common/components/CircleIconButton/CircleIconButton";
import AddExerciseDialog from "@/app/(components)/AddExerciseDialog";
import { exercise } from "@/api/exercise";
import {
  exerciseCategory,
  getExerciseCategories,
} from "@/api/exerciseCategory";
import { exerciseType, getExerciseTypes } from "@/api/exerciseType";

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [workouts, setWorkouts] = useState<workout[]>([]);
  const [workout, setWorkout] = useState<workout>();

  const [showPortal, setShowPortal] = useState(false);

  const [exerciseCategories, setExerciseCategories] = useState<
    exerciseCategory[]
  >([]);
  const [exerciseTypes, setExerciseTypes] = useState<exerciseType[]>([]);

  useEffect(() => {
    const workouts = async () => {
      setWorkouts(await getWorkouts());
    };

    const workout = async () => {
      const selectedDateOnly = new Date(selectedDate);
      selectedDateOnly.setHours(2, 0, 0, 0);
      setWorkout(await getWorkout(selectedDateOnly.toISOString()));
    };
    workouts();
    workout();
  }, [selectedDate]);

  useEffect(() => {
    const exerciseCategories = async () => {
      setExerciseCategories(await getExerciseCategories());
    };

    const exerciseTypes = async () => {
      setExerciseTypes(await getExerciseTypes());
    };
    exerciseCategories();
    exerciseTypes();
  }, []);

  let workoutsDates: Date[] = [];
  workoutsDates = workouts.map((workout) => new Date(workout.date));

  return (
    <>
      <div className={styles.main}>
        <DayPicker
          onClick={setSelectedDate}
          date={selectedDate}
          numberOfDays={7}
          labeledDays={workoutsDates}
          className={styles.dayPicker}
        />
        {workout
          ? workout.exercises.map((exercise, index) => (
              <Exercise key={index} exercise={exercise} />
            ))
          : "Nie znaleziono treningu"}
        <CircleIconButton
          onClick={() => {
            setShowPortal(true);
          }}
        >
          Dodaj trening
        </CircleIconButton>
      </div>
      <AddExerciseDialog
        show={showPortal}
        onClose={() => setShowPortal(false)}
        exerciseCategories={exerciseCategories}
        exerciseTypes={exerciseTypes}
      />
    </>
  );
}
