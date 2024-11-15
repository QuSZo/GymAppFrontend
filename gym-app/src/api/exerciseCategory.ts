import { UUID } from "node:crypto";
import { customQuery } from "@/api/customFetch";

export type exerciseCategory = {
  id: UUID;
  name: string;
};

export async function getExerciseCategories(): Promise<exerciseCategory[]> {
  const response = await customQuery("exercise-categories");
  return response.json();
}
