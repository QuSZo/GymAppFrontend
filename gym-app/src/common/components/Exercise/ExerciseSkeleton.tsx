import styles from "@/common/components/Exercise/ExerciseSkeleton.module.scss";
import ExerciseSetSkeleton from "@/common/components/Exercise/ExerciseSet/ExerciseSetSkeleton";

export default function ExerciseSkeleton() {
  const exerciseSetRandomArrayLen = Math.floor(Math.random() * (5 - 2) + 2);
  const exerciseSetRandom = new Array(exerciseSetRandomArrayLen).fill(null);
  const exerciseNameRandomArrayLen = Math.floor(Math.random() * (40 - 20) + 20);
  const exerciseNameRandomArray = new Array(exerciseNameRandomArrayLen).fill("x");
  return (
    <div className={styles.main}>
      <div className={styles.mainExerciseName}>
        <p>{exerciseNameRandomArray.map((value, index) => value)}</p>
      </div>
      <div className={styles.mainExerciseSetsContainer}>
        {exerciseSetRandom.map((exerciseSet, index) => (
          <ExerciseSetSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
