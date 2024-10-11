import { exerciseSet } from "@/api/exerciseSet";

export type exercise = {
  exerciseTypeName: string;
  exerciseSets: exerciseSet[];
};
