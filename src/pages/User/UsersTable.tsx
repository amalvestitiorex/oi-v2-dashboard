import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { AddUserModal } from "../../components/ui/Modals/AddUserModal";
import { Search } from "../../components/ui/Shared/Search";
import { Users } from "../../components/ui/Tables/Users";
import { findAllUsers } from "../../services/users.service";

export const UsersTable = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const query = searchParams.get("query") || "";

  const { data: users } = useQuery(
    ["users", { page, limit, query }],
    async () =>
      await findAllUsers({
        page,
        limit,
        query,
      }),
    {
      keepPreviousData: true,
    }
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
          <h2>{t("Users list")}</h2>
          <AddUserModal />
        </div>
        <Search query={query} placeholder={t("Search users...")} />
      </div>
      <Users users={users} />
    </div>
  );
};
