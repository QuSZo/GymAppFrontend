import { forwardRef } from "react";
import { cn } from "@/utils/className";
import styles from "./Input.module.scss";

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { className, ...inputProps } = props;

    return (
      <input
        ref={ref}
        {...inputProps}
        className={cn(styles.input, className)}
      />
    );
  },
);

Input.displayName = "Input";
