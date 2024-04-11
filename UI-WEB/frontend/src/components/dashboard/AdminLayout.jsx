import { Outlet } from "react-router-dom";
import AdminNav from "../AdminNav";
// import AdminNav from "./components/AdminNav";

const AdminLayout = ({ setIsLoggedIn, isLoggedIn }) => {
  return (
    <div>
      <AdminNav setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
