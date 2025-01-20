import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon, Modal } from "semantic-ui-react";
import { LanguageForm } from "../Forms/LanguageForm/LanguageForm";

export const AddLanguageModal = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
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
            <Icon name="add" /> {t("Add Language")}
          </Button>
        }
      >
        <Modal.Header>{t("Add new language")}</Modal.Header>
        <Modal.Content>
          <LanguageForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};
