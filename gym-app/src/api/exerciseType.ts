import { API_URL } from "@/api/conf";

export type exerciseTypeDetails = {
  name: string;
  exerciseCategoryId: string;
};

export async function getExerciseTypes(): Promise<exerciseTypeDetails[]> {
  return await fetch(API_URL + "exerciseTypes").then((res) => res.json());
}
