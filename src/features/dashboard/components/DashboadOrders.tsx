import { FC } from "react";
import { Card, InfoRow, Loading, Grid, Typography, Empty } from "@/components/UI";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import type { Lang } from "@/common/type";
import Error from "@/components/Page/Error";
import getDisplayOrderStatus from "@/features/order/data-display/getDisplayOrderStatus";
import useGetRecentOrders from "../hooks/useGetRecentOrders";
import moment from "moment";

const { ORDER } = linkPaths;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

const { Spinner } = Loading;

interface DashboardOrdersProps {
  lang: Lang;
}

const DashboardOrders: FC<DashboardOrdersProps> = ({ lang }) => {
  const { data: response, isFetching } = useGetRecentOrders();

  const renderOrders = () => {
    if (isFetching)
      return (
        <div className="body-loading">
          <Spinner size={20} color="black" />
        </div>
      );
    if (!response) return <Error />;
    if (!response.success) return <Error />;
    const orders = response.data?.items;
    if (!orders.length) return <Empty text={lang.dashboard.emptyNote} />;
    return orders.map((order) => (
      <Link to={ORDER} key={order.id} state={{ id: order.id }} className="body-item">
        <Card bodyClassName="item-content" hoverable>
          <InfoRow
            labelSpanProps={{ span: 10 }}
            textSpanProps={{ span: 6 }}
            label={lang.common.form.label.orderNumber}
            text={order.orderNumber}
          />
          <Row justify="between">
            <Col>
              <span>{getDisplayOrderStatus(lang, order.status)}</span>
            </Col>
            <Col>
              <Paragraph size={12} variant="secondary">
                {moment(order.createdAt).format("DD/MM/YYYY")}
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </Link>
    ));
  };

  return (
    <Card
      rootClassName="dashboard-list"
      headClassName="list-head"
      bodyClassName="list-body"
      head={
        <Paragraph size={16} weight={600}>
          {lang.dashboard.listTitle}
        </Paragraph>
      }
    >
      {renderOrders()}
    </Card>
  );
};

export default DashboardOrders;
