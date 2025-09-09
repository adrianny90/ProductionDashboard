import { Outlet, Link } from "react-router";
import Navbar from "./Navbar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const Layout = () => {
  return (
    <nav className="bg bg-gray-200 h-dvh">
      <div className="app-container">
        <Navbar />
        <div className="flex">
          <div className="m-5">
            <Sidebar>
              <Menu>
                <SubMenu label="Charts">
                  <MenuItem component={<Link to="/charts" />}>
                    Pie charts
                  </MenuItem>
                  <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem component={<Link to="/calendar" />}>
                  Calendar
                </MenuItem>
              </Menu>
            </Sidebar>
          </div>
          <main className="m-10">
            <Outlet />
          </main>
        </div>
      </div>
    </nav>
  );
};

export default Layout;
