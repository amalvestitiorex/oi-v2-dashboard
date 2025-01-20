import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Button, Icon, Pagination, Table } from "semantic-ui-react";
import { PaginationUsers, User } from "../../../interfaces/users";
import { AddUserModal } from "../Modals/AddUserModal";

interface UsersProps {
  users?: PaginationUsers;
}

export const Users: FC<UsersProps> = ({ users }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const page = parseInt(searchParams.get("page") || "1");

  return (
    <>
      <Table color="olive">
        <Table.Header>
          <Table.Row style={{ textAlign: "center" }}>
            <Table.HeaderCell>{t("Name")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Email")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Role")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Actions")}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users?.docs.map((user: User, index) => (
            <Table.Row style={{ textAlign: "center" }} key={index}>
              <Table.Cell>
                <p style={{ fontWeight: "bold" }}>{user.name}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{user.email}</p>
              </Table.Cell>
              <Table.Cell>
                <p style={{ textTransform: "capitalize" }}>{user.role}</p>
              </Table.Cell>
              <Table.Cell style={{ display: "flex", justifyContent: "center" }}>
                <AddUserModal user={user} />
                <Button animated="vertical" color="red" size="small" as="a">
                  <Button.Content hidden>{t("Delete")}</Button.Content>
                  <Button.Content visible>
                    <Icon name="trash" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
                Mostrando{" "}
                <span style={{ fontWeight: "bold" }}>
                  {users?.pagingCounter}
                </span>{" "}
                a{" "}
                <span style={{ fontWeight: "bold" }}>
                  {users?.hasNextPage ? users?.page * 20 : users?.totalDocs}
                </span>{" "}
                de{" "}
                <span style={{ fontWeight: "bold" }}>{users?.totalDocs}</span>{" "}
                usuarios.
              </p>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Pagination
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        defaultActivePage={page}
        firstItem={null}
        lastItem={null}
        onPageChange={(_e, { activePage }) => {
          if (activePage) {
            searchParams.set("page", activePage.toString());
            setSearchParams(searchParams);
          }
        }}
        pointing
        secondary
        totalPages={users?.totalPages || 1}
      />
    </>
  );
};
