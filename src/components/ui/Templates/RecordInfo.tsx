import { filter, map } from "lodash";
import { useTranslation } from "react-i18next";
import { Button, Header, Image, Message } from "semantic-ui-react";
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

  const preview = () => {
    if (
      record?.dilve?.getRecordsXResponse?.ONIXMessage?.Product.CollateralDetail
        ?.SupportingResource
    ) {
      return Array.isArray(
        record?.dilve?.getRecordsXResponse?.ONIXMessage?.Product
          .CollateralDetail?.SupportingResource
      )
        ? map(
            filter(
              record?.dilve?.getRecordsXResponse?.ONIXMessage?.Product
                .CollateralDetail?.SupportingResource,
              (item) => item.ResourceContentType === "15"
            ),
            (item) => {
              if (
                !item.ResourceVersion.ResourceLink?.includes("file://") &&
                item.ResourceVersion.ResourceLink?.includes(".pdf")
              )
                return item.ResourceVersion.ResourceLink;
            }
          )
        : !record.ResourceVersion.ResourceLink?.$t.includes("file://") &&
          record.ResourceVersion.ResourceLink["$t"]?.includes(".pdf")
        ? [record.ResourceVersion.ResourceLink["$t"]]
        : null;
    }
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ minWidth: "15%" }}>
        <Image rounded src={image()} alt={record?.title} size="small" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {record?.dilve?.getRecordsXResponse.ONIXMessage.Product.ProductSupply
            .SupplyDetail.Price.PriceAmount && (
            <span>
              €{" "}
              {
                record?.dilve?.getRecordsXResponse.ONIXMessage.Product
                  .ProductSupply.SupplyDetail.Price.PriceAmount
              }
            </span>
          )}
          {preview()?.map(
            (item, index) =>
              item && (
                <Button
                  key={index}
                  href={item}
                  target="_blank"
                  rel="noreferrer"
                  size="mini"
                  color="olive"
                >
                  {t("Preview")}
                </Button>
              )
          )}
        </div>
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
