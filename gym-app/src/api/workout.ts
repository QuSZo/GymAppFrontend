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
  date: string;
  exerciseTypeId: UUID;
};

export async function getWorkouts(signal?: AbortSignal): Promise<workoutsDto[]> {
  return await customQuery("workouts", signal);
}

export async function getWorkout(id: UUID): Promise<workoutDetailsDto> {
  return await customQuery("workouts/" + `${id}`);
}

export async function getWorkoutByDate(date: Date, signal?: AbortSignal): Promise<workoutDetailsDto> {
  const dateString = date.toLocaleDateString("sv-SE");
  return await customQuery<workoutDetailsDto>("workouts/" + `${dateString}`, signal);
}

export async function createWorkout(command: createWorkoutCommand): Promise<UUID> {
  return await customCommand<createWorkoutCommand>("workouts", "POST", command);
}
