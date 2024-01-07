import { useLocation } from "react-router";

const useHasLocationState = () => {
  const location = useLocation();
  const hasState = location.state !== null;
  return hasState;
};

export default useHasLocationState;
