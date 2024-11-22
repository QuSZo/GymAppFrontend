import { forwardRef, useState } from "react";
import { cn } from "@/utils/className";
import styles from "./Input.module.scss";
import { Icon } from "@/common/components/Icons/Icon/Icon";

type InputProps = {
  errorMessage?: string;
  label?: string;
  isLastInput?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { className, errorMessage, label, isLastInput, type, ...inputProps } = props;
  const [focused, setFocused] = useState(false);
  const [localType, setLocalType] = useState(type);

  function onPasswordVisibility() {
    if (localType === "password") setLocalType("text");
    else setLocalType("password");
  }

  return (
    <div className={cn(styles.container, className)}>
      {label ? <label className={styles.label}>{label}</label> : null}
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          type={localType}
          {...inputProps}
          className={styles.input}
          onBlur={() => setFocused(true)}
          onFocus={() => isLastInput && setFocused(true)}
          data-focused={focused.toString()}
        />
        {type === "password" && (
          <div className={styles.iconContainer}>
            <Icon
              name={localType === "password" ? "visibilityOff" : "visibility"}
              classNameSvg={styles.svg}
              classNameIcon={styles.icon}
              onClick={onPasswordVisibility}
            ></Icon>
          </div>
        )}
      </div>

      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
});

Input.displayName = "Input";
