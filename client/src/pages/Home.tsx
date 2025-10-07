import { useAuth } from "../hooks/useAuth";
import { signIn } from "../hooks/auth";
import { useState } from "react";
const Home = () => {
  const { user, setUser } = useAuth();
  const [sending, setSending] = useState<boolean>(false);

  const handleGuest = async () => {
    try {
      setSending(true);
      const data = {
        email: "guest@guest.de",
        password: "qweqwe",
      };
      const res = await signIn(data);
      setUser({
        firstName: res.userName,
        user_exists: res.user_exists,
        role: res.userRole,
      });
    } catch (error) {
      console.error("Error while signing in.", error);
    } finally {
      setSending(false);
    }
  };
  const handleAdmin = async () => {
    try {
      setSending(true);
      const data = {
        email: "admin@example.de",
        password: "123123",
      };
      const res = await signIn(data);
      setUser({
        firstName: res.userName,
        user_exists: res.user_exists,
        role: res.userRole,
      });
    } catch (error) {
      console.error("Error while signing in.", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black  bg-[linear-gradient(to_bottom_right,#10b981_0%,#000_25%,#000_100%)] font-sans flex items-center justify-center p-4 sm:p-6 md:p-8">
      <section className="w-full max-w-4xl  bg-[radial-gradient(circle_at_center,#10b981_0%,#000_15%,#000_100%)] rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-600 mb-6">
          Welcome to the Production Dashboard!
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-3">
          Project Purpose
        </h2>
        <p className="text-white  mb-6">
          The Production Dashboard is a modern web application designed for
          real-time visualization and analysis of production data. Our goal is
          to provide an intuitive and responsive tool that enables monitoring of
          key performance indicators (KPIs), managing production processes, and
          supporting business decisions through clear and interactive charts.
          Tailored for users in the manufacturing industry, the application
          offers easy access to data, flexible presentation options, and high
          performance.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-3">
          Technologies
        </h2>
        <div className="text-white ">
          The Production Dashboard is built using a modern technology stack,
          ensuring speed, scalability, and maintainability:
          <div className="mt-3">
            <strong className="text-purple-600">Frontend:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                TypeScript and React – for a secure, component-based, and
                dynamic user interface.
              </li>
              <li>
                Vite – an ultra-fast build and development tool, providing
                instant application refreshes.
              </li>
              <li>
                Recharts – a library for creating interactive and visually
                appealing charts to visualize production data.
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <strong className="text-purple-600">Backend:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                FastAPI – a modern Python framework delivering high performance,
                automatic API documentation, and seamless integration with the
                frontend.
              </li>
            </ul>
          </div>
          <svg
            width="200"
            height="200"
            viewBox="0 0 368 385"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5" filter="url(#filter0_f_25_1772)">
              <circle cx="175.5" cy="192.5" r="107.5" fill="#00C778"></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_25_1772"
                x="-17"
                y="0"
                width="385"
                height="385"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="42.5"
                  result="effect1_foregroundBlur_25_1772"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
        </div>
        {user.firstName !== "" ? (
          <></>
        ) : (
          <div className="flex justify-center gap-15 ">
            <button
              onClick={handleAdmin}
              className="p-5 bg-[#035338] text-white  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-blue-300 transition-colors duration-200"
            >
              {sending ? "Logging..." : "Admin login"}
            </button>
            <button
              onClick={handleGuest}
              className="p-5 bg-[#035338] text-white  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-blue-300 transition-colors duration-200"
            >
              {sending ? "Logging..." : "Guest login"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
