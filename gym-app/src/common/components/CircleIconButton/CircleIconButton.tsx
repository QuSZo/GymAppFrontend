import styles from "./CircleIconButton.module.scss";
import { Icon, IconProps } from "@/common/components/Icons/Icon/Icon";
import { cn } from "@/utils/className";

type CircleIconButtonProps = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  IconProps;

export default function CircleIconButton(props: CircleIconButtonProps) {
  return (
    <button onClick={props.onClick} className={cn(styles.main, props.className)}>
      <Icon name={props.name} classNameSvg={styles.svg} classNameIcon={styles.icon} />
      {props.children ? <p className={styles.text}>{props.children}</p> : null}
    </button>
  );
}
