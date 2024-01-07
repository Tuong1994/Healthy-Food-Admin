import React from "react";
import { UI } from "@/components";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import { TitleProps } from "@/components/UI/Typography/Title";
import { useLang } from "@/hooks";

const { Space, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Title, Paragraph } = Typography;

export interface ContentHeaderProps extends GridRowProps {
  hasTotal?: boolean;
  headTitle?: React.ReactNode;
  headTitleProps?: TitleProps;
  leftSpanProps?: GridColProps;
  rightSpanProps?: GridColProps;
  right?: () => React.ReactNode;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  hasTotal = true,
  headTitle,
  headTitleProps,
  leftSpanProps,
  rightSpanProps,
  right,
  ...restProps
}) => {
  const { lang } = useLang();

  const rootDefaultProps: GridRowProps = { justify: "between", ...restProps };

  const headTitleDefaultProps: TitleProps = { level: 3, ...headTitleProps };

  const leftSpanDefaultProps: GridColProps = { ...leftSpanProps };

  const rightSpanDefaultProps: GridColProps = { ...rightSpanProps };

  return (
    <Row {...rootDefaultProps} rootClassName="content-header">
      <Col {...leftSpanDefaultProps}>
        <Title {...headTitleDefaultProps}>{headTitle}</Title>
        {hasTotal && (
          <Space size={5}>
            <Paragraph size={13} variant="secondary">
              {lang.pageComponent.contentHeader.total}
            </Paragraph>
            <Paragraph size={13}>(100)</Paragraph>
          </Space>
        )}
      </Col>
      <Col {...rightSpanDefaultProps}>{right?.()}</Col>
    </Row>
  );
};

export default ContentHeader;
