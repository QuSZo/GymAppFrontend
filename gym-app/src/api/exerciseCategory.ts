import { exerciseTypeDetails } from "@/api/exerciseType";
import { UUID } from "node:crypto";
import { API_URL } from "@/api/conf";

export type exerciseCategory = {
  id: string;
  name: string;
};

export type exerciseCategoryDetails = {
  id: UUID;
  name: string;
  exerciseTypes: exerciseTypeDetails[];
};

export async function getExerciseCategories(): Promise<exerciseCategory[]> {
  return await fetch(API_URL + "exerciseCategories").then((res) => res.json());
}
