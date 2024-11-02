import Dialog, { DialogProps } from "@/common/components/Dialog/Dialog";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { FormEvent, useState } from "react";
import styles from "./AddOrEditExerciseSetDialog.module.scss";
import { UUID } from "node:crypto";

type AddExerciseSetDialogProps = {
  exerciseId: UUID;
  onAddExerciseSet: (exerciseSet: exerciseSet) => void;
} & DialogProps;

export type exerciseSet = {
  quantity: number;
  reps: number;
};

export default function AddExerciseSetDialog(props: AddExerciseSetDialogProps) {
  const [reps, setReps] = useState("");
  const [quantity, setQuantity] = useState("");

  function onAddExerciseSet(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const exerciseSetCommand: exerciseSet = { reps: parseInt(reps), quantity: parseInt(quantity) };
    props.onAddExerciseSet(exerciseSetCommand);
    closeDialog();
  }

  function resetStates() {
    setReps("");
    setQuantity("");
  }

  function closeDialog() {
    resetStates();
    props.onClose();
  }

  return (
    <Dialog classNameOverflow={styles.overflow} classNameModal={styles.dialog} show={props.show} onClose={closeDialog}>
      <p className={styles.dialogTitle}>Dodaj serię</p>
      <form onSubmit={onAddExerciseSet} className={styles.form}>
        <div className={styles.inputContainer}>
          <Input
            value={quantity}
            name={"quantity"}
            type="number"
            inputMode="numeric"
            min="0"
            pattern="^[0-9]+$"
            errorMessage={"Pole 'Ilość' musi zawierać liczby"}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            placeholder="Ciężar"
            label="Ciężar (kg)"
            required
          />
          <Input
            value={reps}
            name={"reps"}
            type="number"
            inputMode="numeric"
            min="0"
            pattern="^[0-9]+$"
            errorMessage={"Pole 'Powtórzenia' musi zawierać liczby"}
            onChange={(e) => {
              setReps(e.target.value);
            }}
            placeholder="Potwórzenia"
            label="Potwórzenia"
            required
          />
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.sideButtonsContainer}>
            <Button type={"button"} styling={"cancel"} onClick={closeDialog}>
              Anuluj
            </Button>
          </div>
          <div className={styles.sideButtonsContainer}>
            <Button type={"submit"}>Dodaj</Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
