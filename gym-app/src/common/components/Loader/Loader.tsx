import styles from "./Loader.module.scss";
import { cn } from "@/utils/className";

type LoaderProps = {
  className?: string;
};

export default function Loader(props: LoaderProps) {
  return <span className={cn(styles.loader, props.className)}></span>;
}
