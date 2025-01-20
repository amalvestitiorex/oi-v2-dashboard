import { useTranslation } from "react-i18next";
import { Header, Icon, Label } from "semantic-ui-react";
import { Record } from "../../../interfaces/records";
import { sectionKeys } from "../../../utils/functions";

interface Props {
  record?: Record;
}

export const RecordHeader = ({ record }: Props) => {
  const { t } = useTranslation();

  const sections = sectionKeys(record);

  return (
    <div>
      <Header as={"h2"} dividing>
        {t("More from Orex Intelligence")}
      </Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {sections.map((key) => (
          <Label
            key={key}
            as="a"
            image
            href={`#${key}`}
            style={{ cursor: "pointer", textTransform: "capitalize" }}
          >
            <Icon name="anchor" />
            {key.replace(/_/g, " ")}
          </Label>
        ))}
      </div>
    </div>
  );
};
