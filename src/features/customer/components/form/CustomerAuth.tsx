import { FC, Fragment, useState } from "react";
import { Button, Card, Grid } from "@/components/UI";
import { FormItem, Input, InputPassword, Upload } from "@/components/Control";
import { useRule } from "@/hooks";
import type { CustomerFormData } from "@/services/customer/type";
import type { Lang } from "@/common/type";
import PasswordModal from "./PasswordModal";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CustomerAuthProps {
  lang: Lang;
  isUpdate: boolean;
  customer: CustomerFormData | undefined;
  handleUpload: (image: File | null) => void;
}

const CustomerAuth: FC<CustomerAuthProps> = ({ lang, customer, isUpdate, handleUpload }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { email, password } = useRule();

  const handleOpenModal = () => setOpen(!open);

  return (
    <Fragment>
      <Card rootClassName="card-section">
        <Row justify="between">
          <Col xs={24} md={6} lg={6} span={6}>
            <SingleImageUpload defaultImageUrl={customer?.image?.path} onUpload={handleUpload} />
          </Col>
          <Col xs={24} md={18} lg={18} span={18}>
            <FormItem name="email" disabled={isUpdate} rules={email()}>
              <Input required label={lang.common.form.label.email} />
            </FormItem>
            {!isUpdate ? (
              <FormItem name="password" rules={password()}>
                <InputPassword required label={lang.common.form.label.password} />
              </FormItem>
            ) : (
              <Button color="red" ghost onClick={handleOpenModal}>
                {lang.customer.form.changePass}
              </Button>
            )}
          </Col>
        </Row>
      </Card>
      <PasswordModal lang={lang} open={open} onCancel={handleOpenModal} />
    </Fragment>
  );
};

export default CustomerAuth;
