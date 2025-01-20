import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionTitleProps,
  Dropdown,
  DropdownProps,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { signOut } from "../../../redux/slices/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import { Language } from "../../../interfaces/languages";
import { useQuery } from "react-query";
import { getLanguages } from "../../../services/languages.service";

interface MobileContainerProps {
  children: React.ReactNode;
  lang?: string;
}

export const MobileContainer: FC<MobileContainerProps> = ({
  children,
  lang,
}) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState<string | number | undefined>(
    0
  );
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t, i18n } = useTranslation();
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

  const handleSelectLanguage = (
    _e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const lang = data.value as string;
    if (lang !== i18n.language || lang !== "Select language") {
      navigation(switchLanguage(lang));
    }
  };

  const switchLanguage = (lang: string) => {
    const pathSegments = location.pathname.split("/");
    pathSegments[1] = lang;
    return pathSegments.join("/");
  };

  const { data: languages } = useQuery(
    "languages",
    async () => await getLanguages({ page: 1, limit: 100, query: "" })
  );

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
        width="wide"
      >
        <Menu.Item
          header
          style={{
            display: "flex",
            justifyContent: "center",
            itemAlign: "center",
          }}
          onClick={() => {
            navigation(`/${lang}`);
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
                    {t("Dashboard")}

                    <Icon name="dropdown" />
                  </Menu.Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <Menu.Item href={`/${lang}/stats`}>
                    <Icon name="chart bar" />
                    {t("Stats")}
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
                {t("Records")}

                <Icon name="dropdown" />
              </Menu.Header>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Menu.Item
                href={user.role === "admin" ? `/${lang}/records` : `/${lang}`}
              >
                <Icon name="list" />
                {t("Records list")}
              </Menu.Item>
              <Menu.Item href={`/${lang}/buy`}>
                <Icon name="cart" />
                {t("Buy records")}
              </Menu.Item>
              {/* <Menu.Item  href={`/${lang}/entities`}>
                <Icon name="users" />
                {t("Authorities")}
              </Menu.Item> */}
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
                    {t("Users")}

                    <Icon name="dropdown" />
                  </Menu.Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <Menu.Item href={`/${lang}/users`}>
                    <Icon name="list" />
                    {t("Users")}
                  </Menu.Item>
                </Accordion.Content>

                <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={handleClick}
                >
                  <Menu.Header as="h5" style={{ padding: 15 }}>
                    <Icon name="cogs" />
                    {t("Settings")}

                    <Icon name="dropdown" />
                  </Menu.Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <Menu.Item href={`/${lang}/languages`}>
                    <Icon name="list" />
                    {t("Languages list")}
                  </Menu.Item>
                  <Menu.Item href={`/${lang}/translates`}>
                    <Icon name="language" />
                    {t("Translations list")}
                  </Menu.Item>
                  <Menu.Item href={`/${lang}/console`}>
                    <Icon name="terminal" />
                    {t("Console")}
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
            onClick={() => {
              dispatch(signOut());
              navigation(`/${lang}`);
            }}
          >
            <Icon name="log out" />
            {t("Logout")}
          </Menu.Item>
          <Menu.Item
            href={`/${lang}/version`}
            style={{ color: "olive", textAlign: "center" }}
          >
            {t("Version")} {import.meta.env.VITE_VERSION}
          </Menu.Item>
        </div>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment style={{ minHeight: "100vh", padding: "0px 0px" }}>
          <Menu pointing secondary size="tiny">
            <Menu.Item onClick={handleToggle}>
              <Icon name="sidebar" size="big" />
            </Menu.Item>
            <Menu.Item position="right">
              <Dropdown
                style={{ marginRight: "10px" }}
                placeholder={t("Select language")}
                fluid
                selection
                value={i18n.language}
                options={
                  languages?.map((lang: Language) => ({
                    key: lang.key,
                    value: lang.key,
                    text: lang.name,
                  })) || []
                }
                onChange={handleSelectLanguage}
              />
              <Dropdown
                simple
                direction="left"
                icon={
                  <Image
                    avatar
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=65a20c&color=fff&rounded=true&bold=true&format=svg`}
                    alt="avatar"
                    size="mini"
                  />
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Header>
                    {t("Hi")}, {user.name} ✋
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item href={`/${lang}/user/${user._id}`}>
                    <Icon name="user" />
                    {t("Profile")}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href={`/${lang}/version`}>
                    <Icon name="info" />
                    {t("Version")} {import.meta.env.VITE_VERSION}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(signOut());
                      navigation(`/${lang}`);
                    }}
                  >
                    <Icon name="log out" />
                    {t("Logout")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
          {children}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
