import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-black ">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <div>
          <ul>
            <li>
              <Link
                to="/"
                className="text-xl sm:text-2xl font-semibold text-purple-600 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex space-x-6 sm:space-x-8">
            <>
              {user.user_exists ? (
                <>
                  <li className="text-base sm:text-lg font-medium text-[#035338] hover:text-blue-600 transition-colors duration-200">
                    Hi {user.firstName}!
                  </li>
                  <li>
                    <Link
                      onClick={logOut}
                      to="/"
                      className="text-base sm:text-lg font-medium text-purple-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="text-base sm:text-lg font-medium text-purple-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="text-base sm:text-lg font-medium text-purple-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
