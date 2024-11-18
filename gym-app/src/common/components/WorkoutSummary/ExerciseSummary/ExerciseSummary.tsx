import styles from "./ExerciseSummary.module.scss";
import { exerciseSetDto } from "@/api/controllers/exerciseSet";
import { exerciseDto } from "@/api/controllers/exercise";
import ExerciseSetSummary from "@/common/components/WorkoutSummary/ExerciseSummary/ExerciseSetSummary/ExerciseSetSummary";

type ExerciseSummaryProps = {
  exercise: exerciseDto;
};

export default function ExerciseSummary(props: ExerciseSummaryProps) {
  return (
    <div className={styles.main}>
      <p className={styles.mainExerciseName}>{props.exercise.exerciseTypeName}</p>
      <div className={styles.mainExerciseSetsContainer}>
        {props.exercise.exerciseSets.map((exerciseSet: exerciseSetDto, index: number) => (
          <ExerciseSetSummary key={index} exerciseSet={exerciseSet} />
        ))}
      </div>
    </div>
  );
}
