import { exercise } from "@/api/exercise";
import { API_URL } from "@/api/conf";

export type workout = {
  date: Date;
  exercises: exercise[];
};

export async function getWorkouts(): Promise<workout[]> {
  return await fetch(API_URL + "workouts").then((res) => res.json());
}

export async function getWorkout(date: string): Promise<workout> {
  const response = await fetch(API_URL + "workouts?date=" + `${date}`).then(
    (res) => res.json(),
  );
  return response[0];
}
