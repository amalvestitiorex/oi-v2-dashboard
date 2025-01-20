import { createMedia } from "@artsy/fresnel";
import { DesktopContainer } from "./DesktopContainer";
import { MobileContainer } from "./MobileContainer";
import { FC, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

export const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const { lang } = useParams();

  const ResponsiveContainer: FC<PropsWithChildren> = ({ children }) => (
    <MediaContextProvider>
      <Media greaterThan="mobile">
        <DesktopContainer children={children} lang={lang} />
      </Media>
      <Media at="mobile">
        <MobileContainer children={children} lang={lang} />
      </Media>
    </MediaContextProvider>
  );

  return <ResponsiveContainer>{children}</ResponsiveContainer>;
};
