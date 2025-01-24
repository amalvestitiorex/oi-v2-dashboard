import { Grid, Image } from "semantic-ui-react";
import { LoginForm } from "../components/ui/Forms/LoginForm/LoginForm";

export const Auth = () => {
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }}
      verticalAlign="middle"
      padded
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <center style={{ padding: 20 }}>
          <Image size="small" src="/logo.png" />
        </center>
        <LoginForm />
      </Grid.Column>
    </Grid>
  );
};
