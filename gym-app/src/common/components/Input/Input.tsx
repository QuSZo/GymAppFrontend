import { forwardRef, useState } from "react";
import { cn } from "@/utils/className";
import styles from "./Input.module.scss";

type InputProps = {
  errorMessage?: string;
  label?: string;
  isLastInput?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { className, errorMessage, label, isLastInput, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn(styles.container, className)}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <input
        ref={ref}
        {...inputProps}
        className={styles.input}
        onBlur={() => setFocused(true)}
        onFocus={() => isLastInput && setFocused(true)}
        data-focused={focused.toString()}
      />
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
});

Input.displayName = "Input";
