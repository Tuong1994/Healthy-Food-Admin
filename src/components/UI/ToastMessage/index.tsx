import React from "react";
import ToastMessageItem from "./Item";
import Portal from "@/components/Portal";
import { useRender } from "@/hooks";
import useToastStore from "./ToastStore";
import utils from "@/utils";

export interface ToastMessageProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  showProgress?: boolean;
}

const ToastMessage: React.ForwardRefRenderFunction<HTMLDivElement, ToastMessageProps> = (
  { rootClassName = "", itemClassName = "", style, itemStyle, showProgress = true },
  ref
) => {
  const toasts = useToastStore((state) => state.toasts);

  const render = useRender(toasts.length > 0);

  const className = utils.formatClassName("toast-message", rootClassName);

  return (
    <Portal>
      {render && (
        <div ref={ref} style={style} className={className}>
          {toasts.map((toast) => (
            <ToastMessageItem
              key={toast.id}
              toast={toast}
              itemClassName={itemClassName}
              itemStyle={itemStyle}
              showProgress={showProgress}
            />
          ))}
        </div>
      )}
    </Portal>
  );
};

export default React.forwardRef(ToastMessage);
