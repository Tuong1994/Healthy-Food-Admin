import { FC, Fragment, useState } from "react";
import { Button, Space } from "@/components/UI";
import { FormItem, Input, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { City } from "@/services/city/type";
import type { District } from "@/services/district/type";
import type { Ward } from "@/services/ward/type";
import type { CustomerAddress } from "@/services/customer/type";
import { useRule } from "@/hooks";
import useLocationStore from "@/store/LocationStore";
import useGetDistricts from "@/components/Page/AppWrapper/AppData/hooks/useGetDistricts";
import useGetWards from "@/components/Page/AppWrapper/AppData/hooks/useGetWards";
import utils from "@/utils";

interface AddressFormProps {
  lang: Lang;
  address: CustomerAddress | undefined;
  handleShowAddress: () => void;
}

const AddressForm: FC<AddressFormProps> = ({ lang, address, handleShowAddress }) => {
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
      <Space justify="end">
        <Button ghost onClick={handleShowAddress}>
          {lang.common.actions.cancel}
        </Button>
      </Space>
    </Fragment>
  );
};

export default AddressForm;
