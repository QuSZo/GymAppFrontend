import styles from "./CircleIconButton.module.scss";
import PlusIcon from "@/common/components/Icons/AddIcon/PlusIcon";

type CircleIconButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CircleIconButton(props: CircleIconButtonProps) {
  return (
    <button onClick={props.onClick} className={styles.main}>
      <PlusIcon classNameSvg={styles.svg} classNameIcon={styles.icon} />
      {props.children ? <p className={styles.text}>{props.children}</p> : null}
    </button>
  );
}
