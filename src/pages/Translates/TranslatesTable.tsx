import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AddLocaleModal } from "../../components/ui/Modals/AddLocaleModal";
import { Search } from "../../components/ui/Shared/Search";
import { Locales } from "../../components/ui/Tables/Locales";
import { RootState } from "../../redux/store";
import { getLocales } from "../../services/locale.service";

export const TranslatesTable = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const query = searchParams.get("query") || "";

  const { data } = useQuery(
    ["locales", page, limit, query],
    async () => await getLocales({ page, limit, query })
  );

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
          <h2>{t("Locales list")}</h2>
          {user.role === "admin" && <AddLocaleModal />}
        </div>
        <Search query={query} placeholder={t("Search locales...")} />
      </div>
      <Locales locales={data} />
    </div>
  );
};
