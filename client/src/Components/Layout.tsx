import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <nav>
      <div className="app-container">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </nav>
  );
};

export default Layout;
