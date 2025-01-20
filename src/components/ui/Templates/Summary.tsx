import { Interweave } from "interweave";
import { useTranslation } from "react-i18next";
import { Header, Icon, Popup } from "semantic-ui-react";
import { Dilve } from "../../../interfaces/records";

interface SummaryProps {
  summary: string;
  dilve?: Dilve;
}

export const Summary = ({ summary, dilve }: SummaryProps) => {
  const { t } = useTranslation();

  const summaryContent = () => {
    if (
      Array.isArray(
        dilve?.getRecordsXResponse?.ONIXMessage?.Product?.CollateralDetail
          ?.TextContent
      )
    ) {
      return (
        dilve?.getRecordsXResponse?.ONIXMessage?.Product?.CollateralDetail?.TextContent?.filter(
          (item) => item.TextType === "03"
        )[0].Text?.$t ||
        dilve?.getRecordsXResponse?.ONIXMessage?.Product?.CollateralDetail?.TextContent?.filter(
          (item) => item.TextType === "03"
        )[0].Text
      );
    } else {
      return (
        dilve?.getRecordsXResponse?.ONIXMessage?.Product?.CollateralDetail
          ?.TextContent?.Text?.$t ||
        dilve?.getRecordsXResponse?.ONIXMessage?.Product?.CollateralDetail
          ?.TextContent?.Text
      );
    }
  };

  return (
    <div id="summary">
      <Header
        as={"h2"}
        dividing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {t("Summary")}
        <div>
          <Popup
            header={t("Summary")}
            content={t("Summary of the record")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      {dilve?.getRecordsXResponse?.ONIXMessage?.Product?.CollateralDetail
        ?.TextContent ? (
        <Interweave content={summaryContent() as string} />
      ) : (
        <Interweave content={summary} />
      )}
    </div>
  );
};
