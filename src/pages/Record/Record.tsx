import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Authors } from "../../components/ui/Templates/Authors";
import { ExtendedBrief } from "../../components/ui/Templates/ExtendedBrief";
import { RecordHeader } from "../../components/ui/Templates/RecordHeader";
import { Summary } from "../../components/ui/Templates/Summary";
import { googleTranslate } from "../../services/languages.service";
import { findRecord } from "../../services/records.service";
import { AlsoLike } from "../../components/ui/Templates/AlsoLike";
import { RecordInfo } from "../../components/ui/Templates/RecordInfo";
import { Dimmer, Loader, Message } from "semantic-ui-react";
import { size } from "lodash";
import { Tags } from "../../components/ui/Templates/Tags";
import { Reviews } from "../../components/ui/Templates/Reviews";
import { Points } from "../../components/ui/Templates/Points";
import { useTranslation } from "react-i18next";
import { getRecommendations } from "../../services/elastic.service";
import { Recommendations } from "../../components/ui/Templates/Recommendations";
import { Stadistic } from "../../components/ui/Templates/Stadistic";
import { Context } from "../../components/ui/Templates/Context";

export const Record = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { lang } = useParams<{ lang: string }>();

  const { data: item, isLoading } = useQuery(
    ["item", id],
    async () => await findRecord({ id })
  );

  const { data: record, isLoading: isLoadingGoogle } = useQuery(
    ["record", item, lang],
    async () => await googleTranslate({ text: item, target: lang })
  );

  const { data: recommendations } = useQuery(["recommendations", item], () =>
    getRecommendations({
      id: `${item?.user?.koha_id}_${item?.id}`,
      isbn: item?.id_isbn,
    })
  );

  if (isLoading || isLoadingGoogle)
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );

  return (
    <div
      style={{ padding: 10, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <RecordInfo record={record} />
      <RecordHeader record={record} />
      {record?.summary && (
        <Summary summary={record?.summary} dilve={record?.dilve} />
      )}
      {record?.extended_brief && (
        <ExtendedBrief extendedBrief={record?.extended_brief} />
      )}
      <Stadistic
        id_article={record?.id_article}
        koha_id={record?.user?.koha_id}
        id={record?.id}
      />
      {size(record?.tags) > 0 && <Tags tags={record?.tags} />}
      {(size(record?.strong_issues) > 0 || size(record?.weak_issues) > 0) && (
        <Points
          strength={record?.strong_issues}
          weakness={record?.weak_issues}
        />
      )}
      {size(record?.authors) > 0 && <Authors authors={record?.authors} />}
      <Context id={record?.id} />
      {size(recommendations) > 0 && (
        <Recommendations
          recommendations={recommendations}
          user={record?.user}
          dilve={item?.dilve}
        />
      )}
      {size(record?.reviews) > 0 && <Reviews reviews={record?.reviews} />}
      {size(record?.similar_records) > 0 && (
        <AlsoLike
          type="similarRecords"
          otherRecords={record?.similar_records}
        />
      )}
      {size(record?.books) > 0 && (
        <AlsoLike type="books" otherRecords={record?.books} />
      )}
      {size(record?.series) > 0 && (
        <AlsoLike type="series" otherRecords={record?.series} />
      )}
      {size(record?.movies) > 0 && (
        <AlsoLike type="movies" otherRecords={record?.movies} />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <center style={{ marginTop: 20 }}>
          <Message
            compact
            icon="info circle"
            header={t("Record enrichment powered by Orex Intelligence")}
            size="mini"
          />
        </center>
      </div>
    </div>
  );
};
