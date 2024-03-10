import { FC, Fragment } from "react";
import { Card, Grid, Loading, Divider } from "@/components/UI";

const { Row, Col } = Grid;

const { Skeleton } = Loading;

interface PermissionsLoadingProps {}

const PermissionsLoading: FC<PermissionsLoadingProps> = () => {
  return (
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
  );
};

export default PermissionsLoading;
