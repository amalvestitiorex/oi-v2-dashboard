import axios from "axios";
import { useQuery } from "react-query";
import { Header, Icon, Popup, Statistic } from "semantic-ui-react";
import {
  getDocumentDownloads,
  getDocumentLoans,
  getDocumentViews,
} from "../../../services/elastic.service";
import { useTranslation } from "react-i18next";

export const Stadistic = ({
  id_article,
  koha_id,
  id,
}: {
  id_article?: string;
  koha_id?: string;
  id?: string;
}) => {
  const { t } = useTranslation();
  const { data: loans } = useQuery(["loans", koha_id, id], () =>
    getDocumentLoans(koha_id, id)
  );

  const { data: views } = useQuery(["views", koha_id, id], () =>
    getDocumentViews(koha_id, id)
  );

  const { data: downloads } = useQuery(["downloads", koha_id, id], () =>
    getDocumentDownloads(koha_id, id)
  );

  const { data: references, isLoading } = useQuery(
    ["references", id_article],
    () => axios.get(`https://api.crossref.org/works/${id_article}`)
  );

  const widths = [
    loans,
    downloads,
    views,
    references?.data.message["is-referenced-by-count"],
    references?.data.message["references-count"],
  ].reduce((acc, item) => (item > 0 ? acc + 1 : acc), 0);

  if (isLoading) return null;

  return (
    widths > 0 && (
      <div>
        <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
          {t("Statistic")}
          <div>
            <Popup
              content={t("Statistic of the record")}
              header={t("Statistic")}
              trigger={<Icon name="info circle" />}
            />
          </div>
        </Header>
        <Statistic.Group widths={widths}>
          {loans > 0 && (
            <Statistic color="yellow">
              <Statistic.Value>{loans}</Statistic.Value>
              <Statistic.Label>{t("Loans")}</Statistic.Label>
            </Statistic>
          )}
          {downloads > 0 && (
            <Statistic color="olive">
              <Statistic.Value>{downloads}</Statistic.Value>
              <Statistic.Label>{t("Downloads")}</Statistic.Label>
            </Statistic>
          )}
          {views > 0 && (
            <Statistic color="green">
              <Statistic.Value>{views}</Statistic.Value>
              <Statistic.Label>{t("Views")}</Statistic.Label>
            </Statistic>
          )}
          {references?.data.message["is-referenced-by-count"] > 0 && (
            <Statistic color="teal">
              <Statistic.Value>
                {references?.data.message["is-referenced-by-count"]}
              </Statistic.Value>
              <Statistic.Label>{t("Cited by")}</Statistic.Label>
            </Statistic>
          )}
          {references?.data.message["references-count"] > 0 && (
            <Statistic color="blue">
              <Statistic.Value>
                {references?.data.message["references-count"]}
              </Statistic.Value>
              <Statistic.Label>{t("Citations")}</Statistic.Label>
            </Statistic>
          )}
        </Statistic.Group>
      </div>
    )
  );
};
