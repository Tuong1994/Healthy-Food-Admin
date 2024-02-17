import { FC, Fragment, useState } from "react";
import { Button, Space, Typography } from "@/components/UI";
import { FormItem, Input, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { City } from "@/services/city/type";
import type { District } from "@/services/district/type";
import type { Ward } from "@/services/ward/type";
import type { CustomerAddress } from "@/services/customer/type";
import type { ApiQuery } from "@/services/type";
import { HttpStatus } from "@/services/axios";
import { useRule } from "@/hooks";
import ConfirmModal from "@/components/Page/ConfirmModal";
import useLocationStore from "@/store/LocationStore";
import useGetDistricts from "@/components/Page/AppWrapper/AppData/hooks/useGetDistricts";
import useGetWards from "@/components/Page/AppWrapper/AppData/hooks/useGetWards";
import useRemoveAddress from "../../hooks/useRemoveAddress";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import utils from "@/utils";

const { Paragraph } = Typography;

interface AddressFormProps {
  lang: Lang;
  isUpdate: boolean;
  address: CustomerAddress | undefined;
  onReFetch: () => void;
  handleShowAddress: () => void;
}

const AddressForm: FC<AddressFormProps> = ({ lang, isUpdate, address, onReFetch, handleShowAddress }) => {
  const messageApi = useMessage();

  const { common } = useRule();

  const [cities, districts, wards, setDistricts, setWards] = useLocationStore((state) => [
    state.cities,
    state.districts,
    state.wards,
    state.setDistricts,
    state.setWards,
  ]);

  const [cityCode, setCityCode] = useState<number | undefined>(address ? address.cityCode : undefined);

  const [districtCode, setDistrictCode] = useState<number | undefined>(
    address ? address.districtCode : undefined
  );

  const [confirmed, setConfirmed] = useState<boolean>(false);

  const { mutate: onRemoveAddress, isLoading } = useRemoveAddress();

  useGetDistricts(cityCode as number);

  useGetWards(districtCode as number);

  const cityOptions = utils.mapDataToOptions<City>(cities, "name", "code");

  const districtOptions = utils.mapDataToOptions<District>(districts, "name", "code");

  const wardOptions = utils.mapDataToOptions<Ward>(wards, "name", "code");

  const handleSelectCity = (code: any) => {
    setDistricts([]);
    setWards([]);
    setCityCode(code);
  };

  const handleSelectDistrict = (code: any) => {
    setWards([]);
    setDistrictCode(code);
  };

  const handleOpenModal = () => setConfirmed(!confirmed);

  const handleRemoveAddress = () => {
    const apiQuery: ApiQuery = { customerId: address?.customerId };
    onRemoveAddress(apiQuery, {
      onSuccess: (response) => {
        if (!response.success) {
          let message = "";
          if (response.error?.status === HttpStatus.NOT_FOUND) message = lang.common.message.error.remove;
          return messageApi.error(message);
        }
        messageApi.success(lang.common.message.success.remove);
        onReFetch();
      },
    });
  };

  const renderButton = () => {
    if (!isUpdate || !address) {
      return (
        <Button ghost onClick={handleShowAddress}>
          {lang.common.actions.cancel}
        </Button>
      );
    }
    return (
      <Button ghost color="red" onClick={handleOpenModal}>
        {lang.common.actions.remove}
      </Button>
    );
  };

  return (
    <Fragment>
      <FormItem name="address.addressEn" rules={common()}>
        <Input required label={lang.common.form.label.addressEn} />
      </FormItem>
      <FormItem name="address.addressVn" rules={common()}>
        <Input required label={lang.common.form.label.addressVn} />
      </FormItem>
      <FormItem name="address.cityCode" rules={common()}>
        <Select
          required
          label={lang.common.form.label.city}
          options={cityOptions}
          onChangeSelect={handleSelectCity}
        />
      </FormItem>
      <FormItem name="address.districtCode" rules={common()}>
        <Select
          required
          label={lang.common.form.label.district}
          emptyContent={lang.common.form.others.districtsEmpty}
          options={districtOptions}
          onChangeSelect={handleSelectDistrict}
        />
      </FormItem>
      <FormItem name="address.wardCode" rules={common()}>
        <Select
          required
          label={lang.common.form.label.ward}
          emptyContent={lang.common.form.others.wardsEmpty}
          options={wardOptions}
        />
      </FormItem>
      <Space justify="end">{renderButton()}</Space>

      <ConfirmModal
        open={confirmed}
        okButtonProps={{ loading: isLoading }}
        onOk={handleRemoveAddress}
        onCancel={handleOpenModal}
        desciption={
          <Paragraph align="center" variant="danger">
            {lang.common.description.confirm}
          </Paragraph>
        }
      />
    </Fragment>
  );
};

export default AddressForm;
