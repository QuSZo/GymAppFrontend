import styles from "./SummaryWorkoutDialog.module.scss";
import Dialog, { DialogProps } from "@/common/components/Dialog/Dialog";
import Button from "@/common/components/Button/Button";
import { copyWorkout, getWorkoutByDate, workoutDetailsDto } from "@/api/controllers/workout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkoutSummary from "@/common/components/WorkoutSummary/WorkoutSummary";

type SummaryWorkoutDialogProps = {
  destinationDate: Date;
  sourceDate: Date;
  onPrevious: () => void;
  onRefresh: () => void;
} & DialogProps;

export default function SummaryWorkoutDialog(props: SummaryWorkoutDialogProps) {
  const [workout, setWorkout] = useState<workoutDetailsDto>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async function getWorkout() {
    setIsLoading(true);
    const workout = await getWorkoutByDate(props.sourceDate, router).catch(() => undefined);
    setWorkout(workout);
    setIsLoading(false);
  }

  async function onCopyWorkout() {
    await copyWorkout(props.destinationDate, props.sourceDate, router);
    props.onClose();
    props.onRefresh();
  }

  useEffect(() => {
    getWorkout();
  }, []);

  return (
    <Dialog portalRoot={"dialog"} show={props.show} onClose={props.onClose} classNameOverflow={styles.overflow} classNameModal={styles.dialog}>
      <p>Trening z dnia: {props.sourceDate.toLocaleDateString()}</p>
      <WorkoutSummary isLoading={isLoading} workout={workout}></WorkoutSummary>
      <div className={styles.buttonContainer}>
        <Button onClick={props.onPrevious} styling={"cancel"}>
          Wybierz inny
        </Button>
        {workout && (
          <Button onClick={onCopyWorkout} styling={"normal"}>
            Skopiuj
          </Button>
        )}
      </div>
    </Dialog>
  );
}
