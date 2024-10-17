import Dialog, { DialogProps } from "@/common/components/Dialog/Dialog";
import { Input } from "@/common/components";
import { useRef, useState } from "react";
import styles from "./AddExerciseDialog.module.scss";
import Select, { SelectOption } from "@/common/components/Select/Select";
import { exerciseCategory } from "@/api/exerciseCategory";
import { exerciseTypeDetails } from "@/api/exerciseType";

type AddExerciseDialogProps = {
  exerciseCategories: exerciseCategory[];
  exerciseTypes: exerciseTypeDetails[];
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

  const selectOptions: SelectOption[] = props.exerciseCategories.map(
    (exerciseCategory) => {
      const selectOption: SelectOption = {
        label: exerciseCategory.name,
        value: exerciseCategory.id.toString(),
      };
      return selectOption;
    },
  );

  return (
    <Dialog show={props.show} onClose={closeDialog} className={styles.dialog}>
      <p className={styles.dialogTitle}>Dodaj ćwiczenie</p>
      <form className={styles.dialogForm}>
        <Select onChange={setExerciseTypeSelect} options={selectOptions} />
        <Input
          ref={ref}
          onChange={(e) => setSearchExercise(e.target.value)}
          placeholder="Wyszukaj..."
        />
      </form>
      <div className={styles.dialogExerciseWrapper}>
        {props.exerciseTypes
          .filter(
            (exerciseType) =>
              exerciseType.name
                .toLowerCase()
                .includes(searchExercise.toLowerCase()) &&
              (exerciseType.exerciseCategoryId == exerciseTypeSelect ||
                exerciseTypeSelect == ""),
          )
          .map((exerciseType, index) => (
            <button key={index} className={styles.dialogExercise}>
              {exerciseType.name}
            </button>
          ))}
      </div>
    </Dialog>
  );
}
