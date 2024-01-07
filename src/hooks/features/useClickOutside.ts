import React from "react";

const useClickOutside = (
  ref: React.RefObject<any>,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setTrigger(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);
};

export default useClickOutside;
