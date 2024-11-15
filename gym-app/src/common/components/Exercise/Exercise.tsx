import styles from "./Exercise.module.scss";
import ExerciseSet from "@/common/components/Exercise/ExerciseSet/ExerciseSet";
import { deleteExercise, exerciseDto } from "@/api/controllers/exercise";
import {
  createExerciseSet,
  createExerciseSetCommand,
  deleteExerciseSet,
  exerciseSetDto,
  updateExerciseSetCommand,
  updateExerciseSet,
} from "@/api/controllers/exerciseSet";
import AddExerciseSetDialog, { exerciseSet } from "@/common/components/Exercise/AddOrEditExerciseSetDialog/AddExerciseSetDialog";
import { useRef, useState } from "react";
import EditExerciseSetDialog from "@/common/components/Exercise/AddOrEditExerciseSetDialog/EditExerciseSetDialog";
import { Icon } from "@/common/components/Icons/Icon/Icon";
import { UUID } from "node:crypto";
import DeletePopover from "@/common/components/DeletePopover/DeletePopover";
import { useRouter } from "next/navigation";

type ExerciseProps = {
  exercise: exerciseDto;
  onRefresh: () => void;
};

export default function Exercise(props: ExerciseProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedSet, setSelectedSet] = useState<exerciseSetDto>();
  const popoverButtonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  async function onDeleteExercise() {
    await deleteExercise(props.exercise.id, router);
    props.onRefresh();
  }

  async function onAddExerciseSet(exerciseSet: exerciseSet) {
    const command: createExerciseSetCommand = { exerciseId: props.exercise.id, reps: exerciseSet.reps, quantity: exerciseSet.quantity };
    await createExerciseSet(command, router);
    props.onRefresh();
  }

  async function onDeleteExerciseSet(id: UUID) {
    await deleteExerciseSet(id, router);
    props.onRefresh();
  }

  async function onEditExerciseSet(exerciseSetId: UUID, exerciseSet: exerciseSet) {
    const command: updateExerciseSetCommand = { reps: exerciseSet.reps, quantity: exerciseSet.quantity };
    await updateExerciseSet(exerciseSetId, command, router);
    props.onRefresh();
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainTitleContainer}>
          <p className={styles.mainExerciseName}>{props.exercise.exerciseTypeName}</p>
          <Icon
            ref={popoverButtonRef}
            id={"showPopoverButton"}
            onClick={() => setShowPopover(true)}
            name={"delete"}
            classNameIcon={styles.icon}
            classNameSvg={styles.svg}
          />
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
