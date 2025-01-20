import { map } from "lodash";
import { useTranslation } from "react-i18next";
import { List } from "semantic-ui-react";
import moment from "moment/moment";

export const Version = () => {
  const { t } = useTranslation();

  const versions = [
    {
      name: "v2.0",
      date: moment("2025-1-17"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Better UI experience")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New translations and languages ​​module")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New design of the registration template")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New functionality to export html records")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Performance improvement in API queries")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v1.5",
      date: moment("2024-12-24"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed process elastic search")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Added start in recommendation")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed public entities endpoint")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed the witdh of the public template")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed buy recommendation")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v1.4",
      date: moment("2024-12-17"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Added koha_id and api_url in users")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed find records by biblionumber and add koha_id")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed form user and add koha_id and api_url")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Removed genres and publishing area in the template")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fixed open ia assistance")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v1.3",
      date: moment("2024-12-12"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fix error entity data")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fix error authors")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Information items were added to all sections")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fix visual bugs")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Translations added")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v1.2",
      date: moment("2024-12-5"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Description of sections was added")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v1.1",
      date: moment("2024-12-3"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Change documentation of interest by preview")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Filter pdfs in documents")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("See the price format remove zeros and use comma")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Remove the year of the publisher")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fix refetch when searching for document")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Delete record $x from entities")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v1.0",
      date: moment("2024-11-26"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t(
              "The documents of interest have been modified, they can now be viewed under the book cover"
            )}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Price code replaced")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("The size of the covers has been modified")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.14",
      date: moment("2024-11-26"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Prices and summaries were modified")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t(
              "Recommendations were separated (own library and other libraries)"
            )}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Recommendation rating was added")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Purchase recommendations were added for each library")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Documents of interest were added")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("API identifier")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Entity screen was added")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.13",
      date: moment("2024-11-22"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Improving API performance")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Enrichment of recommended works")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Cost calculation by records")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("General cost charts and statistics")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.12",
      date: moment("2024-11-13"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Bug api koha")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Add error logs console")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fig bug end date in get all records")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fix crossref bug")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Add status services")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Fix upload file method")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.11",
      date: moment("2024-11-12"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Records can now be published and unpublished")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.10",
      date: moment("2024-11-11"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Marc21 entities added")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Translations were corrected")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.9",
      date: moment("2024-11-5"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New recommended purchases screen")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New fields allowed in csv upload")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New analysis and summary bot")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.8",
      date: moment("2024-10-24"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New log translation module")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.7",
      date: moment("2024-10-21"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New recommended links field")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New series recommendation section")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("A default works message was created")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.6",
      date: moment("2024-10-14"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Added translate modules")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New date filter in records table")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.5",
      date: moment("2024-10-10"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Max and min of summaries were modified")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New record creation wizard added")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("New author creation wizard added")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.4",
      date: moment("2024-09-30"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Max and min of summaries were modified")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Added links to used sources")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Links of interest were added to all records.")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.3",
      date: moment("2024-09-25"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t(
              "Prompts were modified to improve the quality of data obtained by the AI"
            )}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t(
              "Modal was added so that the administrator can see an explanation of the certainty number"
            )}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Added html responses for authors and record summary")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.2",
      date: moment("2024-09-24"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t(
              "Prompts were modified to improve the quality of data obtained by the AI"
            )}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Certainty note added to the list of records")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Name format changed in reviews")}
          </List.Item>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Improved general styles")}
          </List.Item>
        </List>
      ),
    },
    {
      name: "v0.1",
      date: moment("2024-09-13"),
      description: (
        <List>
          <List.Item>
            <List.Icon name="caret right" />
            {t("Initial version")}
          </List.Item>
        </List>
      ),
    },
  ];

  return (
    <div className="flex flex-col m-4 gap-4">
      <h2 className="text-2xl font-semibold text-gray-900">
        {t("Version history")}
      </h2>
      <List divided relaxed>
        {map(versions, (version, index) => (
          <List.Item key={index}>
            <List.Icon name="pin" size="large" verticalAlign="top" />
            <List.Content>
              <List.Header>{version.name}</List.Header>
              <List.Description className="text-xs text-zinc-900/40">
                {moment().diff(version.date, "days")} {t("days ago")}
              </List.Description>
              <List.Description>{version.description}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
