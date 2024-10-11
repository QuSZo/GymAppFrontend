import { cn } from "@/utils/className";
import AddIconSvg from "./AddIconSvg.svg";
import styles from "../Icon.module.scss";

type IconProps = {
  onClick?: () => void;
  classNameSvg?: string;
  classNameIcon?: string;
};

export default function AddIcon(props: IconProps) {
  return (
    <svg onClick={props.onClick} className={cn(styles.svg, props.classNameSvg)}>
      <use
        href={`${AddIconSvg}#AddIconSvg`}
        className={cn(styles.icon, props.classNameIcon)}
      />
    </svg>
  );
}
