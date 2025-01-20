import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useTranslation } from "react-i18next";
import { RecordStats } from "../../../interfaces/records";
import { ResizableBox } from "../Shared/ResizableBox";

interface Props {
  records: RecordStats;
}

export const CostByType = ({ records }: Props) => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    return [
      {
        label: t("Total costs"),
        data: [
          {
            primary: t("Author"),
            secondary: records.author.totalCost.toFixed(3),
          },
          {
            primary: t("Authority"),
            secondary: records.entity.totalCost.toFixed(3),
          },
          {
            primary: t("Book"),
            secondary: records.book.totalCost.toFixed(3),
          },
          {
            primary: t("Article"),
            secondary: records.article.totalCost.toFixed(3),
          },
          {
            primary: t("Magazine"),
            secondary: records.magazine.totalCost.toFixed(3),
          },
          {
            primary: t("Film"),
            secondary: records.film.totalCost.toFixed(3),
          },
        ],
      },
    ];
  }, [records, t]);

  const primaryAxis = useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <ResizableBox>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </ResizableBox>
  );
};
