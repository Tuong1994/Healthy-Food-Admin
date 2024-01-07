import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import ContentHeader from "@/components/Page/ContentHeader";
import DashboardGeneral from "./DashboardGeneral";
import DashboardChart from "./DashboardChart";
import DashboardBestSaled from "./DashboadBestSaled";

const { Grid } = UI;

const { Row, Col } = Grid;

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { lang } = useLang();

  return (
    <React.Fragment>
      <ContentHeader hasTotal={false} headTitle={lang.common.menu.dashboard} />
      <DashboardGeneral lang={lang} />
      <Row justify="between">
        <Col xs={24} md={24} lg={24} span={16}>
          <DashboardChart />
        </Col>
        <Col xs={24} md={24} lg={24} span={8}>
          <DashboardBestSaled lang={lang} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Dashboard;
