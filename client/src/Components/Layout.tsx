import { Outlet, Link } from "react-router";
import Navbar from "./Navbar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const Layout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="flex">
        <div className="m-5">
          <Sidebar>
            <Menu>
              <SubMenu label="Charts">
                <MenuItem component={<Link to="/charts/pie" />}>
                  Pie charts
                </MenuItem>
                <MenuItem component={<Link to="/charts/line" />}>
                  Line charts
                </MenuItem>
                <MenuItem component={<Link to="/charts/bar" />}>
                  Bar charts
                </MenuItem>
              </SubMenu>
              <MenuItem> Documentation </MenuItem>
              <MenuItem component={<Link to="/calendar" />}>Calendar</MenuItem>
            </Menu>
          </Sidebar>
        </div>
        <main className="m-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
