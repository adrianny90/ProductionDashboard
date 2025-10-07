import { Outlet, Link } from "react-router";
import Navbar from "./Navbar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { useAuth } from "../hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-black md:flex-row min-h-[calc(100vh-4rem)]  sm:mx-6 md:mx-8 lg:mx-10">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-black shadow-lg">
          <Sidebar
            className="bg-black"
            backgroundColor="#000000"
            width="100%"
            rootStyles={{
              minHeight: "100%",
            }}
          >
            <Menu
              menuItemStyles={{
                button: {
                  [`&.active`]: {
                    backgroundColor: "#000000",
                    color: "#000000",
                  },
                  "&:hover": {
                    backgroundColor: "#a304e2",
                    color: "#ffffff",
                  },
                },
                subMenuContent: () => ({
                  backgroundColor: "#000000",
                  color: "#ffffff",
                }),
              }}
            >
              <SubMenu
                label="Production data on charts"
                className="text-purple-600 font-medium"
              >
                <MenuItem
                  component={<Link to="/charts/pie" />}
                  className="text-purple-600  hover:text-purple-600"
                >
                  Environmental impact
                </MenuItem>
                <MenuItem
                  component={<Link to="/charts/line" />}
                  className="text-purple-600  hover:text-purple-600"
                >
                  Environmental factors
                </MenuItem>
                <MenuItem
                  component={<Link to="/charts/bar" />}
                  className="text-purple-600  hover:text-purple-600"
                >
                  Raw material check
                </MenuItem>
                <MenuItem
                  component={<Link to="/charts/mixBar" />}
                  className="text-purple-600  hover:text-purple-600"
                >
                  Raw material vs final product ratio
                </MenuItem>
                <MenuItem
                  component={<Link to="/ws" />}
                  className="text-purple-600  hover:text-purple-600"
                >
                  Real time capacity
                </MenuItem>
              </SubMenu>
              <MenuItem
                component={<Link to="/calendar" />}
                className="text-purple-600  hover:text-purple-600 font-medium"
              >
                Calendar
              </MenuItem>
              {user.role === "admin" ? (
                <MenuItem
                  component={<Link to="/admin/panel" />}
                  className="text-purple-600  hover:text-purple-600 font-medium"
                >
                  Admin panel
                </MenuItem>
              ) : (
                <></>
              )}
            </Menu>
          </Sidebar>
        </div>
        {/* Main Content */}
        <main className="flex-1 bg-black rounded-lg shadow-md p-4 sm:p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
