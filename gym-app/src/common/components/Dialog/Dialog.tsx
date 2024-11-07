import { createPortal } from "react-dom";
import styles from "./Dialog.module.scss";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/className";

export type DialogProps = {
  show: boolean;
  onClose: () => void;
  portalRoot: "dialog" | "popover";
  classNameOverflow?: string;
  classNameModal?: string;
  followedItem?: HTMLElement | null;
  side?: "left" | "bottom";
};

type ClientPortalProps = {
  children: React.ReactNode;
} & DialogProps;

export default function Dialog(props: ClientPortalProps) {
  const portalRoot = props.portalRoot ? document.getElementById(props.portalRoot) : document.getElementById("dialog");
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const updateDialogPosition = useCallback(() => {
    if (props.followedItem && dialogRef.current) {
      const followedItemRectangle = props.followedItem.getBoundingClientRect();
      if (props.side === "bottom" || props.side == null) {
        dialogRef.current.style.left = `${followedItemRectangle.left - 11}px`;
        dialogRef.current.style.top = `${followedItemRectangle.top + (props.followedItem.offsetHeight ?? 0) + 1}px`;
      } else if (props.side === "left") {
        dialogRef.current.style.left = `${followedItemRectangle.left - 11 - 200 + (props.followedItem.offsetWidth ?? 0)}px`;
        dialogRef.current.style.top = `${followedItemRectangle.top + (props.followedItem.offsetHeight ?? 0) + 1}px`;
      }
    }
  }, [props.followedItem]);

  useEffect(() => {
    if (props.followedItem && dialogRef.current) {
      dialogRef.current.style.position = "absolute";
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
    dialogRef.current?.classList.add(styles.close);
    setTimeout(props.onClose, 50);
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return props.show && portalRoot
    ? createPortal(
        <div className={cn(styles.overflow, props.classNameOverflow)} onMouseDown={handleOverlayClick}>
          <div ref={dialogRef} className={cn(styles.modal, props.classNameModal)} onMouseDown={handleModalContentClick}>
            {props.children}
          </div>
        </div>,
        portalRoot,
      )
    : null;
}
