import styles from "@/common/components/Exercise/ExerciseSet/ExerciseSetSkeleton.module.scss";

export default function ExerciseSetSkeleton() {
  const exerciseSetRandomArrayLen = Math.floor(Math.random() * (4 - 1) + 1);
  const exerciseSetRandom = new Array(exerciseSetRandomArrayLen).fill("x");
  return (
    <div className={styles.main}>
      {exerciseSetRandom} kg x {10}
    </div>
  );
}
