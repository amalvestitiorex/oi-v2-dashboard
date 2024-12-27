import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar/Navbar";

export const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
