import { FC, Fragment, useState } from "react";
import { Card, Button, Space, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";
import { HiPlus } from "react-icons/hi2";
import AddressModal from "./AddressModal";

const { Paragraph } = Typography;

interface CustomerAddressProps {
  lang: Lang;
}

const CustomerAddress: FC<CustomerAddressProps> = ({ lang }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default CustomerAddress;
