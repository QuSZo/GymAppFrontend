"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker/DayPicker";
import { useEffect, useState } from "react";
import { getWorkouts, workoutsDto, workoutDetailsDto, getWorkoutByDate, createWorkout } from "@/api/workout";
import Exercise from "@/common/components/Exercise/Exercise";
import CircleIconButton from "@/common/components/CircleIconButton/CircleIconButton";
import AddExerciseDialog from "@/app/(components)/AddExerciseDialog";
import { addExercise } from "@/api/exercise";
import { exerciseCategory, getExerciseCategories } from "@/api/exerciseCategory";
import { exerciseTypeDetails, getExerciseTypes } from "@/api/exerciseType";
import ExerciseSkeleton from "@/common/components/Exercise/ExerciseSkeleton";
import { UUID } from "node:crypto";

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState<workoutsDto[]>([]);
  const [workout, setWorkout] = useState<workoutDetailsDto>();
  const [showPortal, setShowPortal] = useState(false);
  const [exerciseCategories, setExerciseCategories] = useState<exerciseCategory[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<exerciseTypeDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const exerciseSceletonArray = new Array(4).fill(null);

  const loadWorkoutData = async () => {
    setIsLoading(true);

    const workouts = async () => {
      setWorkouts(await getWorkouts());
    };

    const workout = async () => {
      try {
        setWorkout(await getWorkoutByDate(selectedDate));
      } catch {
        setWorkout(undefined);
      }
    };

    await Promise.all([workouts(), workout()]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWorkoutData();
  }, [selectedDate]);

  useEffect(() => {
    const exerciseCategories = async () => {
      setExerciseCategories(await getExerciseCategories());
    };

    const exerciseTypes = async () => {
      setExerciseTypes(await getExerciseTypes());
    };
    exerciseCategories(); //Context hook
    exerciseTypes();
  }, []);

  let workoutsDates: Date[] = [];
  workoutsDates = workouts.map((workout) => new Date(workout.date));

  async function onAddExercise(exerciseTypeId: UUID) {
    if (workout == undefined) {
      await createWorkout({ exerciseTypeId: exerciseTypeId, date: selectedDate.toLocaleDateString("sv-SE") });
    } else {
      await addExercise({ exerciseTypeId: exerciseTypeId, workoutId: workout.id });
    }

    await loadWorkoutData();
  }

  return (
    <>
      <div className={styles.main}>
        <DayPicker onClick={setSelectedDate} date={selectedDate} numberOfDays={7} labeledDays={workoutsDates} className={styles.dayPicker} />
        {isLoading
          ? exerciseSceletonArray.map((value, index) => <ExerciseSkeleton key={index} />)
          : workout
            ? workout.exercises.map((exercise, index) => <Exercise key={index} exercise={exercise} onRefresh={loadWorkoutData} />)
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
        onAddExercise={onAddExercise}
        exerciseCategories={exerciseCategories}
        exerciseTypes={exerciseTypes}
      />
    </>
  );
}
