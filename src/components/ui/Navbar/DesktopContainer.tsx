import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Dropdown,
  DropdownProps,
  Icon,
  Image,
  Menu,
} from "semantic-ui-react";
import { signOut } from "../../../redux/slices/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getLanguages } from "../../../services/languages.service";
import { Language } from "../../../interfaces/languages";

interface DesktopContainerProps {
  children: React.ReactNode;
  lang?: string;
}

export const DesktopContainer: FC<DesktopContainerProps> = ({
  children,
  lang,
}) => {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSelectLanguage = (
    _e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const lang = data.value as string;
    navigation(switchLanguage(lang));
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
    <Container style={{ height: "100vh", marginTop: "58px" }}>
      <Menu fixed={"top"} pointing={false} secondary={false}>
        <Container>
          <Menu.Item href={`/${lang}`} header>
            <Image
              size="tiny"
              src="/logo.png"
              style={{ marginRight: "0.5em" }}
            />
            Intelligence
          </Menu.Item>
          {user.role === "admin" && (
            <Menu.Item href={`/${lang}/stats`}>{t("Stats")}</Menu.Item>
          )}

          <Dropdown pointing className="link item" text={t("Records")}>
            <Dropdown.Menu>
              <Dropdown.Item
                href={user.role === "admin" ? `/${lang}/records` : `/${lang}`}
              >
                <Icon name="list" />
                {t("Records list")}
              </Dropdown.Item>
              <Dropdown.Item href={`/${lang}/buy`}>
                <Icon name="cart" />
                {t("Buy records")}
              </Dropdown.Item>
              {/* <Dropdown.Item  href={`/${lang}/entities`}>
                <Icon name="users" />
                {t("Authorities")}
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>

          {user.role === "admin" && (
            <>
              <Menu.Item href={`/${lang}/users`}>{t("Users")}</Menu.Item>

              <Dropdown pointing className="link item" text={t("Settings")}>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/${lang}/languages`}>
                    <Icon name="list" />
                    {t("Languages list")}
                  </Dropdown.Item>
                  <Dropdown.Item href={`/${lang}/translates`}>
                    <Icon name="language" />
                    {t("Translations list")}
                  </Dropdown.Item>
                  <Dropdown.Item href={`/${lang}/console`}>
                    <Icon name="terminal" />
                    {t("Console")}
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
                  size="mini"
                />
              }
            >
              <Dropdown.Menu as={Menu}>
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
            <Dropdown
              style={{ marginLeft: "10px" }}
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
          </Menu.Item>
        </Container>
      </Menu>
      {children}
    </Container>
  );
};
