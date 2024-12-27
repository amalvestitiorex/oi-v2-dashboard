import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionTitleProps,
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { signOut } from "../../../redux/slices/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";

export const MobileContainer = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState<string | number | undefined>(
    0
  );
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);
  const handleClick = (
    _e: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item
          as="a"
          header
          style={{
            display: "flex",
            justifyContent: "center",
            itemAlign: "center",
          }}
          onClick={() => {
            navigation("/");
            handleSidebarHide();
          }}
        >
          <Image size="tiny" src="/logo.png" style={{ marginRight: "0.5em" }} />
          Intelligence
        </Menu.Item>
        <Accordion>
          <>
            {user.role === "admin" && (
              <>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={handleClick}
                >
                  <Menu.Header style={{ padding: 15, fontWeight: "bold" }}>
                    <Icon name="dashboard" />
                    Dashboard
                    <Icon name="dropdown" />
                  </Menu.Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <Menu.Item as="a" href="/stats">
                    <Icon name="chart bar" />
                    Estadísticas
                  </Menu.Item>
                </Accordion.Content>
              </>
            )}
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <Menu.Header style={{ padding: 15, fontWeight: "bold" }}>
                <Icon name="book" />
                Registros
                <Icon name="dropdown" />
              </Menu.Header>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              {user.role === "admin" && (
                <Menu.Item as="a" href="/add-records">
                  <Icon name="plus" />
                  Agregar registros
                </Menu.Item>
              )}
              <Menu.Item as="a" href={user.role === "admin" ? "/records" : "/"}>
                <Icon name="list" />
                Listado de registros
              </Menu.Item>
              <Menu.Item as="a" href={"/buy"}>
                <Icon name="cart" />
                Recomendaciones de compra
              </Menu.Item>
              <Menu.Item as="a" href={"/entities"}>
                <Icon name="users" />
                Enriquecimiento de autoridades
              </Menu.Item>
            </Accordion.Content>
            {user.role === "admin" && (
              <>
                <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={handleClick}
                >
                  <Menu.Header as="h5" style={{ padding: 15 }}>
                    <Icon name="users" />
                    Usuarios
                    <Icon name="dropdown" />
                  </Menu.Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <Menu.Item as="a" href={"/add-user"}>
                    <Icon name="plus" />
                    Agregar usuario
                  </Menu.Item>
                  <Menu.Item as="a" href={"/users"}>
                    <Icon name="list" />
                    Listado de usuarios
                  </Menu.Item>
                </Accordion.Content>
                <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={handleClick}
                >
                  <Menu.Header as="h5" style={{ padding: 15 }}>
                    <Icon name="cogs" />
                    Configuración
                    <Icon name="dropdown" />
                  </Menu.Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <Menu.Item as="a" href={"/add-language"}>
                    <Icon name="plus" />
                    Agregar lenguajes
                  </Menu.Item>
                  <Menu.Item as="a" href={"/languages"}>
                    <Icon name="list" />
                    Listado de lenguajes
                  </Menu.Item>
                  <Menu.Item as="a" href={"/add-translate"}>
                    <Icon name="plus" />
                    Agregar traduccion
                  </Menu.Item>
                  <Menu.Item as="a" href={"/translates"}>
                    <Icon name="language" />
                    Listado de traducciones
                  </Menu.Item>
                  <Menu.Item as="a" href={"/console"}>
                    <Icon name="terminal" />
                    Consola
                  </Menu.Item>
                </Accordion.Content>
              </>
            )}
          </>
        </Accordion>

        <div
          style={{
            position: "absolute",
            bottom: "1em",
            width: "100%",
          }}
        >
          <Menu.Item
            as="a"
            onClick={() => {
              dispatch(signOut());
              navigation("/");
            }}
          >
            <Icon name="log out" />
            Logout
          </Menu.Item>
          <Menu.Item
            as="a"
            href="/version"
            style={{ color: "olive", textAlign: "center" }}
          >
            Version {import.meta.env.VITE_VERSION}
          </Menu.Item>
        </div>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          textAlign="center"
          style={{ height: "100vh", width: "100vw" }}
          vertical
        >
          <Container>
            <Menu pointing secondary size="large">
              <Menu.Item onClick={handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
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
            </Menu>
          </Container>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
