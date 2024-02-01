import { FC } from "react";
import { Card, InfoRow, Divider } from "@/components/UI";
import { FormItem, TextArea } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import { useLang } from "@/hooks";
import { EPaymentMethod } from "@/services/order/enum";
import getDisplayPaymentMethod from "@/features/order/data-display/getDisplayPaymentMethod";
import utils from "@/utils";

interface OrderGeneralProps {
  lang: Lang;
}

const OrderGeneral: FC<OrderGeneralProps> = ({ lang }) => {
  const { locale } = useLang();

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
        textElement={getDisplayPaymentMethod(lang, EPaymentMethod.TRANSFER)}
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
        text={utils.formatPrice(locale, 250000)}
      />
    </Card>
  );
};

export default OrderGeneral;
