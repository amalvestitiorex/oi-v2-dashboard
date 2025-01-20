import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { FilterDate } from "./FilterDate";
import { Search } from "./Search";

interface Props {
  query: string;
  startDate: string;
  endDate: string;
}

export const Filters = ({ query, startDate, endDate }: Props) => {
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      {(query || startDate) && (
        <Button
          onClick={() => {
            setSearchParams({});
          }}
          color="red"
          size="mini"
        >
          {t("Delete filters")}
        </Button>
      )}

      <FilterDate startDate={startDate} endDate={endDate} />
      <Search query={query} placeholder={t("Search records...")} />
    </div>
  );
};
