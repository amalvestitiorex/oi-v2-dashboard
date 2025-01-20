import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Grid } from "semantic-ui-react";
import { CostByType } from "../components/ui/Charts/CostByType";
import { AverageCost } from "../components/ui/Tables/AverageCost";
import { AverageCosts, Record, RecordStats } from "../interfaces/records";
import { getStats } from "../services/stats.service";

export const Stats = () => {
  const { t } = useTranslation();
  const { data: stats } = useQuery("stats", async () => await getStats());
  const [recordStats, setRecordStats] = useState<RecordStats>({
    author: { totalCost: 0, count: 0 },
    entity: { totalCost: 0, count: 0 },
    book: { totalCost: 0, count: 0 },
    article: { totalCost: 0, count: 0 },
    magazine: { totalCost: 0, count: 0 },
    film: { totalCost: 0, count: 0 },
  });
  const [averageCosts, setAverageCosts] = useState<AverageCosts>({
    author: 0,
    entity: 0,
    book: 0,
    article: 0,
    magazine: 0,
    film: 0,
  });

  const handleTotalCost = () => {
    stats?.data.forEach(
      (item: { type: string; totalCost: number; record?: Record }) => {
        if (item.type === "author") {
          setRecordStats((prev) => ({
            ...prev,
            author: {
              totalCost: prev.author.totalCost + item.totalCost,
              count: prev.author.count + 1,
            },
          }));
        } else if (item.type === "entity") {
          setRecordStats((prev) => ({
            ...prev,
            entity: {
              totalCost: prev.entity.totalCost + item.totalCost,
              count: prev.entity.count + 1,
            },
          }));
        } else if (item.type === "record" && item.record) {
          const recordType = item.record.type as keyof RecordStats;
          setRecordStats((prev) => ({
            ...prev,
            [recordType]: {
              totalCost: prev[recordType].totalCost + item.totalCost,
              count: prev[recordType].count + 1,
            },
          }));
        }
      }
    );
  };

  const handleAverage = () => {
    Object.keys(recordStats).forEach((key) => {
      const recordType = key as keyof RecordStats;
      const { totalCost, count } = recordStats[recordType];
      setAverageCosts((prev) => ({
        ...prev,
        [recordType]: count > 0 ? totalCost / count : 0,
      }));
    });
  };

  useEffect(() => {
    handleTotalCost();
    handleAverage();
  }, []);

  return (
    <div>
      <h2>{t("Our statistics")}</h2>
      <p>
        {t(
          "Here you can see the statistics of our AI models and services of translation."
        )}
      </p>
      <Grid columns={2} stackable>
        <Grid.Column>
          <h3>{t("Costs by type")}</h3>
          <CostByType records={recordStats} />
        </Grid.Column>
        <Grid.Column>
          <h3>{t("Average costs by type")}</h3>
          <AverageCost averageCosts={averageCosts} />
        </Grid.Column>
      </Grid>
    </div>
  );
};
