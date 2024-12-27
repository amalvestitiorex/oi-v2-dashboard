import { Grid } from "semantic-ui-react";

export const NotFound = () => {
  return (
    <Grid centered columns={1} style={{ height: "90vh" }}>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </Grid.Column>
    </Grid>
  );
};
