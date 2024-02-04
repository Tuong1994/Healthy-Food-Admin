import { FC } from "react";
import { Card, Grid, Loading } from "@/components/UI";

const { Skeleton } = Loading;

const { Row, Col } = Grid;

const FormLayoutLoading: FC<{}> = () => {
  return (
    <Row>
      <Col xs={24} md={24} lg={24} span={14}>
        <Card rootClassName="card-section">
          <Skeleton type="paragraph" options={{ lines: 5 }} />
        </Card>
        <Card rootClassName="card-section">
          <Skeleton type="paragraph" options={{ lines: 6 }} />
        </Card>
      </Col>
      <Col xs={24} md={24} lg={24} span={10}>
        <Card rootClassName="card-section">
          <Skeleton type="paragraph" options={{ lines: 8 }} />
        </Card>
        <Card>
          <Skeleton type="paragraph" options={{ lines: 6 }} />
        </Card>
      </Col>
    </Row>
  );
};

export default FormLayoutLoading;
