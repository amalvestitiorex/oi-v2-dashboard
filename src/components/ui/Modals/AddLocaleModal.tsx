import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon, Modal } from "semantic-ui-react";
import { LocaleForm } from "../Forms/LocaleForm/LocaleForm";

export const AddLocaleModal = () => {
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
            <Icon name="add" /> {t("Add Locale")}
          </Button>
        }
      >
        <Modal.Header>{t("Add new locale")}</Modal.Header>
        <Modal.Content>
          <LocaleForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};
