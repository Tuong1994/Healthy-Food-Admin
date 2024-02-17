import { FC } from "react";
import { Card, InfoRow, Divider, Typography } from "@/components/UI";
import { FormItem, TextArea } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import type { OrderItem } from "@/services/order/type";
import type { GeneralInfo } from "@/pages/order/form";
import { useLang } from "@/hooks";
import getDisplayPaymentMethod from "@/features/order/data-display/getDisplayPaymentMethod";
import getTotalPayment from "../../helper/getTotalPayment";
import sumQuantity from "../../helper/sumQuantity";
import utils from "@/utils";

const { Paragraph } = Typography;

interface OrderGeneralProps {
  lang: Lang;
  info: GeneralInfo;
  totalPrice: number;
  selectedItems: OrderItem[];
}

const OrderGeneral: FC<OrderGeneralProps> = ({ lang, selectedItems, info, totalPrice }) => {
  const { locale } = useLang();

  const infoRowProps: InfoRowProps = {
    hasColon: true,
    labelSpanProps: { span: 8 },
    textSpanProps: { span: 8 },
  };

  const { paymentBeforeTax, taxFee, totalPayment } = getTotalPayment(totalPrice, info.shipmentFee as number);

  return (
    <Card>
      <Paragraph variant="secondary" italic size={13}>
        {lang.order.form.shipmentFeeNote}
      </Paragraph>

      <FormItem name="note">
        <TextArea label={lang.common.form.label.note} />
      </FormItem>

      <InfoRow
        {...infoRowProps}
        label={lang.order.form.paymentMethods}
        textElement={getDisplayPaymentMethod(lang, info.method as number)}
      />
      <InfoRow {...infoRowProps} label={lang.order.form.quantity} text={String(sumQuantity(selectedItems))} />
      <InfoRow
        {...infoRowProps}
        label={lang.order.form.totalPrice}
        text={utils.formatPrice(locale, totalPrice)}
      />
      <InfoRow
        {...infoRowProps}
        label={lang.order.form.shipmentFee}
        text={utils.formatPrice(locale, info.shipmentFee)}
      />
      <InfoRow
        {...infoRowProps}
        label={lang.order.form.totalPricePreTax}
        text={utils.formatPrice(locale, paymentBeforeTax)}
      />
      <InfoRow {...infoRowProps} label={lang.order.form.tax} text={utils.formatPrice(locale, taxFee)} />
      <Divider />
      <InfoRow
        {...infoRowProps}
        labelProps={{ size: 16 }}
        textProps={{ variant: "success", size: 16 }}
        label={lang.order.form.totalPayment}
        text={utils.formatPrice(locale, totalPayment)}
      />
    </Card>
  );
};

export default OrderGeneral;
