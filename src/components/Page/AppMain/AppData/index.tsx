import { FC, Fragment, ReactNode } from "react";
import useGetCities from "./hooks/useGetCities";

interface AppDataProps {
  children?: ReactNode;
}

const AppData: FC<AppDataProps> = ({ children }) => {
  useGetCities(true);

  return <Fragment>{children}</Fragment>;
};

export default AppData;
