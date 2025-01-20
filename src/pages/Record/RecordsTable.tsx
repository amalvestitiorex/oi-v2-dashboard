import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, Icon, Tab, TabPane } from "semantic-ui-react";
import { Filters } from "../../components/ui/Shared/Filters";
import { Records } from "../../components/ui/Tables/Records";
import { RootState } from "../../redux/store";
import { findAllRecords } from "../../services/records.service";

export const RecordsTable = () => {
  const { lang } = useParams();
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(true);
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const query = searchParams.get("query") || "";
  const startDate = searchParams.get("start-date") || "";
  const endDate =
    searchParams.get("end-date") || new Date().toISOString().split("T")[0];

  const { data, isLoading } = useQuery(
    ["records", { page, limit, active, query, startDate, endDate }],
    async () =>
      await findAllRecords({
        page,
        limit,
        active,
        query,
        startDate,
        endDate,
      }),
    {
      keepPreviousData: true,
    }
  );

  const panes = [
    {
      menuItem: t("Active Records"),
      render: () => (
        <TabPane loading={isLoading}>
          <Records records={data} />
        </TabPane>
      ),
    },
    {
      menuItem: t("Inactive Records"),
      render: () => (
        <TabPane loading={isLoading}>
          <Records records={data} />
        </TabPane>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <h2>{t("List of records")}</h2>
          {user.role === "admin" && (
            <Button
              as={"a"}
              href={`/${lang}/add-records`}
              color="olive"
              size="mini"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon name="add" /> {t("Add Record")}
            </Button>
          )}
        </div>
        <Filters query={query} startDate={startDate} endDate={endDate} />
      </div>
      {user.role === "admin" ? (
        <Tab
          menu={{ secondary: true }}
          panes={panes}
          onTabChange={(_e, data) => setActive(data.activeIndex === 0)}
        />
      ) : (
        <Records records={data} />
      )}
    </div>
  );
};
