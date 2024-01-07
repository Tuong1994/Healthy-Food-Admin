import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import { HiPlus } from "react-icons/hi2";
import AddressModal from "./AddressModal";

const { Card, Button, Space, Typography } = UI;

const { Paragraph } = Typography;

interface CustomerAuthProps {
  lang: Lang;
}

const CustomerAuth: React.FC<CustomerAuthProps> = ({ lang }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Card
        rootClassName="card-section"
        head={
          <Paragraph size={16} weight={600}>
            {lang.customer.form.address.title}
          </Paragraph>
        }
      >
        <Button text onClick={handleOpen}>
          <Space align="middle">
            <span>{lang.customer.form.address.note}</span>
            <HiPlus />
          </Space>
        </Button>
      </Card>

      <AddressModal lang={lang} open={open} onCancel={handleClose} />
    </React.Fragment>
  );
};

export default CustomerAuth;
