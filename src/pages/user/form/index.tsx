import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState, usePermission } from "@/hooks";
import type { UserFormData } from "@/services/user/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import UserAuth from "@/features/user/components/form/UserAuth";
import UserInfo from "@/features/user/components/form/UserInfo";
import UserPermission from "@/features/user/components/form/UserPermission";
import UserAddress from "@/features/user/components/form/UserAddress";
import useLocationStore from "@/store/LocationStore";
import useGetUser from "@/features/user/hooks/useGetUser";
import useCreateUser from "@/features/user/hooks/useCreateUser";
import useUpdateUser from "@/features/user/hooks/useUpdateUser";
import moment from "moment";

const { USERS } = linkPaths;

interface UserProps {}

const User: FC<UserProps> = () => {
  const { lang } = useLang();

  const { canCreate, canUpdate } = usePermission();

  const { isUpdate, state } = useHasLocationState();

  const { data: response, isFetching, refetch } = useGetUser({ userId: state?.id as string }, isUpdate);

  const { mutate: createUser, isLoading: createLoading } = useCreateUser();

  const { mutate: updateUser, isLoading: updateLoading } = useUpdateUser();

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
    else setShowAddress(false);
  }, [response]);

  const isUserUpdate = state && state.isUser;

  const isSubmitting = !isUpdate ? createLoading : updateLoading;

  const canInteract = !isUpdate ? canCreate : canUpdate;

  const pageTitle = () => {
    if (isUserUpdate) return lang.pageComponent.header.profile.user;
    return lang.user.form[!isUpdate ? "addTitle" : "editTitle"];
  };

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={USERS}>{lang.user.list.title.users}</Link> },
    { id: "2", label: pageTitle(), actived: true },
  ];

  const initialData: UserFormData = useMemo(
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
      !isFetching &&
      canInteract && (
        <Button type="submit" loading={isSubmitting}>
          {lang.common.actions[!isUpdate ? "create" : "update"]}
        </Button>
      ),
  };

  const onReFetch = () => refetch();

  const handleShowAddress = () => setShowAddress(!showAddress);

  const handleUpload = (image: File | null) => setImage(image);

  const handleSubmit = (data: UserFormData) => {
    const formData = new FormData();
    const preparedData: UserFormData = {
      ...data,
      birthday: moment(data.birthday).toISOString(),
    };

    if (!showAddress) delete preparedData.address;
    if (isUpdate) delete preparedData.password;
    if (image) formData.append("image", image);

    for (let [key, value] of Object.entries(preparedData)) {
      if (showAddress && key === "address") formData.append(key, JSON.stringify(value));
      else formData.append(key, value as string);
    }

    if (!isUpdate) return createUser(formData);
    const args = { query: { userId: response?.data?.id, admin: true }, formData };
    return updateUser(args, { onSuccess: () => onReFetch() });
  };

  const leftItems = (
    <Fragment>
      <UserAuth
        lang={lang}
        isUpdate={isUpdate}
        canInteract={canInteract}
        user={response?.data}
        onReFetch={onReFetch}
        handleUpload={handleUpload}
      />
      <UserInfo lang={lang} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <UserPermission lang={lang} />
      <UserAddress
        lang={lang}
        isUpdate={isUpdate}
        showAddress={showAddress}
        canInteract={canInteract}
        address={response?.data?.address}
        onReFetch={onReFetch}
        handleShowAddress={handleShowAddress}
      />
    </Fragment>
  );

  return (
    <Fragment>
      {!isUserUpdate && <Breadcrumb items={items} />}
      <FormLayout<UserFormData>
        loading={isFetching}
        submitting={!canInteract || isSubmitting}
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
    </Fragment>
  );
};

export default User;
