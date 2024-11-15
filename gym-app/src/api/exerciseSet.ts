import { UUID } from "node:crypto";
import { customCommand } from "@/api/customFetch";

export type exerciseSetDto = {
  id: UUID;
  setNumber: number;
  quantity: number;
  reps: number;
};

export type createExerciseSetCommand = {
  exerciseId: UUID;
  quantity: number;
  reps: number;
};

export type updateExerciseSetCommand = {
  quantity: number;
  reps: number;
};

export async function createExerciseSet(command: createExerciseSetCommand) {
  await customCommand("exercise-sets", "POST", command);
}

export async function updateExerciseSet(exerciseSetId: UUID, command: updateExerciseSetCommand) {
  await customCommand(`exercise-sets/${exerciseSetId}`, "PUT", command);
}

export async function deleteExerciseSet(id: UUID) {
  await customCommand(`exercise-sets/${id}`, "DELETE");
}
