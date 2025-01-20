import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon, Modal } from "semantic-ui-react";
import { UserForm } from "../Forms/UserForm/UserForm";
import { UserFormValues } from "../Forms/UserForm/UserForm.form";

interface UserFormProps {
  user?: UserFormValues;
}

export const AddUserModal = ({ user }: UserFormProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          !user?.name ? (
            <Button
              color="olive"
              size="mini"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {}}
            >
              <Icon name="add" /> {t("Add User")}
            </Button>
          ) : (
            <Button
              animated="vertical"
              color="olive"
              size="small"
              onClick={() => {}}
            >
              <Button.Content hidden>{t("View")}</Button.Content>
              <Button.Content visible>
                <Icon name="eye" />
              </Button.Content>
            </Button>
          )
        }
      >
        <Modal.Header>{!user?.name ? t("New user") : user?.name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <UserForm user={user} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};
