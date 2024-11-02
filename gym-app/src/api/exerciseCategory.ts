import { UUID } from "node:crypto";
import { customQuery } from "@/api/customFetch";

export type exerciseCategory = {
  id: UUID;
  name: string;
};

export async function getExerciseCategories(): Promise<exerciseCategory[]> {
  return await customQuery<exerciseCategory[]>("exercise-categories");
}
