import { FC } from "react";
import { Card, Button, Space, Typography } from "@/components/UI";
import { HiPlus } from "react-icons/hi2";
import type { Lang } from "@/common/type";
import type { CustomerAddress as AddressType } from "@/services/customer/type";
import AddressForm from "./AddressForm";

const { Paragraph } = Typography;

interface CustomerAddressProps {
  lang: Lang;
  isUpdate: boolean;
  showAddress: boolean;
  address: AddressType | undefined;
  onReFetch: () => void;
  handleShowAddress: () => void;
}

const CustomerAddress: FC<CustomerAddressProps> = ({
  lang,
  isUpdate,
  address,
  showAddress,
  onReFetch,
  handleShowAddress,
}) => {
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

    return (
      <AddressForm
        lang={lang}
        isUpdate={isUpdate}
        address={address}
        onReFetch={onReFetch}
        handleShowAddress={handleShowAddress}
      />
    );
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
