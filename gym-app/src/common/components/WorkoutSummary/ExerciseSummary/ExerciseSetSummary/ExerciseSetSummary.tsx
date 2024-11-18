import { exerciseSetDto } from "@/api/controllers/exerciseSet";
import styles from "./ExerciseSetSummary.module.scss";

type ExerciseSetSummaryProps = {
  exerciseSet: exerciseSetDto;
};

export default function ExerciseSetSummary(props: ExerciseSetSummaryProps) {
  return (
    <div className={styles.main}>
      {props.exerciseSet.quantity} kg x {props.exerciseSet.reps}
    </div>
  );
}
