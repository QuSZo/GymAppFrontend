import { createPortal } from "react-dom";
import styles from "./Dialog.module.scss";
import { useEffect, useState } from "react";
import { cn } from "@/utils/className";

export type DialogProps = {
  show?: boolean;
  onClose: () => void;
  className?: string;
};

type ClientPortalProps = {
  children: React.ReactNode;
} & DialogProps;

export default function ClientDialog(props: ClientPortalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portalRoot = document.getElementById("myportal");
    setPortalRoot(portalRoot);

    if (props.show) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [props.show]);

  const handleOverlayClick = () => {
    props.onClose();
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return props.show && portalRoot
    ? createPortal(
        <div className={styles.overflow} onMouseDown={handleOverlayClick}>
          <div
            className={cn(styles.modal, props.className)}
            onMouseDown={handleModalContentClick}
          >
            {props.children}
          </div>
        </div>,
        portalRoot,
      )
    : null;
}
