import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Input, Label } from "semantic-ui-react";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BEETWEEN_SEARCH = 300;

interface Props {
  startDate: string;
  endDate: string;
}

export function FilterDate({ startDate, endDate }: Props) {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const handlerStartDate = useDebouncedCallback((startDate) => {
    if (startDate) {
      setSearchParams({ "start-date": startDate, "end-date": endDate });
    }
  }, WAIT_BEETWEEN_SEARCH);

  const handlerEndDate = useDebouncedCallback((endDate) => {
    if (endDate) {
      setSearchParams({ "start-date": startDate, "end-date": endDate });
    }
  }, WAIT_BEETWEEN_SEARCH);

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <label htmlFor="start-date">
        <Label>{t("From")}:</Label>
      </label>
      <Input
        type="date"
        onChange={(e) => handlerStartDate(e.target.value)}
        max={endDate}
        defaultValue={startDate || ""}
        style={{ height: 35 }}
        name="start-date"
        id="start-date"
      />
      <label htmlFor="end-date">
        <Label>{t("To")}:</Label>
      </label>
      <Input
        type="date"
        onChange={(e) => handlerEndDate(e.target.value)}
        min={startDate}
        max={new Date().toISOString().split("T")[0]}
        defaultValue={endDate}
        style={{ height: 35 }}
        name="end-date"
        id="end-date"
      />
    </div>
  );
}
