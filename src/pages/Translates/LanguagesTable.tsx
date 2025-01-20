import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AddLanguageModal } from "../../components/ui/Modals/AddLanguageModal";
import { Search } from "../../components/ui/Shared/Search";
import { Languages } from "../../components/ui/Tables/Languages";
import { RootState } from "../../redux/store";
import { getLanguages } from "../../services/languages.service";

export const LanguagesTable = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const query = searchParams.get("query") || "";

  const { data } = useQuery(
    ["languages", page, limit, query],
    async () => await getLanguages({ page, limit, query })
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
          <h2>{t("Languages list")}</h2>
          {user.role === "admin" && <AddLanguageModal />}
        </div>
        <Search query={query} placeholder={t("Search language...")} />
      </div>
      <Languages languages={data} />
    </div>
  );
};
