import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import { HiInbox, HiShoppingCart, HiUser } from "react-icons/hi2";
import { HiCash } from "react-icons/hi";

const { Space, Card, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

const ICON_SIZE = 30;

interface DashboardGeneralProps {
  lang: Lang;
}

const DashboardGeneral: React.FC<DashboardGeneralProps> = ({ lang }) => {
  const items = [
    { id: "customers", title: lang.dashboard.customers, icon: <HiUser size={ICON_SIZE} />, total: 2350 },
    { id: "products", title: lang.dashboard.products, icon: <HiInbox size={ICON_SIZE} />, total: 500 },
    { id: "orders", title: lang.dashboard.orders, icon: <HiShoppingCart size={ICON_SIZE} />, total: 1500 },
    { id: "revenue", title: lang.dashboard.revenue, icon: <HiCash size={ICON_SIZE} />, total: 340545000 },
  ];

  const renderItems = () => {
    return items.map((item, idx) => (
      <Col key={item.id} xs={24} md={12} lg={12} span={6}>
        <Card
          hoverable
          head={
            <Row justify="between" rootClassName="item-head">
              <Col>
                <Paragraph size={16} weight={600}>
                  {item.title}
                </Paragraph>
              </Col>
              <Col>
                <Paragraph size={10} italic>
                  {lang.common.unit.year} 2023
                </Paragraph>
              </Col>
            </Row>
          }
          rootClassName={`general-item general-item-${idx + 1}`}
        >
          <Space size="md" align="middle" rootClassName="item-total">
            <span>{item.icon}</span>
            <Paragraph size={25} weight={600}>
              {item.total.toLocaleString()}
            </Paragraph>
          </Space>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="dashboard-general">
      <Row>{renderItems()}</Row>
    </div>
  );
};

export default DashboardGeneral;
