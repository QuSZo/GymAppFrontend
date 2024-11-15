import { UUID } from "node:crypto";
import { customQuery } from "@/api/customFetch";
import { useRouter } from "next/navigation";

export type exerciseTypeDetails = {
  id: UUID;
  name: string;
  exerciseCategoryId: UUID;
};

export async function getExerciseTypes(router: ReturnType<typeof useRouter>): Promise<exerciseTypeDetails[]> {
  const response = await customQuery("exercise-types", router);
  return response.json();
}
