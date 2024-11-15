import { exerciseSetDto } from "@/api/controllers/exerciseSet";
import { UUID } from "node:crypto";
import { customCommand } from "@/api/customFetch";
import { useRouter } from "next/navigation";

export type exerciseDto = {
  id: UUID;
  exerciseNumber: number;
  exerciseTypeName: string;
  exerciseSets: exerciseSetDto[];
};

export type createExerciseCommand = {
  exerciseTypeId: UUID;
  workoutId: UUID;
};

export async function addExercise(command: createExerciseCommand, router: ReturnType<typeof useRouter>) {
  await customCommand<createExerciseCommand>("exercises", "POST", router, command);
}

export async function deleteExercise(id: UUID, router: ReturnType<typeof useRouter>) {
  await customCommand<createExerciseCommand>(`exercises/${id}`, "DELETE", router);
}
