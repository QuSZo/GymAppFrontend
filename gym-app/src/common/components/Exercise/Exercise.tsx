import styles from "./Exercise.module.scss";
import ExerciseSet from "@/common/components/Exercise/ExerciseSet/ExerciseSet";
import { ChangeDirectionEnum, deleteExercise, exerciseDto, updateExerciseNumber } from "@/api/controllers/exercise";
import {
  createExerciseSet,
  createExerciseSetCommand,
  deleteExerciseSet,
  exerciseSetDto,
  updateExerciseSet,
  updateExerciseSetCommand,
} from "@/api/controllers/exerciseSet";
import AddExerciseSetDialog, { exerciseSet } from "@/common/components/Exercise/AddOrEditExerciseSetDialog/AddExerciseSetDialog";
import { useRef, useState } from "react";
import EditExerciseSetDialog from "@/common/components/Exercise/AddOrEditExerciseSetDialog/EditExerciseSetDialog";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import { UUID } from "node:crypto";
import DeletePopover from "@/common/components/DeletePopover/DeletePopover";
import { useRouter } from "next/navigation";
import { useLoaderContext } from "@/common/contexts/loaderContext";

type ExerciseProps = {
  exercise: exerciseDto;
  isFirst: boolean;
  isLast: boolean;
  onRefresh: () => void;
};

export default function Exercise(props: ExerciseProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedSet, setSelectedSet] = useState<exerciseSetDto>();
  const popoverButtonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setLoading } = useLoaderContext();

  async function onDeleteExercise() {
    setLoading(true);
    deleteExercise(props.exercise.id, router)
      .then(props.onRefresh)
      .finally(() => setLoading(false));
  }

  async function onAddExerciseSet(exerciseSet: exerciseSet) {
    setLoading(true);
    const command: createExerciseSetCommand = { exerciseId: props.exercise.id, reps: exerciseSet.reps, quantity: exerciseSet.quantity };
    createExerciseSet(command, router)
      .then(props.onRefresh)
      .finally(() => setLoading(false));
  }

  async function onDeleteExerciseSet(id: UUID) {
    setLoading(true);
    deleteExerciseSet(id, router)
      .then(props.onRefresh)
      .finally(() => setLoading(false));
  }

  async function onEditExerciseSet(exerciseSetId: UUID, exerciseSet: exerciseSet) {
    setLoading(true);
    const command: updateExerciseSetCommand = { reps: exerciseSet.reps, quantity: exerciseSet.quantity };
    updateExerciseSet(exerciseSetId, command, router)
      .then(props.onRefresh)
      .finally(() => setLoading(false));
  }

  async function onUpdateExerciseNumber(changeDirection: ChangeDirectionEnum) {
    if (props.isFirst && changeDirection === ChangeDirectionEnum.Up) return;
    else if (props.isLast && changeDirection === ChangeDirectionEnum.Down) return;
    setLoading(true);
    updateExerciseNumber(props.exercise.id, { changeDirection }, router)
      .then(props.onRefresh)
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainTitleContainer}>
          <p className={styles.mainExerciseName}>{props.exercise.exerciseTypeName}</p>
          <div className={styles.iconContainer}>
            <Icon
              name={"arrowUp"}
              onClick={async () => {
                await onUpdateExerciseNumber(ChangeDirectionEnum.Up);
              }}
              classNameIcon={styles.icon}
              classNameSvg={styles.svg}
              data-inactive={props.isFirst.toString()}
            ></Icon>
            <Icon
              name={"arrowDown"}
              onClick={async () => {
                await onUpdateExerciseNumber(ChangeDirectionEnum.Down);
              }}
              classNameIcon={styles.icon}
              classNameSvg={styles.svg}
              data-inactive={props.isLast.toString()}
            ></Icon>
            <Icon
              ref={popoverButtonRef}
              id={"showPopoverButton"}
              onClick={() => setShowPopover(true)}
              name={"delete"}
              classNameIcon={styles.deleteIcon}
              classNameSvg={styles.deleteSvg}
            />
          </div>
        </div>
        <div className={styles.mainExerciseSetsContainer}>
          {props.exercise.exerciseSets.map((exerciseSet: exerciseSetDto, index: number) => (
            <ExerciseSet key={index} exerciseSet={exerciseSet} onClick={(exerciseSet: exerciseSetDto) => setSelectedSet(exerciseSet)} />
          ))}
          <Icon name={"addCircle"} onClick={() => setShowAddDialog(true)} classNameSvg={styles.svg} classNameIcon={styles.icon} />
        </div>
      </div>
      <AddExerciseSetDialog
        portalRoot={"dialog"}
        exerciseId={props.exercise.id}
        onAddExerciseSet={onAddExerciseSet}
        show={showAddDialog}
        onClose={() => setShowAddDialog(false)}
      />
      {selectedSet && (
        <EditExerciseSetDialog
          portalRoot={"dialog"}
          exerciseSet={selectedSet}
          onEditExerciseSet={onEditExerciseSet}
          onDeleteExerciseSet={onDeleteExerciseSet}
          show={true}
          onClose={() => setSelectedSet(undefined)}
        />
      )}
      <DeletePopover
        show={showPopover}
        onClose={() => setShowPopover(false)}
        onDelete={onDeleteExercise}
        deleteText={"Czy na pewno usunąć ćwiczenie?"}
        followedItemId={popoverButtonRef.current}
        side={"left"}
      ></DeletePopover>
    </>
  );
}
