import { FC } from "react";
import { Card, Button, Space, Typography } from "@/components/UI";
import { HiPlus } from "react-icons/hi2";
import type { Lang } from "@/common/type";
import type { CustomerAddress as AddressType } from "@/services/customer/type";
import AddressForm from "./AddressForm";

const { Paragraph } = Typography;

interface CustomerAddressProps {
  lang: Lang;
  address: AddressType | undefined;
  showAddress: boolean;
  handleShowAddress: () => void;
}

const CustomerAddress: FC<CustomerAddressProps> = ({ lang, address, showAddress, handleShowAddress }) => {
  const renderContent = () => {
    if (!showAddress) {
      return (
        <Button text onClick={handleShowAddress}>
          <Space align="middle">
            <span>{lang.customer.form.address.note}</span>
            <HiPlus />
          </Space>
        </Button>
      );
    }

    return <AddressForm lang={lang} address={address} handleShowAddress={handleShowAddress} />;
  };

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.customer.form.address.title}
        </Paragraph>
      }
    >
      {renderContent()}
    </Card>
  );
};

export default CustomerAddress;
