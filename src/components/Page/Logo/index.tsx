import React from "react";
import { UI } from "@/components";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

const { Image } = UI;

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.ForwardRefRenderFunction<HTMLImageElement, LogoProps> = (
  { width = 130, height = 30 },
  ref
) => {
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

export default React.forwardRef(Logo);
