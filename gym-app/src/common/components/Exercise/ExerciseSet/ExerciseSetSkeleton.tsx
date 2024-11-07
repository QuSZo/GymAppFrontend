import styles from "@/common/components/Exercise/ExerciseSet/ExerciseSetSkeleton.module.scss";

type ExerciseSetSkeletonProps = {
  exerciseIndex: number;
  exerciseSetIndex: number;
};

export default function ExerciseSetSkeleton(props: ExerciseSetSkeletonProps) {
  const exerciseSetWidth = [
    [110, 95, 80, 105],
    [110, 110, 95, 80],
    [80, 95, 95, 80],
    [110, 95, 95, 95],
  ];

  return <div className={styles.main} style={{ width: exerciseSetWidth[props.exerciseIndex][props.exerciseSetIndex] }}></div>;
}
