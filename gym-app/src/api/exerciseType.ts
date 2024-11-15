import { UUID } from "node:crypto";
import { customQuery } from "@/api/customFetch";

export type exerciseTypeDetails = {
  id: UUID;
  name: string;
  exerciseCategoryId: UUID;
};

export async function getExerciseTypes(): Promise<exerciseTypeDetails[]> {
  const response = await customQuery("exercise-types");
  return response.json();
}
