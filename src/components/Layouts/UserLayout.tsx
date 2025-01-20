import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar/Navbar";

export const UserLayout = () => {
  return (
    <Navbar>
      <div
        style={{
          padding: "15px",
        }}
      >
        <Outlet />
      </div>
    </Navbar>
  );
};
