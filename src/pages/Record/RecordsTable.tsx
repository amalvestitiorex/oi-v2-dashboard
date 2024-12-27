import { useQuery } from "react-query";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Tab,
} from "semantic-ui-react";
import { findAllRecords } from "../../services/records.service";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { PaginationRecords, Record } from "../../interfaces/records";

export const RecordsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(true);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const query = searchParams.get("query") || "";
  const startDate = searchParams.get("start-date") || "";
  const endDate =
    searchParams.get("end-date") || new Date().toISOString().split("T")[0];

  const { data, isLoading, isError } = useQuery(
    ["records", { page, limit, active, query, startDate, endDate }],
    async () =>
      await findAllRecords({
        page,
        limit,
        active,
        query,
        startDate,
        endDate,
      })
  );

  console.log(data);

  const ListRecordsTable = ({
    records,
  }: {
    records: PaginationRecords | undefined;
  }) => (
    <Table color="olive">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Titulo / Autores</TableHeaderCell>
          <TableHeaderCell>Usuario</TableHeaderCell>
          <TableHeaderCell>Certeza</TableHeaderCell>
          <TableHeaderCell>Fecha</TableHeaderCell>
          <TableHeaderCell>Tipo</TableHeaderCell>
          <TableHeaderCell>Acciones</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {records?.docs.map((record: Record) => (
          <TableRow>
            <TableCell>{record.id}</TableCell>
            <TableCell>{record.title}</TableCell>
            <TableCell>{record.user.name}</TableCell>
            <TableCell>{record.quality}</TableCell>
            <TableCell>
              {new Date(record.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{record.type}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const panes = [
    {
      menuItem: "Registros Activos",
      render: () => (
        <Tab.Pane loading={isLoading} error={isError}>
          <ListRecordsTable records={data} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Registros Inactivos",
      render: () => (
        <Tab.Pane loading={isLoading} error={isError}>
          <ListRecordsTable records={data} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <h2>Listado de registros</h2>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
        onTabChange={(_e, data) => setActive(data.activeIndex === 0)}
      />
    </div>
  );
};
