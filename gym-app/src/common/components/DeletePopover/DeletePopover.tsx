import Dialog from "@/common/components/Dialog/Dialog";
import styles from "./DeletePopover.module.scss";
import Button from "@/common/components/Button/Button";

type DeletePopoverProps = {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  deleteText: string;
  followedItemId: HTMLElement | null;
  side?: "left" | "bottom";
};

export default function DeletePopover(props: DeletePopoverProps) {
  function handleOnDelete() {
    props.onDelete();
    props.onClose();
  }

  return (
    <Dialog
      onClose={props.onClose}
      show={props.show}
      portalRoot={"popover"}
      followedItem={props.followedItemId}
      classNameModal={styles.modal}
      classNameOverflow={styles.overflow}
      side={props.side}
    >
      <div className={styles.popoverContainer}>
        <p>{props.deleteText}</p>
        <div className={styles.popoverContainerButtonWrapper}>
          <Button className={styles.popoverContainerButton} type={"button"} styling={"cancel"} onClick={props.onClose}>
            Anuluj
          </Button>
          <Button className={styles.popoverContainerButton} type={"button"} styling={"delete"} onClick={handleOnDelete}>
            Usuń
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
