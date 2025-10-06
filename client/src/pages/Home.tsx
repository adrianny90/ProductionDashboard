import { useAuth } from "../hooks/useAuth";
import { signIn } from "../hooks/auth";
const Home = () => {
  const { user, setUser } = useAuth();
  const handleGuest = async () => {
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
  };
  const handleAdmin = async () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4 sm:p-6 md:p-8">
      <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome to the Production Dashboard!
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
          Project Purpose
        </h2>
        <p className="text-gray-600  mb-6">
          The Production Dashboard is a modern web application designed for
          real-time visualization and analysis of production data. Our goal is
          to provide an intuitive and responsive tool that enables monitoring of
          key performance indicators (KPIs), managing production processes, and
          supporting business decisions through clear and interactive charts.
          Tailored for users in the manufacturing industry, the application
          offers easy access to data, flexible presentation options, and high
          performance.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
          Technologies
        </h2>
        <div className="text-gray-600 ">
          The Production Dashboard is built using a modern technology stack,
          ensuring speed, scalability, and maintainability:
          <div className="mt-3">
            <strong className="text-gray-800">Frontend:</strong>
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
            <strong className="text-gray-800">Backend:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                FastAPI – a modern Python framework delivering high performance,
                automatic API documentation, and seamless integration with the
                frontend.
              </li>
            </ul>
          </div>
        </div>
        {user.firstName !== "" ? (
          <></>
        ) : (
          <div className="flex justify-center gap-15 ">
            <button
              onClick={handleAdmin}
              className="p-5 bg-blue-500 text-white  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-blue-300 transition-colors duration-200"
            >
              Admin login
            </button>
            <button
              onClick={handleGuest}
              className="p-5 bg-blue-500 text-white  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-blue-300 transition-colors duration-200"
            >
              Guest login
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
