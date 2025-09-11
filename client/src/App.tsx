import { Routes, Route } from "react-router";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Charts from "./pages/Charts";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <div className=" ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/charts/:chartType" element={<Charts />} />
          {/* <Route path="/user" element={<User />} /> */}
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
