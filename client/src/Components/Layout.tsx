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
              <SubMenu label="Production data on charts">
                <MenuItem component={<Link to="/charts/pie" />}>
                  Enviromental impact
                </MenuItem>
                <MenuItem component={<Link to="/charts/line" />}>
                  Environmental factors
                </MenuItem>
                <MenuItem component={<Link to="/charts/bar" />}>
                  Raw material check
                </MenuItem>
                <MenuItem component={<Link to="/charts/bar" />}>
                  Doughnut to visualize a different proportional breakdown
                  {/* Compare multiple production metrics (e.g., efficiency, quality, speed, cost) across different production lines or shifts in a single radar chart */}
                </MenuItem>
                <MenuItem component={<Link to="/charts/bar" />}>
                  Polar Area Chart (for Categorical Impact)
                  {/* Visualize the environmental impact of different production processes (e.g., energy consumption, waste generation, or water usage by process type). */}
                </MenuItem>
                <MenuItem component={<Link to="/charts/bar" />}>
                  Bubble Chart (for Multi-Dimensional Data)
                  {/* Analyze production data with three dimensions, such as production volume (x-axis), defect rate (y-axis), and cost (bubble size) for different products or batches
                   */}
                </MenuItem>
                <MenuItem component={<Link to="/charts/bar" />}>
                  Gauge Chart (Custom Implementation in Chart.js)
                  {/* Display a single key performance indicator (KPI), such as overall equipment effectiveness (OEE) or production line uptime, as a gauge or speedometer-style chart
                   */}
                </MenuItem>
              </SubMenu>
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
