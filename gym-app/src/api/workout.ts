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
  const response = await customQuery("workouts", signal);
  return response.json();
}

export async function getWorkout(id: UUID): Promise<workoutDetailsDto> {
  const response = await customQuery("workouts/" + `${id}`);
  return response.json();
}

export async function getWorkoutByDate(date: Date, signal?: AbortSignal): Promise<workoutDetailsDto> {
  const dateString = date.toLocaleDateString("sv-SE");
  const response = await customQuery("workouts/" + `${dateString}`, signal);
  return response.json();
}

export async function createWorkout(command: createWorkoutCommand) {
  await customCommand<createWorkoutCommand>("workouts", "POST", command);
}
