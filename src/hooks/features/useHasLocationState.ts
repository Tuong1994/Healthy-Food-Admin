import { useLocation } from "react-router";

type LocationState = {
  id?: string | number;
  isUser?: boolean;
}

const useHasLocationState = () => {
  const location = useLocation();
  const hasState = location.state !== null;
  const state = location.state as LocationState;
  return { isUpdate: hasState, state };
};

export default useHasLocationState;
