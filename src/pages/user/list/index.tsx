import { FC } from "react";
import { Tabs } from "@/components/UI";
import { useLang, usePermission } from "@/hooks";
import { TabsItems } from "@/components/UI/Tabs/type";
import CustomersTable from "@/features/user/components/list/CustomersTable";
import StaffsTable from "@/features/user/components/list/StaffsTable";

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const { lang } = useLang();

  const { canCreate, canRemove } = usePermission();

  const commonProps = { canCreate, canRemove };

  const items: TabsItems = [
    {
      id: "customer",
      title: lang.user.list.title.customer,
      content: <CustomersTable {...commonProps} />,
    },
    {
      id: "staff",
      title: lang.user.list.title.staff,
      content: <StaffsTable {...commonProps} />,
    },
  ];

  return <Tabs color="green" defaultActiveId="customer" items={items} />;
};

export default Users;
