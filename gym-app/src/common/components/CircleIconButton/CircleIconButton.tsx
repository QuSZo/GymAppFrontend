import styles from "./CircleIconButton.module.scss";
import { Icon } from "@/common/components/Icons/Icon/Icon";

type CircleIconButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CircleIconButton(props: CircleIconButtonProps) {
  return (
    <button onClick={props.onClick} className={styles.main}>
      <Icon name={"add"} classNameSvg={styles.svg} classNameIcon={styles.icon} />
      {props.children ? <p className={styles.text}>{props.children}</p> : null}
    </button>
  );
}
