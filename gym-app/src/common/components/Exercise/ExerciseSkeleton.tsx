import styles from "@/common/components/Exercise/ExerciseSkeleton.module.scss";
import ExerciseSetSkeleton from "@/common/components/Exercise/ExerciseSet/ExerciseSetSkeleton";

export default function ExerciseSkeleton() {
  const exerciseElements = new Array(4).fill(null);
  const exerciseNameWidth = [200, 150, 250, 175];
  const exerciseSetElements = [new Array(3).fill(null), new Array(4).fill(null), new Array(4).fill(null), new Array(3).fill(null)];

  return exerciseElements.map((value, index) => (
    <div className={styles.main} key={index}>
      <div className={styles.mainExerciseName} style={{ width: exerciseNameWidth[index] }}></div>
      <div className={styles.mainExerciseSetsContainer}>
        {exerciseSetElements[index].map((exerciseSet, indexSet) => (
          <ExerciseSetSkeleton key={indexSet} exerciseIndex={index} exerciseSetIndex={indexSet} />
        ))}
      </div>
    </div>
  ));
}
