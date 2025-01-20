import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Label, Segment } from "semantic-ui-react";
import { deleteLogs, getLogs } from "../services/logs.service";
import { useTranslation } from "react-i18next";
import { Log } from "../interfaces/logs";
import { size } from "lodash";

export const Console = () => {
  const { t } = useTranslation();
  const { data: logs } = useQuery("log", async () => await getLogs());
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteLogs(),
    onSuccess: () => {
      queryClient.invalidateQueries("log");
    },
  });

  const clearLog = async () => mutation.mutate();

  return (
    <div>
      <h2>{t("Event log")}</h2>
      <Segment.Group>
        <Segment>
          <Button compact size="small" floated="right" onClick={clearLog}>
            Clear
          </Button>
          Event Log <Label circular>{size(logs?.data.docs)}</Label>
        </Segment>
        <Segment inverted>
          <pre style={{ margin: 0, padding: 0 }}>
            {!logs?.error ? (
              logs?.data.docs.map((log: Log) => (
                <div key={log._id} style={{ marginBottom: 10 }}>
                  <p
                    style={{
                      color:
                        log.type === "error" ? "lightcoral" : "lightyellow",
                      textTransform: "capitalize",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    [{log.type}] {log.message}
                  </p>
                  <p>{new Date(log.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div>
                <p>{t("No event log")}</p>
              </div>
            )}
          </pre>
        </Segment>
      </Segment.Group>
    </div>
  );
};
