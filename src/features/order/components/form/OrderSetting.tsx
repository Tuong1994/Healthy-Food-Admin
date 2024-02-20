import { FC, Dispatch, SetStateAction } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { useRule, useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";
import type { GeneralInfo } from "@/pages/order/form";
import type { Shipment } from "@/services/shipment/type";
import { EPaymentMethod, EReceivedType } from "@/services/order/enum";

const { Paragraph } = Typography;

interface OrderSettingProps {
  lang: Lang;
  shipment: Shipment | undefined;
  handleOpenShipment: () => void;
  setInfo: Dispatch<SetStateAction<GeneralInfo>>;
}

const OrderSetting: FC<OrderSettingProps> = ({ lang, shipment, setInfo, handleOpenShipment }) => {
  const options = useSelectOption();

  const { common } = useRule();

  const handleSelectMethod = (value: any) => {
    const isCod = value === EPaymentMethod.COD;
    const receivedType = isCod ? EReceivedType.DELIVERY : EReceivedType.STORE;
    setInfo((prev) => ({ ...prev, receivedType, method: value }));
    if (isCod && !shipment) handleOpenShipment();
  };

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.order.form.setting}
        </Paragraph>
      }
    >
      <FormItem name="status" rules={common()}>
        <Select required label={lang.common.form.label.status} options={options.orderStatus} />
      </FormItem>
      <FormItem name="paymentMethod" rules={common()}>
        <Select
          required
          label={lang.common.form.label.paymentMethod}
          options={options.paymentMethod}
          onChangeSelect={handleSelectMethod}
        />
      </FormItem>
      <FormItem name="paymentStatus" rules={common()}>
        <Select required label={lang.common.form.label.paymentStatus} options={options.paymentStatus} />
      </FormItem>
    </Card>
  );
};

export default OrderSetting;
