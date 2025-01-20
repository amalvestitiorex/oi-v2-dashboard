import { FC, ReactNode } from "react";
import { Grid } from "semantic-ui-react";

interface Props {
  children: ReactNode;
}

export const ResizableBox: FC<Props> = ({ children }) => {
  return (
    <Grid columns={1} padded>
      <Grid.Row>
        <Grid.Column style={{ width: "100%", height: 300 }}>
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
