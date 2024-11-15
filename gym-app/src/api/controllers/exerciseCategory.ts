import { UUID } from "node:crypto";
import { customQuery } from "@/api/customFetch";
import { useRouter } from "next/navigation";

export type exerciseCategory = {
  id: UUID;
  name: string;
};

export async function getExerciseCategories(router: ReturnType<typeof useRouter>): Promise<exerciseCategory[]> {
  const response = await customQuery("exercise-categories", router);
  return response.json();
}
