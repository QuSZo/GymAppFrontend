import styles from "./Select.module.scss";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  onChange: (value: string) => void;
};

export default function Select(props: SelectProps) {
  return (
    <select onChange={(e) => props.onChange(e.target.value)} className={styles.select}>
      <option value={""}>Wszystkie</option>
      {props.options.map((option: SelectOption, index: number) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
