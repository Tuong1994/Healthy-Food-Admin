import { FC, Fragment } from "react";
import { Card, Grid, Loading, Divider } from "@/components/UI";

const { Row, Col } = Grid;

const { Skeleton } = Loading;

interface PermissionsLoadingProps {}

const PermissionsLoading: FC<PermissionsLoadingProps> = () => {
  return (
    <Row>
      <Col xs={24} md={24} lg={24} span={8}>
        <Card>
          {[...Array(8)].map((_, idx) => (
            <Skeleton key={idx} type="paragraph" options={{ lines: 1, width: 250 }} />
          ))}
        </Card>
      </Col>
      <Col xs={24} md={24} lg={24} span={16}>
        <Card>
          {[...Array(3)].map((_, idx) => (
            <Fragment key={idx}>
              <Row align="middle" justify="between">
                <Col>
                  <Skeleton type="paragraph" options={{ lines: 1, width: 250 }} />
                </Col>
                <Col>
                  <Skeleton type="title" options={{ width: 80 }} />
                </Col>
              </Row>
              {idx !== 2 && <Divider />}
            </Fragment>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default PermissionsLoading;
