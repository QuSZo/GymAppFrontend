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

  function isLast(key: number): boolean {
    if (props.workout && key === props.workout.exercises.length - 1) return true;
    else return false;
  }

  return (
    <>
      {props.workout.exercises.map((exercise, key) => (
        <Exercise key={key} exercise={exercise} isFirst={key === 0} isLast={isLast(key)} onRefresh={props.onRefresh} />
      ))}
    </>
  );
}
