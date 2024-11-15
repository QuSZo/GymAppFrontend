import { UUID } from "node:crypto";
import { customCommand } from "@/api/customFetch";
import { useRouter } from "next/navigation";

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

export async function createExerciseSet(command: createExerciseSetCommand, router: ReturnType<typeof useRouter>) {
  await customCommand("exercise-sets", "POST", router, command);
}

export async function updateExerciseSet(exerciseSetId: UUID, command: updateExerciseSetCommand, router: ReturnType<typeof useRouter>) {
  await customCommand(`exercise-sets/${exerciseSetId}`, "PUT", router, command);
}

export async function deleteExerciseSet(id: UUID, router: ReturnType<typeof useRouter>) {
  await customCommand(`exercise-sets/${id}`, "DELETE", router);
}
