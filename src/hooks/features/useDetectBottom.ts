import { RefObject, useState, useEffect } from "react";

const useDetectBottom = (ref: RefObject<HTMLElement>, distance = 250) => {
  if (typeof window === "undefined") return;
  const [bottom, setBottom] = useState<boolean>(false);

  let elBottom = 0;

  useEffect(() => {
    if (!ref.current) return setBottom(false);
    elBottom = ref.current.getBoundingClientRect().bottom;
    if (window.innerHeight - elBottom < distance) return setBottom(true);
    setBottom(false);
  }, [elBottom, window.innerHeight]);

  return bottom;
};

export default useDetectBottom;
