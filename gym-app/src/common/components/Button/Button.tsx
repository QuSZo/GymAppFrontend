import styles from "./Button.module.scss";
import { cn } from "@/utils/className";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  styling?: "normal" | "delete" | "cancel";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ styling = "normal", ...props }: ButtonProps) {
  return (
    <button
      id={props.id}
      type={props.type}
      className={cn(styles.buttonContainer, styles[styling], props.className)}
      onClick={props.onClick}
      popoverTarget={props.popoverTarget}
    >
      {props.children}
    </button>
  );
}
