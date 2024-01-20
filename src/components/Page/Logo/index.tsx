import { ForwardRefRenderFunction, forwardRef } from "react";
import { Image } from "@/components/UI";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: ForwardRefRenderFunction<HTMLImageElement, LogoProps> = ({ width = 130, height = 30 }, ref) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const themeClassName = `logo-${theme}`;

  const className = utils.formatClassName("logo", themeClassName);

  return (
    <div className={className}>
      <Image
        ref={ref}
        imgWidth={width}
        imgHeight={height}
        src="/image/logo/logo-no-background.svg"
        alt="logo"
      />
    </div>
  );
};

export default forwardRef(Logo);
