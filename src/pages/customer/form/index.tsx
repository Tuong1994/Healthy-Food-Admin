import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState } from "@/hooks";
import type { CustomerFormData } from "@/services/customer/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import CustomerAuth from "@/features/customer/components/form/CustomerAuth";
import CustomerInfo from "@/features/customer/components/form/CustomerInfo";
import CustomerPermission from "@/features/customer/components/form/CustomerPermission";
import CustomerAddress from "@/features/customer/components/form/CustomerAddress";
import useLocationStore from "@/store/LocationStore";
import useGetCustomer from "@/features/customer/hooks/useGetCustomer";
import useCreateCustomer from "@/features/customer/hooks/useCreateCustomer";
import useUpdateCustomer from "@/features/customer/hooks/useUpdateCustomer";
import moment from "moment";

const { CUSTOMERS } = linkPaths;

interface CustomerProps {}

const Customer: FC<CustomerProps> = () => {
  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const {
    data: response,
    isFetching,
    refetch,
  } = useGetCustomer({ customerId: state?.id as string }, isUpdate);

  const { mutate: createCustomer, isLoading: createLoading } = useCreateCustomer();

  const { mutate: updateCustomer, isLoading: updateLoading } = useUpdateCustomer();

  const [setDistricts, setWards] = useLocationStore((state) => [state.setDistricts, state.setWards]);

  const [image, setImage] = useState<File | null>(null);

  const [showAddress, setShowAddress] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdate) return;
    setDistricts([]);
    setWards([]);
  }, [isUpdate]);

  useEffect(() => {
    if (response && response.data?.address) setShowAddress(true);
  }, [response]);

  const isUserUpdate = state && state.isUser;

  const isSubmitting = !isUpdate ? createLoading : updateLoading;

  const pageTitle = () => {
    if (isUserUpdate) return lang.pageComponent.header.profile.user;
    return lang.customer.form[!isUpdate ? "addTitle" : "editTitle"];
  };

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={CUSTOMERS}>{lang.customer.list.title}</Link> },
    { id: "2", label: pageTitle(), actived: true },
  ];

  const initialData: CustomerFormData = useMemo(
    () => ({
      email: response ? response.data?.email : "",
      password: "",
      phone: response ? response.data?.phone : "",
      lastName: response ? response.data?.lastName : "",
      firstName: response ? response.data?.firstName : "",
      role: response ? response.data?.role : null,
      gender: response ? response.data?.gender : undefined,
      birthday: response ? new Date(response.data?.birthday as Date) : new Date(),
      address: {
        addressEn: response ? response.data?.address?.addressEn : "",
        addressVn: response ? response.data?.address?.addressVn : "",
        cityCode: response ? response.data?.address?.cityCode : undefined,
        districtCode: response ? response.data?.address?.districtCode : undefined,
        wardCode: response ? response.data?.address?.wardCode : undefined,
      },
    }),
    [response]
  );

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle(),
    right: () =>
      !isFetching && <Button type="submit">{lang.common.actions[!isUpdate ? "create" : "update"]}</Button>,
  };

  const handleShowAddress = () => setShowAddress(!showAddress);

  const handleUpload = (image: File | null) => setImage(image);

  const handleSubmit = (data: CustomerFormData) => {
    const formData = new FormData();
    const preparedData: CustomerFormData = {
      ...data,
      birthday: moment(data.birthday).toISOString(),
    };

    if (!showAddress) delete preparedData.address;
    if (isUpdate) delete preparedData.password;
    if (image) formData.append("image", image);

    for (let [key, value] of Object.entries(preparedData)) {
      formData.append(key, JSON.stringify(value));
    }

    if (!isUpdate) return createCustomer(formData);
    const args = { query: { customerId: response?.data?.id }, formData };
    return updateCustomer(args, { onSuccess: () => refetch() });
  };

  const leftItems = (
    <Fragment>
      <CustomerAuth lang={lang} isUpdate={isUpdate} customer={response?.data} handleUpload={handleUpload} />
      <CustomerInfo lang={lang} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <CustomerPermission lang={lang} />
      <CustomerAddress
        lang={lang}
        address={response?.data?.address}
        showAddress={showAddress}
        handleShowAddress={handleShowAddress}
      />
    </Fragment>
  );

  return (
    <Fragment>
      {!isUserUpdate && <Breadcrumb items={items} />}
      <FormLayout<CustomerFormData>
        loading={isFetching}
        submitting={isSubmitting}
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
    </Fragment>
  );
};

export default Customer;
