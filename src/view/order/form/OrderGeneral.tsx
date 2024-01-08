import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import { EPaymentMethod } from "@/services/order/enum";
import { useLang } from "@/hooks";
import useDisplayPaymentMethod from "../hooks/useDisplayPaymentMethod";
import utils from "@/utils";

const { Card, InfoRow, Divider } = UI;

const { FormItem, TextArea } = Control;

interface OrderGeneralProps {
  lang: Lang;
}

const OrderGeneral: React.FC<OrderGeneralProps> = ({ lang }) => {
  const { type } = useLang();

  const infoRowProps: InfoRowProps = {
    hasColon: true,
    labelSpanProps: { span: 8 },
    textSpanProps: { span: 8 },
  };

  return (
    <Card>
      <FormItem name="note">
        <TextArea label={lang.common.form.label.note} />
      </FormItem>

      <InfoRow
        {...infoRowProps}
        label={lang.order.form.paymentMethods}
        textElement={useDisplayPaymentMethod(EPaymentMethod.TRANSFER)}
      />
      <InfoRow {...infoRowProps} label={lang.order.form.quantity} text="0" />
      <InfoRow {...infoRowProps} label={lang.order.form.shipmentFee} text="0" />
      <InfoRow {...infoRowProps} label={lang.order.form.tax} text="10%" />
      <Divider />
      <InfoRow
        {...infoRowProps}
        labelProps={{ size: 16 }}
        textProps={{ variant: "success", size: 16 }}
        label={lang.order.form.totalPayment}
        text={utils.formatPrice(type, 250000)}
      />
    </Card>
  );
};

export default OrderGeneral;
