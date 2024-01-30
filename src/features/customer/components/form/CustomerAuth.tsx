import { FC, Fragment, useState } from "react";
import { Button, Card, Grid } from "@/components/UI";
import { FormItem, Input, InputPassword, Upload } from "@/components/Control";
import type { Lang } from "@/common/type";
import PasswordModal from "./PasswordModal";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CustomerAuthProps {
  lang: Lang;
  isUpdate: boolean;
}

const CustomerAuth: FC<CustomerAuthProps> = ({ lang, isUpdate }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Card rootClassName="card-section">
        <Row justify="between">
          <Col xs={24} md={6} lg={6} span={6}>
            <SingleImageUpload />
          </Col>
          <Col xs={24} md={18} lg={18} span={18}>
            <FormItem name="email" disabled={isUpdate}>
              <Input label={lang.common.form.label.email} />
            </FormItem>
            {!isUpdate ? (
              <FormItem name="password">
                <InputPassword label={lang.common.form.label.password} />
              </FormItem>
            ) : (
              <Button color="red" ghost onClick={handleOpen}>
                {lang.customer.form.changePass}
              </Button>
            )}
          </Col>
        </Row>
      </Card>
      <PasswordModal lang={lang} open={open} onCancel={handleClose} />
    </Fragment>
  );
};

export default CustomerAuth;
