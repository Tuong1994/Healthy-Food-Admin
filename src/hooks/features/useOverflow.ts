import { useEffect, useCallback } from "react";

const useOverflow = (trigger: boolean) => {
  const disabledScrollable = useCallback(() => {
    if (trigger) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [trigger]);

  useEffect(() => disabledScrollable(), [trigger]);
};

export default useOverflow;
