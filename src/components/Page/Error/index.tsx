import { FC, Fragment } from "react";
import { Typography } from "@/components/UI";
import { useLang } from "@/hooks";
import type { ParagraphProps } from "@/components/UI/Typography/Paragraph";

const { Paragraph } = Typography;

interface ErrorProps extends ParagraphProps {
  message?: string;
}

const Error: FC<ErrorProps> = ({ message, ...restProps }) => {
  const { lang } = useLang();

  const paragraphDefaultProps: ParagraphProps = {
    align: "center",
    variant: "secondary",
    italic: true,
    ...restProps,
  };

  return (
    <Fragment>
      <Paragraph {...paragraphDefaultProps}>{message ?? lang.common.description.noData}</Paragraph>
    </Fragment>
  );
};

export default Error;
