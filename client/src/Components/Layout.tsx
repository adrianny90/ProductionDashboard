import { Outlet, Link } from "react-router";
import Navbar from "./Navbar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { useAuth } from "../hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] gap-4 mx-4 sm:mx-6 md:mx-8 lg:mx-10">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-lg">
          <Sidebar
            className="bg-white"
            backgroundColor="#ffffff"
            width="100%"
            rootStyles={{
              minHeight: "100%",
            }}
          >
            <Menu
              menuItemStyles={{
                button: {
                  [`&.active`]: {
                    backgroundColor: "#e5e7eb",
                    color: "#1f2937",
                  },
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    color: "#1f2937",
                  },
                },
              }}
            >
              <SubMenu
                label="Production data on charts"
                className="text-gray-700 font-medium"
              >
                <MenuItem
                  component={<Link to="/charts/pie" />}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Environmental impact
                </MenuItem>
                <MenuItem
                  component={<Link to="/charts/line" />}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Environmental factors
                </MenuItem>
                <MenuItem
                  component={<Link to="/charts/bar" />}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Raw material check
                </MenuItem>
                <MenuItem
                  component={<Link to="/charts/mixBar" />}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Raw material vs final product ratio
                </MenuItem>
                <MenuItem
                  component={<Link to="/ws" />}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Real time capacity
                </MenuItem>
              </SubMenu>
              <MenuItem
                component={<Link to="/calendar" />}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Calendar
              </MenuItem>
              {user.role === "admin" ? (
                <MenuItem
                  component={<Link to="/admin/panel" />}
                  className="text-gray-600 hover:text-gray-900 font-medium"
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
        <main className="flex-1 bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
