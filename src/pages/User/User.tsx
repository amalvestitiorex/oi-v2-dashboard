import { useParams } from "react-router-dom";
import { UserForm } from "../../components/ui/Forms/UserForm/UserForm";
import { useQuery } from "react-query";
import { findUser } from "../../services/users.service";
import { Dimmer, Loader } from "semantic-ui-react";

export const User = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useQuery(
    ["user", id],
    async () => await findUser(id)
  );

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <div>
      <UserForm user={user?.name ? user : {}} />
    </div>
  );
};
