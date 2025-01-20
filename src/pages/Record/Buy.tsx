import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { BuysTable } from "../../components/ui/Tables/BuysTable";
import { getBuys } from "../../services/records.service";

export const Buy = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { data: records, isLoading } = useQuery(
    ["buys", { page, limit }],
    async () =>
      await getBuys({
        page,
        limit,
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>{t("List of buys")}</h2>
      <div>
        {isLoading ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <BuysTable records={records?.data} />
        )}
      </div>
    </div>
  );
};
