import { exerciseDto } from "@/api/controllers/exercise";
import { UUID } from "node:crypto";
import { customCommand, customQuery } from "@/api/customFetch";
import { useRouter } from "next/navigation";

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

export type copyWorkoutCommand = {
  destinationDate: string;
  sourceDate: string;
};

export async function getWorkouts(router: ReturnType<typeof useRouter>, signal?: AbortSignal): Promise<workoutsDto[]> {
  const response = await customQuery("workouts", router, signal);
  return response.json();
}

export async function getWorkout(id: UUID, router: ReturnType<typeof useRouter>): Promise<workoutDetailsDto> {
  const response = await customQuery("workouts/" + `${id}`, router);
  return response.json();
}

export async function getWorkoutByDate(date: Date, router: ReturnType<typeof useRouter>, signal?: AbortSignal): Promise<workoutDetailsDto> {
  const dateString = date.toLocaleDateString("sv-SE");
  const response = await customQuery("workouts/" + `${dateString}`, router, signal);
  return response.json();
}

export async function createWorkout(command: createWorkoutCommand, router: ReturnType<typeof useRouter>) {
  await customCommand<createWorkoutCommand>("workouts", "POST", router, command);
}

export async function copyWorkout(destinationDate: Date, sourceDate: Date, router: ReturnType<typeof useRouter>) {
  const command: copyWorkoutCommand = {
    destinationDate: destinationDate.toLocaleDateString("sv-SE"),
    sourceDate: sourceDate.toLocaleDateString("sv-SE"),
  };
  await customCommand<copyWorkoutCommand>("workouts/copy", "POST", router, command);
}
