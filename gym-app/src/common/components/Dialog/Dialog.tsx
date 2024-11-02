import { createPortal } from "react-dom";
import styles from "./Dialog.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/className";

export type DialogProps = {
  show?: boolean;
  onClose: () => void;
  classNameOverflow?: string;
  classNameModal?: string;
  portalRoot?: string;
  followedItem?: HTMLElement | null;
  side?: "left" | "bottom";
};

type ClientPortalProps = {
  children: React.ReactNode;
} & DialogProps;

export default function Dialog(props: ClientPortalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const updateDialogPosition = useCallback(() => {
    if (props.followedItem && ref.current) {
      const rect = props.followedItem.getBoundingClientRect();
      if (props.side === "bottom" || props.side == null) {
        ref.current.style.left = `${rect.left - 11}px`;
        ref.current.style.top = `${rect.top + (props.followedItem.offsetHeight ?? 0) + 1}px`;
      } else if (props.side === "left") {
        ref.current.style.left = `${rect.left - 11 - 200 + (props.followedItem.offsetWidth ?? 0)}px`;
        ref.current.style.top = `${rect.top + (props.followedItem.offsetHeight ?? 0) + 1}px`;
      }
    }
  }, [props.followedItem]);

  useEffect(() => {
    const portalRoot = document.getElementById(props.portalRoot ?? "myportal");
    setPortalRoot(portalRoot);

    if (props.followedItem && ref.current) {
      ref.current.style.position = "absolute";
      updateDialogPosition();
    }

    if (props.show) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [props.show]);

  useEffect(() => {
    window.addEventListener("scroll", updateDialogPosition);
    window.addEventListener("resize", updateDialogPosition);

    return () => {
      window.removeEventListener("scroll", updateDialogPosition);
      window.removeEventListener("resize", updateDialogPosition);
    };
  });

  const handleOverlayClick = () => {
    ref.current?.classList.add(styles.close);
    setTimeout(props.onClose, 50);
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return props.show && portalRoot
    ? createPortal(
        <div className={cn(styles.overflow, props.classNameOverflow)} onMouseDown={handleOverlayClick}>
          <div ref={ref} className={cn(styles.modal, props.classNameModal)} onMouseDown={handleModalContentClick}>
            {props.children}
          </div>
        </div>,
        portalRoot,
      )
    : null;
}
