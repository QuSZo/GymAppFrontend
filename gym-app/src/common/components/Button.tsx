import styles from "./Button.module.scss";
import { cn } from "@/utils/className";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      className={cn(styles.buttonContainer, props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
