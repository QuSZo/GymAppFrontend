import { exerciseDto } from "@/api/exercise";
import { UUID } from "node:crypto";
import { customCommand, customQuery } from "@/api/customFetch";

export type workoutsDto = {
  id: UUID;
  date: Date;
};

export type workoutDetailsDto = {
  id: UUID;
  date: Date;
  exercises: exerciseDto[];
};

export type createWorkoutCommand = {
  date: Date;
  exerciseTypeId: UUID;
};

export async function getWorkouts(): Promise<workoutsDto[]> {
  return await customQuery("workouts");
}

export async function getWorkout(id: UUID): Promise<workoutDetailsDto> {
  return await customQuery("workouts/" + `${id}`);
}

export async function getWorkoutByDate(date: Date): Promise<workoutDetailsDto> {
  const dateString = date.toISOString();
  return await customQuery<workoutDetailsDto>("workouts/" + `${dateString}`);
}

export async function createWorkout(command: createWorkoutCommand): Promise<UUID> {
  return await customCommand<createWorkoutCommand>("workouts", "POST", command);
}
