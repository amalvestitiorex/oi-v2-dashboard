import { createMedia } from "@artsy/fresnel";
import { DesktopContainer } from "./DesktopContainer";
import { MobileContainer } from "./MobileContainer";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

export const Navbar = () => {
  const ResponsiveContainer = () => (
    <MediaContextProvider>
      <Media greaterThan="mobile">
        <DesktopContainer />
      </Media>
      <Media at="mobile">
        <MobileContainer />
      </Media>
    </MediaContextProvider>
  );

  return <ResponsiveContainer />;
};
