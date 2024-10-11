import styles from "./Exercise.module.scss";
import ExerciseSet from "@/common/components/Exercise/ExerciseSet/ExerciseSet";
import type { exercise } from "@/api/exercise";
import AddIcon from "@/common/components/Icons/AddIcon/AddIcon";
import { log } from "node:util";

type ExerciseProps = {
  exercise: exercise;
};

export default function Exercise(props: ExerciseProps) {
  return (
    <div className={styles.main}>
      <p className={styles.mainExerciseName}>
        {props.exercise.exerciseTypeName}
      </p>
      <div className={styles.mainExerciseSetsContainer}>
        {props.exercise.exerciseSets.map((exerciseSet, index) => (
          <ExerciseSet key={index} exerciseSet={exerciseSet} />
        ))}
        <AddIcon
          onClick={() => {
            console.log("Działa");
          }}
          classNameSvg={styles.svg}
        />
      </div>
    </div>
  );
}
