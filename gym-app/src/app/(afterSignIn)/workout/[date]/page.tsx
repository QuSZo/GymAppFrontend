"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker/DayPicker";
import { useEffect, useRef, useState } from "react";
import { getWorkouts, workoutsDto, workoutDetailsDto, getWorkoutByDate, createWorkout } from "@/api/controllers/workout";
import CircleIconButton from "@/common/components/CircleIconButton/CircleIconButton";
import AddExerciseDialog from "@/app/(afterSignIn)/_components/AddExerciseDialog";
import { addExercise } from "@/api/controllers/exercise";
import { exerciseCategory, getExerciseCategories } from "@/api/controllers/exerciseCategory";
import { exerciseTypeDetails, getExerciseTypes } from "@/api/controllers/exerciseType";
import { UUID } from "node:crypto";
import Workout from "@/common/components/Workout/Workout";
import { dateOnly } from "@/utils/dateOnly";
import { useAuthContext } from "@/common/contexts/authContext";
import { useRouter } from "next/navigation";

type WorkoutForDatePageProps = {
  params: {
    date: string;
  };
};

export default function WorkoutForDatePage({ params }: WorkoutForDatePageProps) {
  const [selectedDate, setSelectedDate] = useState(dateOnly(new Date(params.date)));
  const [workouts, setWorkouts] = useState<workoutsDto[]>([]);
  const [workout, setWorkout] = useState<workoutDetailsDto>();
  const [showPortal, setShowPortal] = useState(false);
  const [exerciseCategories, setExerciseCategories] = useState<exerciseCategory[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<exerciseTypeDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { reload, setReload } = useAuthContext();
  const router = useRouter();

  const controllerRef = useRef<AbortController | null>(null);

  const loadWorkoutData = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    setIsLoading(true);
    try {
      const [allWorkouts, selectedWorkout] = await Promise.all([
        getWorkouts(router, signal),
        getWorkoutByDate(selectedDate, router, signal).catch(() => undefined),
      ]);

      setWorkouts(allWorkouts);
      setWorkout(selectedWorkout);
    } catch {
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     throw new AuthRequiredError();
  //   }
  // }, [error]);

  useEffect(() => {
    if (reload) {
      setSelectedDate(dateOnly(new Date()));
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (!reload) {
      history.pushState({}, "", `/workout/${selectedDate.toLocaleDateString("sv-SE")}`);
      loadWorkoutData();
    }
  }, [selectedDate]);

  useEffect(() => {
    const exerciseCategories = async () => {
      setExerciseCategories(await getExerciseCategories(router));
    };

    const exerciseTypes = async () => {
      setExerciseTypes(await getExerciseTypes(router));
    };
    exerciseCategories();
    exerciseTypes();
  }, []);

  let workoutsDates: Date[] = [];
  workoutsDates = workouts.map((workout) => new Date(workout.date));

  async function onAddExercise(exerciseTypeId: UUID) {
    if (workout == undefined) {
      await createWorkout({ exerciseTypeId: exerciseTypeId, date: selectedDate.toLocaleDateString("sv-SE") }, router);
    } else {
      await addExercise({ exerciseTypeId: exerciseTypeId, workoutId: workout.id }, router);
    }

    await loadWorkoutData();
  }

  return (
    <>
      <div className={styles.main}>
        {!reload && (
          <>
            <DayPicker onClick={setSelectedDate} date={selectedDate} numberOfDays={7} labeledDays={workoutsDates} className={styles.dayPicker} />
            <Workout isLoading={isLoading} workout={workout} onRefresh={loadWorkoutData} />
          </>
        )}
        <CircleIconButton onClick={() => setShowPortal(true)}>{workout ? "Dodaj ćwiczenie" : "Dodaj trening"}</CircleIconButton>
      </div>
      <AddExerciseDialog
        portalRoot={"dialog"}
        show={showPortal}
        onClose={() => setShowPortal(false)}
        onAddExercise={onAddExercise}
        exerciseCategories={exerciseCategories}
        exerciseTypes={exerciseTypes}
      />
    </>
  );
}
