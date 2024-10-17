import { cn } from "@/utils/className";
import PlusIconCircleEmptySvg from "./PlusIconCircleEmptySvg.svg";
import styles from "../Icon.module.scss";

type IconProps = {
  onClick?: () => void;
  classNameSvg?: string;
  classNameIcon?: string;
};

export default function PlusIconCircle(props: IconProps) {
  return (
    <svg onClick={props.onClick} className={cn(styles.svg, props.classNameSvg)}>
      <use
        href={`${PlusIconCircleEmptySvg}#AddIconSvg`}
        className={cn(styles.icon, props.classNameIcon)}
      />
    </svg>
  );
}
