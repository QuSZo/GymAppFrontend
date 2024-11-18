import { workoutDetailsDto } from "@/api/controllers/workout";
import ExerciseSkeleton from "@/common/components/Exercise/ExerciseSkeleton";
import ExerciseSummary from "@/common/components/WorkoutSummary/ExerciseSummary/ExerciseSummary";
import styles from "./WorkoutSummary.module.scss";

type WorkoutSummaryProps = {
  isLoading: boolean;
  workout?: workoutDetailsDto;
};

export default function WorkoutSummary(props: WorkoutSummaryProps) {
  if (props.isLoading) {
    return <ExerciseSkeleton />;
  }

  return (
    <div className={styles.container}>
      {props.workout ? (
        props.workout.exercises.map((exercise, key) => <ExerciseSummary key={key} exercise={exercise} />)
      ) : (
        <p>Nie znaleziono treningu</p>
      )}
    </div>
  );
}
