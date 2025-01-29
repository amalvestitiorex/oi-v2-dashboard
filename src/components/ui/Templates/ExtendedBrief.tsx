import { Interweave } from "interweave";
import { useTranslation } from "react-i18next";
import { Header, Icon, Popup } from "semantic-ui-react";

interface ExtendedBriefProps {
  extendedBrief: string;
}

export const ExtendedBrief = ({ extendedBrief }: ExtendedBriefProps) => {
  const { t } = useTranslation();

  return (
    <div id="extended_brief">
      <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
        {t("Extended brief")}
        <div>
          <Popup
            header={t("Extended brief")}
            content={t("This is the extended brief")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      <Interweave content={extendedBrief} />
    </div>
  );
};
