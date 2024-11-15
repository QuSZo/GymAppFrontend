import Dialog, { DialogProps } from "@/common/components/Dialog/Dialog";
import { Input } from "@/common/components";
import { useMemo, useRef, useState } from "react";
import styles from "./AddExerciseDialog.module.scss";
import Select, { SelectOption } from "@/common/components/Select/Select";
import { exerciseCategory } from "@/api/controllers/exerciseCategory";
import { exerciseTypeDetails } from "@/api/controllers/exerciseType";
import { UUID } from "node:crypto";

type AddExerciseDialogProps = {
  exerciseCategories: exerciseCategory[];
  exerciseTypes: exerciseTypeDetails[];
  onAddExercise: (exerciseTypeId: UUID) => void;
} & DialogProps;

export default function AddExerciseDialog(props: AddExerciseDialogProps) {
  const ref = useRef(null);
  const [searchExercise, setSearchExercise] = useState("");
  const [exerciseTypeSelect, setExerciseTypeSelect] = useState("");

  function closeDialog() {
    setSearchExercise("");
    setExerciseTypeSelect("");
    props.onClose();
  }

  function onAddExercise(exerciseId: UUID) {
    closeDialog();
    props.onAddExercise(exerciseId);
  }

  const selectOptions: SelectOption[] = props.exerciseCategories.map((exerciseCategory) => {
    const selectOption: SelectOption = {
      label: exerciseCategory.name,
      value: exerciseCategory.id.toString(),
    };
    return selectOption;
  });

  const filterExerciseTypes = useMemo(() => {
    return props.exerciseTypes.filter(
      (exerciseType) =>
        exerciseType.name.toLowerCase().includes(searchExercise.toLowerCase()) &&
        (exerciseType.exerciseCategoryId === exerciseTypeSelect || exerciseTypeSelect === ""),
    );
  }, [props.exerciseTypes, searchExercise, exerciseTypeSelect]);

  return (
    <Dialog portalRoot={"dialog"} show={props.show} onClose={closeDialog} classNameOverflow={styles.overflow} classNameModal={styles.dialog}>
      <p className={styles.dialogTitle}>Dodaj ćwiczenie</p>
      <form className={styles.dialogForm}>
        <Select onChange={setExerciseTypeSelect} options={selectOptions} />
        <Input ref={ref} onChange={(e) => setSearchExercise(e.target.value)} placeholder="Wyszukaj..." />
      </form>
      <div className={styles.dialogExerciseWrapper}>
        {filterExerciseTypes.map((exerciseType, index) => (
          <div key={index} className={styles.dialogExercise} onClick={() => onAddExercise(exerciseType.id)}>
            {exerciseType.name}
          </div>
        ))}
      </div>
    </Dialog>
  );
}
