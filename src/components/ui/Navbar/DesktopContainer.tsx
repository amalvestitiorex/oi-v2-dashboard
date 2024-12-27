import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import { signOut } from "../../../redux/slices/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";

export const DesktopContainer = () => {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Menu fixed={"top"} pointing={false} secondary={false} size="large">
      <Container>
        <Menu.Item as="a" href="/" header>
          <Image size="tiny" src="/logo.png" style={{ marginRight: "0.5em" }} />
          Intelligence
        </Menu.Item>
        {user.role === "admin" && (
          <Menu.Item as="a" href="/stats">
            Estadísticas
          </Menu.Item>
        )}
        <Dropdown as={Menu.Item} text="Registros">
          <Dropdown.Menu>
            {user.role === "admin" && (
              <Dropdown.Item as="a" href={"/add-records"}>
                <Icon name="plus" />
                Agregar registros
              </Dropdown.Item>
            )}
            <Dropdown.Item
              as="a"
              href={user.role === "admin" ? "/records" : "/"}
            >
              <Icon name="list" />
              Listado de registros
            </Dropdown.Item>
            <Dropdown.Item as="a" href={"/buy"}>
              <Icon name="cart" />
              Recomendaciones de compra
            </Dropdown.Item>
            <Dropdown.Item as="a" href={"/entities"}>
              <Icon name="users" />
              Enriquecimiento de autoridades
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {user.role === "admin" && (
          <>
            <Dropdown as={Menu.Item} text="Usuarios">
              <Dropdown.Menu>
                <Dropdown.Item as="a" href={"/add-user"}>
                  <Icon name="plus" />
                  Agregar usuario
                </Dropdown.Item>
                <Dropdown.Item as="a" href={"/users"}>
                  <Icon name="list" />
                  Listado de usuarios
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={Menu.Item} text="Configuración">
              <Dropdown.Menu>
                <Dropdown.Item as="a" href={"/add-language"}>
                  <Icon name="plus" />
                  Agregar lenguajes
                </Dropdown.Item>
                <Dropdown.Item as="a" href={"/languages"}>
                  <Icon name="list" />
                  Listado de lenguajes
                </Dropdown.Item>
                <Dropdown.Item as="a" href={"/add-translate"}>
                  <Icon name="plus" />
                  Agregar traduccion
                </Dropdown.Item>
                <Dropdown.Item as="a" href={"/translates"}>
                  <Icon name="language" />
                  Listado de traducciones
                </Dropdown.Item>
                <Dropdown.Item as="a" href={"/console"}>
                  <Icon name="terminal" />
                  Consola
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
        <Menu.Item position="right">
          <Dropdown
            simple
            direction="left"
            icon={
              <Image
                avatar
                src={`https://ui-avatars.com/api/?name=${user.name}&background=65a20c&color=fff&rounded=true&bold=true&format=svg`}
                alt="avatar"
              />
            }
          >
            <Dropdown.Menu>
              <Dropdown.Header>Hola, {user.name} ✋</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item as="a" href={`/user/${user._id}`}>
                <Icon name="user" />
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="a" href="/version">
                <Icon name="info" />
                Version {import.meta.env.VITE_VERSION}
              </Dropdown.Item>
              <Dropdown.Item
                as="a"
                onClick={() => {
                  dispatch(signOut());
                  navigation("/");
                }}
              >
                <Icon name="log out" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
