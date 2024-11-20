"use client";

import styles from "./page.module.scss";
import DayPicker from "@/common/components/DayPicker/DayPicker";
import { useEffect, useRef, useState } from "react";
import { getWorkouts, workoutsDto, workoutDetailsDto, getWorkoutByDate, createWorkout } from "@/api/controllers/workout";
import AddExerciseDialog from "@/app/(afterSignIn)/_components/AddExerciseDialog";
import { addExercise } from "@/api/controllers/exercise";
import { exerciseCategory, getExerciseCategories } from "@/api/controllers/exerciseCategory";
import { exerciseTypeDetails, getExerciseTypes } from "@/api/controllers/exerciseType";
import { UUID } from "node:crypto";
import Workout from "@/common/components/Workout/Workout";
import { dateOnly } from "@/utils/dateOnly";
import { useAuthContext } from "@/common/contexts/authContext";
import { useRouter } from "next/navigation";
import Button from "@/common/components/Button/Button";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import Calendar from "@/common/components/ReactCalendar/Calendar/Calendar";
import * as React from "react";
import SummaryWorkoutDialog from "@/app/(afterSignIn)/_components/SummaryWorkoutDialog";
import Loader from "@/common/components/Loader/Loader";
import { useLoaderContext } from "@/common/contexts/loaderContext";

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [workoutToCopy, setWorkoutToCopy] = useState<Date | undefined>();
  const { reload, setReload } = useAuthContext();
  const router = useRouter();
  const { loading, setLoading } = useLoaderContext();

  const controllerRef = useRef<AbortController | null>(null);

  const loadWorkoutData = async (isFullRefresh: boolean) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    if (isFullRefresh) {
      setIsLoading(true);
    } else {
      setLoading(true);
    }

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
        if (isFullRefresh) {
          setIsLoading(false);
        } else {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (reload) {
      setSelectedDate(dateOnly(new Date()));
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (!reload) {
      history.pushState({}, "", `/workout/${selectedDate.toLocaleDateString("sv-SE")}`);
      loadWorkoutData(true);
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
    setLoading(true);
    if (workout == undefined) {
      createWorkout({ exerciseTypeId: exerciseTypeId, date: selectedDate.toLocaleDateString("sv-SE") }, router)
        .then(async () => loadWorkoutData(false))
        .finally(() => setLoading(false));
    } else {
      addExercise({ exerciseTypeId: exerciseTypeId, workoutId: workout.id }, router)
        .then(async () => loadWorkoutData(false))
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      <div className={styles.main}>
        {!reload && (
          <>
            <DayPicker onClick={setSelectedDate} date={selectedDate} numberOfDays={7} labeledDays={workoutsDates} className={styles.dayPicker} />
            <Workout isLoading={isLoading} workout={workout} onRefresh={() => loadWorkoutData(false)} />
          </>
        )}
        <div className={styles.iconWrapper} data-centered={(!workout).toString()}>
          {!workout && (
            <Button onClick={() => setShowCalendar(true)} className={styles.buttonWithIcon} styling={"cancel"}>
              <Icon name={"calendar"} classNameSvg={styles.svg} classNameIcon={styles.icon} />
              Skopiuj trening
            </Button>
          )}
          <Button onClick={() => setShowPortal(true)} className={styles.buttonWithIcon}>
            <Icon name="add" classNameSvg={styles.svg} classNameIcon={styles.icon} />
            Dodaj ćwiczenie
          </Button>
        </div>
        {loading && <Loader className={styles.loader} />}
      </div>
      <AddExerciseDialog
        portalRoot={"dialog"}
        show={showPortal}
        onClose={() => setShowPortal(false)}
        onAddExercise={onAddExercise}
        exerciseCategories={exerciseCategories}
        exerciseTypes={exerciseTypes}
      />
      <Calendar
        showCalendar={showCalendar}
        onClose={() => setShowCalendar(false)}
        labeledDays={workoutsDates}
        mode={"single"}
        onDayClick={(date: Date) => {
          setWorkoutToCopy(date);
        }}
        selected={selectedDate}
        defaultMonth={selectedDate}
      ></Calendar>
      {workoutToCopy && (
        <SummaryWorkoutDialog
          destinationDate={selectedDate}
          sourceDate={workoutToCopy ?? new Date()}
          portalRoot={"dialog"}
          show={true}
          onClose={() => setWorkoutToCopy(undefined)}
          onRefresh={() => loadWorkoutData(true)}
          onPrevious={() => {
            setWorkoutToCopy(undefined);
            setShowCalendar(true);
          }}
        ></SummaryWorkoutDialog>
      )}
    </>
  );
}
