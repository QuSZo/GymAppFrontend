import styles from "./ExerciseSet.module.scss";
import { exerciseSet } from "@/api/exerciseSet";

type ExerciseSetProps = {
  exerciseSet: exerciseSet;
};

export default function ExerciseSet(props: ExerciseSetProps) {
  return (
    <div className={styles.main}>
      {props.exerciseSet.quantity} kg x {props.exerciseSet.reps}
    </div>
  );
}
