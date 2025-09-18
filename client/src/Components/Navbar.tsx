import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <div>
          <ul>
            <li>
              <Link
                to="/"
                className="text-xl sm:text-2xl font-semibold text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-6 sm:space-x-8">
            <li>
              <Link
                to="/signin"
                className="text-base sm:text-lg font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-base sm:text-lg font-medium text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
