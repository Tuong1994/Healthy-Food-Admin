import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import { Link } from "react-router-dom";
import url from "@/common/constant/url";

const { PRODUCT_FORM } = url;

const { Card, Space, Image, Typography } = UI;

const { Paragraph } = Typography;

interface DashboardBestSaledProps {
  lang: Lang;
}

const DashboardBestSaled: React.FC<DashboardBestSaledProps> = ({ lang }) => {
  const renderProducts = () => {
    return [...Array(10)].map((_, idx) => (
      <Link to={PRODUCT_FORM} key={idx} className="body-item">
        <Card bodyClassName="item-content" hoverable>
          <Space size={15}>
            <Image imgWidth={60} imgHeight={60} />
            <div>
              <Paragraph>Product name</Paragraph>
              <Paragraph size={18} weight={600} variant="success">
                100.000
              </Paragraph>
            </div>
          </Space>
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
      {renderProducts()}
    </Card>
  );
};

export default DashboardBestSaled;
