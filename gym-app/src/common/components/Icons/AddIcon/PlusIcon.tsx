import { cn } from "@/utils/className";
import PlusIconBoldSvg from "./PlusIconBoldSvg.svg";
import styles from "../Icon.module.scss";

type IconProps = {
  onClick?: () => void;
  classNameSvg?: string;
  classNameIcon?: string;
};

export default function PlusIcon(props: IconProps) {
  return (
    <svg onClick={props.onClick} className={cn(styles.svg, props.classNameSvg)}>
      <use
        href={`${PlusIconBoldSvg}#AddIconSvg`}
        className={cn(styles.icon, props.classNameIcon)}
      />
    </svg>
  );
}
