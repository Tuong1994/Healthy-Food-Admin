import { FC, Dispatch, SetStateAction, Fragment, useState } from "react";
import { Card, Divider, Space, InfoRow, Typography, Button, Tooltip } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { EReceivedType } from "@/services/order/enum";
import { HiPencilAlt } from "react-icons/hi";
import { useRule, useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";
import type { Shipment } from "@/services/shipment/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import type { GeneralInfo } from "@/pages/order/form";
import ConfirmModal from "@/components/Page/ConfirmModal";
import useRemoveShipments from "@/features/shipment/hooks/useRemoveShipments";
import utils from "@/utils";

const { Paragraph } = Typography;

interface OrderReceivedProps {
  lang: Lang;
  isUpdate: boolean;
  shipment: Shipment | undefined;
  onReFetch: () => void;
  handleOpenShipment: () => void;
  setInfo: Dispatch<SetStateAction<GeneralInfo>>;
  setShipment: Dispatch<SetStateAction<Shipment | undefined>>;
}

const OrderReceived: FC<OrderReceivedProps> = ({
  lang,
  isUpdate,
  shipment,
  setInfo,
  setShipment,
  onReFetch,
  handleOpenShipment,
}) => {
  const options = useSelectOption();

  const { common } = useRule();

  const [confirmed, setConfirmed] = useState<boolean>(false);

  const { mutate: removeShipment, isLoading } = useRemoveShipments();

  const infoRowProps: InfoRowProps = {
    hasColon: true,
    labelSpanProps: { span: 8 },
    textSpanProps: { span: 14 },
  };

  const handleSelect = (value: any) => {
    if (value === EReceivedType.DELIVERY) handleOpenShipment();
    setInfo((prev) => ({ ...prev, receivedType: value }));
  };

  const handleEdit = () => handleOpenShipment();

  const handleRemoveClient = () => {
    if (!isUpdate) return setShipment(undefined);
    setConfirmed(!confirmed);
  };

  const handleRemoveApi = () => {
    const ids = shipment?.id;
    removeShipment({ ids }, { onSuccess: () => onReFetch() });
  };

  return (
    <Fragment>
      <Card
        rootClassName="card-section"
        head={
          <Paragraph size={16} weight={600}>
            {lang.order.form.received}
          </Paragraph>
        }
      >
        <FormItem name="receivedType" disabled={Boolean(shipment)} rules={common()}>
          <Select required color="green" options={options.receivedType} onChangeSelect={handleSelect} />
        </FormItem>

        {shipment && (
          <Fragment>
            <Divider>
              <span>{lang.order.form.shipmentInfo}</span>
            </Divider>
            <Space justify="end">
              <Tooltip label={lang.common.actions.edit} placement="left" color="green">
                <Button text onClick={handleEdit}>
                  <HiPencilAlt size={16} />
                </Button>
              </Tooltip>
            </Space>
            <InfoRow {...infoRowProps} label={lang.common.form.label.fullName} text={shipment.fullName} />
            <InfoRow
              {...infoRowProps}
              label={lang.common.form.label.phone}
              text={utils.formatPhoneNumber(shipment.phone)}
            />
            <InfoRow {...infoRowProps} label={lang.common.form.label.email} text={shipment.email} />
            <InfoRow {...infoRowProps} label={lang.common.form.label.fullAddress} text={shipment.address} />
            <Space justify="end">
              <Button ghost color="red" onClick={handleRemoveClient}>
                {lang.common.actions.remove}
              </Button>
            </Space>
          </Fragment>
        )}
      </Card>

      <ConfirmModal
        open={confirmed}
        okButtonProps={{ loading: isLoading }}
        onOk={handleRemoveApi}
        onCancel={handleRemoveClient}
        desciption={
          <Paragraph align="center" variant="danger">
            {lang.common.description.confirm}
          </Paragraph>
        }
      />
    </Fragment>
  );
};

export default OrderReceived;
