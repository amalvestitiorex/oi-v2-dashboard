import { useTranslation } from "react-i18next";
import { Header, Image, Message } from "semantic-ui-react";
import { Record } from "../../../interfaces/records";

interface RecordInfoProps {
  record?: Record;
}
export const RecordInfo = ({ record }: RecordInfoProps) => {
  const { t } = useTranslation();

  const image = () => {
    if (
      record?.dilve?.getRecordsXResponse.ONIXMessage?.Product?.CollateralDetail
        ?.SupportingResource
    ) {
      const image = Array.isArray(
        record?.dilve?.getRecordsXResponse.ONIXMessage?.Product
          ?.CollateralDetail?.SupportingResource
      )
        ? record?.dilve?.getRecordsXResponse.ONIXMessage?.Product?.CollateralDetail?.SupportingResource.filter(
            (resource) => resource.ResourceContentType === "01"
          )[0].ResourceVersion.ResourceLink
        : record?.dilve?.getRecordsXResponse.ONIXMessage?.Product
            ?.CollateralDetail?.SupportingResource.ResourceVersion.ResourceLink;

      if (!image.includes("file://") && image.includes(".jpg")) {
        return image;
      } else
        return `${record.user?.base_url}cgi-bin/koha/opac-image.pl?thumbnail=1&biblionumber=${record?.id}`;
    } else if (record?.image) {
      return record?.image;
    } else {
      return `${record?.user?.base_url}cgi-bin/koha/opac-image.pl?thumbnail=1&biblionumber=${record?.id}`;
    }
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ width: 400 }}>
        <Image rounded src={image()} alt={record?.title} size="small" />
      </div>
      <div>
        <Header as="h2" dividing>
          {record?.title}
        </Header>
        <Message
          icon="inbox"
          header="Orex Intelligence"
          content={t("Your library's bibliographic data goes here.")}
        />
      </div>
    </div>
  );
};
