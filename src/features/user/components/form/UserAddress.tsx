import { FC } from "react";
import { Card, Button, Space, Typography } from "@/components/UI";
import { HiPlus } from "react-icons/hi2";
import type { Lang } from "@/common/type";
import type { UserAddress as AddressType } from "@/services/user/type";
import AddressForm from "./AddressForm";

const { Paragraph } = Typography;

interface UserAddressProps {
  lang: Lang;
  isUpdate: boolean;
  showAddress: boolean;
  canInteract: boolean;
  address: AddressType | undefined;
  onReFetch: () => void;
  handleShowAddress: () => void;
}

const UserAddress: FC<UserAddressProps> = ({
  lang,
  isUpdate,
  address,
  showAddress,
  canInteract,
  onReFetch,
  handleShowAddress,
}) => {
  const renderContent = () => {
    if (!showAddress) {
      return (
        <Button text onClick={handleShowAddress}>
          <Space align="middle">
            <span>{lang.user.form.address.note}</span>
            <HiPlus />
          </Space>
        </Button>
      );
    }

    return (
      <AddressForm
        lang={lang}
        isUpdate={isUpdate}
        canInteract={canInteract}
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
          {lang.user.form.address.title}
        </Paragraph>
      }
    >
      {renderContent()}
    </Card>
  );
};

export default UserAddress;
