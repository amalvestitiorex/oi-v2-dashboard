import { size } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  // Button,
  Dropdown,
  DropdownProps,
  Grid,
  Icon,
  // Loader,
  Segment,
  Tab,
  TabPane,
  TabProps,
} from "semantic-ui-react";
import { CsvFileForm } from "../../components/ui/Forms/CsvFileForm/CsvFileForm";
// import { KohaRecords } from "../../components/ui/Tables/KohaRecords";
import { User } from "../../interfaces/users";
// import { searchKohaRecords } from "../../services/records.service";
import {
  // batchStatusCheck,
  csvStatusCheck,
  // kohaStatusCheck,
} from "../../services/status.service";
import { findAllUsers } from "../../services/users.service";
import { useTranslation } from "react-i18next";

export const AddRecord = () => {
  const { t } = useTranslation();
  const [userSelected, setUserSelected] = useState({} as User);
  const [, setActiveIndex] = useState(0);
  // const [startScan, setStartScan] = useState(false);
  // const [scanResults, setScanResults] = useState(0);
  // const [initialIndex, setInitialIndex] = useState(1);
  // const [endIndex, setEndIndex] = useState(2);

  const { data: users } = useQuery(
    "users",
    async () => await findAllUsers({ page: 1, limit: 99999, query: "" })
  );

  const { data: csvStatus } = useQuery(
    "csvStatus",
    async () => await csvStatusCheck(),
    { enabled: size(userSelected) > 0 }
  );

  // const { data: kohaStatus } = useQuery(
  //   ["kohaStatus", userSelected],
  //   () => kohaStatusCheck({ user: userSelected }),
  //   { enabled: size(userSelected) > 0 }
  // );
  // const { data: batchStatus } = useQuery(
  //   "batchStatus",
  //   () => batchStatusCheck(),
  //   { enabled: size(userSelected) > 0 }
  // );

  // const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === "initialIndex") {
  //     setInitialIndex(parseInt(value));
  //   } else {
  //     setEndIndex(parseInt(value));
  //   }
  // };

  // const { data: kohaRecords, isLoading } = useQuery(
  //   ["kohaRecords", userSelected, activeIndex, endIndex],
  //   async () => {
  //     if (activeIndex !== 1) {
  //       return [];
  //     }
  //     const records = [];
  //     let cont = 0;
  //     let currentIndex = initialIndex;

  //     while (currentIndex <= endIndex) {
  //       const data = await searchKohaRecords({
  //         id: currentIndex,
  //       });
  //       if (!data?.error) {
  //         cont++;
  //         records.push({ ...data });
  //       }
  //       currentIndex += 1;
  //       setScanResults(cont);
  //       if (currentIndex <= endIndex) setInitialIndex(currentIndex);
  //     }
  //     setStartScan(false);
  //     return records;
  //   },
  //   {
  //     enabled: size(userSelected) > 0 && activeIndex == 1 && startScan,
  //   }
  // );

  const panes = [
    {
      menuItem: t("CSV File"),
      render: () => (
        <TabPane attached={false}>
          <CsvFileForm />
        </TabPane>
      ),
    },
    // {
    //   menuItem: "Koha API",
    //   render: () => (
    //     <TabPane attached={false}>
    //       <Segment
    //         style={{
    //           minHeight: 300,
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         {size(kohaRecords) === 0 ? (
    //           <>
    //             {kohaStatus ? (
    //               <>
    //                 {!startScan && (
    //                   <div
    //                     style={{
    //                       display: "flex",
    //                       flexDirection: "column",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       gap: 10,
    //                     }}
    //                   >
    //                     <p>Escanea registros de Koha</p>
    //                     <div
    //                       style={{
    //                         display: "flex",
    //                         gap: 10,
    //                         justifyContent: "center",
    //                         alignItems: "center",
    //                       }}
    //                     >
    //                       <div>
    //                         <label htmlFor="initialIndex">Desde:</label>
    //                         <input
    //                           type="number"
    //                           id="initialIndex"
    //                           name="initialIndex"
    //                           disabled={initialIndex == endIndex}
    //                           min={1}
    //                           max={endIndex - 1}
    //                           value={initialIndex}
    //                           onChange={handleChangeIndex}
    //                         />
    //                       </div>
    //                       <div>
    //                         <label htmlFor="endIndex">Hasta:</label>
    //                         <input
    //                           type="number"
    //                           id="endIndex"
    //                           name="endIndex"
    //                           min={initialIndex + 1}
    //                           max={99999}
    //                           value={endIndex}
    //                           onChange={handleChangeIndex}
    //                         />
    //                       </div>
    //                     </div>
    //                     <Button onClick={() => setStartScan(true)}>
    //                       Escanear
    //                     </Button>
    //                   </div>
    //                 )}
    //                 <Loader active={isLoading}>
    //                   <p>Escaneando ID: {initialIndex}</p>
    //                   <p>
    //                     Escaneando registros de Koha: {scanResults} resultados
    //                   </p>
    //                 </Loader>
    //               </>
    //             ) : (
    //               <p>API de Koha no disponible</p>
    //             )}
    //           </>
    //         ) : (
    //           <KohaRecords records={kohaRecords} />
    //         )}
    //       </Segment>
    //     </TabPane>
    //   ),
    // },
    // {
    //   menuItem: "Batch API",
    //   render: () => <TabPane attached={false}>Tab 3 Content</TabPane>,
    // },
  ];

  const handleUserChange = (
    _e: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    setUserSelected(JSON.parse(data.value as string));
  };

  const handleTabChange = (
    _e: React.MouseEvent<HTMLDivElement>,
    data: TabProps
  ) => {
    setActiveIndex(typeof data.activeIndex === "number" ? data.activeIndex : 0);
  };

  return (
    <div>
      <h2>{t("Upload records")}</h2>
      <Dropdown
        placeholder={t("Select user")}
        fluid
        search
        selection
        options={
          users?.docs.map((user) => ({
            key: user._id,
            value: JSON.stringify(user),
            text: user.name,
          })) || []
        }
        onChange={handleUserChange}
      />

      <Grid columns={3} centered padded divided>
        <Grid.Row>
          <Grid.Column style={{ textAlign: "center", fontWeight: "bold" }}>
            <p>
              {t("CSV API")}:{" "}
              {csvStatus ? (
                <Icon name="circle" color="green" />
              ) : (
                <Icon name="circle" color="red" />
              )}
            </p>
          </Grid.Column>
          {/* <Grid.Column style={{ textAlign: "center", fontWeight: "bold" }}>
            <p>
              API de Koha:{" "}
              {kohaStatus ? (
                <Icon name="circle" color="green" />
              ) : (
                <Icon name="circle" color="red" />
              )}
            </p>
          </Grid.Column>
          <Grid.Column style={{ textAlign: "center", fontWeight: "bold" }}>
            <p>
              API de Batch:{" "}
              {batchStatus ? (
                <Icon name="circle" color="green" />
              ) : (
                <Icon name="circle" color="red" />
              )}
            </p>
          </Grid.Column> */}
        </Grid.Row>
        {size(userSelected) > 0 ? (
          <Grid.Row>
            <Grid.Column width={16}>
              <Tab
                menu={{ pointing: true }}
                panes={panes}
                onTabChange={handleTabChange}
              />
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <Segment
                  placeholder
                  style={{
                    minHeight: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>{t("Select a user to continue")}</p>
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
};
