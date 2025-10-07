import { Routes, Route } from "react-router";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Charts from "./pages/Charts";
import Calendar from "./pages/Calendar";
import ProtectedLayout from "./Components/ProtectedLayout";
import ChartWS from "./pages/ChartWS";
import AuthContextProvider from "./context/AuthContextProvider";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div className="bg-black">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/charts/:chartType" element={<Charts />} />
              <Route path="/ws" element={<ChartWS />} />
              <Route path="admin/panel" element={<AdminPanel />} />
            </Route>
            <Route path="/calendar" element={<Calendar />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
