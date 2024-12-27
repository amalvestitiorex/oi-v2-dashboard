import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar/Navbar";

export const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
