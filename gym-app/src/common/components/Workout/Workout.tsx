import ExerciseSkeleton from "@/common/components/Exercise/ExerciseSkeleton";
import Exercise from "@/common/components/Exercise/Exercise";
import { workoutDetailsDto } from "@/api/controllers/workout";

type WorkoutProps = {
  isLoading: boolean;
  workout?: workoutDetailsDto;
  onRefresh: () => void;
};

export default function Workout(props: WorkoutProps) {
  if (props.isLoading) {
    return <ExerciseSkeleton />;
  }

  if (!props.workout) {
    return <p>Nie znaleziono treningu</p>;
  }

  return (
    <>
      {props.workout.exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} onRefresh={props.onRefresh} />
      ))}
    </>
  );
}
