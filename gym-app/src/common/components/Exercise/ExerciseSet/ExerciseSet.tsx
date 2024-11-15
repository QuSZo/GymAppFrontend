import styles from "./ExerciseSet.module.scss";
import { exerciseSetDto } from "@/api/controllers/exerciseSet";

type ExerciseSetProps = {
  exerciseSet: exerciseSetDto;
  onClick: (exerciseSet: exerciseSetDto) => void;
};

export default function ExerciseSet(props: ExerciseSetProps) {
  return (
    <div className={styles.main} onClick={() => props.onClick(props.exerciseSet)}>
      {props.exerciseSet.quantity} kg x {props.exerciseSet.reps}
    </div>
  );
}
