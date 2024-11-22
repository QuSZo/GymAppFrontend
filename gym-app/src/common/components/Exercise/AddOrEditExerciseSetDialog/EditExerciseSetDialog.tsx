import Dialog, { DialogProps } from "@/common/components/Dialog/Dialog";
import { Input } from "@/common/components";
import Button from "@/common/components/Button/Button";
import { FormEvent, useEffect, useState } from "react";
import styles from "./AddOrEditExerciseSetDialog.module.scss";
import { exerciseSetDto, updateExerciseSetCommand } from "@/api/controllers/exerciseSet";
import { UUID } from "node:crypto";
import DeletePopover from "@/common/components/DeletePopover/DeletePopover";
import { cn } from "@/utils/className";

type EditExerciseSetDialogProps = {
  exerciseSet: exerciseSetDto;
  onEditExerciseSet: (exerciseSetId: UUID, exerciseSet: updateExerciseSetCommand) => void;
  onDeleteExerciseSet: (id: UUID) => void;
} & DialogProps;

export default function EditExerciseSetDialog(props: EditExerciseSetDialogProps) {
  const [reps, setReps] = useState(props.exerciseSet.reps.toString());
  const [quantity, setQuantity] = useState(props.exerciseSet.quantity.toString());
  const [showPopover, setShowPopover] = useState(false);

  function onEditExerciseSet(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateExerciseCommand: updateExerciseSetCommand = { reps: parseInt(reps), quantity: parseInt(quantity) };
    props.onEditExerciseSet(props.exerciseSet.id, updateExerciseCommand);
    closeDialog();
  }

  function onDeleteExerciseSet() {
    props.onDeleteExerciseSet(props.exerciseSet.id);
    closeDialog();
  }

  function closeDialog() {
    props.onClose();
  }

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const minKeyboardHeight = 300;
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const screenHeight = window.screen.height;

      const keyboardOpen = screenHeight - viewportHeight > minKeyboardHeight;

      if (keyboardOpen !== isKeyboardOpen) {
        setIsKeyboardOpen(keyboardOpen);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, [isKeyboardOpen]);

  return (
    <>
      <Dialog
        portalRoot={"dialog"}
        classNameOverflow={styles.overflow}
        classNameModal={cn(styles.dialog, isKeyboardOpen ? styles.dialogUp : undefined)}
        show={props.show}
        onClose={closeDialog}
      >
        <p className={styles.dialogTitle}>Edytuj serię</p>
        <form onSubmit={onEditExerciseSet} className={styles.form}>
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
              <Button id={"showPopoverButton"} type={"button"} styling={"delete"} onClick={() => setShowPopover(true)}>
                Usuń serię
              </Button>
              <Button type={"submit"} styling={"normal"}>
                Zapisz
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
      <DeletePopover
        onDelete={onDeleteExerciseSet}
        deleteText={"Czy na pewno usunąć serię?"}
        onClose={() => setShowPopover(false)}
        show={showPopover}
        followedItemId={document.getElementById("showPopoverButton")}
      ></DeletePopover>
    </>
  );
}
