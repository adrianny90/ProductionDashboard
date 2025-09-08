import { Routes, Route } from "react-router";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Charts from "./pages/Charts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/charts" element={<Charts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
