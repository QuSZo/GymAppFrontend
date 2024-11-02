import { cn } from "@/utils/className";
import PlusIconBoldSvg from "./svgs/add/PlusIconBoldSvg.svg";
import PlusIconCircleEmptySvg from "./svgs/add/PlusIconCircleEmptySvg.svg";
import DeleteIcon from "./svgs/delete/deleteIcon.svg";
import styles from "../Icon.module.scss";
import { forwardRef } from "react";

type IconProps = {
  id?: string;
  name: "add" | "addCircle" | "delete";
  onClick?: () => void;
  classNameSvg?: string;
  classNameIcon?: string;
};

export const Icon = forwardRef<HTMLDivElement, IconProps>((props: IconProps, ref) => {
  let iconHref;

  switch (props.name) {
    case "add":
      iconHref = `${PlusIconBoldSvg}#AddIconSvg`;
      break;
    case "addCircle":
      iconHref = `${PlusIconCircleEmptySvg}#AddIconSvg`;
      break;
    case "delete":
      iconHref = `${DeleteIcon}#DeleteIcon`;
      break;
    default:
      iconHref = `${PlusIconBoldSvg}#AddIconSvg`;
      break;
  }

  return (
    <div ref={ref}>
      <svg id={props.id} onClick={props.onClick} className={cn(styles.svg, props.classNameSvg)}>
        <use href={iconHref} className={cn(styles.icon, props.classNameIcon)} />
      </svg>
    </div>
  );
});

Icon.displayName = "Icon";
