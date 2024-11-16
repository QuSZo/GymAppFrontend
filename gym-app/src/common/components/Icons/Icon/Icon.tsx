import { cn } from "@/utils/className";
import PlusIconBoldSvg from "./svgs/add/PlusIconBoldSvg.svg";
import PlusIconCircleEmptySvg from "./svgs/add/PlusIconCircleEmptySvg.svg";
import DeleteIcon from "./svgs/delete/deleteIcon.svg";
import CalendarIcon from "./svgs/calendar/calendarIcon.svg";
import EmailIcon from "./svgs/email/emailIcon.svg";
import CheckIcon from "./svgs/check/checkIcon.svg";
import ArrowUpIcon from "./svgs/arrows/arrowUp.svg";
import ArrowDownIcon from "./svgs/arrows/arrowDown.svg";
import styles from "../Icon.module.scss";
import { forwardRef } from "react";

type IconProps = {
  id?: string;
  name: "add" | "addCircle" | "delete" | "calendar" | "email" | "check" | "arrowUp" | "arrowDown";
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
    case "calendar":
      iconHref = `${CalendarIcon}#CalendarIcon`;
      break;
    case "email":
      iconHref = `${EmailIcon}#EmailIcon`;
      break;
    case "check":
      iconHref = `${CheckIcon}#CheckIcon`;
      break;
    case "arrowUp":
      iconHref = `${ArrowUpIcon}#ArrowUpIcon`;
      break;
    case "arrowDown":
      iconHref = `${ArrowDownIcon}#ArrowDownIcon`;
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
