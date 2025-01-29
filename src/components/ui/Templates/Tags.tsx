import { useTranslation } from "react-i18next";
import { Grid, Header, Icon, Label, Popup } from "semantic-ui-react";

interface TagsProps {
  tags?: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  const { t } = useTranslation();

  return (
    <div id="tags">
      <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
        {t("Tags")}
        <div>
          <Popup
            header={t("Tags")}
            content={t("These are the tags")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      <Grid doubling stackable centered columns={6}>
        {tags?.map((tag, index) => (
          <Grid.Column key={index}>
            <Label color="olive" tag>
              {tag}
            </Label>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};
