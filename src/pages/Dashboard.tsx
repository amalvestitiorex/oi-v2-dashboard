import { useTranslation } from "react-i18next";
import { Statistic } from "../components/ui/Statistic";
import { findAllRecords } from "../services/records.service";
import { useQuery } from "react-query";
import { getLanguages } from "../services/languages.service";
import { getLocales } from "../services/locale.service";
import { getTranslations } from "../services/translations.service";
import { Loader } from "semantic-ui-react";
import { findAllUsers } from "../services/users.service";
// import ReactDOMServer from "react-dom/server";

export const Dashboard = () => {
  const { t } = useTranslation();

  const { data: records, isLoading } = useQuery(
    "records",
    async () =>
      await findAllRecords({
        page: 1,
        limit: 99999,
        active: true,
        query: "",
        startDate: "",
        endDate: new Date().toISOString().split("T")[0],
      })
  );

  const { data: users } = useQuery(
    "users",
    async () => await findAllUsers({ page: 1, limit: 99999, query: "" })
  );

  const { data: languages } = useQuery(
    "languages",
    async () => await getLanguages({ page: 1, limit: 100, query: "" })
  );

  const { data: locales } = useQuery(
    "locales",
    async () => await getLocales({ page: 1, limit: 99999, query: "" })
  );

  const { data: translations } = useQuery(
    "translations",
    async () => await getTranslations()
  );

  const statics = {
    records: records?.totalDocs || 0,
    users: users?.totalDocs || 0,
    translations: translations?.length || 0,
    languages: languages?.length || 0,
    locales: locales?.length || 0,
  };

  // const html = ReactDOMServer.renderToString(<Statistic statics={statics} />);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <h2>
        {t("Welcome to")}{" "}
        <span style={{ color: "#B4CC17" }}>Orex Intelligence</span>
      </h2>
      <p>{t("Here you can manage all the data of your users and records.")}</p>
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <Statistic statics={statics} />
      )}
    </div>
  );
};
