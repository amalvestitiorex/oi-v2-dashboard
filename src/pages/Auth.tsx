import { Grid, Header, Image } from "semantic-ui-react";
import { LoginForm } from "../components/ui/LoginForm/LoginForm";

export const Auth = () => {
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }}
      verticalAlign="middle"
      padded
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="olive" textAlign="center">
          <Image
            src="/logo.png"
            style={{
              width: 150,
            }}
            alt="logo"
          />
        </Header>
        <LoginForm />
      </Grid.Column>
    </Grid>
  );
};
