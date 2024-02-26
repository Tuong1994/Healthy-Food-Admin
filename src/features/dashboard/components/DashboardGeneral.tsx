import { FC, useMemo } from "react";
import { Space, Card, Grid, Typography, Loading } from "@/components/UI";
import { HiInbox, HiShoppingCart, HiUser } from "react-icons/hi2";
import { HiCash } from "react-icons/hi";
import { useLang } from "@/hooks";
import useGetGeneral from "../hooks/useGetGeneral";
import utils from "@/utils";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

const { Skeleton } = Loading;

const ICON_SIZE = 30;

interface DashboardGeneralProps {}

const DashboardGeneral: FC<DashboardGeneralProps> = () => {
  const { locale, lang } = useLang();

  const { data: response, isFetching } = useGetGeneral();

  const totalCustomers = response ? response.data?.totalCustomers : 0;
  const totalProducts = response ? response.data?.totalProducts : 0;
  const totalOrders = response ? response.data?.totalOrders : 0;
  const totalRevenue = response ? response.data?.totalRevenue : 0;

  const items = useMemo(
    () => [
      {
        id: "customers",
        title: lang.dashboard.customers,
        icon: <HiUser size={ICON_SIZE} />,
        total: totalCustomers.toLocaleString(),
      },
      {
        id: "products",
        title: lang.dashboard.products,
        icon: <HiInbox size={ICON_SIZE} />,
        total: totalProducts.toLocaleString(),
      },
      {
        id: "orders",
        title: lang.dashboard.orders,
        icon: <HiShoppingCart size={ICON_SIZE} />,
        total: totalOrders.toLocaleString(),
      },
      {
        id: "revenue",
        title: lang.dashboard.revenue,
        icon: <HiCash size={ICON_SIZE} />,
        total: utils.formatPrice(locale, totalRevenue),
      },
    ],
    [response, lang]
  );

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
                  {lang.common.unit.year} {new Date().getFullYear()}
                </Paragraph>
              </Col>
            </Row>
          }
          rootClassName={`general-item general-item-${idx + 1}`}
        >
          <Space size="md" align="middle" rootClassName="item-total">
            <span>{item.icon}</span>
            {isFetching ? (
              <Skeleton type="title" options={{ width: 150 }} />
            ) : (
              <Paragraph size={20} weight={600}>
                {item.total}
              </Paragraph>
            )}
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
